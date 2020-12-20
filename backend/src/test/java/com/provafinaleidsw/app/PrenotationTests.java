package com.provafinaleidsw.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.provafinaleidsw.app.model.Supermarket;
import com.provafinaleidsw.app.service.PrenotationService;

public class PrenotationTests {
	PrenotationService p = new PrenotationService();

	@Test
	void prenotationTest() {
		Supermarket supermarket = null;
		assertEquals(-1, p.doPrenotation(0, supermarket));
	}

	@Test
	void terminatePrenotation() {
		assertEquals(false, p.terminatePrenotation(-1));
	}

	@Test
	void prenotationTest2() {
		assertEquals(0, p.checkIfUserHasPrenotationActive(-1));
	}
}
