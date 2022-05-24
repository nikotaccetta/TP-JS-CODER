class Ingreso extends Dato{
    static contadorIngresos = 0;

    constructor(descripcion, valor, categoria){
        super(descripcion, valor, categoria);
        this._id = ++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id;
    }
}