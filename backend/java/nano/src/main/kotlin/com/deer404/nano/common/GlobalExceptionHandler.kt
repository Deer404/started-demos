package com.deer404.nano.common

import jakarta.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.dao.DataAccessException
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.validation.BindException
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

// 修正：导入正确的KotlinInvalidNullException包（适配你的环境）
import tools.jackson.module.kotlin.KotlinInvalidNullException
import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.JsonMappingException

/**
 * 生产级全局异常处理器（无字段中文翻译）
 * 拦截优先级：业务异常 → 参数校验 → Kotlin非空 → JSON解析 → 数据库 → 兜底
 */
@RestControllerAdvice
class GlobalExceptionHandler(
    @Value("\${spring.profiles.active:dev}")
    private val activeProfile: String
) {
    private val log = LoggerFactory.getLogger(javaClass)

    // ========== 1. 自定义业务异常 ==========
    @ExceptionHandler(BusinessException::class)
    fun handleBusinessException(e: BusinessException): Result<Nothing> {
        log.warn("[业务异常] {}", e.message)
        return Result.fail(e.code, e.message ?: "业务处理失败")
    }

    // ========== 2. 参数校验异常（@Valid触发） ==========
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidException(e: MethodArgumentNotValidException): Result<Nothing> {
        val errorMsg = buildValidErrorMsg(e.bindingResult.fieldErrors)
        log.warn("[参数校验异常] {}", errorMsg)
        return Result.fail(ResultCode.PARAM_ERROR, errorMsg)
    }

    // ========== 3. 参数绑定异常（路径参数） ==========
    @ExceptionHandler(BindException::class)
    fun handleBindException(e: BindException): Result<Nothing> {
        val errorMsg = buildValidErrorMsg(e.bindingResult.fieldErrors)
        log.warn("[参数绑定异常] {}", errorMsg)
        return Result.fail(ResultCode.PARAM_ERROR, errorMsg)
    }

    // ========== 4. 参数类型不匹配 ==========
    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleTypeMismatchException(e: MethodArgumentTypeMismatchException): Result<Nothing> {
        val expectType = e.requiredType?.simpleName ?: "未知类型"
        val errorMsg = "[${e.name}]参数类型错误，期望类型：${expectType}"
        log.warn("[参数类型异常] {}", errorMsg)
        return Result.fail(ResultCode.PARAM_ERROR, errorMsg)
    }

    // ========== 5. Kotlin非空参数缺失（核心：优先拦截） ==========
    @ExceptionHandler(KotlinInvalidNullException::class)
    fun handleKotlinNullEx(e: KotlinInvalidNullException): Result<Nothing> {
        val field = e.message
            ?.substringAfter("property ")
            ?.substringBefore(" due to missing")
            ?.replace("\"", "")
            ?: "未知字段"
        val errorMsg = "[${field}]为必填参数，不能为空或缺失"
        log.warn("[Kotlin非空异常] {}", errorMsg)
        return Result.fail(ResultCode.PARAM_ERROR, errorMsg)
    }

    // ========== 6. JSON解析异常 ==========
    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleMessageNotReadableException(e: HttpMessageNotReadableException): Result<Nothing> {
        val rootCause = e.rootCause
        val errorMsg = when (rootCause) {
            is KotlinInvalidNullException -> {
                val field = rootCause.message
                    ?.substringAfter("property ")
                    ?.substringBefore(" due to missing")
                    ?.replace("\"", "")
                    ?: "未知字段"
                "[${field}]为必填参数，不能为空或缺失"
            }
            is JsonParseException -> {
                val detail = rootCause.message?.substringBeforeLast('(')?.trim() ?: "语法错误"
                "JSON语法错误：${detail}"
            }
            is JsonMappingException -> {
                when {
                    rootCause.message?.contains("required property") == true -> {
                        val field = rootCause.message
                            ?.substringAfter("required property '")
                            ?.substringBefore("'")
                            ?: "未知字段"
                        "[${field}]为必填参数，不能为空或缺失"
                    }
                    rootCause.message?.contains("Can not deserialize") == true -> {
                        val field = rootCause.message
                            ?.substringAfter("through reference chain: ")
                            ?.substringAfter("[\"")
                            ?.substringBefore("\"]")
                            ?: "未知字段"
                        "[${field}]参数格式错误，请检查数据类型"
                    }
                    else -> {
                        val detail = rootCause.message?.substringBeforeLast('(')?.trim() ?: "字段错误"
                        "JSON字段格式错误：${detail}"
                    }
                }
            }
            else -> {
                if (e.message?.contains("Required request body is missing") == true) {
                    "请求体不能为空，请传递JSON格式的参数"
                } else {
                    "请求体解析失败，请检查JSON格式是否正确"
                }
            }
        }
        log.warn("[JSON解析异常] {}", errorMsg)
        return Result.fail(ResultCode.PARAM_ERROR, errorMsg)
    }

    // ========== 7. 数据库异常 ==========
    @ExceptionHandler(DataAccessException::class)
    fun handleDataAccessException(e: DataAccessException): Result<Nothing> {
        log.error("[数据库异常]", e)
        val errorDetail = if (activeProfile == "dev") e.stackTraceToString() else null
        val errorMsg = if (activeProfile == "dev") {
            "数据库操作失败：${e.message?.substringBefore("\n")}"
        } else {
            "数据处理失败，请稍后重试"
        }
        return Result.fail(ResultCode.SERVER_ERROR, errorMsg, errorDetail)
    }

    // ========== 8. 兜底系统异常 ==========
    @ExceptionHandler(Exception::class)
    fun handleGlobalException(e: Exception, request: HttpServletRequest): Result<Nothing> {
        log.error("[系统异常] 请求路径：{}", request.requestURI, e)
        val errorDetail = if (activeProfile == "dev") e.stackTraceToString() else null
        val errorMsg = if (activeProfile == "dev") {
            "服务器错误：${e.message?.substringBefore("\n")}"
        } else {
            "服务暂不可用，请稍后重试"
        }
        return Result.fail(ResultCode.SERVER_ERROR, errorMsg, errorDetail)
    }

    // ========== 私有工具方法（无中文翻译） ==========
    private fun buildValidErrorMsg(fieldErrors: List<FieldError>): String {
        return fieldErrors.joinToString("；") { error ->
            "[${error.field}]${error.defaultMessage}"
        }
    }
}