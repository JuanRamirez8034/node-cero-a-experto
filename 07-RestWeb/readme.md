# Ejecplos de como utilizar http en sus diferentes veriones

## Instalar OpenSSL 
Se debe ejecutar el siguiente comando e ir colocando los datos respectivos:
```cmd
    openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```
<br>

El caso anterior funciona de una vez con **MAC y LINUX**, en caso de **WINDOWNS** se debe previamente agregar al path de variables de entorno la ubicacion del ejecutable del openSSL que se instala con la intalacion de GIT. La ruta a la carpeta es la siguiente:
> "C:\Program Files\Git\usr\bin"
<br>
Esta ruta puede cambiar segun tu maquina. 🙂

Esta varibale de entorno se debe agregar a las variables de **path**, posteior a esto ya debe poder ejecutar el comando mencionado al principio

> ***Nota*** Los certificados generados deben guardarse en la carpeta *keys* en la raiz del proyecto, si no existe crearla