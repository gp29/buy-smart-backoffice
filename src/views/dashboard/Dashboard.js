import React,{Component} from 'react'
import Session from '../../session';
import {
  CRow,
} from '@coreui/react'

class Dashboard extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false
        };
    }

    render() {
	  	return (
	  		<div>
	  			<Session/>
		  		<CRow>
		  			Coming Soon!!
		  		</CRow>
		  	</div>	
	  	)
    }
}

export default Dashboard
