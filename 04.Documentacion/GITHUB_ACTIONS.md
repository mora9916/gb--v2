# Guía de Introducción a GitHub Actions y CI/CD

**Documentación oficial**: https://docs.github.com/es/actions

---

## ¿Qué es GitHub Actions? 

Imagina que tienes un **robot asistente** muy obediente que vive dentro de tu repositorio de GitHub. Este robot puede hacer tareas aburridas y repetitivas por ti, como:

1. Revisar si tu código tiene errores.
2. Ejecutar tus pruebas (tests).
3. Avisarte si rompiste algo.
4. Publicar tu aplicación en internet.

Eso es **GitHub Actions**: una herramienta que nos permite automatizar tareas de desarrollo de software directamente en GitHub.

---

## ¿Cómo funciona? (La Analogía de la Receta) 

Para que el robot sepa qué hacer, necesitas darle una "receta". En el mundo de GitHub Actions, esta receta es un archivo de texto (con extensión `.yml`) que guardamos en una carpeta especial llamada `.github/workflows`.

### Los 3 Conceptos Clave

1. **El Disparador (Event)** 
   Es la señal que despierta al robot.
   *   *Ejemplo:* "Robot, despierta cada vez que yo haga un `push` (suba código) a la rama `main`".

2. **El Trabajo (Job)** 
   Es la misión principal que debe cumplir.
   *   *Ejemplo:* "Tu misión es probar que la página web funciona".

3. **Los Pasos (Steps)** 
   Son las instrucciones paso a paso para cumplir la misión.
   *   *Ejemplo:*
       1. Descarga el código.
       2. Instala Node.js.
       3. Instala las librerías (`npm install`).
       4. Ejecuta las pruebas (`npm test`).

---

## Anatomía de un Archivo de Actions

Veamos el archivo que creamos para tu proyecto, traducido a lenguaje humano:

```yaml
name: CI Ecommerce App  # Nombre del robot

on:                     # EL DISPARADOR
  push:                 # "Despierta cuando alguien empuje código..."
    branches: [ main ]  # "...a la rama main"

jobs:                   # LAS MISIONES
  test-frontend:        # Misión 1: Probar el Frontend
    runs-on: ubuntu-latest  # "Usa una computadora con Linux (Ubuntu)"
    
    steps:              # LOS PASOS
      - name: Descargar código
        uses: actions/checkout@v4  # "Toma mi código del repositorio"

      - name: Instalar Node
        uses: actions/setup-node@v4 # "Prepara el entorno de Node.js"

      - name: Instalar dependencias
        run: npm ci     # "Instala lo que necesita el proyecto"

      - name: Correr pruebas
        run: npm test   # "Ejecuta los tests y dime si pasan"
```

---

## ¿Qué es CI/CD? infinity

Seguramente escucharás estas siglas todo el tiempo. Aquí te explicamos qué significan de forma sencilla:

### CI (Continuous Integration - Integración Continua)
Es la práctica de **probar tu código frecuentemente**.
Imagina que escribes un libro. CI sería como tener un corrector ortográfico automático que revisa cada párrafo apenas lo terminas de escribir. Si cometes un error, te avisa al instante para que lo corrijas antes de seguir.

*   **En tu proyecto:** Cada vez que subes código, GitHub Actions corre `npm test`. Si falla, te pone una  roja. Si pasa, te pone un verde.

### CD (Continuous Deployment - Despliegue Continuo)
Es la práctica de **publicar tu código automáticamente**.
Siguiendo el ejemplo del libro: una vez que el corrector ortográfico dice que todo está bien, el libro se imprime y se envía a las librerías automáticamente, sin que tú tengas que llevarlo en cajas.

*   **En tu proyecto:** Si todos los tests pasan, GitHub Actions podría tomar tu código y subirlo a un servidor para que el mundo lo vea.

---

## ¿Cuándo nos es útil?

### 1. Para evitar el "En mi máquina funciona"
A veces el código funciona en tu computadora pero falla en la de tu compañero. GitHub Actions corre las pruebas en una "computadora limpia" (un servidor nuevo cada vez). Si funciona ahí, funciona en todos lados.

### 2. Para dormir tranquilo
Si trabajas en equipo, alguien podría subir código que rompa el login o el carrito de compras sin darse cuenta. GitHub Actions actúa como un guardián: si el código nuevo rompe algo viejo, el sistema avisa y bloquea el cambio.

### 3. Para ahorrar tiempo
En lugar de ejecutar manualmente `npm install`, `npm test`, `npm run build` cada vez que haces un cambio, el robot lo hace por ti en segundo plano mientras tú sigues programando.

