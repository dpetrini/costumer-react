import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, FormGroup, InputGroup, FormControl, Radio, Row, Col } from 'react-bootstrap';

class CostOpPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      configData: props.configData,
    }
  }

  _fireOnConfigDataChange(configData) {
    this.props.onDataChange(configData);
  }

  _inputChange(e) {
    e.preventDefault();
    var configData = this.props.configData;

    console.log(e.target.name, e.target.value, e.target.value.replace(',','.'));

    switch (e.target.name) {
      case 'custoEng':
        configData.custoEng = e.target.value;
        break;  
      case 'custoInsPlaca':
        configData.custoInsPlaca = e.target.value;
        break;        
      case 'custoMisc':
        configData.custoMisc = e.target.value;
        break;
      case 'custoEstSolo':
        configData.custoEstSolo = e.target.value;
        break;   
      default:
        console.log('Default Switch');
        break;      
    }

    this._fireOnConfigDataChange(configData);
  }

  // Input group - all have same call back on Blur
  _eachTextInput(addon, name, text, step) {
    return (
      <div>
        <InputGroup>
          <InputGroup.Addon className="valuerow input-group-addon">{addon}</InputGroup.Addon>
          <FormControl className="text-center" type="number" min="0" step={step}
            name={name} 
            defaultValue={text} 
            onBlur={this._inputChange.bind(this)}            
            onChange={this._inputChange.bind(this)}/>    
        </InputGroup>
      </div>
    );

  }

  _renderCostOpPanel() {
    var configData = this.props.configData; 
    return (
      <div>
        <Row className="clearfix">
          <Col sm={4}>
            <form>
              <p>Custos (R$)</p>

              <FormGroup>
                {this._eachTextInput('Pjt.Eng.', 'custoEng', configData.custoEng, '50')}
                {this._eachTextInput('Inst.Placa', 'custoInsPlaca', configData.custoInsPlaca, '10')}
                {this._eachTextInput('Misc.', 'custoMisc', configData.custoMisc, '10')}
                {this._eachTextInput('Est.Solo', 'custoEstSolo', configData.custoEstSolo, '100')}

                <Radio name="medidorGeracao">
                eSensor (R$ 380)
                </Radio>
                <Radio name="medidorGeracao">
                eNet (R$ 1280)
                </Radio>
              </FormGroup>

            </form>
          </Col>
          
          <Col sm={2} />

          <Col sm={4}>
            <Table striped={true} bordered={true} condensed={true} hover={true}>
              <thead>
                <tr>
                  <th>Dados do Sistema</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Perdas Inversor</td>
                  <td>0,9</td>
                </tr>
                <tr>
                  <td>Dias Mensais</td>
                  <td>30,42</td>
                </tr>
              </tbody>
            </Table>
          </Col>

        </Row>
      </div>
    );
  }
  render() {
    return (
      <div>

        {this._renderCostOpPanel()}

      </div>
    );
  }
}


CostOpPanel.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object),
  configData: PropTypes.object,
  onDataChange: PropTypes.func, 
};

export default CostOpPanel
