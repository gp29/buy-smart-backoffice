import React,{Component} from 'react'
import Session from '../../session';
import {
  	CRow,
  	CCol,
  	CCard,
  	CCardBody,
  	CDataTable,
} from '@coreui/react'
import configuration from '../../config';

const fields = [
    { key: 'report_id',label:'#ID', _style: { width: '15%'} },
    { key: 'user_id', _style: { width: '25%'} },
    { key: 'message', _style: { width: '50%'} },
    { key: 'delete',label:'Action', _style: { width: '10%'} },
]

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	data:[]
        };
    }


    componentDidMount(){
    	fetch(configuration.baseURL+"report/get-user-reported").then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ data: data.payload});
		});	
    }

    handleAction(type, report_id) {
		this.setState({showLoader:true})
		fetch(configuration.baseURL+"report/action-user-reported", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({ids:[report_id], type:type})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({showLoader:false})
			this.componentDidMount();
		});
	}

    render() {
	  	return (
	  		<CRow>
	  			<Session/>
	  			<div className="loader-img" style={{display: this.state.showLoader ? 'block' : 'none' }}></div>
		        <CCol xs="12" md="12">
          			<CCard>
	            		<CCardBody>
						    <CDataTable
						      	items={this.state.data}
						      	fields={fields}
						      	tableFilter
						      	footer
						      	itemsPerPageSelect
						      	itemsPerPage={10}
						      	hover
						      	sorter
						      	pagination
						      	scopedSlots = {{
						          	'delete':
						          	(item)=>(
							            <td>
							              	<img alt="delete icon" src="img/close.png" width="15" onClick={this.handleAction.bind(this, 'delete',item.report_id)}/>
							            </td>
						          	),
						      	}}
						    />
			            </CCardBody>
		            </CCard>
		        </CCol>  
		    </CRow>	
	  	)
    }
}

export default view
