import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useRef } from 'react';
import axiosClient from '../../axios-client';
const CreateCategory = () => {
  const catRef = useRef();
  const onSubmit = (ev)=>{
    ev.preventDefault();
    const payload = {
      category_name: catRef.current.value
    }
    axiosClient.post('/createcategory',payload)
    .then(({data})=>{
         
    }).catch(err=>{
      const response = err.response;
      if(response && response.status === 422){
         console.log(response.data.errors);
      }
    })
    console.log(payload)
    console.log(catRef.current.value);
  }
  return (
    <>
      <div className='container'>
      <Container>
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