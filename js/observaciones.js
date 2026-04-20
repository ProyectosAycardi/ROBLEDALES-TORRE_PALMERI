let OBS = [];

fetch("data/datos.json")
.then(res => res.json())
.then(data => {

document.getElementById("tituloProyecto").textContent =
data.info.proyecto;

OBS = data.observaciones || [];

llenarFiltroCategorias();

renderObservaciones();

});


function llenarFiltroCategorias(){

const filtro = document.getElementById("filtroCategoria");

const categorias = [...new Set(OBS.map(o => o.categoria))];

categorias.sort();

categorias.forEach(c => {

const opt = document.createElement("option");

opt.value = c;
opt.textContent = c;

filtro.appendChild(opt);

});

}


document.getElementById("filtroCategoria")
.addEventListener("change", renderObservaciones);

document.getElementById("filtroNivel")
.addEventListener("change", renderObservaciones);


function renderObservaciones(){

const cont = document.getElementById("contenedorObservaciones");

const cat = document.getElementById("filtroCategoria").value;
const niv = document.getElementById("filtroNivel").value;

let lista = OBS;

if(cat !== "TODAS"){
lista = lista.filter(o => o.categoria === cat);
}

if(niv !== "TODOS"){
lista = lista.filter(o => o.prioridad === niv);
}

if(lista.length === 0){
cont.innerHTML = "<p class='muted'>No hay observaciones para el filtro seleccionado</p>";
return;
}


// agrupar por categoria
const grupos = {};

lista.forEach(o => {

if(!grupos[o.categoria]){
grupos[o.categoria] = [];
}

grupos[o.categoria].push(o);

});

cont.innerHTML = "";

Object.keys(grupos).forEach(cat => {

const bloque = document.createElement("div");

bloque.className = "bloque";

bloque.innerHTML = `<h3>${cat.toUpperCase()}</h3>`;

grupos[cat].forEach(o => {

const card = document.createElement("div");

card.className = "card-detalle";

card.innerHTML = `

<div class="fila">
<span class="label">Elemento</span>
<span class="valor">${o.elemento}</span>
</div>

<div class="fila">
<span class="label">Descripción</span>
<span class="valor">${o.descripcion}</span>
</div>

<div class="fila">
<span class="label">Nivel</span>
<span class="valor">${o.nivel}</span>
</div>

<div class="fila">
<span class="label">Prioridad</span>
<span class="valor">${formatearNivel(o.prioridad)}</span>
</div>

`;

bloque.appendChild(card);

});

cont.appendChild(bloque);

});

}


function formatearNivel(prioridad){

if(!prioridad) return "";

const n = prioridad.toLowerCase();

if(n === "alta") return "🔴 Alta";
if(n === "media") return "🟡 Media";
if(n === "baja") return "🟢 Baja";

return prioridad;

}