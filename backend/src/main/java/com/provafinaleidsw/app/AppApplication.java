package com.provafinaleidsw.app;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.jasypt.util.password.PasswordEncryptor;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan(basePackages = "com.provafinaleidsw.app")
@PropertySource("/application.properties")

@SpringBootApplication
public class AppApplication {

	@Value("${database.path}")
	String path;

	@Value("${database.username}")
	String username;

	@Value("${database.password}")
	String password;

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	public Connection connection() {
		Connection connection = null;
		try {
			connection = DriverManager.getConnection(path, username, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}

	@Bean
	public PasswordEncryptor encryptor() {
		return new StrongPasswordEncryptor();
	}

}
