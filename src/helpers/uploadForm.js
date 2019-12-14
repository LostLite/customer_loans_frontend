import React, { useState } from 'react'
import apiCall from '../helpers/axiosRequests';
import './uploadForm.css'

export default function UploadForm(props) {

    const [uploadFile, setUploadFile] = useState('');
    const [uploading, setUploading] = useState('');

    const uploadFileHandler = event => {

        setUploadFile(event.target.files[0])
    }

    const submitHandler = () => {
        if(uploadFile === ''){
            alert('Select file to upload first')
        }else{
            setUploading('File uploading...')
            const fd = new FormData();
            fd.append('uploadFile', uploadFile, uploadFile.name)
            apiCall('post',props.url,fd,{'Content-Type': 'multipart/form-data'})
                .then(res => {
                    setUploading('')
                    setUploadFile('')
                    alert(res.data.message)
                }).catch(err =>{
                    setUploading(false)
                    alert(err)
                })
        }
        
    }

    return (
        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s1 right">
                        <div className="btn-flat left" onClick={submitHandler}>
                            <i className="material-icons prefix">cloud_upload</i>
                        </div>
                    </div>
                    <div className="input-field col s3 right">
                        <div className="file-field">
                            <div>
                                <input type="file" id="dataFile" onChange={uploadFileHandler}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"  placeholder="Select file"/>
                                <label><span className="blue-text text-darken-2">{uploading}</span></label>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}
