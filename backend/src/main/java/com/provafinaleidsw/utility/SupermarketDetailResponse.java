package com.provafinaleidsw.utility;

import java.util.List;

import com.provafinaleidsw.app.model.Supermarket;

public class SupermarketDetailResponse {

	private Supermarket supermarket;
	private int clientInQueue;
	private int clientInSupermarket;
	private double waitingTime;
	private List<String> daysClosed;

	public int getClientInSupermarket() {
		return clientInSupermarket;
	}

	public void setClientInSupermarket(int clientInSupermarket) {
		this.clientInSupermarket = clientInSupermarket;
	}

	public Supermarket getSupermarket() {
		return supermarket;
	}

	public void setSupermarket(Supermarket supermarket) {
		this.supermarket = supermarket;
	}

	public int getClientInQueue() {
		return clientInQueue;
	}

	public void setClientInQueue(int clientInQueue) {
		this.clientInQueue = clientInQueue;
	}

	public double getWaitingTime() {
		return waitingTime;
	}

	public void setWaitingTime(double waitingTime) {
		this.waitingTime = waitingTime;
	}

	public List<String> getDaysClosed() {
		return daysClosed;
	}

	public void setDaysClosed(List<String> daysClosed) {
		this.daysClosed = daysClosed;
	}

}
