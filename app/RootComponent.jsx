import React from 'react';
import { 
    BrowserRouter as Router, 
    Route,
    Link
} from 'react-router-dom';

export class RootComponent extends React.Component  {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
              hello world
            </div>
        );
    }
}

export default RootComponent;