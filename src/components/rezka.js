import React from 'react'
//vključim info block, tukaj se izkaže prednost reacta saj lahko komponento večkrat uporabim
import InfoBlock from "./utils/infoblocks/InfoBlock"
//vključim bootstrap
import {Container, Row, Col} from 'react-bootstrap';

//infoBlock mi omogoča, da passam ime in informacijo skozi 
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
