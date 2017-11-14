import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import html2canvas from '../extlib/html2canvas.min';
import jsPDF from '../extlib/jspdf.min';
// import html2pdf from '../extlib/html2pdf';


import SolarBarChart from './Barchart'

import * as config from '../config'

class Proposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupSent: false,
    };
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

    if (this.costumerName === '') {
      console.log('Empty customer name for proposal. Not done.')
      return;
    } else {

      console.log(proposalData)

      this.props.onSendProposal(config.PROPOSAL_URL, proposalData);

    }
  }

  componentWillReceiveProps(newProps) {
 
    if (newProps.proposalSent)
    // Will enable popup 
      this.setState({
        popupSent: true,
      });
  }

  // Proposal Popup life cycle Close, reset app and go to /quotes
  onClosePopup() {
    this.setState ({ 
      popupSent: false,
    });

    // Reset initial app state
    this.props.initApp();

    // Goes to quotes screen
    this.props.history.push('/myquotes');
  }

  // Generic (as much as possible) popup modal
  renderPopup(renderFlag, title, content, onClose) {
    if (renderFlag === true) {
      return (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title> 
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      );
    } else 
      return null;
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        
        pdf.setFontSize(18);

        pdf.text(15, 10, 'Proposta Energia Solar');

        pdf.setFontSize(10);

        pdf.text(5, 20, `
        
        Oi ${this.costumerName},
        
        Obrigado pelas informações         
        Pela conta ou estimativa de consumo podemos ver o perfil de utilização de energia elétrica.
                  
        Considerando seus dados, para um consumo médio de aproximadamente ${this.props.systemData.avgConsumption} kWh/mês,
        estimamos um sistema fotovoltaico de ${this.props.resultData[0].sysProposal} kWp.
        
        Para construir esse sistema precisamos em média de ${this.props.resultData[0].panels} placas solares de 320W (cada uma tem dimensão 1m x 2m).
        
        Para o projeto de seu sistema consideramos o uso de Microinversores, que são os componentes 
        que transformam a energia solar em energia da rede. Os microinversores são mais seguros para casas 
        e não requerem que se instale nenhum equipamento de alta tensão dentro da casa. Veja no anexo mais 
        informações

        O custo aproximado desse sistema é R$ ${this.props.resultData[0].totalCost.toFixed(2).replace('.', ',')}, (depende de fatores de construção e orientação do telhado).
        Dependendo da ocasião podemos ter preços promocionais também.
        
       O tempo de retorno desse investimento é aproximadamente ${this.props.resultData[0].payback.toFixed(2).replace('.', ',')} anos, considerando a inflação e o desconto
       que terá da conta de energia, que passará a ser algo em torno de R$ ${this.props.systemData.gerCost.toFixed(2).replace('.', ',')}, ao invés dos aproximadamente 
       R$ ${this.props.systemData.avgCost} atuais (média).
       
       Nesse preço ainda podemos ter promoções, depende um pouco da ocasião.
        
       E terá uma curva de produção como abaixo:             
        `);

        pdf.addImage(imgData, 'JPEG', 20, 130, 140, 55);


        pdf.text(5, 190, `
        Por favor visite nosso website para ter mais informações sobre energia solar:
        
        http://integrahausenergiasolar.com.br/energia-solar-para-residencias/
        
        http://integrahausenergiasolar.com.br/vantagens-e-desvantagens-da-energia-solar/
        
        Obrigado pelo contato.

        Estamos a disposição para fazer uma visita e lhe explicar o funcionamento da energia solar pessoalmente.
        
        Atenciosamente

        `);

        // pdf.output('dataurlnewwindow');
        pdf.save('proposta_solar_download.pdf');
      });
  }

  printHtml2Pdf() {
    var element = document.getElementById("divToPrint");
    html2pdf(element, {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  }

  
  render () {

    // Load the selected costumer
    for (let i = 0; i < this.props.costumer.length; i++) {
      if (this.props.costumer[i][4] === '✔') {
        this.costumerName = this.props.costumer[i][0];
        this.costumerLastName = this.props.costumer[i][1];
        console.log(this.costumerName)
      }
    }

    console.log(this.props.costumer)

    return (
      <div className={'main-screen-body'} >
        <div id="fulldoc">

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

          <div id="divToPrint" >
            <SolarBarChart 
              id="currentChart" 
              ref={(chart) => this.currentChart = chart} 
              data={this.props.dataGraph}
            />
          </div>
          
Por favor visite nosso website para ter mais informações sobre energia solar:<br />

http://integrahausenergiasolar.com.br/energia-solar-para-residencias/ <br />

http://integrahausenergiasolar.com.br/vantagens-e-desvantagens-da-energia-solar/ <br />

Obrigado pelo contato.
Estamos a disposição para fazer uma visita e lhe explicar o funcionamento da energia solar pessoalmente.<br />

Atenciosamente,<br />

        </div>

        <p>
          <Button onClick={(e) => this.proposalButton()}> Envia Proposta »</Button>
          <Button onClick={(e) => this.printDocument()}>Salvar PDF</Button>
        </p>

        {this.renderPopup(this.state.popupSent, 'Proposta', 
          'Proposta registrada com sucesso.', 
          this.onClosePopup.bind(this))}

      </div>

    );
  }

}

Proposal.propTypes = {
  costumer: PropTypes.array.isRequired,
  resultData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  systemData: PropTypes.object.isRequired,
  onSendProposal: PropTypes.func.isRequired,
  initApp: PropTypes.func.isRequired,
}

// export default withRouter(Proposal);

// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    proposalSent: state.proposalSent,
  }
);

// Subscribes any changes in state to the container Scoreboard 
export default withRouter(connect(mapStateToProps)(Proposal));

