# Etapa 1: Construcción
FROM eclipse-temurin:17-jdk-alpine as build

WORKDIR /root

# Copiar archivos necesarios para resolver las dependencias
COPY ./pom.xml /root
COPY ./.mvn /root/.mvn
COPY ./mvnw /root

RUN dos2unix mvnw
# Descargar las dependencias
RUN ./mvnw dependency:go-offline

# Copiar el código fuente
COPY ./src /root/src

# Construir la aplicación (No saltar los test unitarios)
RUN ./mvnw clean install -DskipTests

# Etapa 2: Imagen final
FROM eclipse-temurin:17-jre-alpine

WORKDIR /root

# Exponer el puerto
EXPOSE 8080

# Copiar el JAR generado desde la etapa de construcción
COPY --from=build /root/target/*.jar /root/app.jar

# Levantar la aplicación
ENTRYPOINT ["java", "-jar", "/root/app.jar"]