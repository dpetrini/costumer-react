import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';

const Help = () => {
  return (
    <div className={'main-screen-body'} >
      <Tab.Container 
        defaultActiveKey={'first'} 
        id="left-tabs-example" >
        <Row className="clearfix">
          <Col sm={2}>
            <Nav bsStyle="pills" stacked={true}>
              <NavItem eventKey="first">
            Ajuda              
              </NavItem> 
            </Nav>   
            <span className={'glyphicon glyphicon-education logo-side'} /> 
          </Col>

          <Col sm={8}>
            
            <Tab.Content animation={true}>
              <Tab.Pane eventKey="first">
                <ol>
                  <li><h4>Forneça os dados do local da intalação (valor do kWh, sobreamento, azimute, cidade, tipo de sistema</h4></li>
                  <li><h4>Entre com os dados da conta do cliente (consumo mensal)</h4></li>
                  <li><h4>Custos da instalação (projeto engenharia, instalação por placa, estruturas de solo, medidor de geração, miscelânea.</h4></li>
                  <li><h4>Em Resultado, insira duas propostas do sistema, de acordo com as possibilidades de potência dos kits do seu fornecedor. Indique também a quantidade de placas e o custo do sistema (o markup é inserido em cima desta estimativa).</h4></li>
                  <li><h4>Selecione o cliente para envio da proposta comercial. Caso o cliente não esteja listado adicione o cliente antes de selecionar.</h4></li>
                  <li><h4>Confira a proposta que está pronta para envio ao cliente, você pode copiar em um email ou gerar PDF.</h4></li>
                </ol>
              </Tab.Pane>
            </Tab.Content>

          </Col>

        </Row>
      </Tab.Container>
    </div>
  );
}

export default Help;
