import React, { Component } from 'react'
import styles from "./LightSwitch.module.css"

// API ip and esp key are secret 
import creds from "../../../creds/pass.json";
   
/**
 *  This class uses IP that is passed down as parameter and makes get requests on state change 
 *  @param  this.pros.ip - ip is used as ID and for API request 
 *  @param  this.props.header - heading 
 *  @returns boxy slider 
 */

class LightSwitch extends Component {
        
    state = { 
        switchState : false
     }

    getState() {
        
        fetch("http://"+creds.ip.api+"/esp/"+this.props.ip+"/state/"+creds.esp.key)
        .then(response => response.json())
        .then(response => {
            var response = (response.state === 'true');
            this.setState({switchState : response})
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.intervalId = setInterval(this.getState.bind(this), 1000);
    }
    
    //define arrow functions to call requests based on switch state 
    onChangeStikalo = () => {
        console.log(this.state.switchState)
        this.setState(initState => ({switchState: !initState.switchState}));
        (this.state.switchState) ? this.offRequest(): this.onRequest()
    }

    
    onRequest = () => {
        fetch("http://"+creds.ip.api+"/esp/"+this.props.ip+"/set/on/"+creds.esp.key,
        {
            method:'GET',
            mode:'no-cors',
        })
        .catch(err => console.log(err))
    }

    offRequest = () =>{
        fetch("http://"+creds.ip.api+"/esp/"+this.props.ip+"/set/off/"+creds.esp.key,
        {
            method:'GET',
            mode:'no-cors',
        })
        .catch(err => console.log(err))
    }

    //tu sem naredil tipko, ki sprejema parametre ki jih passam ko kličem komponento (primer: this.props.header)
    render() { 
        return ( 
            <div>
                <label style={{margin:"10px"}} className={styles.switch}>
                   
                    <input checked={this.state.switchState} onChange={this.onChangeStikalo} type="checkbox" name="name" id={this.props.ip} />
                   
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
 
export default LightSwitch;