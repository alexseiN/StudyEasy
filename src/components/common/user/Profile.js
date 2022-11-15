import {useEffect, useState} from "react";
import { auth, db } from '../../../firbase-config';
import { collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import './profile.css';
import forum from "../../../images/ambassadors/forum.jpeg";

export default function Profile(){
    const[getUser,setGetUser] = useState([])
    const[phoneNumber, setPhoneNumber] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newUser, setNewUser] = useState(null)
    const [avatar, setAvatar] = useState(forum);
    const currentUser = auth.currentUser
    const [posts,setPosts]= useState([]);
    const postCollectionRef=collection(db,"Posts");


    const usersPersonalDataCollectionRef = collection(db, "usersPersonalData")

    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/Login`;
        navigate(path);
    }

    const handleDelete = (id) => {
        deleteDoc(doc(db,"Posts", id))
        document.getElementById(id).style.display = "none"
        alert("Deleted Successfully!")
    }

    useEffect(()=> {
        if (currentUser === null) routeChange()

        const getUserInfo = async()=> {
            const data = await getDocs(usersPersonalDataCollectionRef)
            data.docs.map((doc)=>{
                if (doc.data().userID === currentUser.uid) {
                    setFirstName(doc.data().Fname)
                    setLastName(doc.data().Lname)
                    setPhoneNumber(doc.data().PhoneNumber)
                    setNewUser(doc.id)
                }
            })
        }
        getUserInfo();
        const getPosts = async()=>{
            const data=await getDocs(postCollectionRef);
            setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
          };
          getPosts();
  
    },[])


    const handleSave = () => {
        if (newUser === null) {
            addDoc(collection(db, 'usersPersonalData'), {
                Fname: firstName,
                Lname: lastName,
                PhoneNumber: phoneNumber,
                userID: currentUser.uid,
                timestamp: serverTimestamp()
            })
            alert("Profile Added")
        }
        else {
            updateDoc(doc(db, 'usersPersonalData', newUser), {
                Fname: firstName,
                Lname: lastName,
                PhoneNumber: phoneNumber,
                userID: currentUser.uid,
            })
            alert("Profile Updated")
        }
    }

    const handlePost = () => {
        navigate('/AddPosts');
    }

    return (
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row" style={{ width:"100%" }}>
                <div class="col-md-3 border-right">
                    <div class="profile-image d-flex flex-column align-items-center text-center">
                        <img src={avatar} className="rounded profile-photo" alt="profile"/>
                    </div>
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><span class="font-weight-bold">{firstName}</span><span class="text-black-50">{lastName}</span><span> </span></div>
                </div>
                <div class="col-md-9 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">First Name</label><input type="text" class="form-control" placeholder="first name" value={firstName} onChange={e=>setFirstName(e.target.value)}></input></div>
                            <div class="col-md-6"><label class="labels">Last name</label><input type="text" class="form-control" placeholder="surname" value={lastName} onChange={e=>setLastName(e.target.value)}></input></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Phone Number</label><input type="text" class="form-control" placeholder="enter phone number" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}></input></div>
                        </div>
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={handleSave}>Save Profile</button></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center experience"><span>User Posts</span></div><br/>

                        {posts.map((item)=>{
                            if (item.uid === currentUser.uid) {
                                return(
                                    <div id={item.id}>
                                    <div className='tbox-resource d-flex align-items-center'>
                                        <div className="d-inline-block image-part">
                                        <img alt="not fount" className="post-image" src={item.image} />
                                        </div>

                                        <div className="d-inline-block main-part">
                                            <div className='box-top'>
                                                <h5><strong>{item.title}</strong></h5>
                                            </div>
                                            <div className='client-comment'>
                                                <p>{item.description}</p>
                                            </div>

                                            <div className="box-bottom">
                                                <button className="btn-warning" onClick={e => {e.preventDefault(); handleDelete(item.id)}}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                )
                            }
                        })}

                        <div class="mt-5 text-center"><button class="btn btn-info" type="button" onClick={handlePost}>New Post</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}