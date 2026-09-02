export function initContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const check = document.getElementById('privacyCheck');

    // Comprobar campos vacíos
    if (!name) {
      alert("Rellena el nombre");
      return;
    }

    if (!email) {
      alert("Rellena el email");
      return;
    }
    // Comprobar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Introduce un email válido");
      return;
    }


    if (!phone) {
      alert("Rellena el teléfono");
      return;
    }



    const phoneClean = phone.replace(/[\s-]/g, '');

    const phoneRegex = /^(?:\+34)?[6789]\d{8}$/;

    if (!phoneRegex.test(phoneClean)) {
      alert("Introduce un número de teléfono válido");
      return;
    }


    if (!subject) {
      alert("Rellena el asunto");
      return;
    }

    if (!message) {
      alert("Rellena el mensaje");
      return;
    }


    if (!check.checked) {
      alert("Debes aceptar la Política de Privacidad y el Aviso Legal");
      return;
    }


    const data = {
      name,
      email,
      phone,
      subject,
      message
    };

    try {
      const res = await fetch("https://my-first-worker.turia-jardin.workers.dev/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.text();
      console.log(result);

      alert("Mensaje enviado ✔");

      form.reset();

    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar ❌");
    }
  });
}








