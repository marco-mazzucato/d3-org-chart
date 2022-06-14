import React, { Component } from "react";
import { OrgChart } from "d3-org-chart";
import user from "./user-black-shape.png";
import company from "./home-page.png";
import * as d3 from "d3";


export default class OrgChartComponent extends Component {
	constructor(props) {
		super(props);
		this.createDiagram = this.createDiagram.bind(this);
	}

	componentDidMount() {
		this.createDiagram();
	}

	/*componentDidUpdate(prevProps, prevState) {
		this.createDiagram();
	}*/

	render() {

		return (
			<div>
				<div ref={(node) => (this.node = node)} />
			</div>
		);
	}

	createDiagram() {
    let array = this.props.data;

    const azienda = {name: "ISOKIT S.R.L.", nodeId: 1, parentNodeId: null};//prendere il nome dal json
    const shareholders = {name: "PROPRIETARI", nodeId: 2, parentNodeId: 1};
    const directors = {name: "DIRETTORI", nodeId: 3, parentNodeId: 1};
    array = [ azienda, shareholders, directors, ...array];

    for(var i=3; i<13; i++){//sistemare
      array[i].nodeId = i+4;
      if(i<8)
        {array[i].parentNodeId = 2;
        array[i].chiave="prop";}
      else
        {array[i].parentNodeId = 3;
        array[i].chiave="dir";}
    }

    var newData = array.map((d)=>{
      const width =  350
      const height = 160 
      const cornerShape = 'ORIGINAL'; 
      const nodeImageWidth = 100;
      const nodeImageHeight = 100;
      const centerTopDistance = 0;
      const centerLeftDistance = 0;
      const expanded = false;
      const  titleMarginLeft = nodeImageWidth/2+20+centerLeftDistance;
      const  contentMarginLeft = width/2+25;
      var ritorno = {
        nodeId:d.nodeId,
        parentNodeId:d.parentNodeId,
        name:d.name,
        width:width,
        height:height,
        borderWidth:0.6,
        borderRadius:0,
        borderColor:{
            red:15,
            green:140,
            blue:121,
            alpha:0.7,
        },
        backgroundColor:{
          red:247,
          green:247,
          blue:249,
          alpha:0.4,
        },
        //da controllare quali div togliere
        template:`<div style="color:#2A2A2A;height:160px;margin-top:-30px;background-image: linear-gradient(to right , #FFFFFF, #ECEDF0);">
                      <div style="margin-left:${titleMarginLeft+77}px;
                                  margin-top:30px;
                                  padding-top:20px;
                                  font-size:20px;
                                  font-weight:bold;
                            ">${d.name} </div>
                    <div style="margin-left:${titleMarginLeft+77}px;
                                  margin-top:3px;
                                  font-size:16px;
                            ">placeHolder </div>

                    <div style="margin-left:${titleMarginLeft+77}px;
                                  margin-top:3px;
                                  font-size:14px;
                            ">placeHolder</div>

                    <div style="margin-left:${contentMarginLeft+70}px;
                                margin-top:15px;
                                font-size:13px;
                                position:absolute;
                                bottom:5px;
                                ">
                          <div>placeHolder</div>
                          <div style="margin-top:5px">placeHolder</div>
                    </div>
                  </div>`,
        connectorLineColor:{
          red:59,
          green:60,
          blue:63,
          alpha:1
        },
        connectorLineWidth:2,
        dashArray:'',
        expanded:expanded}
        //inserisci qui i campi necessari dal json
        if(d.chiave == "prop"){
          ritorno.type = d.shareholderType;
          ritorno.chiave = d.chiave;
          ritorno.firstName = d.firstName;
          ritorno.surname = d.surname;
          ritorno.fisc = d.id;
          ritorno.address = d.address.simpleValue;
          ritorno.percent = d.percentSharesHeld;
          ritorno.type = d.shareholderType;
        }
        if(d.chiave == "dir"){
          ritorno.chiave = d.chiave;
          ritorno.firstName = d.firstName;
          ritorno.surname = d.surname;
          ritorno.fisc = d.id;
          ritorno.address = d.address.simpleValue;
          ritorno.luogoNascita = d.placeOfBirth;
          ritorno.dataNascita = d.dateOfBirth;
          ritorno.role = d.positions[0].positionName;
        }

      return ritorno;

        });

		const node = this.node;
    if(!newData){
      return;
    }
    if (!this.chart) {
      this.chart =  new OrgChart();
    }
     this.chart.container(node) 
        .data(newData)
        .svgWidth(500)
        .initialZoom(0.8)
		    .nodeHeight(d=> 160)
        .nodeWidth(d=> 300)
		    .childrenMargin((d) => 40)
        .onNodeClick(d => console.log(this))
        .nodeContent(function (d, i, arr, state) {
          if(i==0){
              return `
                <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                  <div style="box-shadow:10px 10px 10px #C2C3C4;height:${d.height - 32}px;padding-top:0px;background-color:white;border-radius:3%">

                    <img src="${company}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
                  
                  <div style="margin-top:-30px;background-color:none;height:10px;width:${d.width - 2}px;border-radius:1px"></div>

                  <div style="padding:20px; padding-top:40px;text-align:center">
                      <div style="color:black;font-size:30px;font-weight:bold"> ${d.data.name} </div>
                  </div> 
                  </div>     
          </div>
          `}
          if(i==1){
              return `
                <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                  <div style="box-shadow:10px 10px 10px #C2C3C4;height:${d.height - 32}px;padding-top:0px;background-color:white;border-radius:3%">

                    <img src="${user}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
                  
                  <div style="margin-top:-38px;background-color:none;height:10px;width:${d.width - 2}px;border-radius:1px"></div>

                  <div style="padding:20px; padding-top:40px;text-align:center">
                      <div style="color:black;font-size:25px;font-weight:bold"> ${d.data.name} </div>
                      <div style="color:#404040;font-size:14px;margin-top:10px">Numero proprietari: ${d.data._directSubordinates} </div>
                  </div> 
                  </div>     
          </div>
          `}
          if(i==2){
            return `
              <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                <div style="box-shadow:10px 10px 10px #C2C3C4;height:${d.height - 32}px;padding-top:0px;background-color:white;border-radius:3%">

                  <img src="${user}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
                
                <div style="margin-top:-38px;background-color:none;height:10px;width:${d.width - 2}px;border-radius:1px"></div>

                <div style="padding:20px; padding-top:40px;text-align:center">
                    <div style="color:black;font-size:25px;font-weight:bold"> ${d.data.name} </div>
                    <div style="color:#404040;font-size:14px;margin-top:10px">Numero direttori: ${d.data._directSubordinates} </div>
                </div> 
                </div>     
        </div>
        `}
              if(d.data.chiave=="prop"){
                return `
              <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                <div style="box-shadow:10px 10px 10px #C2C3C4;height:${d.height - 32}px;padding-top:0px;background-color:white;border-radius:3%">

                  <img src=" ${user}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

                <div style="padding:10px; padding-top:10px;text-align:center">
                    <div style="color:#5890f8;font-size:20px;font-weight:bold;margin-bottom:10px"> ${d.data.name} </div>
                    <div style="color:#404040;font-size:14px;margin-top:15px"> Quota: ${d.data.percent}%</div>
                </div>    
          </div>
        `}
        return `
              <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                <div style="box-shadow:10px 10px 10px #C2C3C4;height:${d.height - 32}px;padding-top:0px;background-color:white;border-radius:3%">

                  <img src=" ${user}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

                <div style="padding:10px; padding-top:10px;text-align:center">
                    <div style="color:#5890f8;font-size:20px;font-weight:bold;margin-bottom:10px"> ${d.data.name} </div>
                    <div style="color:#404040;font-size:14px;margin-top:15px"> ${d.data.role} </div>
                </div>    
          </div>
        `
        ;})
        .render();
    }
}