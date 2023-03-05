import './Topbarcss.css';
import { Link } from 'react-router-dom';
import {Search,NotificationsNoneOutlined, HouseSidingOutlined,BusinessCenterRounded} from "@mui/icons-material"
import { useContext } from 'react';
import {AuthContext} from '../../redux/AuthContext'
export default function Topbar(){
    const {user}=useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">eLearn</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="Searchbar">
                    <input placeholder=" Search eLearn" className="searchInput" />
                    <Search className='searchicon'/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbariconItem">
                        <HouseSidingOutlined/>
                        <span className="topbarIconBadge"></span>
                    </div>
                    <div className="topbariconItem">
                        <NotificationsNoneOutlined/>
                        <span className="topbarIconBadge"></span>
                    </div>
                    <div className="topbariconItem">
                        <BusinessCenterRounded/>
                        <span className="topbarIconBadge"></span>
                    </div>
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+ user.profilePicture : PF+"person/download.png"} alt="" className="topbarImg"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}