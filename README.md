# Consulta de saldo

<details>
<summary>Iniciar FrontEnd</summary>

## Este FrontEnd está realizado en [Astro](https://astro.build) más componentes de [React](https://es.react.dev).

<strong>Para iniciar debemos tener instalado [node v18](https://nodejs.org/download/release/v18.19.0/).</strong>

Instalamos [pnpm](https://pnpm.io/installation#using-npm):
```sh
npm install -g pnpm
```
Entramos por linea de comando a la carpeta client y ejecutamos:

<strong>Para desarrollo:</strong>
```sh
pnpm run dev
```
<strong>Para deploy:</strong>
```sh
pnpm run build
```
</details>

<details>
<summary>Iniciar BackEnd</summary>

## Este BackEnd está realizado en [NodeJS v18](https://nodejs.org/download/release/v18.19.0/) con [ExpressJS](https://expressjs.com/es/).

<strong>Para iniciar debemos tener instalado [node v18](https://nodejs.org/download/release/v18.19.0/).</strong>

Entramos por linea de comando a la carpeta api y ejecutamos:

```sh
node index.js
```

Nota: Se recomienda utilizar [nodemon](https://www.npmjs.com/package/nodemon)
</details>

# FAQ

<dl>
  <dt¿Cómo logra obtener los datos?</dt>
  <dd>Se scrapea la página [saldo-bip](https://www.saldo-bip.com) y se entrega los datos que se obtienen</dd>
    
  <dt¿Por qué tarda en cargar el backend?</dt>
  <dd>La página utilizada para scrapear tarda en traer los datos.</dd>
  
  <dt¿Por qué hay un código alterno en el saldoRoute.js?</dt>
  <dd>Es otra forma de realizar el scrapeo, la segunda forma utiliza [movired](https://movired.cl) el cual no funciona la mayoría de las veces por lo que se deja como opción aparte.</dd>
</dl>
