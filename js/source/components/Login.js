import React, { Component } from 'react';
import { Row, Col, Tab, Nav, NavItem, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SystemActionCreators from '../actions/all';
import * as config from '../config';

// baseado no CostumerForm.js => refatorar DRY no futuro

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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  _onSubmit(e) {

    const { dispatch } = this.props;
    
    //  loginPostData: (url) => dispatch(SystemActionCreators.loginPostData(url));


    const loginPostData = bindActionCreators((url, data) =>SystemActionCreators.loginPostData(url, data), dispatch);


    e.preventDefault();

    // Check if fields are validated
    if (this.state.emailValid != 'success' /*|| this.state.phoneValid != 'success'*/) {
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

//BRYPT PASSWORD...

    const deviceData = {
      email: this.state.emailAddress,
      password: this.state.password, 
    };

    console.log(deviceData)

    loginPostData(config.LOGIN_URL, deviceData)

    // Will insert message of deletion/edition address: 
    this.setState({
      messageValidation: 'Success! Please close to return',
    });

    // this.fireOnresultDataChange(deviceData);
    
  }

  // Send information about new point to parent
  fireOnresultDataChange(data) {
    // this.props.onDataChange(data);
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



  render () { 
    return (
      <div className={'main-screen'}>
        <Tab.Container 
          defaultActiveKey={'first'} 
          id="left-tabs-example" >
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked={true}>
                <NavItem eventKey="first">
            Login             
                </NavItem> 
              </Nav>    
            </Col>

            <Col sm={8}>
              <Tab.Content animation={true}>
                <Tab.Pane eventKey="first">

                  <Form horizontal={true} onSubmit={this._onSubmit.bind(this)} action="">

                    <FormRow name={'Email'} text={'your email here'} required={true}
                      onChange={this._emailValidate.bind(this)}
                      validation={this.state.emailValid} />

                    <FormRow name={'Password'} text={'your password'} required={true}
                      onChange={this._inputChange.bind(this, 'password')}
                    />

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

                
                </Tab.Pane>
              </Tab.Content>

            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }

}

// export default Login;

// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    authed: state.authorized,
  }
);

// Thunk
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginPostData: (url) => dispatch(SystemActionCreators.loginPostData(url)),
//   };
// };

// Subscribes any changes in state to the container Scoreboard 
// export default withRouter(connect(mapStateToProps)(Body))
export default connect(mapStateToProps/*, mapDispatchToProps*/)(Login)
