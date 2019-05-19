import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './App.css';
import AboutOut from './Components/AboutOut';
import PopulationGrowthSimulator from './Components/PopulationGrowthSimulator';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    console.log(`selected ${key}`);
    this.setState({ key });
  }


  render() {
    return (
      <div className="App">

        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab"
        >
          <Tab eventKey={1} title="Simulador de Crecimiento Poblacional">
            <PopulationGrowthSimulator />
          </Tab>
          <Tab eventKey={2} title="Creditos">
            <AboutOut />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
