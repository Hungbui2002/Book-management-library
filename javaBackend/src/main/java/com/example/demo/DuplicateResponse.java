package com.example.demo;

public class DuplicateResponse {
    private boolean duplicate;

    public DuplicateResponse(boolean duplicate) {
        this.duplicate = duplicate;
    }

    public boolean isDuplicate() {
        return duplicate;
    }

    public void setDuplicate(boolean duplicate) {
        this.duplicate = duplicate;
    }
}
