import React, { Component } from 'react'
import {Button} from 'react-bootstrap';

class Buttons extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                {/* <span className="badge m-2 badge-warning">test</span> */}
               {/* <Button>LIGHT</Button> */}
                <button className=" shadow-lg btn-xl btn-outline-primary">LIGHT</button>
                
            </div>e
        );
    }
}
 
export default Buttons;