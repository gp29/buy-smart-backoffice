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
import _ from 'underscore';
import configuration from '../../config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class add extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	fields:{},
        	errors:{}
        };
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

        if(!fields["Host"]){
            formIsValid = false;
            errors["Host"] = "Please enter Host.";
        }
        if(!fields["Brand_name"]){
            formIsValid = false;
            errors["Brand_name"] = "Please enter Brand name.";
        }
        if(!fields["Product_Title"]){
            formIsValid = false;
            errors["Product_Title"] = "Please enter Product Title.";
        }
        if(!fields["Product_Url"]){
            formIsValid = false;
            errors["Product_Url"] = "Please enter Product URL.";
        }
        if(!fields["Img_url"]){
            formIsValid = false;
            errors["Img_url"] = "Please enter IMG URL.";
        }
        if(!fields["Mrp"]){
            formIsValid = false;
            errors["Mrp"] = "Please enter Mrp.";
        }
        if(!fields["SellPrice"]){
            formIsValid = false;
            errors["SellPrice"] = "Please enter SellPrice.";
        }
        if(!fields["Discount"]){
            formIsValid = false;
            errors["Discount"] = "Please enter Discount.";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

	submit() {
		if(this.validation()){
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"product/create", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(this.state.fields)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				let keys = Object.keys(this.state.fields)
				let fields = this.state.fields
				_.each(keys, (elem) => {
					fields[elem] = ''
				})
				this.setState({showLoader:false, fields})
				return toast.success('Product added successfully.');
			});
		}
	}

    render() {
	  	return (
	  		<CRow>
	  			<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
	  			<div className="loader-img" style={{display: this.state.showLoader ? 'block' : 'none' }}></div>
        		<CCol xs="12" md="12">
          			<CCard>
	            		<CCardBody>
	            			<CForm className="form-horizontal">
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-title">Category ID</CLabel>
				                    	<CInput type="text" placeholder="Enter category id" onChange={this.handleChange.bind(this,'category_id')} value={this.state.fields.category_id} />
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Host</CLabel>
				                    	<CInput type="text" placeholder="Enter host" onChange={this.handleChange.bind(this,'Host')} value={this.state.fields.Host} />
				                    	<CFormText className="help-block">{this.state.errors.Host}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Brand name</CLabel>
				                    	<CInput type="text" placeholder="Enter brand name" onChange={this.handleChange.bind(this,'Brand_name')} value={this.state.fields.Brand_name} />
				                    	<CFormText className="help-block">{this.state.errors.Brand_name}</CFormText>
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Product Title</CLabel>
				                    	<CInput type="text" placeholder="Enter product title" onChange={this.handleChange.bind(this,'Product_Title')} value={this.state.fields.Product_Title} />
				                    	<CFormText className="help-block">{this.state.errors.Product_Title}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Product Url</CLabel>
				                    	<CInput type="text" placeholder="Enter url" onChange={this.handleChange.bind(this,'Product_Url')} value={this.state.fields.Product_Url} />
				                    	<CFormText className="help-block">{this.state.errors.Product_Url}</CFormText>
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Img url</CLabel>
				                    	<CInput type="text" placeholder="Enter host" onChange={this.handleChange.bind(this,'Img_url')} value={this.state.fields.Img_url} />
				                    	<CFormText className="help-block">{this.state.errors.Img_url}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Mrp</CLabel>
				                    	<CInput type="text" placeholder="Enter Mrp" onChange={this.handleChange.bind(this,'Mrp')} value={this.state.fields.Mrp} />
				                    	<CFormText className="help-block">{this.state.errors.Mrp}</CFormText>
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">SellPrice</CLabel>
				                    	<CInput type="text" placeholder="Enter SellPrice" onChange={this.handleChange.bind(this,'SellPrice')} value={this.state.fields.SellPrice} />
				                    	<CFormText className="help-block">{this.state.errors.SellPrice}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Discount</CLabel>
				                    	<CInput type="text" placeholder="Enter Discount" onChange={this.handleChange.bind(this,'Discount')} value={this.state.fields.Discount} />
				                    	<CFormText className="help-block">{this.state.errors.Discount}</CFormText>
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Colour</CLabel>
				                    	<CInput type="text" placeholder="Enter Colour" onChange={this.handleChange.bind(this,'Colour')} value={this.state.fields.Colour} />
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Rating Count</CLabel>
				                    	<CInput type="text" placeholder="Enter count" onChange={this.handleChange.bind(this,'Rating_Count')} value={this.state.fields.Rating_Count} />
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Review Count</CLabel>
				                    	<CInput type="text" placeholder="Enter count" onChange={this.handleChange.bind(this,'Review_Count')} value={this.state.fields.Review_Count} />
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Rating Star</CLabel>
				                    	<CInput type="text" placeholder="Enter start" onChange={this.handleChange.bind(this,'Rating_Star')} value={this.state.fields.Rating_Star} />
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">SS update</CLabel>
				                    	<CInput type="text" placeholder="Enter ss update" onChange={this.handleChange.bind(this,'SS_update')} value={this.state.fields.SS_update} />
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">CS update</CLabel>
				                    	<CInput type="text" placeholder="Enter cs update" onChange={this.handleChange.bind(this,'CS_update')} value={this.state.fields.CS_update} />
				                  	</CCol>
				                  	<CCol md="6">
				                    	<CLabel htmlFor="hf-code">Query count</CLabel>
				                    	<CInput type="text" placeholder="Enter count" onChange={this.handleChange.bind(this,'Query_count')} value={this.state.fields.Query_count} />
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

export default add
