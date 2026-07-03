/* ==========================================
   Página: Parámetros de diseño
   Depende de: data/datos.json
   Uso: Información básica del proyecto, materiales y contacto
========================================== */
let DATA = {};

function configurarSideMenu() {

  const config = DATA.info.configuracion || {};

  if (!config.columnas)
      document.getElementById("sideColumnas")?.remove();

  if (!config.muros)
      document.getElementById("sideMuros")?.remove();

  if (!config.vigas)
      document.getElementById("sideVigas")?.remove();

  if (!config.vigasAcople)
      document.getElementById("sideVigasAcople")?.remove();

  if (!config.losas)
      document.getElementById("sideLosas")?.remove();

  if (!config.noes)
      document.getElementById("sideNoes")?.remove();

  if (!config.contencion)
      document.getElementById("sideContencion")?.remove();

  if (!config.pilotes)
      document.getElementById("sidePilotes")?.remove();

  if (!config.vigasCimentacion)
      document.getElementById("sideVigasCim")?.remove();

  if (!config.losaCimentacion)
      document.getElementById("sideLosaCim")?.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/datos.json")
    .then(res => res.json())
    .then(data => {
      DATA = data;

      cargarTitulos(data);
      cargarParametros(data.parametros);
      cargarMateriales(data.materiales);
      configurarWhatsapp(data.info);
      configurarCorreo(data.info);
      configurarCorreo2(data.info);
      cargarCliente(data.info); 
      configurarSideMenu();
    })
    .catch(err => console.error("Error cargando datos:", err));
});

function cargarTitulos(data) {
  const tituloProyecto = document.getElementById("tituloProyecto");
  if (tituloProyecto) {
    tituloProyecto.textContent = data.info.proyecto || "";
  }
}

function cargarParametros(parametros) {
  const tbody = document.querySelector("#tablaParametros tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  parametros.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.caracteristica}</td>
      <td>${p.valor}</td>
    `;
    tbody.appendChild(tr);
  });
}

function cargarCliente(info) {
  const tbody = document.querySelector("#tablaCliente tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const datosCliente = [
    { label: "Aliado", valor: info.aliado },
    { label: "Firma Arquitectura", valor: info.firmaArquitectura },
    { label: "Ingeniero de suelos", valor: info.ingenieroSuelos },
    { label: "Gerente del proyecto", valor: info.gerenteProyecto },
    { label: "Director del proyecto", valor: info.directorProyecto },
    { label: "Control documental", valor: info.controlDocumental },
    { label: "Avance Modelación BIM", valor: info.avanceBIM }
  ];

  datosCliente.forEach(d => {
    if (!d.valor) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.label}</td>
      <td>${d.valor}</td>
    `;
    tbody.appendChild(tr);
  });
}

function cargarMateriales(materiales) {
  const tbody = document.querySelector("#tablaMateriales tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  materiales.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.material}</td>
      <td>${m.resistencia} kg/cm²</td>
    `;
    tbody.appendChild(tr);
  });
}

function configurarWhatsapp(info) {
  const btn = document.getElementById("btnWhatsapp");
  if (!btn) return;

  const mensaje = encodeURIComponent(
    `Hola, quisiera información sobre el proyecto: ${info.proyecto}`
  );

  btn.href = `https://wa.me/57${info.telefono}?text=${mensaje}`;
}

function configurarCorreo(info) {
  const btn = document.getElementById("btnCorreo");
  if (!btn) return;

  const correo = info.correo; 
  const asunto = encodeURIComponent(`Consulta proyecto: ${info.proyecto}`);
  const cuerpo = encodeURIComponent(
    `Buen día,\n\nQuisiera recibir información sobre el proyecto:\n${info.proyecto}\n\nGracias.`
  );

  btn.href = `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
}

function configurarCorreo2(info) {
  const btn = document.getElementById("btnCorreo2");
  if (!btn) return;

  const correo = "administracion@aycardiestructural.com" ; 
  const asunto = encodeURIComponent(`Consulta proyecto: ${info.proyecto}`);
  const cuerpo = encodeURIComponent(
    `Buen día,\n\nQuisiera recibir información sobre el proyecto:\n${info.proyecto}\n\nGracias.`
  );

  btn.href = `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
}

document.addEventListener("DOMContentLoaded", () => {

  const rol = (localStorage.getItem("rol") || "")
    .toLowerCase()
    .trim();

  if (rol === "interno") {

    document.querySelectorAll(".side-menu a").forEach(link => {
      const href = link.getAttribute("href") || "";

      // Ocultar elementos estructurales
      if (
        href.includes("elementos.html?tipo=columnas") ||
        href.includes("elementos.html?tipo=vigas") ||
        href.includes("elementos.html?tipo=muros") ||
        href.includes("elementos.html?tipo=losas") ||
        href.includes("info.html")
      ) {
        link.style.display = "none";
      }
    });
  }

});

const rol = localStorage.getItem("rol");
if (!rol) {
  window.location.href = "index.html";
}
