import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';  

import Excel from './Excel';
import CostumerForm from './CostumerForm'

import * as config from '../config'
console.log("config", config)

class Costumers extends Component {
  
  // ES7 Property Initializers - babel stage-0
  // http://egorsmirnov.me/2015/06/14/react-and-es6-part2.html
  state = {
    newCostumer: false,
    costumerIndex: null,
    localCostumer: [],
  };

  // For costumer list, notify the index
  _onExcelRowChange(row) {
    this.setState({
      costumerIndex: row,
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

  componentWillReceiveProps(nextProps) {

  }


  render() {

    return (
      <div className={'main-screen-body'} >
        <Excel 
          initialData={this.props.costumerData} 
          headers={this.props.costumerHeader} 
          onDataChange={this._onExcelRowChange.bind(this)}
          selectRow={true}/>
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
  costumerData: PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)).isRequired,
  costumerHeader: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onDataChange: PropTypes.func.isRequired,
  postData:PropTypes.func.isRequired,
  fetchData:PropTypes.func.isRequired,  
}

export default Costumers;
