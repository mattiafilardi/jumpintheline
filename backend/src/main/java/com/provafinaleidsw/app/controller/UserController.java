package com.provafinaleidsw.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.provafinaleidsw.app.model.User;
import com.provafinaleidsw.app.service.UserService;
import com.provafinaleidsw.utility.Response;

@RestController
public class UserController {

	@Autowired
	UserService userService;

	@CrossOrigin(origins = "http://localhost:19006")
	@PostMapping("/login")
	public Response doLogin(@RequestParam String username, @RequestParam String password) {
		Response response = new Response();
		User user = userService.doLogin(username, password);
		if (user != null) {
			response.setHttpResponseCode("200");
			response.setResult(user);
			response.setMessage("Login effettuato!");
		} else {
			response.setHttpResponseCode("400");
			response.setMessage("Le credenziali sono sbagliate!");
		}
		return response;
	}

	@CrossOrigin(origins = "http://localhost:19006")
	@PostMapping("/register")
	public Response doLogin(@RequestParam String name, @RequestParam String surname, @RequestParam String username,
			@RequestParam String password) {
		Response response = new Response();

		User user = userService.getCustomerByUsername(username);
		if (user != null) {
			response.setHttpResponseCode("500");
			response.setMessage("L'username inserito già esiste. Scegline un altro.");
			return response;
		}

		int registration = userService.registerUser(name, surname, username, password);
		if (registration > 0) {
			response.setHttpResponseCode("200");
			response.setMessage("Registrazione effettuata!");
		} else {
			response.setHttpResponseCode("400");
			response.setMessage("I campi inseriti non sono validi");
		}

		return response;
	}
}
