package com.deer404.nano.common


// 业务异常（用于主动抛出的业务错误，如"图书ID不存在"）
class BusinessException(
    val code: ResultCode,
    override val message: String? = null
) : RuntimeException(message)