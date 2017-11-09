import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import SolarBarChart from './Barchart'

import * as config from '../config'

class Proposal extends Component {
  constructor(props) {
    super(props);
    this.costumerName = '';
    this.costumerLastName = '';
  } 

  // Fire redux action
  proposalButton() {
    var timeNow = new Date();
 
    //let chartSVG = ReactDOM.findDOMNode(this.currentChart.currentChart).children[0];
    //console.log(chartSVG)
    //let svgURL = new XMLSerializer().serializeToString(chartSVG);
    //let svgBlob = new Blob([svgURL], {type: 'image/svg+xml;charset=utf-8'});
    ////  let svgBlob = new Blob([chartSVG.outerHTML], {type: "text/html;charset=utf-8"});
    //console.log(svgURL)

    // From here on will submit
    const proposalData	= {
      firstName: this.costumerName,
      lastName:  this.costumerLastName,
      avgConsumption: this.props.systemData.avgConsumption,
      sysProposal: this.props.resultData[0].sysProposal,
      panels: this.props.resultData[0].panels,
      totalCost: this.props.resultData[0].totalCost,
      payback: this.props.resultData[0].payback,
      gerCost: this.props.systemData.gerCost,
      avgCost: this.props.systemData.avgCost,
      status: 'sent',
      date: timeNow.toISOString(),
    };

    if (this.costumerName === null && this.props.systemData.avgCost === 0) {
      console.log('Empty proposal. Not done.')
      return;
    }

    console.log(proposalData)

    // Will insert message of deletion/edition address: 
    this.setState({
      messageValidation: 'Success! Please close to return',
    });

    this.props.onSendProposal(config.PROPOSAL_URL, proposalData);

  }

  render () {

    // Load the selected costumer
    for (let i = 0; i < this.props.costumer.length; i++) {
      if (this.props.costumer[i][4] === '✔') {
        this.costumerName = this.props.costumer[i][0];
        this.costumerLastName = this.props.costumer[i][1];
      }
    }

    return (
      <div className={'main-screen-body'} >
Oi {this.costumerName}, <br />

Obrigado pelas informações <br />

Pela conta podemos ver o perfil e inclusive que o maior consumo é nos meses de inverso. Provavelmente 
 devido a aquecimento de agua  ou chuveiro elétrico. <br />
        <br />
Considerando seus dados, para um consumo médio de
 aproximadamente <strong> {this.props.systemData.avgConsumption} kWh/mês</strong>, estimamos um sistema
 fotovoltaico de <strong> {this.props.resultData[0].sysProposal} kWp</strong>.<br />
        <br />
Para construir esse sistema precisamos em média de <strong> {this.props.resultData[0].panels} placas 
  solares</strong> de 320W (cada uma tem dimensão 1m x 2m).<br />
        <br />
Para o projeto de seu sistema consideramos o uso de Microinversores, que são os componentes 
 que transformam a energia solar em energia da rede. Os microinversores são mais seguros para casas 
 e não requerem que se instale nenhum equipamento de alta tensão dentro da casa. Veja no anexo mais 
 informações.<br />
        <br />
O custo aproximado desse sistema 
 é <strong>R$ {this.props.resultData[0].totalCost.toFixed(2).replace('.', ',')}</strong>, (depende 
 de fatores de construção e orientação do telhado). Dependendo da ocasião podemos ter preços 
 promocionais também.<br />
        <br />
O tempo de retorno desse investimento é
 aproximadamente <strong>{this.props.resultData[0].payback.toFixed(2).replace('.', ',')} anos</strong>, 
 considerando a inflação e o desconto que terá da conta de energia, que passará a ser algo em 
 torno de <strong>R$ {this.props.systemData.gerCost.toFixed(2).replace('.', ',')} </strong>, ao invés 
 dos aproximadamente <strong>R$ {this.props.systemData.avgCost} atuais (média)</strong>.<br />

Nesse preço ainda podemos ter promoções, depende um pouco da ocasião.<br />
        <br />
E terá uma curva de produção como abaixo:<br />

        <br />
        <SolarBarChart 
          id="currentChart" 
          ref={(chart) => this.currentChart = chart} 
          data={this.props.dataGraph}
        />
        <br />


Por favor visite nosso website para ter mais informações sobre energia solar:<br />

http://integrahausenergiasolar.com.br/energia-solar-para-residencias/ <br />

http://integrahausenergiasolar.com.br/vantagens-e-desvantagens-da-energia-solar/ <br />

Obrigado pelo contato.
Estamos a disposição para fazer uma visita e lhe explicar o funcionamento da energia solar pessoalmente.<br />

Atenciosamente,<br />

        <p>
          <Button onClick={(e) => this.proposalButton()}> Envia Proposta »</Button>
        </p>
        
      </div>

    );
  }

}

Proposal.propTypes = {
  costumer: PropTypes.array.isRequired,
  resultData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  systemData: PropTypes.object.isRequired,
  onSendProposal: PropTypes.func.isRequired,

}

export default Proposal;
