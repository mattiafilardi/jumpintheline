package com.provafinaleidsw.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.provafinaleidsw.app.model.Supermarket;
import com.provafinaleidsw.app.service.SupermarketService;

class SupermarketTests {
	SupermarketService s = new SupermarketService();

	@Test
	void getSupermarketByID() {
		assertEquals("Conad", s.getSupermarketByID(1).getNome());
	}

	@Test
	void getUsersInSupermarketTest() {
		assertEquals(0, s.getActualUsersInSupermarket(-1));
	}

	@Test
	void supermarketClosedTest() {
		Supermarket supermarket = null;
		assertEquals(false, s.checkSupermarketStatus(supermarket));
	}
}
