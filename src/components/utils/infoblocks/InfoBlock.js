import React from 'react'
import styles from "./InfoBlock.module.css"

import {Spinner} from 'react-bootstrap';
//v spodnji funkciji prav tako uporabim passan objekt props iz katerega izvzamem naslov ter informacijo
// stil oziroma pisavo vamem iz modula infoblock kot objekt

export default function InfoBlock(props) {
    return (
        <div className={styles.block}>
            
            <div>
                <h1 className={styles.header}> 
                    {props.heading}
                </h1>
            </div>
             <div>
                <div className={styles.info3}>
                   {props.info3}
                </div>  
                <div className={styles.info}>
                   {props.info}
                </div> 
                <div className={styles.info2}>
                   {props.info2}
                </div>              
            </div>
        </div>    
    )
}
