import Home from './pages/home/Home'
import { createContext, useState } from "react";
import './app.css'
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import { useContext } from 'react';

import HomeJob from "./pages/allJob/HomeJob";
import { AuthContext } from './redux/AuthContext';
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
export const SetPopupContext = createContext();
function App() {
  const {user}=useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path ="/">
          {user ? <Home/>: <Register/>}
        </Route>
        <Route path ="/login">
          {user ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route path ="/register">
          {user ? <Redirect to="/"/> : <Register/>}
        </Route>
        <Route path ="/profile/:username">
          <Profile/>
        </Route>

        {/* for jobs routs */}
            <Route exact path="/alljob">
                <HomeJob />
              </Route>
    <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
      </Switch>
    </Router>
  )
}

export default App;
