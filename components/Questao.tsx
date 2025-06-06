import style from '../styles/Questao.module.css'
import QuestaoModel from "../model/questao"
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from './Temporizador';




const letras = [
    { valor: 'A', cor: '#f2c866'},
    { valor: 'B', cor: '#F266BA'},
    { valor: 'C', cor: '#85D4F2'},
    { valor: 'D', cor: '#BCE596'}
]



interface QuestaoProps{
    valor: QuestaoModel;
    tempoPraReposta?: number    
    respostaFornecida: (indice:number) => void
    tempoEsgotado:()=> void
}

export default function Questao(props:QuestaoProps){
    const questao = props.valor

    function renderizarResposta(){
        return questao.respostas.map((resposta,i) =>{
            return(
                <Resposta
            key={`${questao.id}-${i}`}
                    valor={resposta}
                    indice={i}
                    letra = {letras[i].valor}
                    corLetra={letras[i].cor}
                    respostaFornecida={props.respostaFornecida}
                />
            ) 
        })
    }

    return(
        <div className={style.questao}>
                <Enunciado texto={questao.enunciado}/>
                <Temporizador key={questao.id} duracao={props.tempoPraReposta ?? 10} 
                tempoEsgotado={props.tempoEsgotado}/>
                {renderizarResposta()}
        </div>
    )
}