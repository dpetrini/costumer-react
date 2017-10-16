import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const NavBarTop = () => {
  return (
    <Navbar inverse={true} >
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer exact to="/"><a href="#">Solar Cost Calculator</a></LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight={true} >
        <LinkContainer exact to="/"><NavItem href="#">Home</NavItem></LinkContainer>
        <LinkContainer to="/login"><NavItem href="#">Login</NavItem></LinkContainer> 
        <LinkContainer to="/help"><NavItem href="#">Ajuda</NavItem></LinkContainer>
        <LinkContainer to="/myquotes"><NavItem href="#">Minhas Cotações</NavItem></LinkContainer>
        <LinkContainer to="/userconfig"><NavItem href="#">Usuário</NavItem></LinkContainer>
        <LinkContainer to="/about"><NavItem href="#">Sobre</NavItem></LinkContainer>       
      </Nav>
    </Navbar>
  );
}

export default NavBarTop
