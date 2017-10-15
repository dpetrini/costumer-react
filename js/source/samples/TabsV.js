// Tabs Vertical bootstrap React Test
import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';


// const TabsInstance = (
const TabsInstance = React.createClass({
  getInitialState() {
    return {
      key: "first",
    };
  },

  handleSelect(key) {
    console.log('selected ' + key);
    this.setState({key});
  },

  render() {
    return (
      <Tab.Container activeKey={this.state.key} onSelect={this.handleSelect}  id="left-tabs-example" >
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="first">
            Tab 1
              </NavItem>
              <NavItem eventKey="second">
            Tab 2
              </NavItem>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              <Tab.Pane eventKey="first">
            Tab 1 content
              </Tab.Pane>
              <Tab.Pane eventKey="second">
            Tab 2 content
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
});


export default TabsInstance;
