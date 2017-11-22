import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tab, Nav, NavItem, Table } from 'react-bootstrap';

import * as ProposalActionCreators from '../actions/proposals';
import Card from './Cards'

import '../../../css/components/MyQuotes.css';

import * as config from '../config'

var quotesHeader = [
  'Nome','Sobrenome', 'Potência Pico', 'Data', 'Valor (R$)', 'Status',
];


class MyQuotes extends Component {


  // Fetch initial data
  componentDidMount () {

    // Redux
    const { dispatch } = this.props;
  
    // Bind functions to be called by child with dispatch to store
    const proposalGetData = bindActionCreators(ProposalActionCreators.proposalGetData, dispatch);
  
    proposalGetData(config.PROPOSAL_URL);
  }


  render () {
    return (
      <div className={'main-screen-body'} >
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
              <span className={'glyphicon glyphicon-gbp logo-side'} /> 
            </Col>

            <Col sm={8}>
              <Tab.Content animation={true}>
                <Tab.Pane eventKey="first">


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
                            this.props.quotes.map((element, key) => {
                              return (
                                <tr key={key}>
                                  <td key={key+1}>{element.firstName} </td>
                                  <td key={key+2}>{element.lastName}</td>
                                  <td key={key+3}>{element.sysProposal}</td>
                                  <td key={key+4}>{element.date}</td>
                                  <td key={key+5}>{element.totalCost}</td>
                                  <td key={key+6}>{element.status}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    }
                  />



                </Tab.Pane>
              </Tab.Content>

            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

MyQuotes.PropTypes = {
  header: PropTypes.array.isRequired,
  quotes: PropTypes.array.isRequired,
};

// export default MyQuotes;
// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    quotes: state.proposals.quotes,
  }
);

// Subscribes any changes in state to the container Scoreboard 
// export default withRouter(connect(mapStateToProps)(Body))
export default connect(mapStateToProps)(MyQuotes)
