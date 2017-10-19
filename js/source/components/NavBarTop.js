import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


import '../../../css/components/NavBarTop.css';

const NavBarTop = (props) => {
  return (
    <div className={'main-screen'}>
      <Navbar inverse={true} >
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer exact to="/"><a href="#">Solar Cost Calculator</a></LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true} >
          <LinkContainer exact to="/"><NavItem href="#">Home</NavItem></LinkContainer>

          { !props.authorized 
            ? <LinkContainer to="/login"><NavItem href="#">Login</NavItem></LinkContainer>
            : null }

          { props.authorized 
            ? <LinkContainer to="/help"><NavItem href="#">Ajuda</NavItem></LinkContainer>
            : null }

          { props.authorized 
            ? <LinkContainer to="/myquotes"><NavItem href="#">Minhas Cotações</NavItem></LinkContainer>
            : null }

          { props.authorized 
            ? <LinkContainer to="/userconfig"><NavItem href="#">Usuário</NavItem></LinkContainer>
            : null }

          { props.authorized 
            ? <LinkContainer to="/about"><NavItem href="#">Sobre</NavItem></LinkContainer> 
            : null }
        
          { props.authorized 
            ? <LinkContainer to="/logout"><NavItem href="#">Logout</NavItem></LinkContainer>
            : null }

        </Nav>
      </Navbar>
    </div>
  );
}

// export default NavBarTop

const mapStateToProps = state => (
  { 
    authorized: state.authorized,
  }
);

// Thunk
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginPostData: (url) => dispatch(SystemActionCreators.loginPostData(url)),
//   };
// };

// Subscribes any changes in state to the container Scoreboard 
// export default connect(mapStateToProps/*, mapDispatchToProps*/)(Login)
export default withRouter(connect(mapStateToProps)(NavBarTop));
