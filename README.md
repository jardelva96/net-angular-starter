# NetAngularStarter

A **fullstack boilerplate** built with **.NET 9 + Angular 17** to speed up the initial phase of new applications.  
It comes with **ready-to-use API**, **Entity Framework Core**, **JWT Authentication**, **Swagger**, clean architecture layers, and a **plug-and-play Angular frontend**.

> Goal: Provide a professional boilerplate so you can clone, run, and focus on business logic from day one.

## Tech Stack

- **Backend**: .NET 9, ASP.NET Core, EF Core (SQL Server), Identity + JWT, Swagger
- **Frontend**: Angular 17+, RxJS, JWT Interceptor, Guards
- **DevOps (optional)**: Docker (SQL Server container)

## Project Structure
```bash
/backend
│
├── src
│   ├── Domain
│   │   ├── Entities/                 # Core business entities
│   │   ├── ValueObjects/              # Immutable business value objects
│   │   └── Enums/                     # Enumerations
│   │
│   ├── Application
│   │   ├── Interfaces/                # Abstractions (repositories, services)
│   │   ├── DTOs/                       # Data transfer objects
│   │   ├── Features/                   # Use cases (CQRS - commands/queries)
│   │   └── Common/                     # Helpers, constants, exceptions
│   │
│   ├── Infrastructure
│   │   ├── Persistence/                # EF Core DbContext, Migrations
│   │   ├── Identity/                    # ASP.NET Core Identity setup
│   │   ├── Repositories/                # EF Core repository implementations
│   │   ├── Configurations/              # EF Core entity configs (Fluent API)
│   │   └── Services/                    # Infrastructure-level services
│   │
│   └── WebApi
│       ├── Controllers/                 # API endpoints
│       ├── Middlewares/                  # Custom middleware
│       ├── Extensions/                   # Service registration extensions
│       ├── Filters/                       # API filters (validation, exceptions)
│       ├── Program.cs
│       └── appsettings*.json
│
├── tests
│   ├── UnitTests/                        # Unit test projects
│   └── IntegrationTests/                 # API/integration tests
│
└── README.md
```
## Getting Started

Frontend

cd frontend
npm install
npm start
# Open http://localhost:4200

Security Notes (Development)
Store sensitive values like Jwt:Key using User Secrets:
dotnet user-secrets set "Jwt:Key" "<min. 32 chars>" -p backend/src/WebApi

Never commit secrets to the repository.


# Backend (.NET 9)

REST API built with ASP.NET Core, **Entity Framework Core**, **Identity + JWT**, and **Swagger**, following a layered architecture (Domain / Application / Infrastructure / WebApi).

## Technologies
- ASP.NET Core 9 (Web API)
- EF Core 9 (SqlServer, Migrations, Design/Tools)
- Identity + **JWT** (roles, UserManager/SignIn)
- Swagger (Swashbuckle) with **Authorize** support
- Docker (SQL Server) — optional

## Structure
```bash
/frontend
│
├── src
│   ├── app
│   │   ├── core/                        # Singleton services (auth, interceptors)
│   │   │   ├── interceptors/             # HTTP interceptors (JWT, error handling)
│   │   │   ├── guards/                   # Route guards
│   │   │   └── services/                 # Shared services
│   │   │
│   │   ├── features/                     # Feature modules (e.g., projects, auth)
│   │   │   ├── auth/                      # Login, registration
│   │   │   └── projects/                  # CRUD pages
│   │   │
│   │   ├── shared/                        # Shared UI components, pipes, directives
│   │   ├── layouts/                       # Application layouts
│   │   ├── app-routing.module.ts          # Main routes
│   │   └── app.component.*                # Root component
│   │
│   ├── assets/                            # Images, styles, translations
│   ├── environments/                      # environment.ts / environment.prod.ts
│   └── styles.scss
│
├── angular.json
├── package.json
└── README.md
```

## Configuration
```bash
**ConnectionStrings** (local dev, SQLEXPRESS):
```json
"ConnectionStrings": {
  "Default": "Server=DESKTOP-XXXXX\\SQLEXPRESS;Database=MyDatabase;Trusted_Connection=True;TrustServerCertificate=True;"
}
JWT (store with User Secrets in dev):
```
```bash
"Jwt": {
  "Key": "super_secret_dev_key_at_least_32_chars_long_!!!",
  "Issuer": "NetAngularStarter",
  "Audience": "NetAngularStarter",
  "AccessTokenMinutes": 15,
  "RefreshTokenDays": 7
}
```
###Commands
```bash

# Restore & build
dotnet restore
dotnet build
```
# Migrations (DbContext is in Infrastructure)
```bash

dotnet ef migrations add Initial -p src/Infrastructure -s src/WebApi
dotnet ef database update -p src/Infrastructure -s src/WebApi
```
# Run
```bash

dotnet run --project src/WebApi/WebApi.csproj
# Swagger: http://localhost:5021/swagger
```
Main Endpoints
```bash

POST /api/auth/register – register user & return JWT
POST /api/auth/login – authenticate & return JWT
GET /api/projects – list projects (public or protected)
POST /api/projects – create project (protected)
```
Use the Authorize button in Swagger to paste your JWT token.


# Frontend (Angular)

Angular frontend consuming the backend API, with **login/registration**, **JWT interceptor**, **guards**, and a simple **Projects CRUD**.

## Technologies
- Angular 17+
- RxJS
- Angular Router (guards)
- HttpClient + Interceptor (JWT)

## Running
```bash
npm install
npm start
# http://localhost:4200
```
Configuration
Edit src/environments/environment.ts:

```bash
export const environment = {
  apiBaseUrl: 'http://localhost:5021'
};
```

###Features
Login / Registration pages
Stores JWT in localStorage
Interceptor adds Authorization: Bearer <token> to requests
Guard protects private routes
Simple CRUD for Projects

---

## 5) Push to GitHub
1. Create a repository (e.g., `net-angular-starter`) on GitHub.
2. In your local project root (where `backend/` and `frontend/` are):

```bash
git init
git add .
git commit -m "chore: initial fullstack boilerplate (.NET 9 + Angular 17)"
git branch -M main
git remote add origin https://github.com/<your-username>/net-angular-starter.git
git push -u origin main
```
