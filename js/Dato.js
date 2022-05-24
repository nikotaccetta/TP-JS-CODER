class Dato {
    constructor(descripcion, valor, categoria) {
        this._descripcion = descripcion;
        this._valor = valor;
        this._categoria= categoria;
    }
    get descripcion(){
        return this._descripcion
    }
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor = valor;
    }
    get categoria(){
        return this._categoria
    }
    set categoria(categoria){
        this.categoria = categoria;
    }
}