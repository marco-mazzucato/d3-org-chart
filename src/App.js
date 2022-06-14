import React, { Component } from "react";
import OrgChartComponent from "./grafico/components/OrgChart";
import {chartData} from "./shareholders"; 

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: chartData 
    };
  }

  render() { 
    return (
    <div className="App">
      <OrgChartComponent data={this.state.data} />
    </div>
  );}
}
