# Podcaster App

Esta es una aplicación simple que permite a los usuarios escuchar podcasts musicales iTunes. 

Está compuesta de tres vistas principales:

- Vista Principal: Muestra una lista de podcasts musicales.
- Detalles de un Podcast: Muestra los detalles de un podcast seleccionado.
- Detalles de un Capítulo de un Podcast: Muestra los detalles y el reproductor de audio de un capítulo de un podcast seleccionado.

## Tecnologías utilizadas

- [React](https://reactjs.org/): Librería de JavaScript para crear interfaces de usuario.
- [TypeScript](https://www.typescriptlang.org/): Lenguaje de programación que añade tipado estático a JavaScript.
- [React Router](https://reactrouter.com/): Librería de React para la gestión de rutas.
- [Redux Toolkit](https://redux-toolkit.js.org/): Librería oficial de Redux que proporciona un conjunto de herramientas que simplifican la gestión del estado de la aplicación con Redux en un proyecto de React.
- [Jest](https://jestjs.io/): Framework de JavaScript para la creación de tests.

## Uso del servicio CORS Anywhere (**IMPORTANTE**)

Para acceder a recursos externos que no proporcionan JSONP ni cabeceras CORS, se ha utilizado el servicio [CORS Anywhere](https://cors-anywhere.herokuapp.com/). Para habilitar este servicio, primero se debe de **visitar la página web ([CORS Anywhere](https://cors-anywhere.herokuapp.com/)) y activar el servicio**.

***Sin este paso, la aplicación no funcionará correctamente.***

## Instalación las dependencias del proyecto

```
npm install
```

## Ejecución en modo Desarrollo

Para iniciar la aplicación en modo desarrollo, se debe de utilizar el comando: 

```
npm run start
```

Este comando inicia la aplicación en modo desarrollo. Se debe abrir [http://localhost:3000](http://localhost:3000) para verla en el navegador.
El navegador se recargará automáticamente si se realizan cambios en el código fuente.
También se mostrarán errores de linting en la consola.

## Compilación del proyecto para producción

Para compilar el proyecto para producción, se debe de utilizar el comando: 

```
npm run build
```

Este comando compila y optimiza la aplicación para obtener el máximo rendimiento en la carpeta `build`. 
Al ejecutarlo, React se agrupa en el modo de producción, lo que resulta en una versión más eficiente y rápida de la aplicación. 
Además, el código se minimiza para mejorar la velocidad de carga y los nombres de archivo se generan con hashes únicos para mejor gestión del cache.

## Ejecución de los tests

Para ejecutar los tests, se debe de utilizar el comando: 

```
npm run test
```

Este comando lanza los diferentes tests de la aplicación.
En concreto se han creado tests para las tres páginas principales de la aplicación:

- /src/pages/podcastList/PodcastList.test.tsx
- /src/pages/podcastDetail/PodcastDetail.test.tsx
- /src/pages/episodeDetail/EpisodeDetail.test.tsx