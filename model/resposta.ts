
export default class RespostaModel{
    #valor: string
    #certo: boolean
    #revelada: boolean


    constructor(valor:string, certo:boolean, revelada = false){
        this.#valor = valor,
        this.#certo = certo,
        this.#revelada = revelada
     
    }
    static certa(valor: string){
            return new RespostaModel(valor,true)
    }
    static errada(valor:string){
        return new RespostaModel(valor,false)
    }

  
    get valor(){
        return this.#valor
    }
    get certo(){
        return this.#certo
    }
    get revelada(){
        return this.#revelada
    }

    revelar(){
        return new RespostaModel(this.#valor,this.#certo,true)
    }

    static criarUsandoObjeto(obj: RespostaModel): RespostaModel {
         return new RespostaModel(obj.valor, obj.certo, obj.revelada)
    }

    paraibjeto(){
        return{
            valor: this.#valor,
            certo: this.#certo,
            revelada: this.#revelada
        }
    }
}