import React from 'react'
import InfoBlock from "./utils/infoblocks/InfoBlock"
import {Container, Row, Col} from 'react-bootstrap';


export default function Rezka() {
    return (
       
        <div >
           <Container>
                <Row>
                    <Col xs><InfoBlock heading="Temp " info="24°C" /></Col>
                    <Col xs><InfoBlock heading="Status" info="obratuje" /></Col>
                    <Col xs><InfoBlock heading="Čas obratovanja" info="27 h" /></Col>
                    <Col xs><InfoBlock heading="Baterija" info="74%" /></Col>
                </Row>
            </Container>
        </div>
        
    )
}
