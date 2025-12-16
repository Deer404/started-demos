package com.deer404.nano.controller

import com.deer404.nano.entity.Greeting
import java.util.concurrent.atomic.AtomicLong

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

private const val template = "Hello, %s!"

@RestController
class GreetingController {

    private val counter = AtomicLong()

    @GetMapping("/greeting")
    fun greeting(@RequestParam name: String = "World") =
        Greeting(counter.incrementAndGet(), template.format(name))

    @GetMapping("/h")
    fun helloWorld(): String {
        return "HelloWorld";
    }

}