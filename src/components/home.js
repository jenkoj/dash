import React from 'react';
import LightSwitch from "./utils/buttons/LightSwitch";
import styles from "./utils/infoblocks/InfoBlock.module.css";
import {Container, Row, Col, Button} from 'react-bootstrap';

export default function Home() {
    return (
        <div>
           <Container fluid>
               <h1 className={styles.title}>Dnevna soba</h1>
               
                <Row>
                    <Col xs><LightSwitch header="Kavč" ip="10.10.10.128"/></Col>
                    <Col xs><LightSwitch header="TV" ip="10.10.10.122"/></Col>
                    
                </Row>
            </Container>

            <Container fluid>
               <h1 className={styles.title}>Spalnica</h1>
               
                <Row>
                    <Col xs><LightSwitch header="postelja" ip="10.10.10.121"/></Col>
                    <Col xs><LightSwitch header="glavna luč" ip="10.10.10.129"/></Col>
                    <Col xs><LightSwitch header="Lučke" ip="10.10.10.129"/></Col>
                </Row>
            </Container>
        </div>
           
    )
}
