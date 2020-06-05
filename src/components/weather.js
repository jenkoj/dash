//vključim knjižnice in zopet
import React, { Component } from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"

//uvozim css modul zaradi pisave  
import styles from "./utils/infoblocks/InfoBlock.module.css"
import {Container, Row, Col} from 'react-bootstrap';


class weather extends Component {
    //definrial sem spremelnjivko
    state = { 
        napoved: []
     }

    //počakam da se class mounta in potem naredim api request
    //to je good practice, takemu eventu/funkciji se reče lifecycle hook
     componentDidMount(){
         this.getNapoved();
     }

    // definiram request na backend
    getNapoved = () =>{
        //fetch API klic vrne promise
        fetch("http://89.212.216.214:4000/napoved")
        //podatke dobim v json zato moram programu povedati da naj jih jemlje kot json
        .then(response => response.json())
        //vpišem response (promise) v state spremenljivko (react ne updtejta strani ob spremebi kot angular in moraš ročno pognati setstate)
        .then(response => this.setState({ napoved: response.podatki}))
        //v primeru napake returnam error -> error bo javil če bo problem z fetchom samim
        .catch(err => console.error(err))
    }

    //definiram metode oziroma funkcije
    //Ker je <div> jsx expression ga lahko uporabljam kot stringe in integerje
    //spodnje ukaze bi lahko izvedel kar v vrstici vendar je tako mogoče bolj pregledno
    renderTemp = ({ id, temp}) => <div key={id+1}>{temp}</div>            // {napoved.map(this.renderTemp)}
    renderPritisk = ({ id, tlak}) => <div key={id+2}>{tlak}</div>         // {napoved.map(this.renderPritisk)}
    renderVlaga = ({ id, vlaznost}) => <div key={id+3}>{vlaznost}</div>   // {napoved.map(this.renderVlaga)}
    renderOblac = ({ id, oblacnost}) => <div key={id+4}>{oblacnost}</div> // {napoved.map(this.renderOblac)}


    render() { 
        //naredim nov objekt napoved ki mu pripišem vrednost objekta state
        //izraz za to je tudi object descructuring 
        const {napoved} = this.state;
        return (  
        <div>
            <Container fluid>
                <h1 className={styles.title}>Trenutno stanje</h1>
                    <Row noGutters="true">
                        <Col xs ><InfoBlock heading="temp" info={napoved.map(this.renderTemp)} info2="" info3=""/></Col>
                        <Col xs ><InfoBlock heading="pritisk" info={napoved.map(this.renderPritisk)} info2="" info3="" /> </Col>
                        <Col xs ><InfoBlock heading="vlaga" info={napoved.map(this.renderVlaga)} info2="" info3=""/></Col>
                        <Col xs ><InfoBlock heading="oblačnost" info={napoved.map(this.renderOblac)} info2="" info3=""/></Col>
                    </Row>
            </Container>
            <Container fluid>
                <h1 className={styles.title}>Tedenska napoved</h1>
                    <Row noGutters="true">
                        <Col xs ><InfoBlock heading="danes"      info="jasno" info2="60 %" info3="24 °C"/></Col>
                        <Col xs ><InfoBlock heading="jutri"      info="jasno" info2="60 %" info3="24 °C"/></Col>
                        <Col xs ><InfoBlock heading="pojutrišnem"info="jasno" info2="60 %" info3="24 °C"/></Col>
                        <Col xs ><InfoBlock heading="čez 3 dni"  info="jasno" info2="60 %" info3="24 °C"/></Col>
                        <Col xs ><InfoBlock heading="čez 4 dni"  info="jasno" info2="60 %" info3="24 °C"/></Col>
                        <Col xs ><InfoBlock heading="čez 5 dni"  info="jasno" info2="60 %" info3="24 °C"/></Col>
                    </Row>
            </Container>
        </div> 
        );
    }
}
 
export default weather;
