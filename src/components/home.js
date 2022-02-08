import React from 'react';
import LightSwitch from "./utils/buttons/LightSwitch"; // uses real API calls
import LightSwitchDummy from "./utils/buttons/LightSwitchDummy";// just visuals 

import styles from "./home.module.css";
import {Container, Row, Col} from 'react-bootstrap';

/**
 * 
 * @returns Page with rendered swtiches 
 */

export default function Home() {
    return (
        <div>
           <Container fluid>
               <h1 className={styles.title}>Living Room</h1>
                <Row>
                    <Col xs><LightSwitch header="Couch Lamp" ip="10.10.10.104"/></Col>
                    <Col xs><LightSwitchDummy header="Ceiling Light" /></Col>
                </Row>
            </Container>

            <Container fluid>
               <h1 className={styles.title}>Bed rooom</h1>
                <Row>
                    <Col xs><LightSwitchDummy header="Bed Lamp" /></Col>
                    <Col xs><LightSwitchDummy header="Ceiling lamp" /></Col>
                    <Col xs><LightSwitchDummy header="Table lamp" /></Col>
                </Row>
            </Container>

            <Container fluid>
               <h1 className={styles.title}>Kitchen</h1>
                <Row>
                    <Col xs><LightSwitchDummy header="Table Lamp" /></Col>
                    <Col xs><LightSwitchDummy header="Cieling lamp" /></Col>
                </Row>
            </Container>
            <Container fluid>
               <h1 className={styles.title}>Hallway</h1>
                <Row>
                    <Col xs><LightSwitchDummy header="Hall Lights" /></Col>
                </Row>
            </Container>
        </div>
    )
}
