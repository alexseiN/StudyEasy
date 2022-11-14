import React from 'react'
import {useState,useEffect} from "react";
import {db} from '../firbase-config';
// import pic from '../assets/userIcon.png';
import '../styling/Resources.css';
import { useNavigate } from "react-router-dom";
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from 'firebase/firestore';
export default function Posts() {

    const [resources,setResources]= useState([]);
    const userCollectionRef=collection(db,"Resources");
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate("/AddResource");
      };
    
      useEffect(()=>{
        const getResources = async()=>{
          const data=await getDocs(userCollectionRef);
          setResources(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        };
        getResources();
      },[]);


    const handleDelete = (id) => {
        deleteDoc(doc(db,"Resources", id))
        document.getElementById(id).style.display = "none"
        alert("Deleted Successfully!")
    }

    const handleUpdate = (id) => {
        navigate("/AddResource?id="+id);
    }

  return (
    <>
        <div className='zazu'>
        <div>
            <h1>Study Easy</h1>
        </div>
        <div className='tboxC'>
        {resources.map((item)=>{
            return(
                
                    <div className='tbox-resource' id={item.id}>
                        <div className='box-top'>
                            <h1><strong>{item.title}</strong></h1>
                        </div>
                        <div className='client-comment'>
                            <p>{item.description}</p>
                        </div>
                        <div className="box-bottom">
                            <a href={item.url} target="blank"><button className="btn-info">View More</button></a>
                            <button className="btn-warning" onClick={e => {e.preventDefault(); handleDelete(item.id)}}>Delete</button>
                            <button className="btn-primary" onClick={e => {e.preventDefault(); handleUpdate(item.id)}}>Update</button>
                        </div>
                    </div>
            
                
            );
        })}

        </div>
        <button className='primary-btn' onClick={routeChange}>Add New Resource</button>;
    </div>
    
    </>

    
  );
}