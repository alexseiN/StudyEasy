import React from 'react'
import College from './College';
// import { Majors } from "../components/Majors";
// import {useState} from "react";
import '../styling/Country.css'
import Nav from '../designpages/Nav'


export const AUS = () => {
  return (
    <div>
      <Nav given = 'country' link = '/canadavisa' link1 = "/Univ/AUS"/>
    <h1 className='h1'>Welcome to AUSTRALIA</h1><div className='Country'>
    <div className='Country'>
    <College collegeName="University of Melbourne" Logo='https://img.emg-services.net/institutes/institute3393/uom-header.jpg' zipCode={3010} url= "https://www.unimelb.edu.au/" name = "/UM" number={1} link="https://study.unimelb.edu.au/how-to-apply/graduate-coursework-study/international-applications"/>
    <College collegeName="University of Sydney" Logo='https://www.sydney.edu.au/content/dam/corporate/images/architecture/quadrangle/high-quad-shot2.jpg' zipCode={2006} url= "https://www.sydney.edu.au/"  name = "/USyd" number={2} link="https://www.sydney.edu.au/study/how-to-apply.html"/>
  </div>
  </div>

  </div>
  )
}