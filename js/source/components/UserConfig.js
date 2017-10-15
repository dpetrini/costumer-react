import React, { Component } from 'react';
import { Row, Col, Tab, Nav, NavItem, FormGroup, InputGroup, FormControl } from 'react-bootstrap';



// Falta atualizar estado e repercutir em estrutura nova a ser chamada "generalConfig"
//  no estado geral (redux) da app


class UserConfig extends Component {

  _inputChange(e) {
    e.preventDefault();
    
    console.log(e.target.name, e.target.value);

    switch (e.target.name) {

      default:
        // console.log('Default Switch');
        break;      
    }

    // this._fireOnConfigDataChange();
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

  render() {
    return (
      <div className={'main-screen'}>
        <Tab.Container 
          defaultActiveKey={'first'} 
          id="left-tabs-example" >
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked={true}>
                <NavItem eventKey="first">
            Configurações Usuário              
                </NavItem> 

                <NavItem eventKey="second">
            Configurações Sistema              
                </NavItem> 
              </Nav>    
            </Col>

            <Col sm={8}>
              <Tab.Content animation={true}>

                <Tab.Pane eventKey="first">
                  <Col sm={4}>
                    <p>Dados Usuário:</p>
                    <form>
                      <FormGroup>
                        {this._eachTextInput('Nome', 'userName', 1.35, '0.01')}
                        {this._eachTextInput('Empresa', 'company', 0.90, '0.01')}
                        {this._eachTextInput('Logo', 'logo', 0.90, '0.01')}
                      </FormGroup>         
                    </form>
                  </Col>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <Row className="clearfix">
                    <Col sm={4}>
                      <p>Configurações Gerais:</p>
                      <form>
                        <FormGroup>
                          {this._eachTextInput('Markup Produtos', 'markup', 1.35, '0.01')}
                          {this._eachTextInput('Rendim. Inversor', 'yieldInverter', 0.90, '0.01')}
                        </FormGroup>         
                      </form>
                    </Col>
                  </Row>
                </Tab.Pane>

              </Tab.Content>

            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default UserConfig;
