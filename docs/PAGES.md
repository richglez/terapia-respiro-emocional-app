# Listado de Paginas - TerapiaRespiroEmocional

Sistema de gestión para pacientes, cuidadores y suplencias enfocado en terapia de respiro emocional.

---

## 📌 Listado de Páginas

| Ruta | Descripción          |
| ---- | -------------------- |
| `/`  | Homepage / Dashboard |

---

## 🔌 API – Endpoints Disponibles

### 🔎 Base de Datos

| Método | Ruta                          | Descripción                                 |
| ------ | ----------------------------- | ------------------------------------------- |
| GET    | `/data-base/searchInDataBase` | Buscar información en toda la base de datos |

---

### 👤 Pacientes

| Método | Ruta                                 | Descripción                               |
| ------ | ------------------------------------ | ----------------------------------------- |
| GET    | `/pacientes`                         | Obtener listado de pacientes              |
| GET    | `/pacientes/:id`                     | Obtener paciente por ID                   |
| GET    | `/pacientes/search`                  | Buscar fichas de pacientes                |
| GET    | `/pacientes/filter`                  | Filtrar pacientes                         |
| GET    | `/pacientes/total-pacientes`         | Total de pacientes                        |
| GET    | `/pacientes/total-pacientes-menores` | Total de pacientes menores                |
| GET    | `/pacientes/total-pacientes-mayores` | Total de pacientes mayores                |
| GET    | `/pacientes/total-programas-cecpam`  | Total de pacientes en programas CECPAM    |
| GET    | `/pacientes/expedientes`             | Obtener expedientes de pacientes          |
| GET    | `/pacientes/cuidador/:id`            | Obtener pacientes asociados a un cuidador |
| POST   | `/pacientes`                         | Crear nuevo paciente                      |
| PUT    | `/pacientes/:id`                     | Actualizar paciente                       |
| DELETE | `/pacientes/:id`                     | Eliminar paciente                         |

---

### 🧑‍⚕️ Cuidadores

| Método | Ruta                           | Descripción                           |
| ------ | ------------------------------ | ------------------------------------- |
| GET    | `/cuidadores`                  | Obtener listado de cuidadores         |
| GET    | `/cuidadores/:id`              | Obtener cuidador por ID               |
| GET    | `/cuidadores/total-cuidadores` | Total de cuidadores                   |
| GET    | `/cuidadores/search`           | Búsqueda de cuidadores (autocomplete) |
| GET    | `/cuidadores/filter`           | Filtrar cuidadores                    |
| POST   | `/cuidadores`                  | Crear nuevo cuidador                  |
| PUT    | `/cuidadores/:id`              | Actualizar cuidador                   |
| DELETE | `/cuidadores/:id`              | Eliminar cuidador                     |

---

### 🔁 Suplencias

| Método | Ruta                           | Descripción                               |
| ------ | ------------------------------ | ----------------------------------------- |
| GET    | `/suplencias`                  | Obtener listado de suplencias             |
| GET    | `/suplencias/buscar`           | Buscar suplencias por cuidador y paciente |
| GET    | `/suplencias/filter`           | Filtrar suplencias                        |
| GET    | `/suplencias/total-suplencias` | Total de suplencias                       |
| GET    | `/suplencias/proximas`         | Obtener próximas suplencias               |
| POST   | `/suplencias`                  | Crear nueva suplencia                     |
| PUT    | `/suplencias/:id`              | Actualizar suplencia                      |
| DELETE | `/suplencias/:id`              | Eliminar suplencia                        |

---

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- Arquitectura MVC
- Base de datos relacional / no relacional (según implementación)

---

## 🚀 Instalación y Ejecución (ejemplo)

```bash
npm install
npm run dev
