import React from 'react'

const Portfolio = props => {
  return (
    <div className={'container-fluid text-center bg-grey'}>
      <h2>Telas e Relatórios</h2>
      <h4>Facilidade para você ter agilidade</h4>
      <div className={'row text-center'}>
        <div className={'col-sm-4'}>
          <div className={'thumbnail'}>
            <img src={'/images/thumb-graph.png'} alt={'Gráfico'}/>      
            <p><strong>Gráficos de estimativas</strong></p>
            <p>Consumo e geração mensais</p>
          </div>
        </div>
        <div className={'col-sm-4'}>
          <div className={'thumbnail'}>
            <img src={'/images/thumb-cost.png'} alt={'Custo'}/>
            <p><strong>Entrada de custos</strong></p>
            <p>Detalhe os custos como instalação, projeto, etc</p>
          </div>
        </div>
        <div className={'col-sm-4'}>
          <div className={'thumbnail'}>
            <img src={'/images/thumb-interface.jpg'} alt={'Proposta'}/>
            <p><strong>Proposta personalizada</strong></p>
            <p>Crie propostas personalizadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
