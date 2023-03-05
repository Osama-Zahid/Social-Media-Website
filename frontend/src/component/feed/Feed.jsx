import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import axios from "axios"
import {AuthContext} from '../../redux/AuthContext'

export default function Feed({username}) {
  const [post,setpost]=useState([]);
  const {user}=useContext(AuthContext)
  useEffect(()=>{
    const fetchpost = async () =>{
      const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("/posts/timeline/" + user._id);
      setpost(res.data)
    }
    fetchpost();
  },[username,user._id])
  return (
    <div className="Feed">
      <div className="wrapper">
        <Share/>
        {post.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}
