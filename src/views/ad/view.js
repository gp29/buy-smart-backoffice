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
  	CDataTable,
  	CInput
} from '@coreui/react'
import configuration from '../../config';

const fields = [
    { key: 'ad_id',label:'#ID', _style: { width: '10%'} },
    { key: 'Index', _style: { width: '15%'} },
    { key: 'Product_key', _style: { width: '25%'} },
    { key: 'Product_Url', _style: { width: '40%'} },
    { key: 'delete',label:'', _style: { width: '10%'} },
]

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	fields:{},
        	errors:{},
        	data:[]
        };
    }

    handleChange(field, e){
    	let fields = this.state.fields
    	fields[field] = e.target.value;
    	this.setState({fields})
    }

    componentDidMount(){
    	fetch(configuration.baseURL+"ad/get").then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ data: data.payload});
		});	
    }

    submit(){
    	let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if(!fields["Product_Url"]){
            formIsValid = false;
            errors["Product_Url"] = "Please enter product urls.";
        }
        this.setState({errors: errors});
        if(formIsValid){
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"ad/add", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(this.state.fields)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.setState({showLoader:false})
				this.componentDidMount();
				let fields = this.state.fields
		    	fields['Product_Url'] = '';
		    	this.setState({fields})
			});
        }
    }

    handleAction(type, ad_id) {
		this.setState({showLoader:true})
		fetch(configuration.baseURL+"ad/action", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({ids:[ad_id], type:type})
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
	            			<CForm className="form-horizontal">
				                <CFormGroup row>
				                	<CCol md="12">
				                    	<CLabel htmlFor="hf-title">Product URLs ( Pass like => 1|2|3 )</CLabel>
				                    	<CInput type="text" placeholder="Enter urls" onChange={this.handleChange.bind(this,'Product_Url')} value={this.state.fields.Product_Url} />
				                    	<CFormText className="help-block">{this.state.errors.Product_Url}</CFormText>
				                  	</CCol>
				                </CFormGroup>  	
				            </CForm>
			            </CCardBody>
			            <CCardFooter>
			            	<CButton color="primary" className="px-4" onClick={this.submit.bind(this)}>Submit</CButton>{' '}
			            </CCardFooter>
		            </CCard>
		        </CCol>
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
							              	<img alt="delete icon" src="img/close.png" width="15" onClick={this.handleAction.bind(this, 'delete',item.ad_id)}/>
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
