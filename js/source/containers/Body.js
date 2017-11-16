import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import * as SystemActionCreators from '../actions/all';
import * as ProposalActionCreators from '../actions/proposals';
import * as CostumerActionCreators from '../actions/costumers';

// ver referencia http://starhack.it/guide

import Excel from '../components/Excel';
import ConfigPanel from '../components/ConfigPanel';
import CostOpPanel from '../components/CostOpPanel';
import ResultPanel from '../components/ResultPanel';
import Costumers from '../components/Costumers';
import Proposal from '../components/Proposal';
import SummaryPanel from '../components/SummaryPanel'

import '../../../css/components/Body.css'; 

import * as config from '../config'

var headersIni = [
  'Conta', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

var costumerHeaderIni = [
  'Nome','Sobrenome', 'Telefone', 'Email', '✔',
];

class Body extends Component {

  state = {
    key: 'first',
  }

  static PropTypes = {
    fullData: PropTypes.object.isRequired,
  };

  _onPanelClick() {

  }

  // Change from Custumers Panel - selected client
  _onCustumersDataChange(costumerData) {

    this.setState({
      costumerData: costumerData,
    });
  }

  handleSelectVTabs(key) {

    console.log('selected ' + key);
    // this.setState({key});

  }

  render() {

    // Redux
    const { dispatch, fullData, costumers } = this.props;
    console.log(this.props)

    // Bind functions to be called by child with dispatch to store
    const initApp = bindActionCreators(SystemActionCreators.initApp, dispatch);
    const updateData = bindActionCreators(SystemActionCreators.updateData, dispatch);
    const updateResult = bindActionCreators(SystemActionCreators.updateResult, dispatch);
    const updateBarGraph = bindActionCreators(SystemActionCreators.updateBarGraph, dispatch);
    const updateSelectedResult = bindActionCreators(SystemActionCreators.updateSelectedResult, dispatch);
    const updateCityHsp = bindActionCreators(SystemActionCreators.updateCityHsp, dispatch);

    // Thunk MW for fetches - with this dont need mapDispatchToProps
    const fetchData = bindActionCreators((url) =>CostumerActionCreators.costumerFetchData(url), dispatch);
    const postData = bindActionCreators((url, data) =>CostumerActionCreators.costumerPostData(url, data), dispatch);
    const sendProposal = bindActionCreators((url, data) =>ProposalActionCreators.proposalPostData(url, data), dispatch);

    return (

      <div className={'main-screen-body'} >

        <Tab.Container 
          activeKey={/*fullData.*/this.key}
          onSelect={this.handleSelectVTabs.bind(this)} 

          defaultActiveKey={'first'} 
          id="left-tabs-example" >
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked={true}>
                <NavItem eventKey="first">
            Informação do Sistema               
                </NavItem>              
                <NavItem eventKey="second">
            Consumo e Estimativa
                </NavItem>
                <NavItem eventKey="third">
            Custo Operacional  
                </NavItem>
                <NavItem eventKey="fourth">
            Resultado  
                </NavItem>
                <NavItem eventKey="fifth">
            Selecionar Cliente 
                </NavItem>
                <NavItem eventKey="sixth">
            Enviar Proposta
                </NavItem>
              </Nav>
              <span className={'glyphicon glyphicon-leaf logo-side'} /> 
            </Col>
            <Col sm={8}>
              <Tab.Content animation={true}>

                <Tab.Pane eventKey="first">
                  <ConfigPanel 
                    configData={fullData.configData} 
                    cityHsp={fullData.cityHsp}
                    onDataChange={updateData}
                    onCityChange={updateCityHsp}
                    city={fullData.selectedCity}/>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <Excel 
                    initialData={fullData.data} 
                    headers={headersIni} 
                    onDataChange={updateData}
                    edit={true}/>
                </Tab.Pane>

                <Tab.Pane eventKey="third">           
                  <CostOpPanel 
                    configData={fullData.configData} 
                    onDataChange={updateData}/>
                </Tab.Pane>

                <Tab.Pane eventKey="fourth">
                  <ResultPanel 
                    resultData={fullData.resultData}
                    onDataChange={updateResult}
                    dataGraph={fullData.dataGraph}
                    onUpdateBarGraph={updateBarGraph}
                    onUpdateSelectedResult={updateSelectedResult}/>
                </Tab.Pane>

                <Tab.Pane eventKey="fifth">
                  <Costumers 
                    costumerData={costumers.costumerData} 
                    costumerHeader={costumerHeaderIni}
                    onDataChange={this._onCustumersDataChange}
                    postData={postData}
                    fetchData={fetchData}/>
                </Tab.Pane>

                <Tab.Pane eventKey="sixth">
                  <Proposal
                    costumer={costumers.costumerData} 
                    resultData={fullData.resultData}
                    systemData={fullData.systemData}
                    onSendProposal={sendProposal}
                    dataGraph={fullData.dataGraph}
                    initApp={initApp}/>
                </Tab.Pane>
              
              </Tab.Content>
            </Col>
            <Col sm={2}>
              <SummaryPanel 
                resultData={fullData.resultData}
                systemData={fullData.systemData}
                selectedResult={fullData.selectedResult}/>       
            </Col>
          </Row>
        </Tab.Container>

      </div>
    );
  }
}

// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    fullData: state.data,
    costumers: state.costumers,
  }
);

// Thunk
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchData: (url) => dispatch(SystemActionCreators.costumerFetchData(url)),
//   };
// };

// Subscribes any changes in state to the container Scoreboard 
// export default withRouter(connect(mapStateToProps)(Body))
export default connect(mapStateToProps/*, mapDispatchToProps*/)(Body)
