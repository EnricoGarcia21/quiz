import questoes from '../bancoDeQuestoe'
export default function handler(req, res)
  {
    const idSelecionado = +req.query.id
    const unicaquestaoOunada= questoes.filter(questao => questao.id === idSelecionado)
    if(unicaquestaoOunada.length === 1){
        const questaoSlecionada = unicaquestaoOunada[0].embaralharRespostas()
  
        res.status(200).json(questaoSlecionada.paraibjeto())
    }else{
        res.status(204).send()
    }
    
  }
  