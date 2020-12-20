package com.provafinaleidsw.app.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.jasypt.util.password.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.provafinaleidsw.app.model.User;
import com.provafinaleidsw.utility.ConnectionFactory;

@Service
public class UserService {

	@Autowired
	Connection connection;

	@Autowired
	PasswordEncryptor encryptor;

	private String selectUserByID = "SELECT * FROM USER WHERE ID = ?";
	private String selectUserByUsername = "SELECT * FROM USER WHERE Username = ?";
	private String insertUser = "INSERT INTO USER (Nome, Cognome, Username, Password) VALUES (?, ?, ?, ?);";

	public int registerUser(String nome, String cognome, String username, String password) {

		int insert = 0;

		if (nome == null || cognome == null || username == null || password == null || nome.isEmpty()
				|| cognome.isEmpty() || username.isEmpty() || password.isEmpty()) {
			return -1;
		}

		try {
			PreparedStatement statement = connection.prepareStatement(insertUser);
			statement.setString(1, nome);
			statement.setString(2, cognome);
			statement.setString(3, username);

			String encryptedPassword = encryptor.encryptPassword(password);

			statement.setString(4, encryptedPassword);

			insert = statement.executeUpdate();
			System.out.println(insert);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return insert;
	}

	public User doLogin(String username, String password) {
		User user = getCustomerByUsername(username);
		if (user == null)
			return null;

		if (encryptor.checkPassword(password, user.getPassword()))
			return user;
		else
			return null;
	}

	public User getCustomerByUsername(String username) {
		User user = null;
		try {
			PreparedStatement statement = ConnectionFactory.getConnection().prepareStatement(selectUserByUsername);
			statement.setString(1, username);
			ResultSet resultSet = statement.executeQuery();
			if (resultSet.next())
				user = extractUserFromResultSet(resultSet);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return user;
	}

	private User extractUserFromResultSet(ResultSet resultSet) {
		User user = new User();
		try {
			user.setID(resultSet.getInt("ID"));
			user.setNome(resultSet.getString("Nome"));
			user.setCognome(resultSet.getString("Cognome"));
			user.setUsername(resultSet.getString("Username"));
			user.setPassword(resultSet.getString("Password"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return user;
	}
}
