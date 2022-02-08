import React, { Component } from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"
import SpinnerBlock from "./utils/infoblocks/SpinnerBlock"

import styles from "./utils/infoblocks/InfoBlock.module.css"
import {Container, Row, Col} from 'react-bootstrap';

import creds from "../creds/pass.json";

/**
 *
 *  @Return page with rendered infoblocks containting power data  
 */

class power extends Component {
    
   state = { 
        usage: [],
        loading_usage: true,
        usageDaily: [],
        loading_usageDaily: true,
        energyToday: [],
        loading_energyToday: true,
        energyThisMonth: [],
        loading_energyThisMonth: true,
        energy1Month: [],
        loading_energy1Month: true,
        energy2Months: [],
        loading_energy2Months: true,
        energy3Months: [],
        loading_energy3Months: true,
        graphHeight:"400",
        graphWidth: "100%",
        secsMonth: 2592000000,
        secsTillNow: new Date().getTime() 
     }
     
    componentDidMount(){

        //GET requests for all info needed
        this.getRequest("/power", "usage", "loading_usage");
        this.getRequest("/power/daily", "usageDaily", "loading_usageDaily")
        this.getRequest("/energy/today", "energyToday", "loading_energyToday");
        this.getRequest("/energy/month/0", "energyThisMonth", "loading_energyThisMonth");
        this.getRequest("/energy/month/1", "energy1Month", "loading_energy1Month");
        this.getRequest("/energy/month/2", "energy2Months", "loading_energy2Months");
        this.getRequest("/energy/month/3", "energy3Months", "loading_energy3Months");
        
    }
    
    //define parametric get request
    getRequest = (url,res,load) => {
        fetch("http://"+creds.ip.api+url)
        .then(response => response.json())
        .then(response => this.setState({ 
            [load]: false,
            [res]: response.data
        })).catch(err => console.error(err))

    }

    //define methods 
    renderV1 = ({ id, Phase_1_voltage_RMS }) => <div key={id+1}>{Phase_1_voltage_RMS+" V"}</div> 
    renderV2 = ({ id, Phase_2_voltage_RMS }) => <div key={id+2}>{Phase_2_voltage_RMS+" V"}</div>    
    renderV3 = ({ id, Phase_3_voltage_RMS }) => <div key={id+3}>{Phase_3_voltage_RMS+" V"}</div> 
    
    renderA1 = ({ id, Phase_1_current_RMS }) => <div key={id+11}>{Phase_1_current_RMS+" A"}</div> 
    renderA2 = ({ id, Phase_2_current_RMS }) => <div key={id+12}>{Phase_2_current_RMS+" A"}</div>    
    renderA3 = ({ id, Phase_3_current_RMS }) => <div key={id+13}>{Phase_3_current_RMS+" A"}</div> 

    renderW1 = ({ id, Phase_1_Active_Power }) => <div key={id+21}>{Phase_1_Active_Power+" W"}</div> 
    renderW2 = ({ id, Phase_2_Active_Power }) => <div key={id+22}>{Phase_2_Active_Power+" W"}</div>    
    renderW3 = ({ id, Phase_3_Active_Power }) => <div key={id+23}>{Phase_3_Active_Power+" W"}</div> 

    renderPF1 = ({ id, Phase_1_PF }) => <div key={id+31}>{Phase_1_PF}</div> 
    renderPF2 = ({ id, Phase_2_PF }) => <div key={id+32}>{Phase_2_PF}</div>    
    renderPF3 = ({ id, Phase_3_PF }) => <div key={id+33}>{Phase_3_PF}</div> 

    renderF = ({ id, Phase_1_frequency }) => <div key={id+34}>{Phase_1_frequency+" Hz"}</div> 

    renderkWh = ({ id, energy }) => <div key={id+41}>{energy+" kWh"}</div>
    renderE = ({ id, price }) => <div key={id+42}>{price+" €"}</div>
    renderH = ({ id, health }) => <div key={id+43}>{health+" %"}</div> 
 

    render() { 
        
        //object destructuring makes it easier to handle variables in tags
        const {
            usage, usageDaily,
            loading_usage, loading_usageDaily,
            energyToday ,loading_energyToday,
            energyThisMonth, loading_energyThisMonth,
            energy1Month, loading_energy1Month,
            energy2Months, loading_energy2Months,
            energy3Months, loading_energy3Months,
            secsMonth, secsTillNow
        } = this.state;

        return (  
        <div>
            <Container fluid>
                <h1 className={styles.title}>Current power usage</h1>
                    <Row noGutters="true">
                        {/* While fetcing display spinnerBlock when done display infoBlok with fetched data  */}
                        <Col xs >{ loading_usage ? <SpinnerBlock/> : <InfoBlock heading="Voltage" info={usage.map(this.renderV1)} info2={usage.map(this.renderV2)} info3={usage.map(this.renderV3)} type="power"/>}</Col>
                        <Col xs >{ loading_usage ? <SpinnerBlock/> : <InfoBlock heading="Current" info={usage.map(this.renderA1)} info2={usage.map(this.renderA2)} info3={usage.map(this.renderA3)} type="power"/>}</Col>
                        <Col xs >{ loading_usage ? <SpinnerBlock/> : <InfoBlock heading="Power" info={usage.map(this.renderW1)} info2={usage.map(this.renderW2)} info3={usage.map(this.renderW3)} type="power"/>}</Col>
                        <Col xs >{ loading_usage ? <SpinnerBlock/> : <InfoBlock heading="Cos Φ" info={usage.map(this.renderPF1)} info2={usage.map(this.renderPF2)} info3={usage.map(this.renderPF3)} type="power"/>}</Col>
                        <Col xs >{ loading_usage ? <SpinnerBlock/> : <InfoBlock heading="Frequency" info={usage.map(this.renderF)} info2="" info3="" type="weather"/>}</Col>
                    </Row>

            </Container>
            <Container fluid>
                <h1 className={styles.title}>Daily average of power usage</h1>
                    <Row noGutters="true">
                        <Col xs >{ loading_usageDaily ? <SpinnerBlock/> : <InfoBlock heading="Voltage" info={usageDaily.map(this.renderV1)} info2={usageDaily.map(this.renderV2)} info3={usageDaily.map(this.renderV3)} type="power"/>}</Col>
                        <Col xs >{ loading_usageDaily ? <SpinnerBlock/> : <InfoBlock heading="Current" info={usageDaily.map(this.renderA1)} info2={usageDaily.map(this.renderA2)} info3={usageDaily.map(this.renderA3)} type="power"/>}</Col>
                        <Col xs >{ loading_usageDaily ? <SpinnerBlock/> : <InfoBlock heading="Power" info={usageDaily.map(this.renderW1)} info2={usageDaily.map(this.renderW2)} info3={usageDaily.map(this.renderW3)} type="power"/>}</Col>
                        <Col xs >{ loading_usageDaily ? <SpinnerBlock/> : <InfoBlock heading="Cos Φ" info={usageDaily.map(this.renderPF1)} info2={usageDaily.map(this.renderPF2)} info3={usageDaily.map(this.renderPF3)} type="power"/>}</Col>
                        <Col xs >{ loading_usageDaily ? <SpinnerBlock/> : <InfoBlock heading="Frequency" info={usageDaily.map(this.renderF)} info2="" info3="" type="weather"/> }</Col>
                    </Row>
            </Container>

            <Container fluid>
                <h1 className={styles.title}>Energy usage</h1>
                    <Row noGutters="true">
                        <Col xs >{ loading_energyToday ? <SpinnerBlock/> : <InfoBlock heading="Today" info={energyToday.map(this.renderE)} info2={energyToday.map(this.renderH)} info3={energyToday.map(this.renderkWh)} type="energy"/>}</Col>
                        <Col xs >{ loading_energyThisMonth ? <SpinnerBlock/> : <InfoBlock heading="This month" info={energyThisMonth.map(this.renderE)} info2={energyThisMonth.map(this.renderH)} info3={energyThisMonth.map(this.renderkWh)} type="energy"/>}</Col>
                        <Col xs >{ loading_energy1Month ? <SpinnerBlock/> : <InfoBlock heading={new Date(secsTillNow-(secsMonth*1)).toLocaleString("en-US", { month: "long" })} info={energy1Month.map(this.renderE)} info2={energy1Month.map(this.renderH)} info3={energy1Month.map(this.renderkWh)} type="energy"/>}</Col>
                        <Col xs >{ loading_energy2Months ? <SpinnerBlock/> : <InfoBlock heading={new Date(secsTillNow-(secsMonth*2)).toLocaleString("en-US", { month: "long" })} info={energy2Months.map(this.renderE)} info2={energy2Months.map(this.renderH)} info3={energy2Months.map(this.renderkWh)} type="energy"/> }</Col>
                        <Col xs >{ loading_energy3Months ? <SpinnerBlock/> : <InfoBlock heading={new Date(secsTillNow-(secsMonth*3)).toLocaleString("en-US", { month: "long" })}  info={energy3Months.map(this.renderE)} info2={energy3Months.map(this.renderH)} info3={energy3Months.map(this.renderkWh)} type="energy" /> }</Col>
                    </Row>
            </Container>

            <Container fluid centre>
                <h1 className={styles.title}>Graphs</h1>
                <h1 className={styles.subtitle}> For past 3 hours</h1>
                        {/* starts loading after last infoBlock is rendered */}
                        { loading_energy3Months ?   <div></div>:
                        <Container fluid centre>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Voltage" src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=12"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                            </div>
                        </Row>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Current" src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=2"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                            </div>
                        </Row>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Power" src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=4"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                            </div>
                        </Row>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Frequency" src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=10"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                            </div>
                        </Row>
                    </Container> }
            </Container>
        </div> 
        );
    }
}
 
export default power;

