package com.provafinaleidsw.utility;

import org.springframework.stereotype.Component;

@Component
public class Response {
	private String httpResponseCode;
	private Object result;
	private String message;

	public String getHttpResponseCode() {
		return httpResponseCode;
	}

	public void setHttpResponseCode(String httpResponseCode) {
		this.httpResponseCode = httpResponseCode;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
