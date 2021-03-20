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
    { key: 'feed_id',label:'#ID', _style: { width: '10%'} },
    { key: 'Index', _style: { width: '25%'} },
    { key: 'Img_key', _style: { width: '35%'} },
    { key: 'Img_url', _style: { width: '20%'} },
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
    	fetch(configuration.baseURL+"feed/get").then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ data: data.payload});
		});	
    }

    submit(){
    	let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if(!fields["Img_url"]){
            formIsValid = false;
            errors["Img_url"] = "Please enter img urls.";
        }
        this.setState({errors: errors});
        if(formIsValid){
			this.setState({showLoader:true})
			fetch(configuration.baseURL+"feed/add", {
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
		    	fields['Img_url'] = '';
		    	this.setState({fields})
			});
        }
    }

    handleAction(type, feed_id) {
		this.setState({showLoader:true})
		fetch(configuration.baseURL+"feed/action", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({ids:[feed_id], type:type})
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
				                    	<CLabel htmlFor="hf-title">Image URLs ( Pass like => 1|2|3 )</CLabel>
				                    	<CInput type="text" placeholder="Enter urls" onChange={this.handleChange.bind(this,'Img_url')} value={this.state.fields.Img_url} />
				                    	<CFormText className="help-block">{this.state.errors.Img_url}</CFormText>
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
						          	'Img_url':
						          	(item)=>(
							            <td>
							              	<img src={item.Img_url} alt="buysmart" style={{width:'60px'}}/>
							            </td>
						          	),
						          	'delete':
						          	(item)=>(
							            <td>
							              	<img alt="delete icon" src="img/close.png" width="15" onClick={this.handleAction.bind(this, 'delete',item.feed_id)}/>
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
