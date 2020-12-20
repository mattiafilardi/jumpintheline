package com.provafinaleidsw.app.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.provafinaleidsw.app.model.Prenotation;
import com.provafinaleidsw.app.model.Supermarket;
import com.provafinaleidsw.utility.ConnectionFactory;

@Service
public class PrenotationService {

	@Autowired
	Connection connection;

	@Autowired
	SupermarketService supermarketService;

	private String insertPrenotation = "INSERT INTO PRENOTAZIONE (FK_SUPERMERCATO, FK_USER, FK_STATO, ORARIOPRENOTAZIONE) VALUES (?, ?, ?, ?);";
	private String selectPrenotationById = "SELECT * FROM PRENOTAZIONE WHERE ID = ?";
	private String updatePrenotation = "UPDATE PRENOTAZIONE SET FK_STATO = ? WHERE ID = ?";
	private String selectPrenotationByUser = "SELECT * FROM PRENOTAZIONE WHERE FK_USER = ?";
	private String selectPrenotationActiveByUser = "SELECT COUNT(*) AS PRENOTATION FROM PRENOTAZIONE WHERE FK_USER = ? AND (FK_STATO = 1 OR FK_STATO = 2)";

	public int doPrenotation(int idUser, Supermarket s) {
		if (s == null)
			return -1;

		if (s.getCapienza() > supermarketService.getActualUsersInSupermarket(s.getID())) {
			return insertPrenotation(idUser, s.getID(), 2);
		}

		if (s.getCapienza() == supermarketService.getActualUsersInSupermarket(s.getID())) {
			return insertPrenotation(idUser, s.getID(), 1);
		}
		return -1;
	}

	public int insertPrenotation(int idUser, int idSupermarket, int idStato) {
		try {
			PreparedStatement statement = ConnectionFactory.getConnection().prepareStatement(insertPrenotation,
					Statement.RETURN_GENERATED_KEYS);
			statement.setInt(1, idSupermarket);
			statement.setInt(2, idUser);
			statement.setInt(3, idStato);

			statement.setLong(4, System.currentTimeMillis());

			statement.execute();

			ResultSet result = statement.getGeneratedKeys();

			if (result.next() && result != null)
				return result.getInt(1);
			else
				return -1;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return -1;
		}
	}

	public Prenotation getPrenotation(int id) {
		Prenotation prenotation = null;
		try {
			PreparedStatement statement = connection.prepareStatement(selectPrenotationById);
			statement.setInt(1, id);
			ResultSet resultSet = statement.executeQuery();
			resultSet.next();
			prenotation = extractPrenotationFromResultSet(resultSet);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return prenotation;
	}

	public boolean terminatePrenotation(int id) {
		try {
			PreparedStatement statement = ConnectionFactory.getConnection().prepareStatement(updatePrenotation);
			statement.setInt(1, 3);
			statement.setInt(2, id);
			int update = statement.executeUpdate();
			if (update > 0)
				return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return false;
	}

	public boolean updatePrenotation(int id) {
		try {
			PreparedStatement statement = connection.prepareStatement(updatePrenotation);
			statement.setInt(1, 2);
			statement.setInt(2, id);
			int update = statement.executeUpdate();
			if (update > 0)
				return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return false;
	}

	// update, if exist, the next user with status "IN CODA" with status "PRONTO"
	// (order by TIMESTAMP)
	public void updateFirstUserInQueuePrenotation(int idSupermarket) {
		int prenotationID = supermarketService.getFirstUserInQueue(idSupermarket);

		if (prenotationID != -1) {
			updatePrenotation(prenotationID);
		}
	}

	public List<Prenotation> getPrenotations(int idUser) {
		ArrayList<Prenotation> prenotationList = new ArrayList<>();
		try {
			PreparedStatement statement = connection.prepareStatement(selectPrenotationByUser);
			statement.setInt(1, idUser);
			ResultSet resultSet = statement.executeQuery();
			while (resultSet.next()) {
				prenotationList.add(extractPrenotationFromResultSet(resultSet));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return prenotationList;
	}

	public int checkIfUserHasPrenotationActive(int idUser) {
		int prenotationActive = 0;
		try {
			PreparedStatement statement = ConnectionFactory.getConnection()
					.prepareStatement(selectPrenotationActiveByUser);
			statement.setInt(1, idUser);
			ResultSet resultSet = statement.executeQuery();
			resultSet.next();
			prenotationActive = resultSet.getInt("PRENOTATION");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return prenotationActive;
	}

	private Prenotation extractPrenotationFromResultSet(ResultSet resultSet) {
		Prenotation prenotation = new Prenotation();
		try {
			prenotation.setID(resultSet.getInt("ID"));
			prenotation.setIdStato(resultSet.getInt("FK_STATO"));
			prenotation.setIdUser(resultSet.getInt("FK_USER"));
			prenotation.setIdSupermarket(resultSet.getInt("FK_SUPERMERCATO"));
			prenotation.setOrarioPrenotazione(resultSet.getLong("OrarioPrenotazione"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return prenotation;
	}
}
