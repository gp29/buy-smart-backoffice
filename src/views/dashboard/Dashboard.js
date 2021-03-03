import React,{Component} from 'react'
import Session from '../../session';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CFormGroup,
  CLabel
} from '@coreui/react'
import _ from 'underscore';
import common from '../../common';
import configuration from '../../config';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

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

    render() {
    	const selectRowProp = {
			mode: 'checkbox',
			clickToSelect: true,
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
			}, {
				text: 'All', value: this.state.dataSize
			} ],  
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
		  		<CRow>
		  			<CCol xs="12" md="12">
          				<CCard>
		            		<CCardBody>
		            			<CFormGroup row>
				                	<CCol md="6">
				                    	<CLabel htmlFor="hf-Status">Import Data</CLabel><br/>
				                    	<input
		                                	//accept="image/*"
		                                    type="file"
		                                    ref={(ref) => { this.uploadFile = ref; }}
		                                    onChange={this.uploadJson.bind(this)}
		                                />
				                  	</CCol>
                                </CFormGroup>
		            			<BootstrapTable data={this.state.data} version='4' pagination={ true } selectRow={ selectRowProp } remote={ true } fetchInfo={{ dataTotalSize: this.state.dataSize }} options={ options } ref='table' hover search={true} >
									<TableHeaderColumn isKey dataField='product_id' hidden={ true }>#ID</TableHeaderColumn>
									<TableHeaderColumn  dataField='product_id'  dataSort={ true }  width='15%'>#ID</TableHeaderColumn>
									<TableHeaderColumn dataField='Host' dataSort={ true }  width='10%'>Host</TableHeaderColumn>
									<TableHeaderColumn dataField='Brand_name' dataSort={ true } width='10%'>Brand</TableHeaderColumn>
									<TableHeaderColumn dataField='Product_key' width='15%'>Product Key</TableHeaderColumn>
									<TableHeaderColumn dataField='Colour' width='10%'>Colour</TableHeaderColumn>
									<TableHeaderColumn dataField='Mrp' width='10%'>Mrp</TableHeaderColumn>
									<TableHeaderColumn dataField='SellPrice' dataSort={ true } width='10%'>Sell Price</TableHeaderColumn>
									<TableHeaderColumn dataField='Discount' dataSort={ true } width='10%'>Discount</TableHeaderColumn>
									<TableHeaderColumn dataField='Rating_Star' dataSort={ true } width='10%'>Rating</TableHeaderColumn>
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
