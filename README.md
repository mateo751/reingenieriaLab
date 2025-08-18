# POS Parqueamiento — Reingeniería Web (Final)
Stack: React (Vite + TS) + Spring Boot 3 + MySQL 8.3 + Docker Compose

## Arranque limpio
```
docker compose down -v --remove-orphans
docker compose build --no-cache
docker compose up -d
docker compose logs -f mysql
```
- API: http://localhost:8080/api/health  → OK
- Web: http://localhost:5173

## Dev local
Backend: `mvn spring-boot:run`  
Frontend: `npm i && npm run dev`

Notas: Flyway crea tablas mínimas; ampliar entidades según tu SQL original.
