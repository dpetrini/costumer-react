import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table } from 'react-bootstrap';  

import Excel from './Excel';
import Card from './Cards'

import CostumerForm from './CostumerForm'

import '../../../css/components/Costumer.css'; 

import * as config from '../config'
console.log('config', config)

class Costumers extends Component {
  
  // ES7 Property Initializers - babel stage-0
  // http://egorsmirnov.me/2015/06/14/react-and-es6-part2.html
  state = {
    newCostumer: false,
    selectedId: -1,
  };

  // For costumer selection notify the main redux state and this state 
  onRowClick(e) {
    let row = e.target.dataset.row
    this.props.selectCostumerId(row);
    this.setState ({ 
      selectedId: row,
    });
  }
  
  // If Costumer data changes, you know.
  _fireOnCostumerDataChange(costumerData) {
    this.props.onDataChange(costumerData);
  }

  // Add the new costumer from popup
  onCostumerDataChange(costumerData) {

    this.props.postData(config.COSTUMERS_URL, costumerData);
    console.log(costumerData)

    // This is not a good place for below update fetch.
    // TODO: solve it
    this.props.fetchData(config.COSTUMERS_URL);

  }

  // New Costumer Popup life cycle Call
  callNewCostumerPopup() {
    this.setState ({ 
      newCostumer: true,
    });
  }

  // New Costumer Popup life cycle Close
  onCloseNewCostumerPopup() {
    this.setState ({ 
      newCostumer: false,
    });
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

  // Fetch initial data
  componentDidMount () {
    this.props.fetchData(config.COSTUMERS_URL);
  }

  render() {
    return (
      <div className={'main-screen-body'} >

        <Card
          title="Lista de clientes"
          category="Selecione um cliente para enviar proposta ou use o botão abaixo para criar um novo"
          contentClass="table-responsive table-full-width"
          content={
            <Table striped hover>
              <thead>
                <tr>
                  {
                    this.props.costumerHeader.map((prop, key) => {
                      return (
                        <th key={key}>{prop}</th>
                      );
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  this.props.costumerData.map((element, key) => {
                    if ( this.state.selectedId === element._id)
                      return (
                        <tr key={key} className={'selectedCostumer'} onClick={this.onRowClick.bind(this)}>                    
                          <td data-row = {element._id} >{element.firstName} </td>
                          <td data-row = {element._id} >{element.lastName}</td>
                          <td data-row = {element._id} >{element.contactNumber}</td>
                          <td data-row = {element._id} >{element.email}</td>
                        </tr>
                      )
                    else 
                      return (
                        <tr key={key} onClick={this.onRowClick.bind(this)}>                    
                          <td data-row = {element._id} >{element.firstName} </td>
                          <td data-row = {element._id} >{element.lastName}</td>
                          <td data-row = {element._id} >{element.contactNumber}</td>
                          <td data-row = {element._id} >{element.email}</td>
                        </tr>
                      )
                  })
                }
              </tbody>
            </Table>
          }
        />

        <p>
          <Button onClick={this.callNewCostumerPopup.bind(this)} >Novo Cliente »</Button>
        </p>
        {this.renderPopup(this.state.newCostumer, 'Novo Cliente', 
          <CostumerForm onDataChange={this.onCostumerDataChange.bind(this)}/>, 
          this.onCloseNewCostumerPopup.bind(this))}
      </div>
    );
  }
}
  
Costumers.propTypes = {
  costumerData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  costumerHeader: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onDataChange: PropTypes.func.isRequired,
  postData:PropTypes.func.isRequired,
  fetchData:PropTypes.func.isRequired,
  selectCostumerId: PropTypes.func.isRequired,
}

export default Costumers;
