package de.iits.elocalculatorbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class EloCalculatorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EloCalculatorBackendApplication.class, args);
	}

}
