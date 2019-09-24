import * as React from 'react';
import styles from './CmlChartDemo.module.scss';
import { ICmlChartDemoProps } from './ICmlChartDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import TComponent from './TComponent';
import WIPChart from './WIPChart';
import NoOfContracts from './NoOfContracts';
import RegionWiseChart from './RegionWiseChart';
import GetAzureData from './GetAzureData';

import { IWebPartContext } from "@microsoft/sp-webpart-base";
// import TestClass from './TestClass';

export interface ICmlChartDemoState{
  context:IWebPartContext
}
export default class CmlChartDemo extends React.Component<ICmlChartDemoProps, any> {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
componentDidMount(){
  window.onresize = function () {
    this.forceUpdate();
  }.bind(this);
}
public render(): React.ReactElement<ICmlChartDemoProps> {
  return (
    <div className='container' style={containerStyle}>
      <div style={window.innerWidth > 600 ? gridStyle : gridStyleViewport}><WIPChart context={this.props.context}></WIPChart></div>
      <div style={window.innerWidth > 600 ? gridStyle : gridStyleViewport}><TComponent context={this.props.context}></TComponent></div>
      {/* <div style={window.innerWidth > 600 ? gridStyle : gridStyleViewport}><GettingExiredContracts></GettingExiredContracts></div> */}
      <div style={window.innerWidth > 600 ? gridStyle : gridStyleViewport}><NoOfContracts context={this.props.context}></NoOfContracts></div>
      <div style={window.innerWidth > 600 ? gridStyle : gridStyleViewport}><RegionWiseChart context={this.props.context}></RegionWiseChart></div>
      <div style={gridStyleFullWidth}><GetAzureData></GetAzureData></div>
    </div>
  );
}
}
const containerStyle = {
'display': 'flex',
'flex-wrap': 'wrap',
'align-items': 'flex-start',
'flex-direction': 'row',
}
const gridStyle = {
'background' : 'aliceblue',
border: '2px solid black',
margin: '5px',
'box-shadow': '3px 3px 8px 0px rgba(0,0,0,0.3)',
'width': '48%',
// height: '260px'
'height' : 'fit-content'
}
const gridStyleFullWidth = {
'background' : 'aliceblue',
border: '2px solid black',
margin: '5px',
'box-shadow': '3px 3px 8px 0px rgba(0,0,0,0.3)',
'width': '100%',
// height: '260px'
'height' : 'fit-content'
}
const gridStyleViewport = {
'background' : 'aliceblue',
border: '2px solid black',
margin: '5px',
'box-shadow': '3px 3px 8px 0px rgba(0,0,0,0.3)',
'width': '100%',
// height: '260px'
'height' : 'fit-content'
}