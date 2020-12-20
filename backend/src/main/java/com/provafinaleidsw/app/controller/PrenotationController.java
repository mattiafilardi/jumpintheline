package com.provafinaleidsw.app.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.provafinaleidsw.app.model.Prenotation;
import com.provafinaleidsw.app.model.Supermarket;
import com.provafinaleidsw.app.service.PrenotationService;
import com.provafinaleidsw.app.service.SupermarketService;
import com.provafinaleidsw.utility.Response;

@RestController
public class PrenotationController {

	@Autowired
	PrenotationService prenotationService;

	@Autowired
	SupermarketService supermarketService;

	@PostMapping("/doPrenotation")
	public Response doPrenotation(@RequestParam int supermarketID, @RequestParam int userID) {
		Response response = new Response();
		Supermarket s = supermarketService.getSupermarketByID(supermarketID);

		if (s == null) {
			response.setHttpResponseCode("400");
			response.setMessage("Il supermercato ricercato non esiste.");
			return response;
		}

		if (!supermarketService.checkSupermarketStatus(s)) {
			response.setHttpResponseCode("500");
			response.setMessage("Il supermercato è chiuso.");
			return response;
		}

		int prenotationActive = prenotationService.checkIfUserHasPrenotationActive(userID);
		if (prenotationActive > 0) {
			response.setHttpResponseCode("401");
			response.setMessage("Hai già una prenotazione attiva");
			return response;
		}

		if (s.getOrarioChiusura().getHour() == LocalDateTime.now().getHour() + 1
				&& LocalDateTime.now().getMinute() > 45) {
			response.setHttpResponseCode("500");
			response.setMessage("Ci dispiace, il supermercato sta per chiudere.");
			return response;
		}

		int prenotationID = prenotationService.doPrenotation(userID, s);
		if (prenotationID == -1) {
			response.setHttpResponseCode("500");
			response.setMessage("Impossibile effettuare la prenotazione");
		} else {
			response.setHttpResponseCode("200");
			response.setResult(prenotationService.getPrenotation(prenotationID));
			response.setMessage("Prenotazione effettuata!");
		}

		return response;
	}

	@GetMapping("/getPrenotation/{id}")
	public Response getPrenotation(@PathVariable int id) {
		Response response = new Response();

		Prenotation prenotation = prenotationService.getPrenotation(id);

		if (prenotation == null) {
			response.setHttpResponseCode("400");
			response.setMessage("Questa prenotazione non esiste.");
		} else {
			response.setHttpResponseCode("200");
			response.setResult(prenotation);
		}
		return response;
	}

	// Update prenotation -> Termina
	@PostMapping("/terminatePrenotation")
	public Response terminatePrenotation(@RequestParam int prenotationID, @RequestParam int supermarketID) {
		Response response = new Response();

		boolean prenotationTerminated = prenotationService.terminatePrenotation(prenotationID);

		prenotationService.updateFirstUserInQueuePrenotation(supermarketID);

		if (prenotationTerminated) {
			response.setHttpResponseCode("200");
			response.setResult("Prenotazione teminata!");
		} else {
			response.setHttpResponseCode("500");
			response.setMessage("Errore nella terminare la prenotazione");
		}
		return response;
	}

	@GetMapping("/getPrenotations/{userId}")
	public Response findPrenotations(@PathVariable int userId) {
		Response response = new Response();
		ArrayList<Prenotation> prenotationList = (ArrayList<Prenotation>) prenotationService.getPrenotations(userId);

		if (prenotationList.isEmpty()) {
			response.setHttpResponseCode("500");
			response.setMessage("Nessuna prenotazione presente");
		} else {
			response.setHttpResponseCode("200");
			response.setResult(prenotationList);
		}
		return response;
	}

}
