# Proyecto-2

## Descripción

**Proyecto-2** es una plataforma web desarrollada con **React** y **TypeScript** que permite gestionar domicilios en moto. Está diseñada para facilitar la interacción entre clientes, repartidores y administradores, optimizando la entrega rápida y eficiente de productos.

La aplicación ofrece una interfaz intuitiva y responsiva que permite a los usuarios realizar pedidos, y a los repartidores gestionar las entregas desde una misma plataforma.

---

## Tecnologías utilizadas

- **React** (Create React App)
- **TypeScript**
- **CSS / SASS**
- **Node.js** y **npm** para la gestión de dependencias y scripts

---

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/Jestebanarenas/proyecto-2.git
```

2. Accede a la carpeta del proyecto:

```bash
cd proyecto-2
```

3. Instala las dependencias:

```bash
npm install
```

---

## Configuración de variables de entorno

Si la aplicación requiere variables de entorno, crea un archivo `.env` en la raíz del proyecto con las siguientes variables (ejemplo):

```env
REACT_APP_API_URL=https://api.tu-dominio.com
REACT_APP_OTRA_VARIABLE=valor
```

Recuerda reiniciar el servidor de desarrollo después de modificar el archivo `.env`.

---

## Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

Luego abre tu navegador y ve a [http://localhost:3000](http://localhost:3000). La aplicación se recargará automáticamente cuando hagas cambios en el código.

---

## Pruebas

Para correr las pruebas automatizadas:

```bash
npm test
```

Esto lanzará el modo interactivo para ejecutar y monitorear pruebas.

---

## Despliegue

Para crear una versión optimizada para producción:

```bash
npm run build
```

El contenido listo para producción se encontrará en la carpeta `build/`. Puedes subir esta carpeta a cualquier servidor estático o servicio de hosting como Netlify, Vercel, Firebase Hosting, etc.

---

## Scripts disponibles

- `npm start`: Inicia la aplicación en modo desarrollo.
- `npm test`: Ejecuta pruebas automatizadas.
- `npm run build`: Construye la aplicación para producción, optimizando los archivos.
- `npm run eject`: (Opcional) Expone la configuración interna de Create React App. Úsalo con precaución.

---

## Estructura del proyecto

- `/public`: Archivos estáticos (HTML, íconos, etc).
- `/src`: Código fuente en TypeScript, incluyendo componentes, estilos y utilidades.
- `.gitignore`: Archivos ignorados por Git.
- `package.json`: Dependencias y scripts.
- `tsconfig.json`: Configuración de TypeScript.
- `README.md`: Documentación del proyecto.

---

## Contribuciones

Las contribuciones son siempre bienvenidas. Puedes:

- Abrir un issue para reportar bugs o proponer mejoras.
- Enviar pull requests con nuevas funcionalidades o correcciones.

Por favor, sigue las buenas prácticas de Git y el estándar de código del proyecto.

---

## Licencia

Este proyecto está licenciado bajo la licencia **MIT**.

---
