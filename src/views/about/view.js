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
    { key: 'about_id',label:'#ID', _style: { width: '20%'} },
    { key: 'image', _style: { width: '20%'} },
    { key: 'paragraph1', _style: { width: '50%'} },
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
    	fetch(configuration.baseURL+"about/get").then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ data: data.payload});
		});	
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
        if(!fields["about"]){
            formIsValid = false;
            errors["about"] = "Please select about us image.";
        }
        if(!fields["paragraph1"]){
            formIsValid = false;
            errors["paragraph1"] = "Please enter paragraph1.";
        }
        if(!fields["paragraph2"]){
            formIsValid = false;
            errors["paragraph2"] = "Please enter paragraph2.";
        }
        this.setState({errors: errors});
        if(formIsValid){
	    	const data = new FormData(); 
	        data.append('about', this.uploadProfile.files[0]);
	        data.append('fields', JSON.stringify(this.state.fields));
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"about/upload", {
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

    handleAction(type, about_id) {
		this.setState({showLoader:true})
		fetch(configuration.baseURL+"about/action", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({ids:[about_id], type:type})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({showLoader:false})
			this.componentDidMount();
		});
	}

	handleChange(field, e){
    	let fields = this.state.fields;
        fields[field] = e.target.value;
    	this.setState({fields})
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
				                    	<CLabel htmlFor="hf-Type">Upload about us image</CLabel><br/>
				                    	<input
                                        	accept="image/*"
                                            type="file"
                                            ref={(ref) => { this.uploadProfile = ref; }}
                                            onChange={this.handleUploadImage.bind(this,'about')}
                                        />
		                    			<CFormText className="help-block">{this.state.errors['about']}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                	<CCol md="6">
				                    	<CLabel htmlFor="hf-Type">Paragraph1</CLabel><br/>
				                    	<CInput type="text" placeholder="Enter paragraph1" onChange={this.handleChange.bind(this,'paragraph1')} value={this.state.fields.paragraph1} />
		                    			<CFormText className="help-block">{this.state.errors['paragraph1']}</CFormText>
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-Type">Paragraph2</CLabel><br/>
				                    	<CInput type="text" placeholder="Enter paragraph2" onChange={this.handleChange.bind(this,'paragraph2')} value={this.state.fields.paragraph2} />
		                    			<CFormText className="help-block">{this.state.errors['paragraph2']}</CFormText>
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
							              	<img alt="delete icon" src="img/close.png" width="15" onClick={this.handleAction.bind(this, 'delete',item.about_id)}/>
							            </td>
						          	),
						          	'image':
						          	(item)=>(
							            <td>
							            	<img alt="delete icon" src={item.image} width="70" height="70"/>
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
