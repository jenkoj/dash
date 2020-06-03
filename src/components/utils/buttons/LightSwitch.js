import React, { Component } from 'react'
//importam css modul za stil
import styles from "./LightSwitch.module.css"


class LightSwitch extends Component {
    
    //definiram stikalo in zapišem def vrednost false
    state = { 
        isStikalo : false
     }

    //definiram onchage arrow funkcijo ki se pokliče ob klicu
    //ker na drugi strani ni corsa server javi error ob klicu
    onChangeStikalo = () =>{
    this.setState(intialState => ({isStikalo: !intialState.isStikalo}));
    (this.state.isStikalo) ? fetch("http://"+this.props.ip+"/?set=off") : fetch("http://"+this.props.ip+"/?set=on")
    }

    //tu sem naredil tipko, ki sprejema parametre ki jih passam ko kličem komponento (primer: this.props.header)
    render() { 
        return ( 
            <div>
                <label style={{margin:"10px"}}className={styles.switch}>
                <input checked={this.state.isStikalo} onChange={this.onChangeStikalo} type="checkbox" name="name" id="id1" />
                <span className={`${styles.slider} ${styles.round}`}><p className={styles.header}>{this.props.header}</p></span>
                </label>
            </div>
        );
    }
}
 
export default LightSwitch;