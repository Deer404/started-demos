package com.deer404.nano.common

// 通用响应状态码
enum class ResultCode(val code: Int, val msg: String) {
    SUCCESS(200, "操作成功"),
    PARAM_ERROR(400, "参数错误"),
    NOT_FOUND(404, "资源不存在"),
    SERVER_ERROR(500, "服务器内部错误")
}

// 统一响应体（泛型支持任意数据类型）
data class Result<T>(
    val code: Int,          // 状态码
    val msg: String,        // 提示消息
    val data: T?,           // 响应数据（可为空）
    val errorDetail: String? = null // 错误详情（仅开发环境返回）
) {
    // 静态工具方法：成功响应
    companion object {
        fun <T> success(data: T? = null): Result<T> {
            return Result(ResultCode.SUCCESS.code, ResultCode.SUCCESS.msg, data)
        }

        // 失败响应（支持自定义消息和错误详情）
        fun <T> fail(
            code: ResultCode,
            msg: String? = null,
            errorDetail: String? = null
        ): Result<T> {
            return Result(
                code = code.code,
                msg = msg ?: code.msg,
                data = null,
                errorDetail = errorDetail
            )
        }
    }
}