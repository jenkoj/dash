//vključim knjižnize
import React from 'react';
//vključim lightswitch komponento
import LightSwitch from "./utils/buttons/LightSwitch";
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
                    <Col xs><LightSwitch header="Couch lamp" ip="10.10.10.104"/></Col>
                    {/* <Col xs><LightSwitch header="Ceiling light" ip="10.10.10.122"/></Col> */}
                </Row>
            </Container>

            <Container fluid>
               <h1 className={styles.title}>Bed rooom</h1>
                <Row>
                    <Col xs><LightSwitch header="Bed lamp" ip="10.10.10.121"/></Col>
                    <Col xs><LightSwitch header="Ceiling lamp" ip="10.10.10.104"/></Col>
                </Row>
            </Container>
        </div>
    )
}
