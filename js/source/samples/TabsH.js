// Tabs bootstrap React Test
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const ControlledTabs = React.createClass({
  getInitialState() {
    return {
      key: 1
    };
  },

  handleSelect(key) {
    console.log('selected ' + key);
    this.setState({key});
  },

  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
        <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
        <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
      </Tabs>
    );
  }
});

export default ControlledTabs;

// ReactDOM.render(<ControlledTabs />, mountNode);