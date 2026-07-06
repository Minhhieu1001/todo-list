package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:mariadb://localhost:3306/todo_list?connectTimeout=1000&socketTimeout=1000",
        "spring.jpa.hibernate.ddl-auto=none",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect",
        "spring.datasource.hikari.initialization-fail-timeout=0",
        "spring.datasource.hikari.connection-timeout=1000"
})
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

}
