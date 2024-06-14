package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class BookDAO {
	private String jdbcURL = "jdbc:mysql://localhost:3306/jdbc_demo";
	private String jdbcUsername = "root";
	private String jdbcPassword = "12032002";
	
	private static final String SELECT_ALL_Book = "SELECT * FROM book";
	private static final String SELECT_Book_BY_ID = "select * from book where bookcode =?";
	private static final String INSERT_BOOK_SQL = "INSERT INTO book (title, author, description, release_date, numberofpage, category, img_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
	private static final String SELECT_BOOK_BY_TITLE = "SELECT * FROM book WHERE title = ? ";

	private static final String UPDATE_BOOK_SQL ="UPDATE book SET title=?, author=?, description=?, release_date=?, numberofpage=?, category=?, img_url=? WHERE bookcode=?";
	private static final String DELETE_BOOK_SQL ="DELETE FROM book WHERE (`bookcode` = ?)";
	public BookDAO() {
		// TODO Auto-generated constructor stub
	}
	
	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection =DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
		}catch (SQLException e) {
			e.printStackTrace();
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return connection;
	}
	public List<Book> selectAllBooks(){
		List<Book> books = new ArrayList<>();
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(SELECT_ALL_Book);){
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				int bookcode = rs.getInt("bookcode");
				String title = rs.getString("title");
				String author = rs.getString("author");
				String description = rs.getString("description");
				Date release_date = rs.getDate("release_date");
				int numofpage= rs.getInt("numberofpage");
				String category = rs.getString("category");
				String img_url = rs.getString("img_url");
				books.add(new Book(bookcode,title,author,description,release_date,numofpage,category,img_url));
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return books;
	}
	public boolean existsByTitleAndAuthor(String title, String author) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(SELECT_BOOK_BY_TITLE);) {
	        ps.setString(1, title);
	        ResultSet rs = ps.executeQuery();
	        return rs.next(); 
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return false;
	}


	public Book selectBook(int id1) {
		Book book = new Book();
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(SELECT_Book_BY_ID);){
			ps.setInt(1, id1);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				int bookcode = rs.getInt("bookcode");
				String title = rs.getString("title");
				String author = rs.getString("author");
				String description = rs.getString("description");
				Date release_date = rs.getDate("release_date");
				int numofpage= rs.getInt("numberofpage");
				String category = rs.getString("category");
				String img_url = rs.getString("img_url");
				book = new Book(bookcode,title,author,description,release_date,numofpage,category,img_url);
			}
			
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return book;
	}
	public void insertBook(Book book) {
	    try (Connection connection = getConnection();
	            PreparedStatement ps = connection.prepareStatement(INSERT_BOOK_SQL, Statement.RETURN_GENERATED_KEYS)) {
	        ps.setString(1, book.getTitle());
	        ps.setString(2, book.getAuthor());
	        ps.setString(3, book.getDescription());
	        java.sql.Date releaseDate = new java.sql.Date(book.getRelease_date().getTime());
	        ps.setDate(4, releaseDate);
	        ps.setInt(5, book.getNumberofpage());
	        ps.setString(6, book.getCategory());
	        ps.setString(7, book.getImg_url());

	        int rs = ps.executeUpdate();
	        ResultSet generatedKeys = ps.getGeneratedKeys();
	        if (generatedKeys.next()) {
	            int generatedBookCode = generatedKeys.getInt(1);
	            // Sử dụng generatedBookCode ở đây nếu cần thiết
	        }

	        ps.close();
	        connection.close();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}

	public void updateBook(Book book) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(UPDATE_BOOK_SQL)) {
	        ps.setString(1, book.getTitle());
	        ps.setString(2, book.getAuthor());
	        ps.setString(3, book.getDescription());
	        
	        // Convert java.util.Date to java.sql.Date
	        java.sql.Date releaseDate = new java.sql.Date(book.getRelease_date().getTime());
	        ps.setDate(4, releaseDate);
	        
	        ps.setInt(5, book.getNumberofpage());
	        ps.setString(6, book.getCategory());
	        ps.setString(7, book.getImg_url());
	        ps.setInt(8, book.getBookcode());
	        int result = ps.executeUpdate();

	        // Check the update result
	        if (result > 0) {
	            System.out.println("Successfully updated book information.");
	        } else {
	            System.out.println("No book found to update.");
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}

	public void deleteBook(int id1) {
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(DELETE_BOOK_SQL);){
			ps.setInt(1, id1);
			int result = ps.executeUpdate();
			
			ps.close();
			connection.close();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
