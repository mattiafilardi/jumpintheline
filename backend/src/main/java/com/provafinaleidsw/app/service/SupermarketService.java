package com.provafinaleidsw.app.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.provafinaleidsw.app.model.Supermarket;
import com.provafinaleidsw.utility.ConnectionFactory;

@Service
public class SupermarketService {

	@Autowired
	Connection connection;

	private String selectSupermarketByID = "SELECT * FROM SUPERMERCATO WHERE ID = ?";
	private String selectAllSupermarket = "SELECT * FROM SUPERMERCATO";
	private String getDaysSupermarketClosed = "SELECT GIORNO FROM CHIUSURA WHERE ID_SUPERMERCATO = ?";

	public List<Supermarket> getSupermarkets() {
		ArrayList<Supermarket> supermarketList = new ArrayList<>();
		try {
			PreparedStatement statement = connection.prepareStatement(selectAllSupermarket);
			ResultSet resultSet = statement.executeQuery();
			while (resultSet.next()) {
				supermarketList.add(extractSupermarketFromResultSet(resultSet));
			}

			// Check if supermarkets are open or closed
			for (Supermarket s : supermarketList) {
				boolean isOpen = checkSupermarketStatus(s);
				String stato = isOpen ? "OPEN" : "CLOSED";
				s.setStato(stato);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return supermarketList;
	}

	public Supermarket getSupermarketByID(int id) {
		Supermarket supermarket = null;
		try {
			PreparedStatement statement = ConnectionFactory.getConnection().prepareStatement(selectSupermarketByID);
			statement.setInt(1, id);
			ResultSet resultSet = statement.executeQuery();
			if (resultSet.next()) {
				supermarket = extractSupermarketFromResultSet(resultSet);
				boolean isOpen = checkSupermarketStatus(supermarket);
				String stato = isOpen ? "OPEN" : "CLOSED";
				supermarket.setStato(stato);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return supermarket;
	}

	public boolean checkSupermarketStatus(Supermarket s) {
		if (s == null || s.getOrarioApertura().getHour() > LocalDateTime.now().getHour()) {
			return false;
		}

		if (s.getOrarioChiusura().getHour() <= LocalDateTime.now().getHour()) {
			return false;
		}

		ArrayList<String> daysClosed = (ArrayList<String>) getDaysSupermarketClosed(s.getID());
		if (!daysClosed.isEmpty() && daysClosed.contains(LocalDateTime.now().getDayOfWeek().toString())) {
			return false;
		}

		return true;
	}

	public List<String> getDaysSupermarketClosed(int id) {
		ArrayList<String> daysClosed = new ArrayList<>();

		try {
			PreparedStatement statement = connection.prepareStatement(getDaysSupermarketClosed);
			statement.setInt(1, id);
			ResultSet resultSet = statement.executeQuery();
			while (resultSet.next()) {
				daysClosed.add(resultSet.getString("Giorno"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return daysClosed;
	}

	public int getActualUsersInSupermarket(int id) {
		int usersInSupermarket = 0;

		String query = "SELECT COUNT(*) AS USERS FROM (SUPERMERCATO S INNER JOIN PRENOTAZIONE P ON S.ID = P.FK_SUPERMERCATO) WHERE S.ID = ? AND P.FK_STATO = 2;";
		try {
			PreparedStatement statement = ConnectionFactory.getConnection().prepareStatement(query);
			statement.setInt(1, id);
			ResultSet resultSet = statement.executeQuery();
			resultSet.next();
			usersInSupermarket = resultSet.getInt("USERS");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			usersInSupermarket = -1;
		}
		return usersInSupermarket;
	}

	public int getActualUsersInQueue(int id) {
		int usersInQueue = 0;

		String query = "SELECT COUNT(*) AS USERS FROM (SUPERMERCATO S INNER JOIN PRENOTAZIONE P ON S.ID = P.FK_SUPERMERCATO) WHERE S.ID = ? AND P.FK_STATO = 1;";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setInt(1, id);
			ResultSet resultSet = statement.executeQuery();
			resultSet.next();
			usersInQueue = resultSet.getInt("USERS");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			usersInQueue = -1;
		}
		return usersInQueue;
	}

	// return prenotation id if exist
	public int getFirstUserInQueue(int idSupermarket) {
		int prenotationID = -1;

		String query = "SELECT ID FROM PRENOTAZIONE WHERE FK_SUPERMERCATO = ? AND FK_STATO=1 ORDER BY ORARIOPRENOTAZIONE";
		if (getActualUsersInQueue(2) > 0) {
			try {
				PreparedStatement statement = connection.prepareStatement(query);
				statement.setInt(1, 2);
				ResultSet resultSet = statement.executeQuery();
				resultSet.next();
				prenotationID = resultSet.getInt("ID");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return prenotationID;
	}

	private Supermarket extractSupermarketFromResultSet(ResultSet resultSet) {
		Supermarket supermarket = new Supermarket();
		try {
			supermarket.setID(resultSet.getInt("ID"));
			supermarket.setNome(resultSet.getString("Nome"));
			supermarket.setIndirizzo(resultSet.getString("Indirizzo"));
			supermarket.setCapienza(resultSet.getInt("Capienza"));
			supermarket.setOrarioApertura(resultSet.getObject("OrarioApertura", LocalTime.class));
			supermarket.setOrarioChiusura(resultSet.getObject("OrarioChiusura", LocalTime.class));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return supermarket;
	}
}
