import QuestaoModel from "../model/questao"
import style from '../styles/Questionario.module.css'
import Botao from "./Botao"
import Questao from "./Questao"
interface QuestionarioProps{
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irPraProxPasso: () => void
}
export default function Questionario(props: QuestionarioProps){
    function respostaFornecida(indice:number){
            if(props.questao.naoRespondida){
                props.questaoRespondida(props.questao.responderCom(indice))
            }
    }
    return(
        <div className={style.questionario}>
            {props.questao ?
                <Questao valor={props.questao}
                        tempoPraReposta={6}
                        respostaFornecida={respostaFornecida}
                        tempoEsgotado={props.irPraProxPasso}
                               />
                : false
            }
            
            <Botao onClick={props.irPraProxPasso} texto={props.ultima ? 'Finalizar' : 'Proxima'}/>
        </div>
    )
}