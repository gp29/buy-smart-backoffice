import React,{Component} from 'react'
import Session from '../../session';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  //CFormGroup,
  //CLabel,
  CButton,
  	CModal,
  	CModalHeader,
  	CModalTitle,
  	CModalBody,
  	CModalFooter
} from '@coreui/react'
import _ from 'underscore';
import common from '../../common';
import configuration from '../../config';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function showImage(cell, row) {
	return <img src={cell} alt="buysmart" style={{width:'60px'}}/>;
}

class Dashboard extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showLoader:false,
        	isDataFetched:false,
        	data:[],
        	products:[],
        	originalProductSize:0,
        	dataSize:0,
        	modal:false,
        	showDetails:false,
        	fields:{}
        };
    }

    componentDidMount(){
    	let data={};
        this.listingData(data);
    }

    listingData(value){
		value.url = "product/get";
		var that = this;
		common.fetchTableData(value,function(data){
			that.setState({ products: data.payload.product, isDataFetched:true});
	   		that.setState({ data: data.payload.product});
	   		that.setState({ originalProductSize: data.payload.count});
	   		that.setState({ dataSize: data.payload.count});
		});
	}

    sizePerPageListChange(sizePerPage) {
	  	let data = {
	  		sizePerPage: sizePerPage
	  	}
	  	this.listingData(data);
	}

	onPageChange(page, sizePerPage) {
	  	let data = {
	  		page: page - 1,
	  		sizePerPage: sizePerPage
	  	}
	  	this.listingData(data);
	}

	onSearchChange(searchText, colInfos) {
	    const text = searchText.trim();
	    if (text === '') {
	      this.setState({data: this.state.products, dataSize:this.state.originalProductSize});
	    }
	    else{
	    	let value={
	    		text:text,
	    		data:this.state.products,
	    		colInfos:colInfos
	    	}
			var that = this;
			common.searchTableDate(value,function(data){
		   		that.setState({ data: data, dataSize:data.length});
			});
	    }
	}

	onSortChange(sortName, sortOrder) {
  		let data = this.state.products
  		let newData = []
  		if(sortOrder === 'asc'){
  			newData = _.sortBy(data, sortName);
  		} else {
  			newData = _.sortBy(data, sortName).reverse();
  		}
    	this.setState({data: newData});
  	}

  	renderShowsTotal(start, to, total) {
		return (
			<p >
				Showing   { start } to { to } Products out of { total } Total Records
			</p>
		);
	}

	setTableOption(){
		if(this.state.isDataFetched){
           return "There is no data to display";
      	}
		else{
	        return(
	        	<p className='table-loader'>
					<img src="img/loader.gif" style={{width:'80px',height:'80px'}} alt="Logo" />
				</p>
	        );
	    }
  	}

  	uploadJson(){
  		const data = new FormData(); 
        data.append('json_file', this.uploadFile.files[0]);
		this.setState({showLoader:true})
		fetch(configuration.baseURL+"product/import", {
			method: "post",
			headers: {
				'contentType': "application/json",
			},
			body:data
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({showLoader:false});
			this.componentDidMount();
			this.refs.table.reset();
		});
  	}

  	handleAction(){
  		if(this.refs.table.state.selectedRowKeys.length===0){
			this.setState({modal:true})
		}
		else{
			fetch(configuration.baseURL+"product/action", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body:JSON.stringify({ids:this.refs.table.state.selectedRowKeys, type:'delete'})
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.componentDidMount();
				this.refs.table.reset();
			});
		}
  	}

  	showAllDetails(cell, row){
  		return <span style={{color:'#2373d5', cursor:'pointer'}} onClick={this.openDetails.bind(this, row)}>{cell}</span>
  		
  	}

  	openDetails(row){
  		this.setState({showDetails:true, fields:row})
  	}

    render() {
    	const selectRowProp = {
			mode: 'checkbox',
			//clickToSelect: true,
			bgColor: 'lightgrey'
		};
		const options = {
			sizePerPageList: [ {
				text: '5', value: 5
			}, {
				text: '10', value: 10
			}, {
				text: '25', value: 25
			},{
				text: '50', value: 50
			},{
				text: '100', value: 100
			}
			// , {
			// 	text: 'All', value: this.state.dataSize
			// }
			 ],  
			sizePerPage: 50,
			page: 1,
			sortName: 'product_id',
			//sortOrder: 'desc',
			prePage: 'Prev', 
			nextPage: 'Next', 
			firstPage: 'First', 
			lastPage: 'Last' ,
			onPageChange: this.onPageChange.bind(this),
      		onSizePerPageList: this.sizePerPageListChange.bind(this),
      		onSearchChange: this.onSearchChange.bind(this),
			paginationShowsTotal: this.renderShowsTotal.bind(this),
			onSortChange: this.onSortChange.bind(this),
			paginationPosition: 'both' ,
			noDataText: this.setTableOption()
		};
	  	return (
	  		<div>
	  			<Session/>
	  			<div className="loader-img" style={{display: this.state.showLoader ? 'block' : 'none' }}></div>
	  			<CModal 
	              show={this.state.modal} 
	              onClose={() => this.setState({modal:!this.state.modal})}
	              color="danger"
            	>
              		<CModalHeader closeButton>
                		<CModalTitle>Message</CModalTitle>
              		</CModalHeader>
              		<CModalBody>
		                Please select atleast one row.
              		</CModalBody>
              		<CModalFooter>
		                <CButton color="danger" onClick={() => this.setState({modal:!this.state.modal})}>Close</CButton>{' '}
              		</CModalFooter>
        		</CModal>
        		<CModal 
	              show={this.state.showDetails} 
	              onClose={() => this.setState({showDetails:!this.state.showDetails})}
	              color="danger"
            	>
              		<CModalHeader closeButton>
                		<CModalTitle>Other Details</CModalTitle>
              		</CModalHeader>
              		<CModalBody>
		                <p> <b>Product Url</b> : {this.state.fields.Product_Url} </p>
		                <p> <b>Mrp</b> : {this.state.fields.Mrp} </p>
		                <p> <b>Sell Price</b> : {this.state.fields.SellPrice} </p>
		                <p> <b>Discount</b> : {this.state.fields.Discount} </p>
		                <p> <b>Colour</b> : {this.state.fields.Colour} </p>
		                <p> <b>Rating Count</b> : {this.state.fields.Rating_Count} </p>
		                <p> <b>Review Count</b> : {this.state.fields.Review_Count} </p>
		                <p> <b>Rating Star</b> : {this.state.fields.Rating_Star} </p>
		                <p> <b>Time stamp</b> : {this.state.fields.Time_stamp} </p>
		                <p> <b>SS update</b> : {this.state.fields.SS_update} </p>
		                <p> <b>CS update</b> : {this.state.fields.CS_update} </p>
		                <p> <b>Query count</b> : {this.state.fields.Query_count} </p>
              		</CModalBody>
              		<CModalFooter>
		                <CButton color="danger" onClick={() => this.setState({showDetails:!this.state.showDetails})}>Close</CButton>{' '}
              		</CModalFooter>
        		</CModal>
		  		<CRow>
		  			<CCol xs="12" md="12">
          				<CCard>
		            		<CCardBody>
		            			{/*<CFormGroup row>
				                	<CCol md="6">
				                    	<CLabel htmlFor="hf-Status">Import Data</CLabel><br/>
				                    	<input
		                                	//accept="image/*"
		                                    type="file"
		                                    ref={(ref) => { this.uploadFile = ref; }}
		                                    onChange={this.uploadJson.bind(this)}
		                                />
				                  	</CCol>
                                </CFormGroup>*/}
                                <p>
		            				<CButton color="primary" className="px-4" onClick={()=> this.props.history.push('/product/add')}>Add</CButton>{' '}
		            				<CButton color="danger" className="px-4" onClick={this.handleAction.bind(this)}>Delete</CButton>
		            			</p>
		            			<BootstrapTable data={this.state.data} version='4' pagination={ true } selectRow={ selectRowProp } remote={ true } fetchInfo={{ dataTotalSize: this.state.dataSize }} options={ options } ref='table' hover search={true} >
									<TableHeaderColumn isKey dataField='product_id' hidden={ true }>#ID</TableHeaderColumn>
									<TableHeaderColumn dataField='Index' dataFormat={ this.showAllDetails.bind(this) } dataSort={ true }  width='10%'>Index</TableHeaderColumn>
									<TableHeaderColumn dataField='Host' dataSort={ true } width='10%'>Host</TableHeaderColumn>
									<TableHeaderColumn dataField='Img_key' dataSort={ true } width='10%'>Img key</TableHeaderColumn>
									<TableHeaderColumn dataField='Product_key' width='10%'>Product Key</TableHeaderColumn>
									<TableHeaderColumn dataField='Brand_name' width='10%'>Brand name</TableHeaderColumn>
									<TableHeaderColumn dataField='Product_Title' width='10%'>Product Title</TableHeaderColumn>
									<TableHeaderColumn dataField='Img_url' dataFormat={ showImage } dataSort={ true } width='10%'>Img url</TableHeaderColumn>
									<TableHeaderColumn dataField='category_id' dataSort={ true } width='9%'>Category ID</TableHeaderColumn>
									<TableHeaderColumn dataField='Query_count' dataSort={ true } width='7%'>Query count</TableHeaderColumn>
									<TableHeaderColumn dataField='SS_update' dataSort={ true } width='7%'>SS update</TableHeaderColumn>
									<TableHeaderColumn dataField='CS_update' dataSort={ true } width='7%'>CS update</TableHeaderColumn>
								</BootstrapTable> 
		            		</CCardBody>
		            	</CCard>	
		            </CCol>	
		  		</CRow>
		  	</div>	
	  	)
    }
}

export default Dashboard
