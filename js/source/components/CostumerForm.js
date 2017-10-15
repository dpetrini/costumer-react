import React, { Component } from 'react'; 
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button, Col, ControlLabel, Form } from 'react-bootstrap';


// Helper stateless component - form line with validation and onChange callback parameters
//  same onBlur
const FormRow = ({name, text, required, onChange, validation}) => {
  return (
    <FormGroup validationState={validation}>
      <Col componentClass={ControlLabel} sm={3}>
        {name}
      </Col>
      <Col sm={9}>
        <FormControl className="text-left" type="text" 
          name={name} 
          required={required}
          placeholder={text} 
          onChange={onChange}/>
        <FormControl.Feedback />                 
      </Col>
    </FormGroup>
  );
}

class CostumerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  _onSubmit(e) {
    e.preventDefault();

    // Check if fields are validated
    if (this.state.emailValid != 'success' || this.state.phoneValid != 'success') {
      this.setState({
        messageValidation: 'Please fill correctly',
      });
      return;
    }

    // From here on will submit

    // const deviceData	= {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   contactNumber: this.state.contactNumber,
    //   emailAddress: this.state.emailAddress,
    // };

    const deviceData = [
      this.state.firstName, 
      this.state.lastName, 
      this.state.contactNumber, 
      this.state.emailAddress,
    ];

    console.log(deviceData)

    // Will insert message of deletion/edition address: 
    this.setState({
      messageValidation: 'Success! Please close to return',
    });

    this.fireOnresultDataChange(deviceData);
    
  }

  // Send information about new point to parent
  fireOnresultDataChange(data) {
    this.props.onDataChange(data);
  }

  // Expects "success","warning","error",null
  _emailValidate(e) {
    const value = e.target.value; 

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(value)) {
      this.setState({
        emailValid: 'success',
        emailAddress: e.target.value,
      });
    } else {
      this.setState({emailValid: 'error'});
    }
  }

  _phoneValidate(e) {
    const value = e.target.value; 

    // +XX XXX XXXX XXXX | 00XX XXX XXXX XXXX 
    // original: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const re2 = /^(\+?|[0]{2})([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (re.test(value) || re2.test(value)) {
      this.setState({
        phoneValid: 'success',
        contactNumber: e.target.value,
      });
    } else {
      this.setState({phoneValid: 'error'});
    }
  }

  _inputChange(fieldName, e) {

    this.setState({
      [fieldName]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Form horizontal={true} onSubmit={this._onSubmit.bind(this)} action="">
  
          <FormRow name={'First Name'} text={'your first name'} required={true}
            onChange={this._inputChange.bind(this, 'firstName')}
          />

          <FormRow name={'Last Name'} text={'your last name'} required={false}
            onChange={this._inputChange.bind(this, 'lastName')}
          />

          <FormRow name={'Contact Number'} text={'your contact number'} required={true}
            onChange={this._phoneValidate.bind(this)}
            validation={this.state.phoneValid} />

          <FormRow name={'Email'} text={'your email here'} required={true}
            onChange={this._emailValidate.bind(this)}
            validation={this.state.emailValid} />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={9} smOffset={1}>
              <p className="text-left" style={{color: 'red'}}> {this.state.messageValidation}</p>
            </Col>
            <Col sm={2}>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>

        </Form>
     
      </div>
    );
  }
}

CostumerForm.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default CostumerForm;
