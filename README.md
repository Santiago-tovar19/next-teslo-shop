# Descripcion

## Correr en dev

1. clonar el repositorio
2. crear una copia del archivo .env.template y renombrarlo a .env y cambiar las variables de entorno
3. instalar dependencias con `npm install`
4. Levantar la base de datos con `docker-compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar el seed con `npm run seed`
7. Limpiar el local storage del navegador
8. correr el proyecto con `npm start`

## Correr en prod
