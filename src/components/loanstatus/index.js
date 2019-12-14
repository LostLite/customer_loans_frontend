import React, { Component } from 'react';
import apiCall from '../../helpers/axiosRequests';
import Preloader from '../../helpers/preloader';
import UploadForm from '../../helpers/uploadForm';

class index extends Component {
    
    state = {
        loanStatuses : [],
        showLoading: false
    }

    loadData(){
        this.setState({
            showLoading: true
        });
        apiCall('get','loanStatus/')
            .then(res => {
                this.setState({
                    loanStatuses: res.data.loanStatusList,
                    showLoading: false
                });
            }).catch(err =>{
                alert(err)
                this.setState({
                    showLoading: false
                });
            });
    }

    refreshHandler=()=>{
        this.loadData()
    }

    componentDidMount(){
        this.loadData()
    }

    render() {
        const { loanStatuses, showLoading} = this.state; 
        const loanStatusList = loanStatuses.length? (
            loanStatuses.map(loanStatus => {
                return (
                    <tr key={loanStatus.id}>
                        <td>{loanStatus.status}</td>
                    </tr>
                )
            })
        ):(
            <tr>
                <td>No loan statuses registered yet.</td>
            </tr>
        );

        return (
            <div className="container">
                <UploadForm url="loanStatus/upload"/>
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s6">
                                <span className="card-title">Loan Statuses</span>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small right" onClick={this.refreshHandler}>Refresh 
                                    <i className="material-icons right">refresh</i>
                                </button>
                            </div>
                        </div>
                        <table className="stripped">
                            <tbody>
                                {loanStatusList}
                            </tbody>
                        </table>
                    </div>
                </div>
                {showLoading && <Preloader />}
                
            </div>
        )
    }
}

export default index;
