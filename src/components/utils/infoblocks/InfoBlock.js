import React, { useEffect, useState } from 'react';
import styles from "./InfoBlock.module.css";
import { BiInfoCircle } from 'react-icons/bi';

/**
 * 
 * @param {*} props.type - needed for metadata  
 * @param {*} props.heading - infoblock heading
 * @param {*} props.info1 - main info
 * @param {*} props.info2 - secondary info
 * @param {*} props.info3 - last info 
 * @returns an infomation block including passed data 
 */

export default function InfoBlock(props) {
    
    const [show, setShow] = useState(false);
    const [addHeading,setAddHeading] = useState(" ");
    const [addInfo,setAddInfo1] = useState(" ");
    const [addInfo2,setAddInfo2] = useState(" ");
    const [addInfo3,setAddInfo3] = useState(" ");

    //set metadata 
    useEffect(() => {
        if (props.type === "weather"){
        
            setAddHeading("Unit")
            setAddInfo1("Value")

        }

        if (props.type === "power"){

            setAddHeading("Unit")
            setAddInfo1("Value phase 2")
            setAddInfo2("Value phase 3")
            setAddInfo3("Value phase 1")

        }

        if (props.type === "energy"){

            setAddHeading("Time period")
            setAddInfo3("Energy")
            setAddInfo1("Price")
            setAddInfo2("Data health")
            
        }
    },[props.type]);

    return (
        <div onClick={() => setShow(show => !show)} className={styles.block}>
            {/* show metadata when user clicks info icon */}
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
            <BiInfoCircle></BiInfoCircle>        
        </div>
        </div>   
         
    )
}
