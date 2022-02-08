import React, { Component } from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"
import SpinnerBlock from "./utils/infoblocks/SpinnerBlock"

import styles from "./utils/infoblocks/InfoBlock.module.css"
import {Container, Row, Col} from 'react-bootstrap';

//read api ip from file 
import creds from "../creds/pass.json";

/**
 * 
 * @Returns Page with rendered infoblocks containing weather data 
*/

class weather extends Component {
    state = { 
        napoved: [],
        loading_napoved: true,
        napovedPastWeek: [],
        loading_napovedPastWeek: true,
        graphHeight:"400",
        graphWidth: "100%"
     }

     // good practice lifecycle hook - request after component mounts
     componentDidMount(){
         this.getNapoved();
         this.getNapovedPastWeek();
     }

    // define backend requests for current state 
    getNapoved = () => {
        
        fetch("http://"+creds.ip.api+"/weather")
        .then(response => response.json())
        .then(response => this.setState({ 
            loading_napoved: false,
            napoved: response.data
        }))
        .catch(err => console.error(err))
    }

    // define backend request for one week average k
    getNapovedPastWeek = () => {

        fetch("http://"+creds.ip.api+"/weather/past/week")
        .then(response => response.json())
        .then(response => this.setState({ 
            loading_napovedPastWeek: false,
            napovedPastWeek: response.data
        }))
        .catch(err => console.error(err))
    }

    // define methods 
    renderTemp = ({ id, temp}) => <div key={id+1}>{temp+" °C"}</div>           
    renderPritisk = ({ id, tlak}) => <div key={id+2}>{tlak+" hPa"}</div>         
    renderVlaga = ({ id, vlaznost}) => <div key={id+3}>{vlaznost+" %"}</div>   
    renderOblac = ({ id, oblacnost}) => <div key={id+4}>{oblacnost+" %"}</div>

    render() { 
        
        //object destructuring makes it easier to use variables in tags 
        const {napoved,napovedPastWeek,loading_napoved,loading_napovedPastWeek} = this.state;

        return (  
        <div>
            <Container fluid>
                <h1 className={styles.title}>Current state</h1>
                    <Row noGutters="true">
                        {/* While fetcing display spinnerBlock when done display infoBlok with fetched data  */}
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="Temperature" info={napoved.map(this.renderTemp)} info15="C"info2="" info3="" type="weather"/>}</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="Pressure" info={napoved.map(this.renderPritisk)} info2="" info3="" type="weather"/> }</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="Humidity" info={napoved.map(this.renderVlaga)} info2="" info3="" type="weather"/>}</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="Cloud cover" info={napoved.map(this.renderOblac)} info2="" info3="" type="weather"/>}</Col>
                    </Row>
            </Container>
            <Container fluid>
                <h1 className={styles.title}>One week average</h1>
                    <Row noGutters="true">
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="Temperature" info={napovedPastWeek.map(this.renderTemp)} info15="C"info2="" info3="" type="weather"/>}</Col>
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="Pressure" info={napovedPastWeek.map(this.renderPritisk)} info2="" info3="" type="weather" />}</Col>
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="Humidity" info={napovedPastWeek.map(this.renderVlaga)} info2="" info3="" type="weather"/>}</Col>
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="Cloud cover" info={napovedPastWeek.map(this.renderOblac)} info2="" info3="" type="weather"/>}</Col>
                    </Row>
            </Container>
            <Container fluid centre>
                <h1 className={styles.title}>Graphs</h1>
                <h1 className={styles.subtitle}>For past seven days</h1>
                
                {/* load graphs after last row loads */}
                { loading_napovedPastWeek ?   <div></div> :
                    <Container fluid centre>
                        <Row noGutters="true">
                            
                            <div className={styles.graph}>
                                <iframe title="Temperature" src={`http://10.10.40.140:3000/d-solo/nFiaDURgz/weather?orgId=1&from=${Date.now()-7*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=2`}  width={this.state.graphWidth} height={this.state.graphHeight} frameborder="0"></iframe>
                            </div>
                        </Row>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Pressure" src={`http://10.10.40.140:3000/d-solo/nFiaDURgz/weather?orgId=1&from=${Date.now()-7*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=8`}  width={this.state.graphWidth} height={this.state.graphHeight} frameborder="0"></iframe>
                            </div>
                        </Row>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Humidity"  src={`http://10.10.40.140:3000/d-solo/nFiaDURgz/weather?orgId=1&from=${Date.now()-7*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=4`}  width={this.state.graphWidth} height={this.state.graphHeight} frameborder="0"></iframe>
                            </div>
                        </Row>
                        <Row noGutters="true">
                            <div className={styles.graph}>
                                <iframe title="Cloudy"src={`http://10.10.40.140:3000/d-solo/nFiaDURgz/weather?orgId=1&from=${Date.now()-7*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=6`}  width={this.state.graphWidth} height={this.state.graphHeight} frameborder="0"></iframe>
                            </div>
                        </Row>
                    </Container>
                }
            </Container>
        </div> 
        );
    }
}
 
export default weather;
