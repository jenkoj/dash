//vključim knjižnice in zopet
import React, { Component } from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"

//uvozim css modul zaradi pisave  
import styles from "./utils/infoblocks/InfoBlock.module.css"
import {Container, Row, Col} from 'react-bootstrap';


class weather extends Component {
    //definrial sem spremelnjivko
    state = { 
        napoved: [1]
     }

    //mountam request 
     componentDidMount(){
         this.getNapoved();
     }

    // definiram ta request z veriženjem
    getNapoved = () =>{
        fetch("http://89.212.216.214:4000/napoved")
        .then(response => response.json())
        //vpišem response v state spremenljivko
        .then(response => this.setState({ napoved: response.podatki}))
        //v primeru napake returnam error
        .catch(err => console.error(err))
    }


    renderTemp = ({ id, temp}) => <div key={id}>{temp}</div>            // {napoved.map(this.renderTemp)}
    renderPritisk = ({ id, tlak}) => <div key={id}>{tlak}</div>         // {napoved.map(this.renderPritisk)}
    renderVlaga = ({ id, vlaznost}) => <div key={id}>{vlaznost}</div>   // {napoved.map(this.renderVlaga)}
    renderOblac = ({ id, oblacnost}) => <div key={id}>{oblacnost}</div> // {napoved.map(this.renderOblac)}


    render() { 
        //naredim novo spremeljivko napoved ki ji pripišem vrednost statea
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
