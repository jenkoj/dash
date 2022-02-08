//vključim knjižnize
import React from 'react';
//vključim lightswitch komponento
import LightSwitch from "./utils/buttons/LightSwitch";
import LightSwitchDummy from "./utils/buttons/LightSwitchDummy";

import styles from "./utils/infoblocks/InfoBlock.module.css";
//dodam boostrap knjižnico
import {Container, Row, Col} from 'react-bootstrap';

//uporabil sem bootstrap knjiznico za katera mi omogoča fluid container, trej da je spletna stran dinamična
//tako deluje tako na mobilnih napravah kot tudi namiznih
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
