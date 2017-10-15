import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, FormGroup, InputGroup, FormControl, Radio, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';

// Dropdown for City Selection
const HSPDropdown = ({cityHsp, city, onSelect}) => (
  <DropdownButton bsStyle="default" id="city-hsp" onSelect={onSelect} title={city}>
    {Object.keys(cityHsp).map(city => <MenuItem key={city} eventKey={city}> {city} - {cityHsp[city]} </MenuItem>)}
  </DropdownButton>
);

// Overall system configuration like azimuth
class ConfigPanel extends Component {

  _fireOnConfigDataChange(configData) {
    this.props.onDataChange(configData);
  }

  _inputChange(e) {
    e.preventDefault();

    var configData = this.props.configData;

    console.log(e.target.name, e.target.value);

    switch (e.target.name) {
      case 'custokWh':
        configData.custokWh = e.target.value;
        break;
      case 'custoIlumPub':
        configData.custoIlumPub = e.target.value;
        break;  
      case 'sombreamento':
        configData.sombreamento = e.target.value;
        break;        
      case 'azimute':
        configData.azimute = e.target.value;
        break; 
      default:
        // console.log('Default Switch');
        break;      
    }

    this._fireOnConfigDataChange(configData);
  }

  _taxaDispChange(e) {
    //e.preventDefault();
    var configData = this.props.configData;
    
    configData.taxaDisp = e.target.value;

    this._fireOnConfigDataChange(configData);
  }

  handleCity(city, e) {
    // Update redux state
    this.props.onCityChange(city);
    // Update calculations for new city/HSP
    this._fireOnConfigDataChange();
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

  _renderConfigPanel() {
    var configData = this.props.configData;
    return (
      <div>
        <Row className="clearfix">
          <Col sm={4}>

            <p>Custos concessionária (R$):</p>
            <form>

              <FormGroup>
                {this._eachTextInput('Custo por kWh', 'custokWh', configData.custokWh, '0.01')}
                {this._eachTextInput('Ilumin. Pública', 'custoIlumPub', configData.custoIlumPub, '1')}
              </FormGroup>

              <p>Perdas:</p>

              <FormGroup>
                {this._eachTextInput('Sombr.', 'sombreamento', configData.sombreamento, '0.01')}
                {this._eachTextInput('Azimute', 'azimute', configData.azimute, '0.01')}
              </FormGroup>
              
              <p>Cidade:</p>

              <HSPDropdown cityHsp={this.props.cityHsp} city={this.props.city} onSelect={(key, e) => this.handleCity(key, e)} />

            </form>
          </Col>

          <Col sm={2} />

          <Col sm={4}>
            <p>Taxa de Disponibilidade</p>
            <FormGroup >
              <Radio name="taxaDisp" value={'Bi'} defaultChecked={true} onClick={this._taxaDispChange.bind(this)}>
            Bifásico (50 kWh)
              </Radio>
              <Radio name="taxaDisp" value={'Tri'} onClick={this._taxaDispChange.bind(this)}>
            Trifásico (100 kWh)
              </Radio>
            </FormGroup>

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

        {this._renderConfigPanel()}

      </div>
    );
  }
}

ConfigPanel.propTypes = {
  configData: PropTypes.object.isRequired,
  cityHsp: PropTypes.object.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

export default ConfigPanel
