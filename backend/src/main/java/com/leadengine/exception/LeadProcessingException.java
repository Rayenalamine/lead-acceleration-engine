package com.leadengine.exception;

public class LeadProcessingException extends RuntimeException {

    public LeadProcessingException(String message) {
        super(message);
    }

    public LeadProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
