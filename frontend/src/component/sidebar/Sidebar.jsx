import './sidebar.css'
import {StarRounded,BookmarkBorderRounded,HistoryRounded,RecommendOutlined,NotificationsNoneRounded,SettingsOutlined,MoveToInboxRounded} from '@mui/icons-material'
export default function Sidebar(){
    return(
        <div className="Sidebar">
            <div className="sidebarwrapper">
                <ul className="sidebarlist">
                    <li className="sidebarlistitem">
                        <NotificationsNoneRounded className='sidebaricon'/>
                        <span className="sidebarlistitemtext">Notifications</span>
                    </li>
                    <li className="sidebarlistitem">
                        <RecommendOutlined className='sidebaricon'/>
                        <span className="sidebarlistitemtext">Recommendations</span>
                    </li>                
                    <li className="sidebarlistitem">
                        <StarRounded className='sidebaricon'/>
                        <span className="sidebarlistitemtext">Favourites</span>
                    </li>
                    <li className="sidebarlistitem">
                        <BookmarkBorderRounded className='sidebaricon'/>
                        <span className="sidebarlistitemtext">Wish List</span>
                    </li>
                    <li className="sidebarlistitem">
                        <HistoryRounded className='sidebaricon'/>
                        <span className="sidebarlistitemtext">History</span>
                    </li>
                    <li className="sidebarlistitem">
                        <MoveToInboxRounded className='sidebaricon'/>
                        <span className="sidebarlistitemtext">Archived</span>
                    </li>
                    <li className="sidebarlistitem">
                        <SettingsOutlined className='sidebaricon'/>
                        <span className="sidebarlistitemtext">Settings</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}