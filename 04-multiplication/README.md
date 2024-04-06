# Aplicacion de consola para generar tabla de multiplicar

### Comandos

```js
    "dev": "ts-node src/app.ts", // ejecutar proyecto en desarrollo
    "dev:watch": "nodemon -b 7", // ejecutar proyecto en desarrollo observando los cambios
    "build": "rimraf ./dist && tsc", // construir el proyecto a produccion
    "start": "npm run build && node dist/app.js" // ejecutar proyecto en produccion
```


### Arguments values esperados
- **--base (-b)** Base o nunero base de la tabla de multiplicar
- **--limit (-l)** Limite o nunero limite de la tabla de multiplicar
- **--show (-s)** Valor boolean para imprimir la tabla por consola
- **--name (-n)** *(Opcional)* Nombre para el archivo final donde se guardara la tabla
- **--destination (-d)** *(Opcional)* Directorio donde se guardara el archivo final

```cmd
    // En modo desarrollo
    nodemon --b 1 --s --l 20 --d test --n test 

    // Una vez construido el proyecto
    node dist/app --b 1 --s --l 20 --d test --n test 
```


