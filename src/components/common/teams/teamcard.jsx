import React from 'react'
import { SocialIcon } from 'react-social-icons'
import {team} from "../../../data"
import "./team.css";

export const Teamcard = () => {
  return (
    <div className='wrap'>
        {team.map((val) => (
        <div className='items shadow'>
          <div className='img'>
            <div className='image'>{val.cover}</div> 
            <div className='overl'>
            <div className='social'>
            <li className = "Social"><SocialIcon  url={val.linkedin} network='linkedin'/></li>
            <li className = "Social"><SocialIcon  url={val.github} network='github'/></li>
            <li className = "Social"><SocialIcon  url={val.insta} network='instagram'/></li>
            </div>
            </div>
          </div>
          <div className='details'>
            <h3>{val.name}</h3>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
