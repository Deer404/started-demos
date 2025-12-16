package com.deer404.nano.service

import com.deer404.nano.common.BusinessException
import com.deer404.nano.common.ResultCode
import com.deer404.nano.entity.Book
import com.deer404.nano.repository.BookRepository
import org.springframework.stereotype.Service

@Service
class BookService(
    private val bookRepository: BookRepository
) {
    // 新增/修改图书（添加业务校验）
    fun saveBook(book: Book): Book {
        // 修改时校验ID是否存在
        if (book.id != null && !bookRepository.existsById(book.id)) {
            throw BusinessException(ResultCode.NOT_FOUND, "图书ID: ${book.id} 不存在，无法修改")
        }
        return bookRepository.save(book)
    }

    // 根据ID查询图书（不存在则抛异常）
    fun getBookById(id: Long): Book {
        return bookRepository.findById(id)
            .orElseThrow { BusinessException(ResultCode.NOT_FOUND, "图书ID: $id 不存在") }
    }

    // 查询所有图书
    fun getAllBooks(): List<Book> {
        return bookRepository.findAll()
    }

    // 根据ID删除图书（不存在则抛异常）
    fun deleteBookById(id: Long) {
        if (!bookRepository.existsById(id)) {
            throw BusinessException(ResultCode.NOT_FOUND, "图书ID: $id 不存在，无法删除")
        }
        bookRepository.deleteById(id)
    }
}