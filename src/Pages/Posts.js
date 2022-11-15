import React from 'react'
import {useState,useEffect} from "react";
import {db} from '../firbase-config';
// import pic from '../assets/userIcon.png';
import '../styling/Resources.css';
import { useNavigate } from "react-router-dom";
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from 'firebase/firestore';
export default function Posts() {

    const [posts,setPosts]= useState([]);
    const userCollectionRef=collection(db,"Posts");
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate("/AddPosts");
      };
    
      useEffect(()=>{
        const getPosts = async()=>{
          const data=await getDocs(userCollectionRef);
          setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        };
        getPosts();
      },[]);


    // const handleDelete = (id) => {
    //     deleteDoc(doc(db,"Posts", id))
    //     document.getElementById(id).style.display = "none"
    //     alert("Deleted Successfully!")
    // }

    // const handleUpdate = (id) => {
    //     navigate("/AddPosts?id="+id);
    // }

  return (
    <>
        <div className='zazu'>
        <div>
            <h1>Study Easy</h1>
        </div>
        <div className='tboxC'>
        {posts.map((item)=>{
            return(
                
                    <div className='tbox-resource d-flex align-items-center' id={item.id}>
                      <div className="d-inline-block image-part">
                          <img alt="not fount" className="post-image" src={item.image} />
                        </div>

                        <div className="d-inline-block">
                        <div className='box-top'>
                            <h5><strong>{item.title}</strong></h5>
                        </div>
                        <div className='client-comment text-align-left'>
                            <p>{item.description}</p>
                        </div>

                        {/* <div className="box-bottom">
                            <button className="btn-warning" onClick={e => {e.preventDefault(); handleDelete(item.id)}}>Delete</button>
                            <button className="btn-primary" onClick={e => {e.preventDefault(); handleUpdate(item.id)}}>Update</button>
                        </div> */}
                        </div>
                    </div>
            
                
            );
        })}

        </div>
    </div>
    
    </>

    
  );
}