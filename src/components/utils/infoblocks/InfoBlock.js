import React, { useEffect, useState } from 'react';
import styles from "./InfoBlock.module.css";
import { BiInfoCircle } from 'react-icons/bi';
import {View, Text} from 'react-bootstrap';
//v spodnji funkciji prav tako uporabim passan objekt props iz katerega izvzamem naslov ter informacijo
// stil oziroma pisavo vamem iz modula infoblock kot objekt

export default function InfoBlock(props) {
    
    const [show, setShow] = useState(false);
    const [addHeading,setAddHeading] = useState(" ");
    const [addInfo,setAddInfo1] = useState(" ");
    const [addInfo2,setAddInfo2] = useState(" ");
    const [addInfo3,setAddInfo3] = useState(" ");


    useEffect(() => {
        if (props.type == "weather"){
        
            setAddHeading("Unit")
            setAddInfo1("Value")

        }

        if (props.type == "power"){

            setAddHeading("Unit")
            setAddInfo1("Value phase 2")
            setAddInfo2("Value phase 3")
            setAddInfo3("Value phase 1")
        }

        if (props.type == "energy"){

            setAddHeading("Time period")
            setAddInfo3("Energy")
            setAddInfo1("Price")
            setAddInfo2("Data health")
        }
    });



    return (
        <div onClick={() => setShow(show => !show)} className={styles.block}>
           
            { show ? 
            <div>
                <div>
                    <h1 className={styles.header}> 
                        {addHeading}
                    </h1>
                </div>
                    <div>
                        <div className={styles.info3}>
                        {addInfo3}
                        </div>  
                        <div className={styles.info}>
                        {addInfo}
                        </div> 
                        <div className={styles.info2}>
                        {addInfo2}
                        </div>              
                </div>
            </div> 
            :
            <div>
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
               
            </div>}
        <div className={styles.icon} >
            <BiInfoCircle   ></BiInfoCircle>        
        </div>
        </div>   
         
    )
}
