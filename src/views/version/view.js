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
} from '@coreui/react'
import configuration from '../../config';
import { versionDatabase } from '../../firebase';

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	fields:{},
        	errors:{},
        	version:''
        };
    }

    componentDidMount(){
    	let that = this;
    	versionDatabase.once("value", function(snapshot){
            let data = snapshot.val();
            if(data){
            	that.setState({version: data.version})
            }
        })
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
        if(!fields["version"]){
            formIsValid = false;
            errors["version"] = "Please select version selector json.";
        }
        this.setState({errors: errors});
        if(formIsValid){
	    	const data = new FormData(); 
	        data.append('version', this.uploadProfile.files[0]);
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"version/upload", {
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
				                    	<CLabel style={{fontSize:'18px'}} htmlFor="hf-title">Current Version : <b>{this.state.version}</b></CLabel>
				                  	</CCol>
				                	<CCol md="12">
				                    	<CLabel htmlFor="hf-Type">Upload Version Selector JSON</CLabel><br/>
				                    	<input
                                        	accept="json/*"
                                            type="file"
                                            ref={(ref) => { this.uploadProfile = ref; }}
                                            onChange={this.handleUploadImage.bind(this,'version')}
                                        />
		                    			<CFormText className="help-block">{this.state.errors['version']}</CFormText>
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
