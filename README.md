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


## Directory Structure
terapia-respiro-emocional-app/
├───backend
│   ├───node_modules
│   └───src
│       ├───controllers
│       ├───database
│       └───routes
└───frontend
    ├───.vscode
    └───src
        ├───app
        │   ├───components
        │   │   ├───actualizar-dialog
        │   │   ├───actulizar2-dialog
        │   │   ├───base-datos
        │   │   ├───body
        │   │   ├───calendario-servicios
        │   │   ├───confirmar-eliminar-dialog
        │   │   ├───confirmar-eliminar2-dialog
        │   │   ├───dashboard
        │   │   ├───exit
        │   │   ├───expediente-electronico
        │   │   ├───new-cuidador
        │   │   ├───new-paciente
        │   │   ├───nueva-suplencia-dialog
        │   │   ├───search-cuidador
        │   │   ├───search-paciente
        │   │   └───sidenav
        │   ├───models
        │   └───services
        └───assets
