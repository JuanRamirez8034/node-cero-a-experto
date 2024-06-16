# Pasos para correr proyecto forma local (desarrollo)

1. Clonar repositorio
2. Instalar modulos de node
2.1. Crear el archivo de variables de entorno respectivo con las configuracion mostrada en el [.env.template](.env.template)
3. Levantar bases de datos con el comando:
```shell
    npm run docker:up
```
4. Migrar bases de datos con prisma:
```shell
    npm run prisma:migrate
```
5. Correr el proyecto con el coando
```shell
    npm run dev
```
> Nota: Los pasos 4 y 5 se pueden resumir ejecutando el comando ***npm run devup***

### Pasos comandos
1. Correr en modo desarrollo comprobando errores de lintado:
```shell 
    npm run dev:analize
```
2. Migrar base de datos a produccion con prisma
```shell
    npm run prisma:migrate:prod
```