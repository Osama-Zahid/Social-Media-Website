import React, { useEffect,useState } from 'react'
import './post.css'
import {MoreVertOutlined,ThumbUpOutlined,ThumbDownOffAltOutlined,CommentOutlined,ShareOutlined,BookmarkBorderRounded} from '@mui/icons-material'
import axios from 'axios'
import {format} from "timeago.js"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../redux/AuthContext'
export default function Post({post}) {
    const[like,setlike]=useState(post.likes.length)
    const[isliked,setisliked]=useState(false)
    const[dislike,setdislike]=useState(post.dislikes)
    const[isdisliked,setdisliked]=useState(false)
    const[share,setshare]=useState(post.share)
    const[is_shared,setis_shared]=useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentuser}=useContext(AuthContext)


    useEffect(()=>{
        setisliked(post.likes.includes(currentuser._id))
    },[currentuser._id,post.likes])
    const [user,setuser]=useState({});
    useEffect(()=>{
    const fetchuser = async () =>{
        const res = await axios.get(`/users?userID=${post.userID}`);
        setuser(res.data)
    }
    fetchuser();
  },[post.userID])

    const likehandler=()=>{
        try{
            axios.put("/posts/" + post._id+"/like",{userID:currentuser._id})
        }catch(err){

        }
        setlike(isliked ? like - 1 :like+1)
        setisliked(!isliked)
    }
    const dislikehandler=()=>{
        try{
            axios.put("/posts/" + post._id+"/dislike",{userID:currentuser._id})
        }catch(err){

        }
        setdislike(isdisliked ? dislike -1:dislike+1)
        setdisliked(!isdisliked)
    }
    const shareholder=()=>{
        setshare(is_shared ? share -1 : share+1)
        setis_shared(!is_shared)
    }
    return (
    <div className='postcontainer'>
        <div className="postwrapper">
            <div className="posttop">
                <div className='posttopleft'>
                    <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture: PF+"person/download.png"}
                            alt=''
                            className='postprofileimage'
                        />
                    </Link>
                    <span className="postusername">{user.username}
                    </span>
                    <span className="postdate">{format(post.createdAt)}</span>
                </div>
                <div className="posttopright">
                    <MoreVertOutlined/>
                </div>
            </div>
            <div className="postcenter">
                <span className="postcaption">{post?.desc}</span>
                <img className='postpic' src={PF+post.img} alt=''/>
            </div>
            <hr className='shareHR'/>
            <div className="postbottom">
                <div className="postbottomleft">
                    <div className='bottomlefticons'>
                        <ThumbUpOutlined className='icons' onClick={likehandler}/>
                        <span className="postlikecounter"> {like}</span>
                    </div>
                    <div className='bottomlefticons'>
                        <ThumbDownOffAltOutlined className='icons' onClick={dislikehandler}/>
                        <span className="postdislikecounter"> {dislike}</span>
                    </div>
                    <div className='bottomlefticons'>
                        <CommentOutlined className='icons'/>
                        <span className="bottomleftlisticons"> 9</span>
                    </div>
                    <div className='bottomlefticons'>
                        <ShareOutlined className='icons' onClick={shareholder}/>
                        <span className="bottomleftlisticons">{share}</span>
                    </div>
                    <div className="bottomlefticons">
                        <BookmarkBorderRounded className="icons"/>
                        <span className="bottomleftlisticons"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
