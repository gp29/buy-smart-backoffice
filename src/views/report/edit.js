import React, {Component} from 'react'
import {
  CCol,
  CRow,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CFormGroup,
  CForm,
  CLabel,
  CInput,
  CFormText
} from '@coreui/react'
import configuration from '../../config';
let report_category_id;


class edit extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	fields:{},
        	errors:{}
        };
    }

    handleCancel(){
    	this.props.history.push('/report/view')
    }

    handleChange(field, e){
    	let fields = this.state.fields
    	fields[field] = e.target.value;
    	this.setState({fields})
    }

    validation(){
    	let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Please enter title.";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

	submit() {
		if(this.validation()){
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"report/update", {
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
				this.handleCancel()
			});
		}
	}

	componentWillMount(){
		var url = window.location.href;
        report_category_id=url.substring(url.lastIndexOf('/') + 1);
		
		fetch(configuration.baseURL+"report/get?report_category_id="+report_category_id).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
	   		this.setState({ fields: data.payload[0]});
	    }); 
	}

    render() {
	  	return (
	  		<CRow>
	  			<div className="loader-img" style={{display: this.state.showLoader ? 'block' : 'none' }}></div>
        		<CCol xs="12" md="12">
          			<CCard>
	            		<CCardBody>
	            			<CForm className="form-horizontal">
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-title">Title</CLabel>
				                    	<CInput type="text" placeholder="Enter title" onChange={this.handleChange.bind(this,'title')} value={this.state.fields.title} />
				                    	<CFormText className="help-block">{this.state.errors.title}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				              </CForm>
			            </CCardBody>
			            <CCardFooter>
			            	<CButton color="primary" className="px-4" onClick={this.submit.bind(this)}>Submit</CButton>{' '}
			            	<CButton color="danger" className="px-4" onClick={this.handleCancel.bind(this)}>Cancel</CButton>
			            </CCardFooter>
		            </CCard>
		        </CCol>  
		    </CRow>      
	  	)
    }
}

export default edit
