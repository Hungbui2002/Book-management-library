package com.example.demo;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@CrossOrigin
public class BookController {
	
	private BookDAO BookDAO = new BookDAO();
	@GetMapping("/books")
	public List<Book> getBook(){
		List<Book> Books = BookDAO.selectAllBooks();
		return Books;
	}
	
	@GetMapping("/book/{id}")
	public Book getBook(@PathVariable String id) {
		Book Bookbid =  BookDAO.selectBook(Integer.valueOf(id));
		return Bookbid;
	}
	@PutMapping("/book/update/{id}")
	@CrossOrigin
	public ResponseEntity<?> updateBook(@RequestBody Book book) {
		System.out.println(book);
		try {
			BookDAO.updateBook(book);
			return new ResponseEntity<>("Đã cập nhật thành công", HttpStatus.CREATED);
		} catch(Exception e) {
			return new ResponseEntity<>("Đã có lỗi xảy ra", HttpStatus.INTERNAL_SERVER_ERROR);// trả về thông báo lỗi cho client 
		}
	}
	 @PostMapping("/book/check-duplicate")
	    public ResponseEntity<?> checkDuplicateBook(@RequestBody Book book) {
	        boolean duplicate = BookDAO.existsByTitleAndAuthor(book.getTitle(), book.getAuthor());
	        return ResponseEntity.ok().body(new DuplicateResponse(duplicate));
	    }
	@PostMapping("/book/add")
	public ResponseEntity<?> insertBook(@RequestBody Book book){
		try {
			BookDAO.insertBook(book);
			return new ResponseEntity<>("Đã caapj nhaajt thành công", HttpStatus.CREATED);
		} catch(Exception e) {
			return new ResponseEntity<>("Đã có lỗi xảy ra", HttpStatus.INTERNAL_SERVER_ERROR);// trả về thông báo lỗi cho client 
		}
	}
	@DeleteMapping("/book/delete/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable String id){
		try {
			BookDAO.deleteBook(Integer.valueOf(id));
			return new ResponseEntity<>("Xóa thành công", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Đã có lỗi xảy ra", HttpStatus.INTERNAL_SERVER_ERROR);// trả về thông báo lỗi cho client 
		}
		
	}
}
