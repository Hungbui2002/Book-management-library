package com.example.demo;

import java.util.Date;

public class Book {
	private int bookcode;
	private String title;
	private String author;
	private String description;
	private Date release_date;
	private int numberofpage;
	private String category;
	private String img_url;

//	private String book_description	;
//	private String photo;
	
	public Book() {
		// TODO Auto-generated constructor stub
	}

	public Book(int bookcode, String title, String author,String description,Date release_date,int numberofpage, String category,String img_url) {
		this.bookcode = bookcode;
		this.title = title;
		this.author= author;
		this.description = description;
		this.release_date =release_date;
		this.category = category;
		this.numberofpage = numberofpage;
		this.img_url = img_url;
	}
	public String getTitle() {
		return title;
	}public int getBookcode() {
		return bookcode;
	}public String getAuthor() {
		return author;
	}
	public String getDescription() {
		return description;
	}
	public Date getRelease_date() {
		return release_date;
		
	}public String getCategory() {
		return category;
	}public String getImg_url() {
		return img_url;
	}public int getNumberofpage() {
		return numberofpage;
	}
	public void setBookcode(int bookcode) {
		this.bookcode = bookcode;
	}public void setTitle(String title) {
		this.title = title;
	}public void setAuthor(String author) {
		this.author = author;
	}public void setDescription(String description) {
		this.description =description;
	}public void setImg_url(String img_url) {
		this.img_url = img_url;
	}public void setCategory(String category) {
		this.category = category;
	}
	public void setNumberofpage(int numberofpage) {
		this.numberofpage =numberofpage;
	}
	public void setRelease_date(Date release_date) {
		this.release_date = release_date;
	}
}