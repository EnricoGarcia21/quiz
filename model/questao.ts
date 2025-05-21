import { embaralhar } from "../functions/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel{
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    //#respondida: boolean

    constructor(id: number, enunciado: string, respostas: any[], acertou = false){
        this.#id = id,
        this.#enunciado = enunciado,
        this.#respostas = respostas,
        this.#acertou = acertou
        
    }

    get id(){
        return this.#id
    }
    get enunciado(){
        return this.#enunciado
    }
    get respostas(){
        return this.#respostas
    }
    get acertou(){
        return this.#acertou
    }

    get naoRespondida(){
        return !this.respondida
    }

    get respondida()
    {
        for(let resposta of this.#respostas){//verifica se a pergunta foi respondida
            if(resposta.revelada) return true
        }
        return false
    }
    responderCom(indice:number):QuestaoModel{
        const acertou = this.#respostas[indice]?.certo
        const respostas = this.#respostas.map((respota,i)=>{
            const respSelecioanada = indice === i
            const deveRevelar = respSelecioanada || respota.certo
            return deveRevelar ? respota.revelar(): respota
        })
        return new QuestaoModel(this.id,this.enunciado,respostas,acertou)
    }

    embaralharRespostas():QuestaoModel{
        let respostasEmbaralhada = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id,this.#enunciado,respostasEmbaralhada,this.#acertou)
    }
   
    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel{
        const respostas = obj.respostas.map(resp=>RespostaModel.criarUsandoObjeto(resp))
        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }
    paraibjeto(){
        return{
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp=> resp.paraibjeto()),
            acertou: this.#acertou
        }
    }
}