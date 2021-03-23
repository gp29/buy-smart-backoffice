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
    { key: 'lottie_id',label:'#ID', _style: { width: '20%'} },
    { key: 'title', _style: { width: '70%'} },
    { key: 'delete',label:'', _style: { width: '10%'} },
]

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	fields:{},
        	errors:{},
        };
    }

    componentDidMount(){
    	fetch(configuration.baseURL+"lottie/get").then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ data: data.payload});
		});	
    }

    handleChange(type,e){
        let fields = this.state.fields;
        fields[type] = e.target.value;
        this.setState({fields});
    }

    handleUploadImage(type,ev){
        let fields = this.state.fields;
        fields[type] = type;
        this.setState({fields});
    }

    submit(){
    	let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Please enter title.";
        }
        if(!fields["lottie"]){
            formIsValid = false;
            errors["lottie"] = "Please select lottie json.";
        }
        this.setState({errors: errors});
        if(formIsValid){
	    	const data = new FormData(); 
	        data.append('lottie', this.uploadProfile.files[0]);
	        data.append('fields', JSON.stringify(this.state.fields));
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"lottie/upload", {
				method: "post",
				headers: {
					'contentType': "application/json",
				},
				body:data
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.setState({showLoader:false})
				this.componentDidMount();
			});
        }
    }

    handleAction(type, lottie_id) {
		this.setState({showLoader:true})
		fetch(configuration.baseURL+"lottie/action", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({ids:[lottie_id], type:type})
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
				                	<CCol md="6">
				                    	<CLabel htmlFor="hf-title">Title</CLabel>
				                    	<CInput type="text" placeholder="Enter name" onChange={this.handleChange.bind(this,'title')} value={this.state.fields.title} />
				                    	<CFormText className="help-block">{this.state.errors.title}</CFormText>
				                  	</CCol>
				                	<CCol md="6">
				                    	<CLabel htmlFor="hf-Type">Upload Lottie JSON</CLabel><br/>
				                    	<input
                                        	accept="json/*"
                                            type="file"
                                            ref={(ref) => { this.uploadProfile = ref; }}
                                            onChange={this.handleUploadImage.bind(this,'lottie')}
                                        />
		                    			<CFormText className="help-block">{this.state.errors['lottie']}</CFormText>
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
						      	//columnFilter
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
							              	<img alt="delete icon" src="img/close.png" width="15" onClick={this.handleAction.bind(this, 'delete',item.lottie_id)}/>
							            </td>
						          	)
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
