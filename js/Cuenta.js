const cuenta = JSON.parse(localStorage.getItem("cuenta"));

class Cuenta {
  constructor() {
    this._id = +cuenta?._id || 0;
    this.registros = cuenta?.registros || [];
    this.totalIngresos = +cuenta?.totalIngresos || 0;
    this.totalEgresos = +cuenta?.totalEgresos || 0;
  }

  agregarRegistro(registro) {
    const { tipo, descripcion, valor, categoria } = registro;

    if (!tipo || !descripcion || !valor || valor <= 0 || !categoria) {
      swal("Registro incompleto");
      return null;
    }

    if (tipo === "ingreso") this.totalIngresos += +valor;
    else this.totalEgresos += +valor;

    this._id++;
    const nuevoRegistro = {
      id: this._id,
      tipo,
      descripcion,
      valor,
      categoria,
    };

    this.registros.push(nuevoRegistro);
    this.#actualizarStorage();
    swal("Agregaste un nuevo egreso");

    return nuevoRegistro;
  }

  eliminarRegistro(id) {
    let indiceEliminar = this.registros.findIndex(
      (registro) => registro.id === id
    );

    // Actualiza saldos
    const delRecord = this.registros[indiceEliminar];
    if (delRecord.tipo === "ingreso") this.totalIngresos -= +delRecord.valor;
    else this.totalEgresos -= +delRecord.valor;

    // Actualiza registros
    this.registros.splice(indiceEliminar, 1);
    this.#actualizarStorage();
    swal("Eliminaste un Ingreso");

    return indiceEliminar;
  }

  presupuesto() {
    return this.totalIngresos - this.totalEgresos;
  }

  porcentajeEgreso() {
    return this.totalEgresos / this.totalIngresos;
  }

  #actualizarStorage() {
    localStorage.setItem("cuenta", JSON.stringify(this));
  }
}
