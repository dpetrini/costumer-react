import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';

const About = () => {
  return (
    <div className={'main-screen'}>
      <Tab.Container 
        defaultActiveKey={'first'} 
        id="left-tabs-example" >
        <Row className="clearfix">
          <Col sm={2}>
            <Nav bsStyle="pills" stacked={true}>
              <NavItem eventKey="first">
            About              
              </NavItem> 
            </Nav>    
          </Col>

          <Col sm={8}>
            <Tab.Content animation={true}>
              <Tab.Pane eventKey="first">
                Sistema idealizado para cálculo de propostas de sistemas fotovoltaicos, 
                com geração de gráficos, controle de clientes, orçamentos e relatórios.
              </Tab.Pane>
            </Tab.Content>

          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default About;
