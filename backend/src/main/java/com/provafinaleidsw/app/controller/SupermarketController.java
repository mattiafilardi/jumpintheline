package com.provafinaleidsw.app.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.provafinaleidsw.app.model.Supermarket;
import com.provafinaleidsw.app.service.SupermarketService;
import com.provafinaleidsw.utility.Response;
import com.provafinaleidsw.utility.SupermarketDetailResponse;

@RestController
public class SupermarketController {
	@Autowired
	SupermarketService supermarketService;

	@GetMapping("/getSupermarkets")
	public Response findAll() {
		Response response = new Response();
		ArrayList<Supermarket> supermarketList = (ArrayList<Supermarket>) supermarketService.getSupermarkets();

		if (supermarketList.isEmpty()) {
			response.setHttpResponseCode("500");
			response.setMessage("Impossibile ottenere la lista dei supermercati");
		} else {
			response.setHttpResponseCode("200");
			response.setResult(supermarketList);
		}
		return response;
	}

	@GetMapping("/getSupermarket/{id}")
	public Response getSupermarketDetail(@PathVariable int id) {
		SupermarketDetailResponse s = new SupermarketDetailResponse();
		Response response = new Response();

		Supermarket supermarket = supermarketService.getSupermarketByID(id);

		if (supermarket == null) {
			response.setHttpResponseCode("500");
			response.setMessage("Il supermercato non esiste.");
		} else {
			s.setSupermarket(supermarket);
		}

		ArrayList<String> daysClosed = (ArrayList<String>) supermarketService.getDaysSupermarketClosed(id);

		if (daysClosed.isEmpty())
			daysClosed.add("/");
		s.setDaysClosed(daysClosed);

		int clientInQueue = supermarketService.getActualUsersInQueue(id);
		s.setClientInQueue(clientInQueue);

		double waitingTime = clientInQueue * 15;
		s.setWaitingTime(waitingTime);

		int clientInSupermarket = supermarketService.getActualUsersInSupermarket(id);
		s.setClientInSupermarket(clientInSupermarket);

		response.setHttpResponseCode("200");
		response.setResult(s);

		return response;
	}
}
