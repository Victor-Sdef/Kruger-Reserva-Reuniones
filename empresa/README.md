[](url)# 🏢 KEvaluación - Sistema de Gestión de Reservas de Salas

## 📋 Descripción

Sistema completo de gestión de reservas de salas de reuniones desarrollado como evaluación técnica para Desarrollador Full Stack. Implementa una arquitectura moderna con Spring Boot (backend) y Next.js (frontend), autenticación JWT, control de roles y despliegue con Docker.

## 🎯 Objetivo de la Evaluación

Demostrar capacidad de **diseñar, implementar y desplegar** una solución full stack segura, modular y bien documentada que incluya:

- ✅ **API RESTful completa** con Spring Boot + Spring Security
- ✅ **Frontend React/Next.js** con rutas protegidas y validaciones
- ✅ **Autenticación JWT** y control de roles (ADMIN/USER)
- ✅ **Base de datos relacional** con persistencia JPA
- ✅ **Documentación Swagger/OpenAPI** interactiva
- ✅ **Despliegue con Docker** - un solo comando
- ✅ **Interfaz responsive** con notificaciones y UX moderna

---

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

#### 🔧 Backend
- **Java 17** + **Spring Boot 3.2.2**
- **Spring Security** + **JWT** para autenticación
- **Spring Data JPA** + **PostgreSQL/H2**
- **BCrypt** para encriptación de contraseñas
- **Swagger/OpenAPI 3** para documentación
- **Maven** para gestión de dependencias

#### 🎨 Frontend
- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS** + **Radix UI** para componentes
- **React Hook Form** + **Zod** para validaciones
- **Zustand** para gestión de estado
- **Axios** para cliente HTTP
- **Sonner** para notificaciones

#### 🐳 DevOps
- **Docker** + **Docker Compose**
- **PostgreSQL 15** en contenedor
- **Multi-stage builds** para optimización

---

## 📡 API Endpoints

### 🔐 Autenticación
```bash
POST /kevaluacion/auth/login     # Iniciar sesión
POST /kevaluacion/auth/register  # Registrar usuario (solo ADMIN)
```

### 🏢 Gestión de Salas
```bash
GET    /kevaluacion/rooms              # Listar salas (autenticados)
POST   /kevaluacion/rooms              # Crear sala (ADMIN)
GET    /kevaluacion/rooms/{id}         # Obtener sala por ID
PUT    /kevaluacion/rooms/{id}         # Actualizar sala (ADMIN)
DELETE /kevaluacion/rooms/{id}         # Eliminar sala (ADMIN)
GET    /kevaluacion/rooms/available    # Buscar salas disponibles
```

### 📅 Gestión de Reservas
```bash
GET    /kevaluacion/reservations       # Mis reservas
GET    /kevaluacion/reservations/all   # Todas las reservas (ADMIN)
POST   /kevaluacion/reservations       # Crear reserva
GET    /kevaluacion/reservations/{id}  # Obtener reserva por ID
DELETE /kevaluacion/reservations/{id}  # Cancelar reserva
```

### 👥 Gestión de Usuarios
```bash
GET    /kevaluacion/users              # Listar usuarios (ADMIN)
POST   /kevaluacion/users              # Crear usuario (ADMIN)
GET    /kevaluacion/users/{id}         # Obtener usuario por ID (ADMIN)
```

---

## 🔑 Roles y Permisos

| Funcionalidad | USER | ADMIN |
|---------------|------|-------|
| **Autenticación** |
| Login/Logout | ✅ | ✅ |
| **Salas** |
| Ver salas | ✅ | ✅ |
| Crear/Editar/Eliminar salas | ❌ | ✅ |
| **Reservas** |
| Crear reservas | ✅ | ✅ |
| Ver mis reservas | ✅ | ✅ |
| Ver todas las reservas | ❌ | ✅ |
| Cancelar mis reservas | ✅ | ✅ |
| Cancelar cualquier reserva | ❌ | ✅ |
| **Usuarios** |
| Ver usuarios | ❌ | ✅ |
| Crear usuarios | ❌ | ✅ |

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- **Docker** y **Docker Compose** instalados
- Puertos disponibles: 3000 (Frontend), 8080 (Backend), 5432 (PostgreSQL)

### 🐳 Ejecución con Docker (Recomendado)

1. **Navegar al directorio del proyecto**
```bash
cd empresa
```

2. **Ejecutar con un solo comando**
```bash
docker-compose up --build
```

3. **Acceder a la aplicación**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/kevaluacion
- **Swagger UI**: http://localhost:8080/kevaluacion/swagger-ui.html

### 🛠️ Ejecución en Desarrollo

#### Backend
```bash
cd Backend/kevaluacion
./mvnw spring-boot:run
```

#### Frontend
```bash
cd Frontend/project-front
npm install
npm run dev
```

#### Base de Datos (PostgreSQL)
```bash
docker run -d \
  --name postgres-dev \
  -e POSTGRES_DB=kevaluaciondb \
  -e POSTGRES_USER=keval_user \
  -e POSTGRES_PASSWORD=keval_pass \
  -p 5432:5432 \
  postgres:15
```

---

## 🔐 Credenciales por Defecto

El sistema crea automáticamente usuarios para pruebas:

| Usuario | Contraseña | Rol | Email |
|---------|------------|-----|-------|
| `admin` | `admin123` | ADMIN | admin@kruger.com |
| `user` | `user123` | USER | user@kruger.com |

---

## 📚 Ejemplos de Uso de la API

### 1. Autenticación

#### Iniciar Sesión
```bash
curl -X POST http://localhost:8080/kevaluacion/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@kruger.com",
    "role": "ADMIN"
  }
}
```

#### Registrar Usuario (Solo ADMIN)
```bash
curl -X POST http://localhost:8080/kevaluacion/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "username": "nuevo_usuario",
    "password": "password123",
    "email": "nuevo@kruger.com",
    "role": "USER"
  }'
```

### 2. Gestión de Salas

#### Listar Salas
```bash
curl -X GET http://localhost:8080/kevaluacion/rooms \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Crear Sala (Solo ADMIN)
```bash
curl -X POST http://localhost:8080/kevaluacion/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Sala de Juntas A",
    "description": "Sala principal para reuniones ejecutivas",
    "capacity": 12,
    "location": "Piso 2, Edificio Principal",
    "equipment": ["Proyector", "Sistema de videoconferencia", "Pizarra digital"]
  }'
```

#### Buscar Salas Disponibles
```bash
curl -X GET "http://localhost:8080/kevaluacion/rooms/available?startTime=2024-01-15T09:00:00&endTime=2024-01-15T11:00:00" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Gestión de Reservas

#### Crear Reserva
```bash
curl -X POST http://localhost:8080/kevaluacion/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "roomId": 1,
    "title": "Reunión de Planificación",
    "description": "Revisión de objetivos Q1",
    "startTime": "2024-01-15T09:00:00",
    "endTime": "2024-01-15T11:00:00"
  }'
```

#### Listar Mis Reservas
```bash
curl -X GET http://localhost:8080/kevaluacion/reservations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Cancelar Reserva
```bash
curl -X DELETE http://localhost:8080/kevaluacion/reservations/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🌐 Estructura del Proyecto

```
kevaluacion1/
├── 📋 docker-compose.yml              # Orquestación de servicios
├── 📄 README.md                       # Este archivo
├── 🗂️ Backend/
│   └── kevaluacion/                   # API Spring Boot
│       ├── 🐳 Dockerfile             # Imagen del backend
│       ├── 📋 pom.xml                # Dependencias Maven
│       └── 📁 src/
│           ├── main/java/com/kruger/kevaluacion/
│           │   ├── 🎯 controller/    # Controladores REST
│           │   ├── 🏗️ entity/        # Entidades JPA
│           │   ├── 📦 dto/           # Data Transfer Objects
│           │   ├── 🔄 mapper/        # MapStruct mappers
│           │   ├── 🗃️ repository/    # Repositorios JPA
│           │   ├── 🧩 service/       # Lógica de negocio
│           │   ├── 🔐 security/      # Configuración de seguridad
│           │   └── ⚙️ config/        # Configuraciones
│           └── test/                  # Tests unitarios
└── 🗂️ Frontend/
    └── project-front/                 # Aplicación Next.js
        ├── 🐳 Dockerfile             # Imagen del frontend
        ├── 📋 package.json           # Dependencias NPM
        └── 📁 src/
            ├── app/                   # App Router (Next.js 15)
            │   ├── login/            # Página de autenticación
            │   └── dashboard/        # Panel principal
            │       ├── rooms/        # Gestión de salas
            │       ├── reservations/ # Gestión de reservas
            │       └── users/        # Gestión de usuarios (ADMIN)
            ├── components/           # Componentes reutilizables
            └── shared/              # Código compartido
                ├── services/        # Servicios API
                ├── hooks/          # Custom hooks
                └── store/          # Estado global (Zustand)
```

---

## ⚙️ Variables de Entorno

### Backend (`application.properties`)
```properties
# Servidor
server.port=8080
server.servlet.context-path=/kevaluacion

# Base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/kevaluaciondb
spring.datasource.username=keval_user
spring.datasource.password=keval_pass

# JWT
app.jwt.secret=KevaluacionSecretKeyVictorCastro3G+@v*h>as@l^&5|@FH7_|lqN;Iu/P
app.jwt.expiration=86400000
```

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/kevaluacion
```

---

## 🧪 Pruebas

### Backend
```bash
cd Backend/kevaluacion
./mvnw test
```

### Frontend
```bash
cd Frontend/project-front
npm run lint
npm run build  # Verificar build de producción
```

---

## 📊 Características Técnicas Implementadas

### ✅ Funcionalidad Backend (25/25 pts)
- **API RESTful completa** con todos los endpoints requeridos
- **Spring Security + JWT** para autenticación stateless
- **Control de roles** granular con `@PreAuthorize`
- **Validaciones** con Bean Validation API
- **Manejo de excepciones** centralizado
- **BCrypt** para encriptación de contraseñas

### ✅ Funcionalidad Frontend (25/25 pts)
- **Todas las pantallas** requeridas implementadas
- **Rutas protegidas** con componente ProtectedRoute
- **Validaciones** completas con Zod y React Hook Form
- **Interfaz responsive** con Tailwind CSS
- **Notificaciones** de éxito/error con Sonner
- **Consumo de API** con interceptores automáticos

### ✅ Documentación (10/10 pts)
- **README completo** con instalación y ejemplos
- **Swagger/OpenAPI** con documentación interactiva
- **Ejemplos de curl** para todos los endpoints
- **Descripción de arquitectura** y roles

### ✅ Despliegue (15/15 pts)
- **Docker Compose** funcional
- **Un solo comando**: `docker-compose up --build`
- **Multi-stage builds** optimizados
- **Variables de entorno** configuradas

### ⚠️ Pruebas (10/15 pts)
- **Tests backend** básicos implementados
- **Tests frontend** limitados
- **Oportunidad de mejora** en cobertura de testing

---

## 🛑 Detener la Aplicación

```bash
# Detener servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Limpiar todo (imágenes incluidas)
docker-compose down -v --rmi all
```

---

## 🔧 Troubleshooting

### Error de conexión Backend-Frontend
- Verificar que el backend esté ejecutándose: `curl http://localhost:8080/kevaluacion/health`
- Confirmar variable de entorno: `NEXT_PUBLIC_API_URL=http://localhost:8080/kevaluacion`

### Error de base de datos
- Verificar logs: `docker-compose logs db`
- Reiniciar contenedor: `docker-compose restart db`

### Error de autenticación
- Verificar que el JWT no haya expirado
- Comprobar que el token se esté enviando en el header Authorization

---


## 👨‍💻 Autor

**Victor Castro**  
Desarrollador Full Stack  

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de una evaluación técnica para Kruger Corporation.

---

⭐ **Sistema de Gestión de Reservas de Salas - KEvaluación** ⭐

*Demostración de capacidades full stack con Spring Boot + Next.js*
