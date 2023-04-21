import React, {useState,useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddEdit.css';

const initialState = {
  name: '',
  email:'',
  contact:''
};

const AddEdit = () => {
  const [state,setState]=useState(initialState);
  const {name,email,contact} = initialState;
  const history=useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id){
      getSingleUser(id);
    }
  },[id])

  const getSingleUser= async (id)=> {
    const response=await axios.get(`http://localhost:5000/user/${id}`);
      if(response.status===200){
        setState({
          name:response.data[0].name,
          email:response.data[0].email,
          contact:response.data[0].contact
        })
        console.log("vaaaaalll"+state.name)
      }
  }
  const addUser = async (data)=>{
    const response=await axios.post("http://localhost:5000/user",data);
    if(response.status===200){
      toast.success(response.data);
    }
  }
  const updateUser = async (data,id)=>{
    const response=await axios.put(`http://localhost:5000/user/${id}`,data);
    if(response.status===200){
      toast.success(response.data);
    }
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log("state:: "+state.name+" "+state.email+" "+state.contact);
    console.log("bbb:: "+name+" "+email+" "+contact);

    if(!state.name||!state.email||!state.contact){
      toast.error("please provide value into each input field");
    }else{
      if(!id) addUser(state)
      else updateUser(state,id)
      history('/');
    }
   

  }
  const handleInputChange=(e)=>{
    let {name, value}=e.target;
    console.log(name, value);
    setState({...state,[name]: value});
  }
  return (
    <div style={{marginTop:"100px"}}>
      <form style={{
        margin:"auto",
        padding:'15px',
        maxWidth:"400px",
        alignContent:"center"
        }}
        onSubmit={handleSubmit}
      >
          <lable htmlFor="name">Name</lable>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder='Enter Name ...'
            onChange={handleInputChange} 
            defaultValue ={state.name}
          />
          <lable htmlFor="email">Email</lable>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder='Enter Email ...'
            onChange={handleInputChange} 
            defaultValue ={state.email}
          />
          <lable htmlFor="contact">Contact</lable>
          <input 
            type="number" 
            id="contact" 
            name="contact" 
            placeholder='Enter Contact No. ...'
            onChange={handleInputChange} 
            defaultValue ={state.contact}
          />
          <input type='submit' value={id?"Update":"Add"}></input>
      </form>
    </div>
  )
}

export default AddEdit
