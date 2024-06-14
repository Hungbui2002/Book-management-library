package com.example.demo;

public class User {
    private int id;
    private String username;
    private String password;
    private boolean admin;
    public int getId() {
		// TODO Auto-generated method stub
		return id;
	}
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}
	
	public boolean isAdmin() {
		// TODO Auto-generated method stub
		return admin;
	}
	public void setId(int id) {
		this.id =id;
		
	}
	public void setUsername(String username) {
		this.username =username;
		
	}
	public void setPassword(String password) {
		this.password =password;
		
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

    // Constructors, getters, setters
}
