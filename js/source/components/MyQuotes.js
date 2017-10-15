import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tab, Nav, NavItem, Table } from 'react-bootstrap';

import * as SystemActionCreators from '../actions/all';
import Card from './Cards'

import '../../../css/components/MyQuotes.css';

var quotesHeader = [
  'Nome','Sobrenome', 'Potência Pico', 'Data', 'Valor (R$)', 'Status',
];


const MyQuotes = props => {

  // Redux
  // const { dispatch, quotes } = props;

  // // Bind functions to be called by child with dispatch to store
  // const updateQuotes = bindActionCreators(SystemActionCreators.updateQuotes, dispatch);

  return (
    <div className={'main-screen'}>
      <Tab.Container 
        defaultActiveKey={'first'} 
        id="left-tabs-example" >
        <Row className="clearfix">
          <Col sm={2}>
            <Nav bsStyle="pills" stacked={true}>
              <NavItem eventKey="first">
            Minhas Cotações             
              </NavItem> 
            </Nav>    
          </Col>

          <Col sm={8}>
            <Tab.Content animation={true}>
              <Tab.Pane eventKey="first">
 
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <Card
                        title="Lista de cotações enviadas"
                        category="(colocar dropdown em status)"
                        contentClass="table-responsive table-full-width"
                        content={
                          <Table striped hover>
                            <thead>
                              <tr>
                                {
                                  quotesHeader.map((prop, key) => {
                                    return (
                                      <th key={key}>{prop}</th>
                                    );
                                  })
                                }
                              </tr>
                            </thead>
                            <tbody>
                              {
                                props.quotes.map((prop,key) => {
                                  return (
                                    <tr key={key}>{
                                      prop.map((prop,key)=> {
                                        return (
                                          <td key={key}>{prop}</td>
                                        );
                                      })
                                    }</tr>
                                  )
                                })
                              }
                            </tbody>
                          </Table>
                        }
                      />
                    </div>
                  </div>
                </div>


              </Tab.Pane>
            </Tab.Content>

          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

MyQuotes.PropTypes = {
  header: PropTypes.array.isRequired,
  quotes: PropTypes.array.isRequired,
};

// export default MyQuotes;
// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    quotes: state.quotes,
  }
);

// Subscribes any changes in state to the container Scoreboard 
// export default withRouter(connect(mapStateToProps)(Body))
export default connect(mapStateToProps)(MyQuotes)
