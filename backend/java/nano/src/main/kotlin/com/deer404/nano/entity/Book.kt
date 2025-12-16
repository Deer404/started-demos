package com.deer404.nano.entity

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

/**
 * 终极极简版：仅保留校验规则，无任何硬编码提示
 * 提示文案完全由全局国际化配置 + 异常处理器接管
 */
@Entity
@Table(name = "book")
data class Book(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    // 仅保留规则，无message → 用注解默认提示（英文），后续全局转中文
    @NotBlank
    @Size(min = 1, max = 50)
    @Column(nullable = false)
    val name: String,

    @NotBlank
    @Size(min = 1, max = 20)
    @Column(nullable = false)
    val author: String,
)