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
import { Editor } from '@tinymce/tinymce-react';

class view extends Component {
	constructor(props) {
        super(props);
        this.state = {
            chart:[],
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

    editorChange(field, e){     
        let fields = this.state.fields;
        fields[field] = e;        
        this.setState({fields});
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
        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Please enter title.";
        }
        if(!fields["type"]){
            formIsValid = false;
            errors["type"] = "Please enter type.";
        }
        if(!fields["description"]){
            formIsValid = false;
            errors["description"] = "Please enter description.";
        }
        if(!fields["metadata"]){
            formIsValid = false;
            errors["metadata"] = "Please enter metadata.";
        }
        if(!fields["small_icon"]){
            formIsValid = false;
            errors["small_icon"] = "Please select small icon.";
        }
        if(!fields["big_icon"]){
            formIsValid = false;
            errors["big_icon"] = "Please select big icon.";
        }
        if(this.state.selectedItems.length === 0){
            formIsValid = false;
            errors["user_id"] = "Please select at least one user.";
        }
        this.setState({errors})
        if(formIsValid){
        	this.setState({showLoader:true})
            let fields = this.state.fields;
            fields['user_id'] = this.state.selectedItems;
            this.setState({fields});

            const data = new FormData(); 
            data.append('small_icon', this.uploadSmallIcon.files[0]);
            data.append('big_icon', this.uploadBigIcon.files[0]);
            data.append('fields', JSON.stringify(this.state.fields));

        	fetch(configuration.baseURL+"auth/send-notification", {
	            method: "post",
	            headers: {
	                'contentType': "application/json",
	            },
	            body:data
	        }).then((response) => {
	            return response.json();
	        }).then((data) => {
	        	let chart = this.state.chart;
                let fields = this.state.fields;
	        	chart['description'] = '';
                fields['description'] = '';
                chart['title'] = '';
                fields['title'] = '';
                fields['type'] = '';
                chart['metadata'] = '';
                fields['metadata'] = '';
                fields['small_icon'] = null;
                fields['big_icon'] = null;
	        	this.setState({fields, selectedItems:[], showLoader:false, chart:chart})
	        	return toast.success('Notification sent successfully.');
	        });
        }
    }

    handleUploadImage(type,ev){
        let fields = this.state.fields;
        fields[type] = type;
        this.setState({fields});
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
                                            showSelectAll={true}
                                            //maxSelectedItems={1}
                                        />
		                    			<CFormText className="help-block">{this.state.errors['user_id']}</CFormText>
				                  	</CCol>
				                </CFormGroup>
				                <CFormGroup row>
				                	<CCol md="6">
                                        <CLabel htmlFor="hf-Status">Title</CLabel>
                                        <Editor
                                            initialValue={this.state.chart['title']}
                                            onEditorChange={this.editorChange.bind(this, 'title')}
                                            apiKey="ojlr793y9oqw2wrsdfmucxcsikt18elks1q43n0ojw5z9m33"
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | code'
                                            }}
                                        />
                                        <CFormText className="help-block">{this.state.errors['title']}</CFormText>
                                    </CCol>
                                    <CCol md="6">
                                        <CLabel htmlFor="hf-Status">Description</CLabel>
                                        <Editor
                                            initialValue={this.state.chart['description']}
                                            onEditorChange={this.editorChange.bind(this, 'description')}
                                            apiKey="ojlr793y9oqw2wrsdfmucxcsikt18elks1q43n0ojw5z9m33"
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | code'
                                            }}
                                        />
                                        <CFormText className="help-block">{this.state.errors['description']}</CFormText>
                                    </CCol>
				                </CFormGroup> 
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CLabel htmlFor="hf-Status">Small Icon</CLabel><br/>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            ref={(ref) => { this.uploadSmallIcon = ref; }}
                                            onChange={this.handleUploadImage.bind(this,'small_icon')}
                                        />
                                        <CFormText className="help-block">{this.state.errors['small_icon']}</CFormText>
                                    </CCol>
                                    <CCol md="6">
                                        <CLabel htmlFor="hf-Status">Big Icon</CLabel><br/>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            ref={(ref) => { this.uploadBigIcon = ref; }}
                                            onChange={this.handleUploadImage.bind(this,'big_icon')}
                                        />
                                        <CFormText className="help-block">{this.state.errors['big_icon']}</CFormText>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CLabel htmlFor="hf-Status">Type</CLabel>
                                        <CInput type="text" placeholder="Enter type" onChange={this.handleChange.bind(this, 'type')} value={this.state.fields.type} />
                                        <CFormText className="help-block">{this.state.errors['type']}</CFormText>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="12">
                                        <CLabel htmlFor="hf-Status">Metadata</CLabel><br/>
                                        <Editor
                                            initialValue={this.state.chart['metadata']}
                                            onEditorChange={this.editorChange.bind(this, 'metadata')}
                                            apiKey="ojlr793y9oqw2wrsdfmucxcsikt18elks1q43n0ojw5z9m33"
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | code'
                                            }}
                                        />
                                        <CFormText className="help-block">{this.state.errors['metadata']}</CFormText>
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
