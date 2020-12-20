package com.provafinaleidsw.app.model;

import java.time.LocalTime;

public class Supermarket {

	private int ID;
	private String nome;
	private String indirizzo;
	private LocalTime orarioApertura;
	private LocalTime orarioChiusura;
	private int capienza;
	private String stato;

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getIndirizzo() {
		return indirizzo;
	}

	public void setIndirizzo(String indirizzo) {
		this.indirizzo = indirizzo;
	}

	public LocalTime getOrarioApertura() {
		return orarioApertura;
	}

	public void setOrarioApertura(LocalTime orarioApertura) {
		this.orarioApertura = orarioApertura;
	}

	public LocalTime getOrarioChiusura() {
		return orarioChiusura;
	}

	public void setOrarioChiusura(LocalTime orarioChiusura) {
		this.orarioChiusura = orarioChiusura;
	}

	public int getCapienza() {
		return capienza;
	}

	public void setCapienza(int capienza) {
		this.capienza = capienza;
	}

	public String getStato() {
		return stato;
	}

	public void setStato(String stato) {
		this.stato = stato;
	}

	@Override
	public String toString() {
		return "Supermarket [ID=" + ID + ", nome=" + nome + ", indirizzo=" + indirizzo + ", orarioApertura="
				+ orarioApertura + ", orarioChiusura=" + orarioChiusura + ", capienza=" + capienza + "]";
	}

}
