import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as SystemActionCreators from '../actions/all';
import * as config from '../config';

import PricingContainer from './PricingContainer'
import Portfolio from './Portfolio'

import '../../../css/components/Login.css';

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

    this.state = {};

  }

  componentWillReceiveProps(newProps) {
   
    console.log(this.props)
    console.log('[Login] Will Receive Props', this.props.authorized)

    if (this.props.authorized)
      this.props.history.push('/');
  }

  // If user logged in jump out
  componentWillMount() {

    console.log('teste', this.props.testProp)

    if (this.props.authorized)
      this.props.history.push('/');
  }
      
  componentDidUpdate() {
    if (this.props.authorized)
      this.props.history.push('/');
  }
      
  _onSubmit(e) {

    // redux binds
    const { dispatch } = this.props;
    const loginPostData = bindActionCreators(
      (url, data) => SystemActionCreators.loginPostData(url, data), 
      dispatch);
    
    e.preventDefault();

    // Check if fields are validated
    if (this.state.emailValid != 'success') {
      this.setState({
        messageValidation: 'Please fill correctly',
      });
      return;
    }

    //BRYPT PASSWORD...no... use SSL

    const deviceData = {
      email: this.state.emailAddress,
      password: this.state.password, 
    };

    console.log(deviceData)

    loginPostData(config.LOGIN_URL, deviceData)
    console.log(config.LOGIN_URL)

    // Will insert message of deletion/edition address: 
    this.setState({
      messageValidation: 'Success! Please wait...',
    });

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

        <div className={'jumbotron text-center'}>
          
          <h1>Proposta FV</h1> 
          <br />
          <p>Use nossa aplicação para enviar propostas para todos seus clientes sem demoras.</p> 
          <br />
          <br />
          <br />

          <Row >
            <Col sm={4} />
            <Col sm={4}>
              <Form horizontal={true} onSubmit={this._onSubmit.bind(this)} action="">
                <FormRow name={'Email'} text={'your email here'} required={true}
                  onChange={this._emailValidate.bind(this)}
                  validation={this.state.emailValid} />
                <FormRow name={'Password'} text={'your password'} required={true}
                  onChange={this._inputChange.bind(this, 'password')}
                />
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={8} smOffset={1}>
                    <p className="text-left" style={{color: 'red'}}> {this.state.messageValidation}</p>
                  </Col>
                  <Col sm={2}>
                    <Button type="submit" className={'btn btn-default btn-lg'}>
                          Login
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>

        </div>

        <div className={'container-fluid'}>
          <Row>
            <Col sm={8}>
              <h2>Resultados gráficos </h2>
              <h4>Que indicam a economia gerada</h4> 
              <p>Consumo com a energia solar e retorno do investimento</p>
              <button className={'btn btn-default btn-lg'}>Get in Touch</button>
            </Col>
            <Col sm={4}>
              <span className={'glyphicon glyphicon-signal logo'} />
            </Col>
          </Row>
        </div>

        <div className={'container-fluid bg-grey'}>
          <Row>
            <Col sm={4}>
              <span className={'glyphicon glyphicon-globe logo'} /> 
            </Col>
            <Col sm={8}>
              <h2>Valorize a consciência ecológica</h2>
              <h4><strong>Você vai atingir:</strong> Rápido tempo de resposta</h4> 
              <p><strong>Reconhecimento:</strong> Seu cliente vai perceber a diferença no atendimento!</p>
            </Col>
          </Row>
        </div>

        <PricingContainer />
       
        <Row>
          <Col sm={12}>
            <img src={'/images/main.jpg'} className={'img-responsive'}/>
          </Col>
        </Row>

        <Portfolio />
        
      </div>
    );
  }
}

// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    authorized: state.authorized,
  }
);

// Subscribes any changes in state to the container Scoreboard 
export default withRouter(connect(mapStateToProps)(Login));
