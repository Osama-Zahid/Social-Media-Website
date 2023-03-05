import React, { useContext } from 'react'
import {AuthContext} from '../../redux/AuthContext'
import './share.css'
import {InsertPhotoOutlined,PermMedia,AttachFileOutlined,PollOutlined, LineAxisOutlined} from "@mui/icons-material"
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
export default function Share() {
    const {user}=useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc=useRef();
    const [file,setfile]=useState(null)
    const submithandler=async(e)=>{
        e.preventDefualt()
        const newpost = {
            userID:user._id,
            desc:desc.current.value,
        }
        try{
            await axios.post('/posts/',newpost)
        }catch(err){

        }
    }
  return (
    <div className='share'>
        <div className="sharewrapper">
            <div className="sharetop">
                <img className='shareprofilepicture' alt='' src={user.profilePicture?PF+user.profilePicture : PF+"person/download.png"}/>
                <input placeholder={"What's in your mind " + user.username+"?"} className='shareinput' ref={desc}/>
            </div>
            <hr className='shareHR'/>
            <form className="sharebottom" onSubmit={submithandler}>
                <div className="shareoptions">
                    <label htmlFor='file' className="shareoption">
                        <InsertPhotoOutlined className='shareicon'/>
                        <span className="shareoptiontext">Photo</span>
                        <input style={{display:"none"}} type="file" id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setfile(e.target.files[0])}/>
                    </label>
                    <label htmlFor='file' className="shareoption">
                        <PermMedia className='shareicon'/>
                        <span className="shareoptiontext">Video</span>
                        <input style={{display:"none"}} type="file" id='file' accept='.mp4' onChange={(e)=>setfile(e.target.files[0])}/>
                    </label>
                    <label htmlFor='file' className="shareoption">
                        <AttachFileOutlined className='shareicon'/>
                        <span className="shareoptiontext">Notes</span>
                        <input style={{display:"none"}} type="file" id='file' accept='.txt,.docx,.cpp,.py,.c' onChange={(e)=>setfile(e.target.files[0])}/>
                    </label>
                    <label htmlFor='file' className="shareoption">
                        <PollOutlined className='shareicon'/>
                        <span className="shareoptiontext">Polls</span>
                    </label>
                </div>
                <button className="shareButton" type='submit'>Share</button>
            </form>   
        </div>
    </div>
  )
}
