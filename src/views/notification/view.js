import React,{Component} from 'react'
import Session from '../../session';
import {
  	CRow,
  	CCol,
  	CCard,
  	CCardBody,
  	CCardFooter,
  	CButton,
  	CForm,
  	CFormGroup,
  	CLabel,
  	CFormText,
  	CInput
} from '@coreui/react'
import configuration from '../../config';
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	fields:{},
        	errors:{},
        	items: [],
            selectedItems: [],
        };
    }

    componentDidMount(){
    	fetch(configuration.baseURL+"auth/get-users?status=active").then((response) => {
			return response.json();
		}).then((data) => {
			let items=[];
            for(var i=0; i<data.payload.length; i++){
                items.push({
                    id:data.payload[i].user_id,
                    label:data.payload[i].name +' - '+data.payload[i].mobile_country_code+' '+data.payload[i].mobile,
                })
            }
            this.setState({
                items:items
            });
		});	
    }

    handleChange(field, e){
        let fields = this.state.fields
        fields[field] = e.target.value;
        this.setState({fields});
    }

    handleChangeItem(selectedItems) {
        this.setState({ selectedItems });
    }

    submit(){
    	let fields = this.state.fields;
    	let errors = {};
        let formIsValid = true;
        if(!fields["description"]){
            formIsValid = false;
            errors["description"] = "Please enter description.";
        }
        if(this.state.selectedItems.length === 0){
            formIsValid = false;
            errors["user_id"] = "Please select at least one user.";
        }
        this.setState({errors})
        if(formIsValid){
        	this.setState({showLoader:true})
        	fetch(configuration.baseURL+"auth/send-notification", {
	            method: "post",
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            },
	            body:JSON.stringify({description:this.state.fields.description, user_id:this.state.selectedItems})
	        }).then((response) => {
	            return response.json();
	        }).then((data) => {
	        	let fields = this.state.fields;
	        	fields['description'] = '';
	        	this.setState({fields, selectedItems:[], showLoader:false})
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
        		<CCol xs="12" md="12">
          			<CCard>
	            		<CCardBody>
	            			<CForm className="form-horizontal">
				                <CFormGroup row>
				                	<CCol md="12">
				                    	<CLabel htmlFor="hf-Type">Select Users</CLabel><br/>
				                    	<MultiSelect
                                            items={this.state.items}
                                            selectedItems={this.state.selectedItems}
                                            onChange={this.handleChangeItem.bind(this)}
                                            showSelectAll={false}
                                            //maxSelectedItems={1}
                                        />
		                    			<CFormText className="help-block">{this.state.errors['user_id']}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                	<CCol md="12">
                                        <CLabel htmlFor="hf-Status">Description</CLabel>
                                        <CInput type="text" placeholder="Enter description" onChange={this.handleChange.bind(this, 'description')} value={this.state.fields.description} />
                                        <CFormText className="help-block">{this.state.errors['description']}</CFormText>
                                    </CCol>
				                </CFormGroup>  	
				            </CForm>
			            </CCardBody>
			            <CCardFooter>
			            	<CButton color="primary" className="px-4" onClick={this.submit.bind(this)}>Submit</CButton>{' '}
			            </CCardFooter>
		            </CCard>
		        </CCol>
		    </CRow>	
	  	)
    }
}

export default view
