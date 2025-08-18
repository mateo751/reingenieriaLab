# Reset completo para Windows PowerShell
docker compose down -v --remove-orphans
docker rmi mysql:8 mysql:8.4 2>$null
docker pull mysql:8.3
docker compose build --no-cache
docker compose up -d
docker compose logs -f api
