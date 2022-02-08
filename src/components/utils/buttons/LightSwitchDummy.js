import React, { Component } from 'react'
//importam css modul za stil
import styles from "./LightSwitch.module.css"

import creds from "../../../creds/pass.json";

class LightSwitchDummy extends Component {
    
    //definiram stikalo in zapišem def vrednost false
    
    state = { 
        isStikalo : false
     }

    
    //definiram onchage arrow funkcijo ki se pokliče ob klicu
    //ker na drugi strani ni corsa server javi error ob klicu
    //deluje zato ker fetch vedno uspe vedno pride na cilj razen če je dejanski network err
    onChangeStikalo = () => {
        console.log(this.state.isStikalo)
        this.setState(initState => ({isStikalo: !initState.isStikalo}));
        // (this.state.isStikalo) ? this.offRequest(): this.onRequest()
    }

    

    //tu sem naredil tipko, ki sprejema parametre ki jih passam ko kličem komponento (primer: this.props.header)
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