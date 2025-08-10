# Backend
```bash
cd backend
dotnet restore
dotnet build
# Create DB (adjust ConnectionStrings in appsettings.Development.json)
dotnet ef database update -p src/Infrastructure -s src/WebApi
dotnet run --project src/WebApi/WebApi.csproj
# Swagger available at: http://localhost:5021/swagger
```
