import React from 'react'
import {useState,useEffect} from "react";
import {db} from '../firbase-config';
// import pic from '../assets/ets.png';
import '../styling/Comment.css';
import { useNavigate } from "react-router-dom";
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from 'firebase/firestore';
import { useLocation } from "react-router-dom";

export default function AddResource() {
    const [newTitle,setNewTitle]=useState("");
    const [newUrl,setNewUrl]=useState("");
    const [newDescription, setNewDescription]=useState("");
    const [resourceId, setResourceId] = useState(null);
    let navigate = useNavigate();
    const userCollectionRef=collection(db,"Resources");
    const createResource=async()=>{
        if (resourceId === null) await addDoc(userCollectionRef,{title:newTitle,description:newDescription,url:newUrl});
        else await updateDoc(doc(db, 'Resources', resourceId),{title:newTitle,description:newDescription,url:newUrl});
        if (resourceId === null) alert("New Resource Added Successfully!")
        else alert("Resource Updated Successfully!")
        navigate("/Resources");
    };

    const location = useLocation()
    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        const getResources = async()=>{
          const data=await getDocs(userCollectionRef);
          data.docs.map((doc)=>{
            if (doc.id === id) {
              setNewTitle(doc.data().title)
              setNewDescription(doc.data().description)
              setNewUrl(doc.data().url)
              setResourceId(doc.id)
            }
          });
        };
        getResources();


      },[]);



  return (
   <div className="createPostPage">
      <div className="cpContainer-resource">
        <h1>{resourceId === null ?'New Resource':'Edit Resource'}</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Description:</label>
          <textarea
            className="description"
            placeholder="Description..."
            value={newDescription}
            onChange={(event) => {
              setNewDescription(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Link:</label>
          <input
            placeholder="URL..."
            value={newUrl}
            onChange={(event) => {
              setNewUrl(event.target.value);
            }}
          />
        </div>
        <button className= "primary-btn" onClick={createResource}> {resourceId === null ? 'Add Resource':'Update Resource'}</button>
      </div>
    </div>
  )
}
