import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Radio } from 'react-bootstrap';

import SolarBarChart from './Barchart'

const useLocale = toLocaleStringSupportsLocales()

function currencyFormat(total) {
  if (useLocale) {
    return Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } else {
    return '$' + Number(total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

function toLocaleStringSupportsLocales() {
  var number = 0;
  try {
    number.toLocaleString('i');
  } catch (e) {
    return e.name === 'RangeError';
  }
  return false;
}

var ValueRow = function ({option, generation, sysProposal, ratio, panels, kitCost, totalCost, onBlur, onChange, onRadioClick, addon}) {
  return (
    <div className="row panel">

      <Radio bsClass="col-sm-1 text-center" inline={true} name="row" value={option} onClick={onRadioClick}>
        {' '} {option}
      </Radio>

      <div className="col-sm-2">
        <form className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <input type="number" 
                step={0.1}
                className="form-control text-center" 
                name={`power-${option}`} 
                onBlur={onBlur} 
                onChange={onChange} 
                defaultValue={sysProposal} />
            </div>
          </div>
        </form>
      </div>

      <Label bsClass="col-sm-2 text-center">{generation}</Label>
      <Label bsClass="col-sm-1 text-center">{ratio}</Label>

      <div className="col-sm-2">
        <form className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <input type="number" 
                className="form-control text-center" 
                name={`panels-${option}`} 
                onBlur={onBlur} 
                onChange={onChange} 
                defaultValue={panels} />
            </div>
          </div>
        </form>
      </div>

      <div className="col-sm-2">
        <form className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <input type="number"
                step={50}
                className="form-control text-center" 
                name={`kitCost-${option}`} 
                onBlur={onBlur} 
                onChange={onChange} 
                defaultValue={kitCost} />
            </div>
          </div>
        </form>
      </div>

      <Label bsClass="col-sm-2 text-center">{currencyFormat(totalCost)}</Label>
    </div>
  );
}

class ResultPanel extends Component {

  _fireOnresultDataChange(resultData) {
    this.props.onDataChange(resultData);
    this.props.onUpdateBarGraph(); // row from resultpanel
  }

  _inputBlur(e) {
    e.preventDefault();
    let resultData = this.props.resultData;

    console.log(e.target.name, e.target.value);

    switch (e.target.name) {
      case 'power-1':
        resultData[0].sysProposal = parseFloat(e.target.value);
        break;
      case 'power-2':
        resultData[1].sysProposal = parseFloat(e.target.value);
        break;

      case 'kitCost-1':
        resultData[0].kitCost = parseInt(e.target.value);
        break;
      case 'kitCost-2':
        resultData[1].kitCost = parseInt(e.target.value);
        break;

      case 'panels-1':
        resultData[0].panels = parseInt(e.target.value);
        break;
      case 'panels-2':
        resultData[1].panels = parseInt(e.target.value);
        break;
    }
        
    this._fireOnresultDataChange(resultData);
  }
  
  _inputChange(e) {
    this._inputBlur(e);
  }

  _radioClick(e) {
    this.props.onUpdateSelectedResult(parseInt(e.target.value));
    this.props.onUpdateBarGraph(); // show the other graph
  }

  _renderResultPanel() {
    return (
      <div className={'main-screen-body'} >

        <div className="panel panel-primary">

          <div className="panel-heading">
            <div className="row">
              <Label bsClass="col-sm-1 text-left"> Opção </Label>
              <Label bsClass="col-sm-2 text-left"> Potência Pico (kWp) [Fornecedor] </Label>
              <Label bsClass="col-sm-2 text-center"> Micro Geração (kWh) </Label>
              <Label bsClass="col-sm-1 text-center"> Razão de Geração </Label>
              <Label bsClass="col-sm-2 text-center"> # Placas </Label>
              <Label bsClass="col-sm-2 text-center"> Custo Kit </Label>
              <Label bsClass="col-sm-2 text-center"> Preço Total </Label>
            </div>
          </div>

          <div className="panel-body">
        
            <ValueRow option={1}
              generation={this.props.resultData[0].generation.toFixed(0).toString()} 
              ratio={`${this.props.resultData[0].ratio.toFixed(0).toString()} %`} 
              panels={parseInt(this.props.resultData[0].panels)}
              kitCost={parseInt(this.props.resultData[0].kitCost)}
              totalCost={this.props.resultData[0].totalCost}
              addon=""
              sysProposal={5}
              onBlur={(e) => this._inputBlur(e)} 
              onChange={(e) => this._inputChange(e)}
              onRadioClick={(e) => this._radioClick(e)}/>

            <ValueRow option={2}
              generation={this.props.resultData[1].generation.toFixed(0).toString()} 
              ratio={`${this.props.resultData[1].ratio.toFixed(0).toString()} %`} 
              panels={parseInt(this.props.resultData[1].panels)}
              kitCost={parseInt(this.props.resultData[1].kitCost)}
              totalCost={this.props.resultData[1].totalCost}
              addon=""
              sysProposal={8}
              onBlur={(e) => this._inputBlur(e)} 
              onChange={(e) => this._inputChange(e)}
              onRadioClick={(e) => this._radioClick(e)}/>

            <div className="row">
              <Label bsClass="col-sm-12 text-center"> Grafico Consumo Atual e Geração Solar (kWh) </Label>
            </div>
            <SolarBarChart data={this.props.dataGraph}/>

          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>

        {this._renderResultPanel()}

      </div>
    );
  }

}

ResultPanel.propTypes = {
  resultData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  dataGraph: PropTypes.arrayOf(PropTypes.object),
  onDataChange: PropTypes.func.isRequired,
  onUpdateBarGraph: PropTypes.func.isRequired,
  onUpdateSelectedResult: PropTypes.func.isRequired,
};

export default ResultPanel
