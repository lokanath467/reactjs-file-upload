import { render } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import './Main.css'

class Main extends React.Component{

    constructor(){
        super();
        this.state={
            fileToBeUploaded:'',
            dataFromServer:''
        }
       this.fileUploadChange=this.fileUploadChange.bind(this);
       this.uploadFile=this.uploadFile.bind(this);
    }

    fileUploadChange(event){
        this.setState({fileToBeUploaded:event.target.files[0]})
    }

    uploadFile(){
        const formData=new FormData();
        formData.append("upload_excel",this.state.fileToBeUploaded)
        axios.post('http://localhost:5000/upload_excel',formData,{
            headers:{
                'Content-type':'multipart/form-data'
            }
        }).then((res)=>{
           
            this.setState({
                dataFromServer:JSON.stringify(res['data'])
            })

        }).catch((err)=>{
            console.log(err);
        });
        
    }
   
render(){

    return (
        <>
            <label for="upload_excel">Upload Excel</label>
            <input type="file" id="upload_excel" name="upload_excel" onChange={this.fileUploadChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            <button onClick={this.uploadFile}>Upload</button>
            <div>{this.state.dataFromServer}</div>
            </>
    );
}
}
export default Main;