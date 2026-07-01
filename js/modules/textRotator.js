export function initTextRotator() {
    const palabras = [
        "Poda de Palmeras",
        "Poda de Arbolado",
        "Endoterapia Vegetal",
        "Cuidado Profesional"
    ];

    const palabra = document.getElementById("typewriter");

    let i = 0;

    palabra.textContent = palabras[0];
    palabra.classList.add("mostrar");

    setInterval(() => {

        palabra.classList.replace("mostrar", "ocultar");

        setTimeout(() => {

            i = (i + 1) % palabras.length;
            palabra.textContent = palabras[i];

            palabra.classList.replace("ocultar", "mostrar");

        }, 400);

    }, 2500);
}