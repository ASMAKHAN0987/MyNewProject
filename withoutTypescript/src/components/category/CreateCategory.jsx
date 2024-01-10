import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRef } from 'react';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import {Alert} from '@mui/material';
const CreateCategory = () => {
  const navigate = useNavigate();
  const catRef = useRef();
  const [errors,setErrors] = useState("");
  const onSubmit = (ev)=>{
    ev.preventDefault();
    const payload = {
      category_name: catRef.current.value
    }
    axiosClient.post('/category',payload)
    .then(({data})=>{
         navigate('/category');
         
    }).catch(err=>{
      const response = err.response;
      // if(response && response.status === 422){
        setErrors(response.data.errors.category_name)
         console.log(response.data.errors.category_name);
      // }
    })
    // console.log(payload)
    // console.log(catRef.current.value);
  }
  return (
    <>
      <div className='container'>
      <Container>
        {errors &&
      <Alert severity="error" sx={{marginBottom:"20px"}}>{errors}</Alert> }
       <form onSubmit={onSubmit}>
       <TextField inputRef={catRef} id="outlined-basic" label="Add Category" variant="outlined" sx={{width:"100%",height:"100%"}}/>
       <Button variant="contained" sx={{ marginTop: '20px' }} type="submit">Submit</Button>
       </form>
      </Container>
      </div>
    </>
  )
}

export default CreateCategory