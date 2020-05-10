import React from 'react'
import styles from "./InfoBlock.module.css"

export default function InfoBlock(props) {
    return (
        <div className={styles.block}>
            <div>
                <h1 className={styles.header}> 
                    {props.heading}
                </h1>
            </div>
            <div>
                <p className={styles.info3}>
                   {props.info3}
                </p>  
                <p className={styles.info}>
                   {props.info}
                </p> 
                <p className={styles.info2}>
                   {props.info2}
                </p> 
                            
            </div>
        </div> 

        
    )
}
