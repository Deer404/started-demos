package com.deer404.nano.controller

import com.deer404.nano.common.Result
import com.deer404.nano.common.ResultCode
import com.deer404.nano.entity.Book
import com.deer404.nano.service.BookService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/books")
class BookController(
    private val bookService: BookService
) {
    /**
     * 新增图书
     * @param book 图书信息（带@Valid触发参数校验）
     * @return 统一响应体
     */
    @PostMapping
    fun addBook(@Valid @RequestBody book: Book): Result<Book> {
        val savedBook = bookService.saveBook(book)
        return Result.success(savedBook)
    }

    /**
     * 根据ID查询图书
     * @param id 图书ID（路径参数）
     * @return 统一响应体
     */
    @GetMapping("/{id}")
    fun getBook(@PathVariable id: Long): Result<Book> {
        val book = bookService.getBookById(id)
        return Result.success(book)
    }

    /**
     * 查询所有图书
     * @return 统一响应体
     */
    @GetMapping
    fun getAllBooks(): Result<List<Book>> {
        val books = bookService.getAllBooks()
        return Result.success(books)
    }

    /**
     * 修改图书
     * @param book 图书信息（带@Valid触发参数校验，必须包含ID）
     * @return 统一响应体
     */
    @PutMapping
    fun updateBook(@Valid @RequestBody book: Book): Result<Book> {
        // 额外校验：修改必须传ID
        if (book.id == null) {
            return Result.fail(ResultCode.PARAM_ERROR, "修改图书必须传入ID")
        }
        val updatedBook = bookService.saveBook(book)
        return Result.success(updatedBook)
    }

    /**
     * 根据ID删除图书
     * @param id 图书ID
     * @return 统一响应体
     */
    @DeleteMapping("/{id}")
    fun deleteBook(@PathVariable id: Long): Result<Nothing> {
        bookService.deleteBookById(id)
        return Result.success() // 删除成功返回空数据，状态码200
    }
}