import React, { Component } from 'react'
import styles from "./LightSwitch.module.css"

/**
 *  Dummy switch that returns only structure and does not make real API requests 
 *  @param  this.pros.ip - ip is used as ID 
 *  @param  this.props.header - heading 
 *  @returns boxy slider 
 */

class LightSwitchDummy extends Component {
        
    state = { 
        isStikalo : false
     }

    onChangeStikalo = () => {
        console.log(this.state.isStikalo)
        this.setState(initState => ({isStikalo: !initState.isStikalo}));
    }
    
    //this.props.ip are properties passed from parrent class 
    render() { 
        return ( 
            <div>
                <label style={{margin:"10px"}} className={styles.switch}>
                   
                    <input checked={this.state.isStikalo} onChange={this.onChangeStikalo} type="checkbox" name="name" id={this.props.ip} />
                   
                    <span className={`${styles.slider} ${styles.round}`}>
                        <p className={styles.header}>
                            {this.props.header}
                        </p>
                    </span>
                </label>
            </div>
        );
    }
}
 
export default LightSwitchDummy;