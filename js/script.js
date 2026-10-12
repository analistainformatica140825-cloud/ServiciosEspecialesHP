document.addEventListener("DOMContentLoaded", () => {
  const botonMenu = document.getElementById("boton-menu");
  const menu = document.getElementById("menu");
  const encabezado = document.getElementById("encabezado");
  const formulario = document.getElementById("formulario-contacto");
  const mensajeFormulario = document.getElementById("mensaje-formulario");
  const lightbox = document.getElementById("lightbox");
  const lightboxImagen = document.getElementById("lightbox-imagen");
  const cerrarLightbox = document.getElementById("cerrar-lightbox");
  const anio = document.getElementById("anio");

  const whatsappNumber = "5212298519063";

  if (anio) anio.textContent = new Date().getFullYear();

  // Menú móvil
  botonMenu?.addEventListener("click", () => {
    menu.classList.toggle("activo");
    botonMenu.setAttribute("aria-expanded", menu.classList.contains("activo"));
  });

  document.querySelectorAll(".menu a").forEach((enlace) => {
    enlace.addEventListener("click", () => menu.classList.remove("activo"));
  });

  // Encabezado al hacer scroll
  window.addEventListener("scroll", () => {
    encabezado.classList.toggle("encabezado-scroll", window.scrollY > 30);
  }, { passive: true });

  // Animaciones al entrar en pantalla
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".revelar").forEach((elemento) => observador.observe(elemento));

  // Galería / lightbox
  document.querySelectorAll(".galeria-item").forEach((item) => {
    item.addEventListener("click", () => {
      const imagen = item.dataset.imagen;
      if (!imagen) return;
      lightboxImagen.src = imagen;
      lightbox.classList.add("activo");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("sin-scroll");
    });
  });

  const cerrarGaleria = () => {
    lightbox.classList.remove("activo");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("sin-scroll");
  };

  cerrarLightbox?.addEventListener("click", cerrarGaleria);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrarGaleria();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarGaleria();
  });

  // Formulario -> WhatsApp
  formulario?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !telefono || !servicio || !mensaje) {
      mensajeFormulario.textContent = "Completa todos los campos para continuar.";
      mensajeFormulario.className = "mensaje-formulario error";
      return;
    }

    const texto =
      `Hola, me gustaría solicitar información sobre un servicio de hojalatería y pintura.%0A%0A` +
      `Nombre: ${encodeURIComponent(nombre)}%0A` +
      `Teléfono: ${encodeURIComponent(telefono)}%0A` +
      `Servicio: ${encodeURIComponent(servicio)}%0A` +
      `Detalle: ${encodeURIComponent(mensaje)}`;

    mensajeFormulario.textContent = "Abriendo WhatsApp para enviar tu solicitud...";
    mensajeFormulario.className = "mensaje-formulario exito";

    window.open(`https://wa.me/${whatsappNumber}?text=${texto}`, "_blank");
  });
});
