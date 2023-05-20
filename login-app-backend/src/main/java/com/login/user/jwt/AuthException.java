package com.login.user.jwt;
public class AuthException extends RuntimeException {
	private static final long serialVersionUID = -2228605993337786076L;

	public AuthException(String message, Throwable cause) {
        super(message, cause);
    }
}

