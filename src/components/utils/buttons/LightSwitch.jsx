import React, { Component } from 'react'
import styles from "./LightSwitch.module.css"

class LightSwitch extends Component {
    state = { 
        isStikalo : false
     }

onChangeStikalo = () =>{
    this.setState(intialState => ({isStikalo: !intialState.isStikalo}));
    (this.state.isStikalo) ? fetch("http://"+this.props.ip+"/?set=off") : fetch("http://"+this.props.ip+"/?set=on")
}
    render() { 
        return ( 
            <div>
                <label  style={{margin: "10px"}}  className={styles.switch}>
                            <input checked={this.state.isStikalo} onChange={this.onChangeStikalo} type="checkbox" name="name" id="id1" />
        <span     className={`${styles.slider} ${styles.round}`}><p className={styles.header}>{this.props.header}</p></span>
                </label>
            </div>
        );
    }
}
 
export default LightSwitch;