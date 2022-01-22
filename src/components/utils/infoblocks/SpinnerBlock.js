import React from 'react'
import styles from "./InfoBlock.module.css"

import {Spinner} from 'react-bootstrap';
//v spodnji funkciji prav tako uporabim passan objekt props iz katerega izvzamem naslov ter informacijo
// stil oziroma pisavo vamem iz modula infoblock kot objekt

export default function SpinnerBlock(props) {
    return (
        <div className={styles.block}>
            <div className={styles.spinner}>
                <Spinner animation="border" />
            </div>
        </div>    
    )
}
