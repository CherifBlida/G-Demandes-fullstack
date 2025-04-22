# G-Demandes-fullstack

A full-stack web application for managing internal demand tickets. The application provides a user-friendly interface to create, read, update, and delete demands, with filtering and pagination, built using Spring Boot (backend) and Angular (frontend).

## Features

### Backend (Spring Boot)
- REST API with full CRUD operations for demands.
- JPA integration with MYSQL database.
- Filtering by title and status, with pagination support.
- Input validation using `@NotNull`, `@Email`, and `@Size` annotations.
- Automatic creation of `Demandeur` entities for new email addresses.

### Frontend (Angular)
- Demand list with filters (title, status) and pagination.
- Reactive forms for creating and editing demands.
- User-friendly interface with Angular Material components.
- API communication via `HttpClient` with robust error handling.
- French-language UI for localized experience.

### Bonus Features
- Responsive design with Angular Material.
- Disabled `demandeurEmail` field in edit mode to maintain data integrity.
- Clear error messages for validation and API failures.
- Clean project structure with a single Git repository.

## Technologies

- **Backend**: Java 17, Spring Boot 3.2.x, Spring Data JPA, MYSQL Database, Maven
- **Frontend**: Angular 19, Angular Material, TypeScript, RxJS
- **Tools**: Git, GitHub, Windows Command Prompt

## Prerequisites

- Java 17 or higher
- Node.js 20.x or higher
- npm 10.x or higher
- Maven 3.8.x or higher
- Web browser (e.g., Chrome, Firefox)

## Setup and Running

### 1. Clone the Repository

git clone https://github.com/CherifBlida/G-Demandes-fullstack.git
cd G-Demandes-fullstack
update the properties file with you own database credentials and serverport is 8080 change it if it's already in use
navigate to the backend directory cd ..\G-Demandes-fullstack\G-Demandes
mvn clean compile package
mvn spring-boot:run

and for frontend 
cd..
cd G-DemandesUI
ng serve
you access the UI and the whole app at localhost:4200
