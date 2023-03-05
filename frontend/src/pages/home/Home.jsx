import Feed from "../../component/feed/Feed";
import Sidebar from "../../component/sidebar/Sidebar";
import Rightbar from "../../component/rightbar/Rightbar";
import Topbar from "../../component/topbar/Topbar";
import './home.css'
import Eand from "../../component/btw_S_and_F/Eand";
export default function Home()
{
    return (
      <>
        <Topbar/>
        <div className="homecontainer">
          <Sidebar/>
          <Eand/>
          <Feed />
          <Rightbar/>
        </div>      
      </>
    )
}