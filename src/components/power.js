//vključim knjižnice in zopet
import React, { Component } from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"

//uvozim css modul zaradi pisave  
import styles from "./utils/infoblocks/InfoBlock.module.css"
import {Container, Row, Col} from 'react-bootstrap';

import creds from "../creds/pass.json";


class power extends Component {
    //definrial sem spremelnjivko
    state = { 
        usage: [],
        graphHeight:"400",
        graphWidth: "100%"
     }

    //počakam da se class mounta in potem naredim api request
    //to je good practice, takemu eventu/funkciji se reče lifecycle hook
     componentDidMount(){
         this.getNapoved();
     }

    // definiram request na backend
    getNapoved = () => {
        //fetch API klic vrne promise
        fetch("http://"+creds.ip.api+"/power")
        //podatke dobim v json zato moram programu povedati da naj jih jemlje kot json
        .then(response => response.json())
        //vpišem response (promise) v state spremenljivko (react ne updtejta strani ob spremebi kot angular in moraš ročno pognati setstate)
        .then(response => this.setState({ usage: response.podatki}))
        //v primeru napake returnam error -> error bo javil če bo problem z fetchom samim
        .catch(err => console.error(err))
    }

    //definiram metode oziroma funkcije
    //Ker je <div> jsx expression ga lahko uporabljam kot stringe in integerje
    //spodnje ukaze bi lahko izvedel kar v vrstici vendar je tako mogoče bolj pregledno
    renderV1 = ({ id, Phase_1_voltage_RMS}) => <div key={id+1}>{Phase_1_voltage_RMS+" V"}</div> 
    renderV2 = ({ id, Phase_2_voltage_RMS}) => <div key={id+2}>{Phase_2_voltage_RMS+" V"}</div>    
    renderV3 = ({ id, Phase_3_voltage_RMS}) => <div key={id+3}>{Phase_3_voltage_RMS+" V"}</div> 
    
    renderA1 = ({ id, Phase_1_current_RMS}) => <div key={id+11}>{Phase_1_current_RMS+" A"}</div> 
    renderA2 = ({ id, Phase_2_current_RMS}) => <div key={id+12}>{Phase_2_current_RMS+" A"}</div>    
    renderA3 = ({ id, Phase_3_current_RMS}) => <div key={id+13}>{Phase_3_current_RMS+" A"}</div> 

    renderW1 = ({ id, Phase_1_Active_Power}) => <div key={id+21}>{Phase_1_Active_Power+" W"}</div> 
    renderW2 = ({ id, Phase_2_Active_Power}) => <div key={id+22}>{Phase_2_Active_Power+" W"}</div>    
    renderW3 = ({ id, Phase_3_Active_Power}) => <div key={id+23}>{Phase_3_Active_Power+" W"}</div> 

    renderPF1 = ({ id, Phase_1_PF}) => <div key={id+31}>{Phase_1_PF}</div> 
    renderPF2 = ({ id, Phase_2_PF}) => <div key={id+32}>{Phase_2_PF}</div>    
    renderPF3 = ({ id, Phase_3_PF}) => <div key={id+33}>{Phase_3_PF}</div> 

    renderF = ({ id, Phase_1_frequency}) => <div key={id+34}>{Phase_1_frequency+" Hz"}</div> 

    

    render() { 
        //naredim nov objekt napoved ki mu pripišem vrednost objekta state
        //izraz za to je tudi object descructuring 
        const {usage} = this.state;
        return (  
        <div>
            <Container fluid>
                <h1 className={styles.title}>Trenutno stanje</h1>
                    <Row noGutters="true">
                        <Col xs ><InfoBlock heading="Napetost" info={usage.map(this.renderV1)} info2={usage.map(this.renderV2)} info3={usage.map(this.renderV3)}/></Col>
                        <Col xs ><InfoBlock heading="Tok" info={usage.map(this.renderA1)} info2={usage.map(this.renderA2)} info3={usage.map(this.renderA3)}/></Col>
                        <Col xs ><InfoBlock heading="Moč" info={usage.map(this.renderW1)} info2={usage.map(this.renderW2)} info3={usage.map(this.renderW3)}/></Col>
                        <Col xs ><InfoBlock heading="cos phi" info={usage.map(this.renderPF1)} info2={usage.map(this.renderPF2)} info3={usage.map(this.renderPF3)}/></Col>
                        <Col xs ><InfoBlock heading="frekvenca" info={usage.map(this.renderF)} info2="" info3="" /> </Col>
                       
                    </Row>
            </Container>
            <Container fluid>
                <h1 className={styles.title}>Dnevno Povprečje</h1>
                    <Row noGutters="true">
                        <Col xs ><InfoBlock heading="Napetost" info="234 V "info2="232 V " info3="225 V "/></Col>
                        <Col xs ><InfoBlock heading="Tok" info="0.51 A" info2="0.35 A" info3="0.1 A"  /></Col>
                        <Col xs ><InfoBlock heading="Moč" info="95.21 W" info2="69.02 W" info3="21.32 W"/></Col>
                        <Col xs ><InfoBlock heading="cos phi" info="0.79" info2="0.86" info3="0.82"/></Col>
                        <Col xs ><InfoBlock heading="frekvenca" info="49.98 Hz" info2="" info3="" /> </Col>
                    </Row>
            </Container>
            <Container fluid centre>
                <h1 className={styles.title}>Grafi</h1>
                    <Row noGutters="true">
                        <h1 className={styles.subtitle}>zadnje 3 ure</h1>
                        <div className={styles.graph}>
                        <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=12"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
                    <Row noGutters="true">
                        {/* <h1 className={styles.subtitle}>Tok</h1> */}
                        <div className={styles.graph}>
                            <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=2"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
                    <Row noGutters="true">
                        {/* <h1 className={styles.subtitle}>Moč</h1> */}
                        <div className={styles.graph}>
                        <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=4"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
                    <Row noGutters="true">
                        {/* <h1 className={styles.subtitle}>Moč</h1> */}
                        <div className={styles.graph}>
                        <iframe src={`http://10.10.40.140:3000/d-solo/lMhMrEzgz/poraba-potoce?orgId=1&from=${Date.now()-3*60*60*1000}&to=${Date.now()}&theme=light&panelId=10"`} width={this.state.graphWidth} height={this.state.graphHeight}  frameBorder="0"/>
                        </div>
                    </Row>
            </Container>
        </div> 
        );
    }
}
 
export default power;

