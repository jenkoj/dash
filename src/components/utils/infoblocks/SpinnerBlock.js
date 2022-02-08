import React from 'react'
import styles from "./InfoBlock.module.css"
import {Spinner} from 'react-bootstrap';

/**
 * 
 * @returns block with spinner 
 */
export default function SpinnerBlock() {
    return (
        <div className={styles.block}>
            <div className={styles.spinner}>
                <Spinner animation="border" />
            </div>
        </div>    
    )
}
