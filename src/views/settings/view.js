import React,{Component} from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabs,
  CTabPane,
  CTabContent,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CButton
} from '@coreui/react'
import configuration from '../../config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@material-ui/core/Switch';

class Settings extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	switch:false,
        	fields:{},
        };
    }

    handleChange(field, e){
    	let fields = this.state.fields
    	if(field === 'is_cron_on'){
    		fields[field] = !this.state.switch;
    		this.setState({switch: !this.state.switch})
    	}
    	else{
    		fields[field] = e.target.value;
    	}
    	this.setState({fields})
    }

    componentDidMount(){
    	fetch(configuration.baseURL+"settings/get").then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ fields: data.payload, switch:data.payload.is_cron_on});
		});
    }

    submit(){
    	this.setState({showLoader:true})
		fetch(configuration.baseURL+"settings/update", {
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
			return toast.success('Data updated successfully.');
		});
    }

    setFeedData(){
    	toast.success('Data set successfully.');
    	fetch(configuration.baseURL+"settings/set-feed").then((response) => {
			return response.json();
		}).then((data) => { 
		});
    }

    setAdData(){
    	toast.success('Data set successfully.');
    	fetch(configuration.baseURL+"settings/set-ad").then((response) => {
			return response.json();
		}).then((data) => { 
		});
    }

    render() {
	  	return (
		    <CRow>
		    	<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
	  			<div className="loader-img" style={{display: this.state.showLoader ? 'block' : 'none' }}></div>
        		<CCol xs="12" md="12">
          			<CCard>
	            		<CCardBody>
	            			<CTabs>
				              	<CNav variant="tabs">
					                <CNavItem>
					                  	<CNavLink>
					                    	General
					                  	</CNavLink>
					                </CNavItem>
				              	</CNav>
				              	<CTabContent>
					                <CTabPane>
					                  	<CRow>
					                		<CCol xs="12" md="12">
					                			<CCard>
	            									<CCardBody>
									                  	<CForm className="form-horizontal">
											                <CFormGroup row>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Total Display Ads</CLabel>
											                    	<CInput type="number" placeholder="Enter count" onChange={this.handleChange.bind(this,'display_ad')} value={this.state.fields.display_ad} />
											                  	</CCol>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-code">Total Background Scrap Data</CLabel>
											                    	<CInput type="number" placeholder="Enter count" onChange={this.handleChange.bind(this,'display_background_scrap')} value={this.state.fields.display_background_scrap} />
											                  	</CCol>
											                </CFormGroup>
											                <CFormGroup row>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Display Product Feed</CLabel>
											                    	<CInput type="number" placeholder="Enter count" onChange={this.handleChange.bind(this,'product_feed')} value={this.state.fields.product_feed} />
											                  	</CCol>
											                  	<CCol md="6">	
											                    	<CLabel htmlFor="hf-title">Company Email</CLabel>
											                    	<CInput type="text" placeholder="Enter email" onChange={this.handleChange.bind(this,'email')} value={this.state.fields.email} />
											                  	</CCol>
											                </CFormGroup>
											                <CFormGroup row>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Company Mobile</CLabel>
											                    	<CInput type="text" placeholder="Enter mobile" onChange={this.handleChange.bind(this,'mobile')} value={this.state.fields.mobile} />
											                  	</CCol>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-code">Company Address</CLabel>
											                    	<CInput type="text" placeholder="Enter address" onChange={this.handleChange.bind(this,'address')} value={this.state.fields.address} />
											                  	</CCol>
											                </CFormGroup>
											                <CFormGroup row>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Total Set Feed Page in Cache</CLabel>
											                    	<CInput type="number" placeholder="Enter page" onChange={this.handleChange.bind(this,'total_feed_page_cache')} value={this.state.fields.total_feed_page_cache} />
											                  	</CCol>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-code">Total Categories</CLabel>
											                    	<CInput type="number" placeholder="Enter categories" onChange={this.handleChange.bind(this,'total_category')} value={this.state.fields.total_category} />
											                  	</CCol>
											                </CFormGroup>
											                <CFormGroup row>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Set Feed Data</CLabel><br/>
											                    	<CButton color="primary" className="px-4" onClick={this.setFeedData.bind(this)}>Set</CButton>{' '}
											                  	</CCol>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Set Ad Data</CLabel><br/>
											                    	<CButton color="primary" className="px-4" onClick={this.setAdData.bind(this)}>Set</CButton>{' '}
											                  	</CCol>
											                </CFormGroup>
											                <CFormGroup row>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Report Default Message</CLabel><br/>
											                    	<CInput type="text" placeholder="Enter Message" onChange={this.handleChange.bind(this,'report_default_msg')} value={this.state.fields.report_default_msg} />
											                  	</CCol>
											                  	<CCol md="6">
											                    	<CLabel htmlFor="hf-title">Cron Job Run in Minutes</CLabel><br/>
											                    	<CInput type="text" placeholder="Enter mins" onChange={this.handleChange.bind(this,'cron_run_mins')} value={this.state.fields.cron_run_mins} />
											                  	</CCol>
											                </CFormGroup>
											                <CFormGroup row>
                                                                <CCol md="6">
                                                                    <CLabel htmlFor="hf-title">Is cron job ON ?</CLabel><br/>
                                                                    <Switch onChange={this.handleChange.bind(this, 'is_cron_on')} checked={this.state.switch} onColor="#1e7e34" />
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
					                </CTabPane>
				              	</CTabContent>
				            </CTabs>
			            </CCardBody>
		            </CCard>
		        </CCol>
		    </CRow> 
	  	)
    }
}

export default Settings
