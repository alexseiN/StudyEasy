import React from 'react'
import {  Routes, Route, useLocation } from "react-router-dom";

import {AnimatePresence} from 'framer-motion';
import { Home } from './home/home';
// import { Country } from './countries/countries';
import { SelectionCountries } from './countries/SelectionCountries';
import { Login } from './login/login';
import { University } from './universities/university';
import { Team } from './teams/team';
import { Search } from './search/search';
import { Unirecord } from './universities/forjson/unirecord';
import CreateComment from "../../Pages/CreateComment";
import AddPosts from "../../Pages/AddPosts";
import Comment from "../../Pages/Comment";
import Profile from "./user/Profile";
import Posts from '../../Pages/Posts';
import Resources from '../../Pages/Resources';
import AddResource from '../../Pages/AddResource';

import AddMajors from '../../CollegeAdministrators/addMajors';
import UpdateDeleteMajor from '../../CollegeAdministrators/UpdateOrDelete';
import AdminAdd from "../../CollegeAdministrators/stonyBrookAdmi/stonyBrookAdd";
import AdminUpdateOrDelete from "../../CollegeAdministrators/stonyBrookAdmi/stonyBrookUpdateOrDelete";
import Admin from "../../Pages/Admin";
import { Collegedetails } from './details/collegedetails';
import { Trending } from './trendingcolleges/trending';

function AnimationRoutes() {
    const location = useLocation();
  return (
    //animation reuser
    <AnimatePresence>
        <Routes location={location} key={location.pathname} basename = {process.env.PUBLIC_URL}>
        <Route path="/" exact element={<Home/>} />
        <Route path="/Countries" exact element={<SelectionCountries/>} />
        <Route path="/Login" exact element={ <Login/> } />
        <Route path="/University" exact element={ <University/> } />
        <Route path="/Team" exact element={ <Team/> } />
        <Route path="/Search" exact element={ <Search/> } />
        <Route path="/statewiseuni" exact element = {<Unirecord/>}/>
        <Route path="/uni" exact element = {<Collegedetails/>}/>
        <Route path="/Trending" exact element = {<Trending/>}/>
{/* review edit */}
        <Route path="/CreateComment" exact element={<CreateComment/>} />
        <Route path="/Comment" exact element={<Comment />} />
        <Route path="/Profile" exact element={<Profile />} />
        <Route path="/Posts" exact element={<Posts />} />
        <Route path="/AddPosts" exact element={<AddPosts />} />
        <Route path="/Resources" exact element={<Resources />} />
        <Route path="/AddResource" exact element={<AddResource/>} />


{/* srujan work */}
        <Route path="/AddMajors" exact element={<AddMajors />} />
        <Route
          path="/UpdateDeleteMajor"
          exact
          element={<UpdateDeleteMajor />}
        />
        <Route
          path="/AdminUpdateOrDelete"
          exact
          element={<AdminUpdateOrDelete />}
        />
        <Route path="/AdminAdd" exact element={<AdminAdd />} />
        <Route path="/Admin" exact element={<Admin />} />

        



        </Routes>
    </AnimatePresence>
  )
}


export default AnimationRoutes