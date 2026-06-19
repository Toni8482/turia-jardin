export async function loadComponent(selector, file) {
    const idSelector = document.querySelector(selector);
    if(!idSelector){return};
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`No se pudo cargar ${file}`);
    return;
  }

  const html = await response.text();

  document.querySelector(selector).innerHTML = html;
}