package com.provafinaleidsw.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.provafinaleidsw.app.service.UserService;

public class UserTests {
	UserService u = new UserService();

	@Test
	void checkLogin() {
		assertEquals(null, u.doLogin("", ""));
	}

	@Test
	void checkRegistration() {
		assertEquals(-1, u.registerUser("nome", "cognome", "username", ""));
	}

	@Test
	void checkRegistration2() {
		assertEquals(-1, u.registerUser("nome", null, "username", "password"));
	}
}
