//vključim knjižnice in zopet
import React, { Component } from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"
import SpinnerBlock from "./utils/infoblocks/SpinnerBlock"


//uvozim css modul zaradi pisave  
import styles from "./utils/infoblocks/InfoBlock.module.css"
import {Container, Row, Col} from 'react-bootstrap';

import creds from "../creds/pass.json";


class weather extends Component {
    //definrial sem spremelnjivko
    state = { 
        napoved: [],
        loading_napoved: true,
        napovedPastWeek: [],
        loading_napovedPastWeek: true,
        graphHeight:"400",
        graphWidth: "100%"
     }

    //počakam da se class mounta in potem naredim api request
    //to je good practice, takemu eventu/funkciji se reče lifecycle hook
     componentDidMount(){
         this.getNapoved();
         this.getNapovedPastWeek();
     }

    // definiram request na backend
    getNapoved = () => {
        //fetch API klic vrne promise
        fetch("http://"+creds.ip.api+"/weather")
        //podatke dobim v json zato moram programu povedati da naj jih jemlje kot json
        .then(response => response.json())
        //vpišem response (promise) v state spremenljivko (react ne updtejta strani ob spremebi kot angular in moraš ročno pognati setstate)
        .then(response => this.setState({ 
            loading_napoved: false,
            napoved: response.data
        }))
        //v primeru napake returnam error -> error bo javil če bo problem z fetchom samim
        .catch(err => console.error(err))
    }

    //definiram metode oziroma funkcije
    //Ker je <div> jsx expression ga lahko uporabljam kot stringe in integerje
    //spodnje ukaze bi lahko izvedel kar v vrstici vendar je tako mogoče bolj pregledno
    renderTemp = ({ id, temp}) => <div key={id+1}>{temp+" °C"}</div>            // {napoved.map(this.renderTemp)}
    renderPritisk = ({ id, tlak}) => <div key={id+2}>{tlak+" hPa"}</div>         // {napoved.map(this.renderPritisk)}
    renderVlaga = ({ id, vlaznost}) => <div key={id+3}>{vlaznost+" %"}</div>   // {napoved.map(this.renderVlaga)}
    renderOblac = ({ id, oblacnost}) => <div key={id+4}>{oblacnost+" %"}</div> // {napoved.map(this.renderOblac)}

    getNapovedPastWeek = () => {
        //fetch API klic vrne promise
        fetch("http://"+creds.ip.api+"/weather/past/week")
        //podatke dobim v json zato moram programu povedati da naj jih jemlje kot json
        .then(response => response.json())
        //vpišem response (promise) v state spremenljivko (react ne updtejta strani ob spremebi kot angular in moraš ročno pognati setstate)
        .then(response => this.setState({ 
            loading_napovedPastWeek: false,
            napovedPastWeek: response.data
        }))
        //v primeru napake returnam error -> error bo javil če bo problem z fetchom samim
        .catch(err => console.error(err))
    }

       renderTemp2 = ({ id, temp}) => <div key={id+2}>{temp+" °C"}</div>            // {napoved.map(this.renderTemp)}
    // renderPritisk = ({ id, tlak}) => <div key={id+2}>{tlak+" hPa"}</div>         // {napoved.map(this.renderPritisk)}
    // renderVlaga = ({ id, vlaznost}) => <div key={id+3}>{vlaznost+" %"}</div>   // {napoved.map(this.renderVlaga)}
    // renderOblac = ({ id, oblacnost}) => <div key={id+4}>{oblacnost+" %"}</div> // {napoved.map(this.renderOblac)}

    render() { 
        //naredim nov objekt napoved ki mu pripišem vrednost objekta state
        //izraz za to je tudi object descructuring 
        const {napoved,napovedPastWeek,loading_napoved,loading_napovedPastWeek} = this.state;

        // const {napovedPastWeek} = this.state;
        return (  
        <div>
            <Container fluid>
                <h1 className={styles.title}>Trenutno stanje</h1>
                    <Row noGutters="true">
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="temperatura" info={napoved.map(this.renderTemp)} info15="C"info2="" info3=""/>}</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="pritisk" info={napoved.map(this.renderPritisk)} info2="" info3="" /> }</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="vlaga" info={napoved.map(this.renderVlaga)} info2="" info3=""/>}</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="oblačnost" info={napoved.map(this.renderOblac)} info2="" info3=""/>}</Col>
                        <Col xs >{ loading_napoved ? <SpinnerBlock/> : <InfoBlock heading="oblačnost" info={napoved.map(this.renderOblac)} info2="" info3=""/>}</Col>
                    </Row>
            </Container>
            <Container fluid>
                <h1 className={styles.title}>Povprečje zadnjega tedna</h1>
                    <Row noGutters="true">
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="temperatura" info={napovedPastWeek.map(this.renderTemp)} info15="C"info2="" info3=""/>}</Col>
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="pritisk" info={napovedPastWeek.map(this.renderPritisk)} info2="" info3="" />}</Col>
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="vlaga" info={napovedPastWeek.map(this.renderVlaga)} info2="" info3=""/>}</Col>
                        <Col xs >{ loading_napovedPastWeek ? <SpinnerBlock/> : <InfoBlock heading="oblačnost" info={napovedPastWeek.map(this.renderOblac)} info2="" info3=""/>}</Col>
                    </Row>
            </Container>
            <Container fluid centre>
                <h1 className={styles.title}>Grafi</h1>
                    <Row noGutters="true">
                        <h1 className={styles.subtitle}>zadnji 3 dnevi</h1>
                        <div className={styles.graph}>
                        <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=27"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
                    <Row noGutters="true">
                        {/* <h1 className={styles.subtitle}>Tok</h1> */}
                        <div className={styles.graph}>
                            <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=26"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
                    <Row noGutters="true">
                        {/* <h1 className={styles.subtitle}>Moč</h1> */}
                        <div className={styles.graph}>
                        <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=24"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
                    <Row noGutters="true">
                        {/* <h1 className={styles.subtitle}>Moč</h1> */}
                        <div className={styles.graph}>
                        <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*24*60*60*1000}&to=${Date.now()}&theme=light&panelId=25"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
            </Container>
        </div> 
        );
    }
}
 
export default weather;
