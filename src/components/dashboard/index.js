import React, { Component } from 'react';
import Materialize from "materialize-css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import apiCall from '../../helpers/axiosRequests';
import './index.css';
import Preloader from '../../helpers/preloader';
import UploadForm from '../../helpers/uploadForm';
import PdfWrapper from '../../helpers/pdfWrapper';

class index extends Component {
    
    state = {
        loansList : [],
        from: '',
        to: '',
        format: "yyyy-mm-dd",
        showLoading: true
    }

    loadData(filterUrl=''){
        this.setState({
            showLoading: true
        });
        apiCall('get',`loans/${filterUrl}`)
            .then(res => {
                this.setState({
                    loansList: res.data.loansList,
                    showLoading: false
                });
            }).catch(err =>{
                alert(err)
                this.setState({
                    showLoading: false
                });
            });
    }

    refreshHandler =() =>{
        this.loadData()
    }

    exportPDF = () => {
        PdfWrapper('Customer Loans', this.state.loansList)
    }

    filterHandler = () =>{
        const {from, to} = this.state;
        if(from === '' || to === ''){
            alert('Select both From and To to filter reports by')
        }else{
            this.loadData(`?from=${from}&to=${to}`)
        }
        
    }

    componentDidMount(){
        var elems = document.querySelectorAll(".dateset");
        Materialize.Datepicker.init(elems, {
            defaultDate: new Date(),
            format: this.state.format,
            container: "body",
            onClose: (date) => {
                this.setState({
                    from: document.getElementById('from').value,
                    to:document.getElementById('to').value
                })
            },
            autoClose: true
        });
        this.loadData()
    }

    render() {
        const { loansList, showLoading} = this.state; 
        const loans = loansList.length? (
            loansList.map(loan => {
                
                return (
                    <tr key={loan.id}>
                        <td>{loan.loanDate}</td>
                        <td>{loan.dueDate}</td>
                        <td>{loan.loanCode}</td>
                        <td>{loan.loanAmount}</td>
                        <td>{loan.LoanStatus.status}</td>
                        <td>{loan.UnitStation.stationName}</td>
                        <td>{loan.customerId}</td>
                    </tr>
                )
            })
        ):(
            <tr>
                <td colSpan="7">No loan reports to show.</td>
            </tr>
        );

        return (
            <div className="container">
                <UploadForm url="loans/upload"/>
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <span><i className="material-icons">filter_list</i></span> Filter By Loan Date
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-field col s3">
                            <input placeholder="From When" id="from" type="text" className="datepicker dateset" />
                            <label htmlFor="from">From</label>
                        </div>
                        <div className="input-field col s3">
                            <input placeholder="To When" id="to" type="text" className="datepicker dateset" />
                            <label htmlFor="to">To</label>
                        </div>
                        <div className="input-field col s2">
                            <button className="btn btn-small right" onClick={this.filterHandler}>Submit 
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s6">
                                <span className="card-title">Loan Applications</span>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small right" onClick={this.refreshHandler}>Refresh 
                                    <i className="material-icons right">refresh</i>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-small download-table-xls-button"
                                table="table-to-xls"
                                filename="LoanReport"
                                sheet="loan_report"
                                buttonText="Download as XLS"/>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small right" onClick={this.exportPDF}>Download AS PDF</button>
                            </div>
                        </div>
                        
                        <table id="table-to-xls" className="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>Loan Date</th>
                                    <th>Due Date</th>
                                    <th>Loan Code</th>
                                    <th>Loan Amount</th>
                                    <th>Status</th>
                                    <th>Station</th>
                                    <th>Customer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans}
                            </tbody>
                        </table>
                        {showLoading && <Preloader />}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default index;
