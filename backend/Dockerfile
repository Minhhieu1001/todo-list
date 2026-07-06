# Stage 1: Build ứng dụng
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper và pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Cấp quyền thực thi cho file mvnw (rất quan trọng khi code từ Windows đẩy lên)
RUN chmod +x mvnw

# Tải trước các thư viện (để tận dụng Docker cache)
RUN ./mvnw dependency:go-offline

# Copy toàn bộ source code và tiến hành build (bỏ qua test)
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Chạy ứng dụng (dùng môi trường JRE nhẹ hơn)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy file .jar đã build từ Stage 1 sang Stage 2
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port mặc định của Spring Boot
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
