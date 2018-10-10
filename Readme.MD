# Weather App

Este es un pequeño ejercicio en NodeJS usando

https://maps.googleapis.com/maps/api/geocode/json y 
https://www.npmjs.com/package/request


# Creando el proyecto

> npm init 

y presionar en todo enter para que se queden las opciones predeterminadas. Al final seleccionar yes.
Despues:

> npm install request@2.73.0 --save

en caso de encontrar vulnerabilidades, correr

> npm audit fix

# Como usar la app

Teclear en consola algo como:

> node app.js  -a "1301 Lombard street"

o el zip code

> node app.js  -a 92231

## Configurando area de trabajo de vs code 

`Ctrl + , `   , después Caracteristicas > Depurar > Editar en setting.json  y poner lo siguiente

`{
    "jshint.options": {"esversion": 6}
 }`