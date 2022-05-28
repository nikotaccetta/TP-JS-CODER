const cuentaApp = new Cuenta();

window.onload = () => {
  cargarCabecero();
  cargarCategoria();
  cuentaApp.registros.map((registro) => agregarRegistro(registro));
};

// Cargar datos al cabezal
let cargarCabecero = () => {
  document.getElementById("presupuesto").innerHTML = formatoMoneda(
    cuentaApp.presupuesto()
  );

  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(
    cuentaApp.porcentajeEgreso()
  );

  document.getElementById("ingresos").innerHTML = formatoMoneda(
    cuentaApp.totalIngresos
  );

  document.getElementById("egresos").innerHTML = formatoMoneda(
    cuentaApp.totalEgresos
  );
};

// Obtener datos del formulario
const obtenerDatosDeForm = () => {
  let forma = document.getElementById("forma");
  let categoria = forma["categoria"].value;
  let tipo = forma["tipo"].value;
  let descripcion = forma["descripcion"].value;
  let valor = forma["valor"].value;

  const registro = {
    tipo,
    categoria,
    descripcion,
    valor,
  };

  return registro;
};

// Agregar registro
let agregarRegistro = (registro) => {
  // Si el registro no es pasado por parametro (Por carga inicial), el registro se crea en base a los datos del FORM
  const nuevoRegistro = registro
    ? registro
    : cuentaApp.agregarRegistro(obtenerDatosDeForm());

  if (nuevoRegistro) {
    const destinoDOM =
      nuevoRegistro.tipo === "ingreso"
        ? document.getElementById("lista-ingresos")
        : document.getElementById("lista-egresos");

    destinoDOM.innerHTML += crearRegistroHTML(nuevoRegistro);
    cargarCabecero();
  }
};

// Eliminar registro
const eliminarRegistro = (id) => {
  const res = cuentaApp.eliminarRegistro(id);
  if (res >= 0) {
    const child = document.getElementById(`registro_${id}`);
    const father = child.parentNode;
    father.removeChild(child);
    cargarCabecero();
  }
};

// Crear HTML de registro
const crearRegistroHTML = (registro) => {
  let registroHTML = `
    <div id="registro_${registro.id}" class="elemento limpiarEstilos">

      <div class="elemento_descripcion" style="margin-right: 35px">
        <span style="margin-right: 5px">${registro.categoria}</span>
        ${registro.descripcion}
      </div>

      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(registro.valor)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
            <ion-icon name="close-outline" onclick='eliminarRegistro(${
              registro.id
            })'></ion-icon>
          </button>
        </div>
      </div>                    
      
    </div>    
    `;
  return registroHTML;
};

// Carga categorias en el desplegable
let cargarCategoria = async () => {
  let contenido = "";

  const res = await fetch("data/categorias.json");
  const resJSON = await res.json();

  resJSON.Tipo.map(
    (categoria) =>
      (contenido += `<option value="${categoria.value}" selected>${categoria.descripcion}</option>`)
  );
  const desplegable = document.getElementById("categoria");
  desplegable.innerHTML = contenido;
};
