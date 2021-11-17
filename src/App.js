import React, {Component} from 'react';
import Form from './Form';
import Completed from './Completed';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            submited: false
        }
    }

    submitedForm = (bool) => {this.setState({submited: bool})}

    render(){
        return(
            <>  
                {this.state.submited? <Form submitedForm={this.submitedForm} /> : <Completed /> }
            </>
        )
    }
}

export default App;