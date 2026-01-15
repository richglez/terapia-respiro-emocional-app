# Terapia Respiro Emocional – CRUD APP 🖥️
This is my first modern Full Stack CRUD project using Angular for the frontend, Node.js and Express for the backend, and MySQL as the relational database. It implements CRUD operations through a REST API, following best development practices.

## 🚀 Features / Funcionalidades
This application allows users to manage patients and organizational information efficiently.

✔️The app can do:

- CRUD Operations for Patients
  - Create new patient records within the organization
  - View patient information
  - Update patient data
  - Delete patients from the database
 
- Dashboard / Overview
  - Initial dashboard view with relevant organizational activity
  - Quick access to important information and events related to the organization

- Data Management
  - Centralized patient information storage
  - Secure interaction with a MySQL database through RESTful services


## 👤 User Actions / Acciones del Usuario

The user can:

- Register (add) new patients within the organization
- View a general dashboard with organizational updates and activities
- Edit patient information
- Remove patients from the system database
- Manage patient records in an organized and efficient way



## 🛠 Technologies Used
- Frontend: Angular
- Backend: Node.js, Express
- Database: MySQL
- API: RESTful API
- Architecture: Client–Server


## 📂 Project Structure

### Backend
Contains the REST API built with Node.js and Express.

### Frontend
Angular application that consumes the REST API.

### Database
MySQL schema and initial scripts.

```bash
📦 terapia-respiro-emocional
├── 📁 backend
│   ├── 📁 controllers
│   ├── 📁 routes
│   ├── 📁 models
│   ├── 📁 config
│   ├── app.js
│   └── package.json
│
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 app
│   │   │   ├── 📁 components
│   │   │   ├── 📁 services
│   │   │   ├── 📁 pages
│   │   │   └── app.module.ts
│   │   └── environments
│   ├── angular.json
│   └── package.json
│
├── 📁 database
│   └── schema.sql



```
## 🛠 Scripts 

| Script | Description  |
|-----------|-------------|
| npm run dev   | Start development server |
| npm init  | Initialize the project within the editor |

