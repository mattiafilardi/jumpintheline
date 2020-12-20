package com.provafinaleidsw.app.model;

public class Prenotation {

	private int ID;
	private int idSupermarket;
	private int idUser;
	private int idStato;
	private long orarioPrenotazione;

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public int getIdSupermarket() {
		return idSupermarket;
	}

	public void setIdSupermarket(int idSupermarket) {
		this.idSupermarket = idSupermarket;
	}

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public int getIdStato() {
		return idStato;
	}

	public void setIdStato(int idStato) {
		this.idStato = idStato;
	}

	public long getOrarioPrenotazione() {
		return orarioPrenotazione;
	}

	public void setOrarioPrenotazione(long orarioPrenotazione) {
		this.orarioPrenotazione = orarioPrenotazione;
	}

}
