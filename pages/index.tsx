
import { useEffect, useState } from "react";
import QuestaoModel from "../model/questao";
import Questionario from "../components/Questionario";
import { useRouter } from "next/router";

const BASE_URL = 'http://localhost:3000/api'
export default function Home() {
 const router = useRouter()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes);
  }
   async function carregarQuestoes(id: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
    
  }

  useEffect(()=>{
    carregarIdsQuestoes()
  },[])
  useEffect(()=>{
    idsDasQuestoes.length > 0 && carregarQuestoes(idsDasQuestoes[0])
  },[idsDasQuestoes])



  function questaoRespondida(questao:QuestaoModel){
    setQuestao(questao)
    const certa = questao.acertou
    setRespostasCertas(respostasCertas + (certa ? 1 : 0))
  }



  function idProximaPergunta(){

    const proxIndice = idsDasQuestoes.indexOf(questao.id)+1
     return idsDasQuestoes[proxIndice]
  

  }
  function irPraProxPasso(){
    const proxId = idProximaPergunta()
    proxId ? irPraProximaQuestao(proxId): finalizar()
  }
 
  function irPraProximaQuestao(proxId:number){
    carregarQuestoes(proxId)

  }

  function finalizar()
  {
    router.push({
      pathname: "/resultado",
      query:{
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }  
  return questao? ( 
                    <Questionario
                    questao={questao}
                    ultima={idProximaPergunta() === undefined}
                    questaoRespondida={questaoRespondida}
                    irPraProxPasso={irPraProxPasso}/>)
         
          : false
    
}
