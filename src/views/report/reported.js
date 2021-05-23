import React,{Component} from 'react'
import Session from '../../session';
import {
  	CRow,
  	CCol,
  	CCard,
  	CCardBody,
  	CDataTable,
  	CButton,
  	CModal,
  	CModalHeader,
  	CModalTitle,
  	CModalBody,
  	CModalFooter,
  	CFormGroup,
  	CLabel,
  	CInput,
  	CFormText
} from '@coreui/react'
import configuration from '../../config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fields = [
    { key: 'report_id',label:'#ID', _style: { width: '15%'} },
    { key: 'user_id', _style: { width: '15%'} },
    { key: 'name', _style: { width: '15%'} },
    { key: 'category', _style: { width: '20%'} },
    { key: 'message', _style: { width: '20%'} },
    { key: 'delete',label:'Action', _style: { width: '5%'} },
    { key: 'reply',label:'Reply', _style: { width: '10%'} },
]

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	showModal:false,
        	user_id:'',
        	message:'',
        	data:[],
        	errors:{}
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

	sendNotification(){
        let errors = {};
        let formIsValid = true;
        
        if(this.state.message === ''){
            formIsValid = false;
            errors["message"] = "Please enter message.";
        }

        this.setState({errors: errors});
        if(formIsValid){
        	this.setState({showLoader:true, showModal:false})
			fetch(configuration.baseURL+"report/send-notification", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify({user_id:this.state.user_id, message:this.state.message})
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.setState({showLoader:false, user_id:'', message:''})
				return toast.success('Notification sent successfully.');
			});
        }
	}

    render() {
	  	return (
	  		<CRow>
	  			<Session/>
	  			<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
	  			<div className="loader-img" style={{display: this.state.showLoader ? 'block' : 'none' }}></div>
	  			<CModal 
	              show={this.state.showModal} 
	              onClose={() => this.setState({showModal:!this.state.showModal})}
	              color="danger"
            	>
              		<CModalHeader closeButton>
                		<CModalTitle>Message</CModalTitle>
              		</CModalHeader>
              		<CModalBody>
		                <CRow>
			                <CCol xs="12" md="12">
			                	<CFormGroup row>
				                  	<CCol md="12">
				                    	<CLabel htmlFor="hf-title">Message</CLabel>
				                    	<CInput type="text" placeholder="Enter msg" onChange={(e)=> this.setState({message: e.target.value})} value={this.state.message} />
				                    	<CFormText className="help-block">{this.state.errors.message}</CFormText>
				                  	</CCol>
				                </CFormGroup>
			                </CCol>
			            </CRow> 
              		</CModalBody>
              		<CModalFooter>
		                <CButton color="danger" onClick={this.sendNotification.bind(this)}>Send</CButton>{' '}
              		</CModalFooter>
        		</CModal>
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
						          	'reply':
						          	(item)=>(
							            <td>
							              	<CButton color="primary" className="px-4" onClick={()=> this.setState({user_id:item.user_id, showModal:true})}>Send</CButton>
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
