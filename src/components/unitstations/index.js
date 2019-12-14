import React, { Component } from 'react';
import apiCall from '../../helpers/axiosRequests';
import Preloader from '../../helpers/preloader';
import UploadForm from '../../helpers/uploadForm';

class index extends Component {
    
    state = {
        unitStationList : [],
        showLoading: false
    }

    loadData(){
        this.setState({
            showLoading: true
        });
        apiCall('get','unitStations/')
            .then(res => {
                this.setState({
                    unitStationList: res.data.unitStations,
                    showLoading: false
                });
            }).catch(err =>{
                alert(err)
                this.setState({
                    showLoading: false
                });
            });
    }

    refreshHandler =()=>{
        this.loadData()
    }

    componentDidMount(){
        this.loadData()
    }

    render() {
        const { unitStationList, showLoading} = this.state; 
        const unitStations = unitStationList.length? (
            unitStationList.map(station => {
                return (
                    <tr key={station.id}>
                        <td>{station.stationName}</td>
                        <td>{station.dailyTarget}</td>
                        <td>{station.monthlyTarget}</td>
                    </tr>
                )
            })
        ):(
            <tr>
                <td colSpan="3">No stations recorded yet.</td>
            </tr>
        );

        return (
            <div className="container">
                <UploadForm url="unitStations/upload"/>
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s6">
                                <span className="card-title">Unit Stations</span>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small right" onClick={this.refreshHandler}>Refresh 
                                    <i className="material-icons right">refresh</i>
                                </button>
                            </div>
                        </div>
                        
                        <table className="stripped">
                            <thead>
                                <tr>
                                    <th>Station Name</th>
                                    <th>Daily Target</th>
                                    <th>Monthly Target</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unitStations}
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
