import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import {Alert} from '@mui/material';
const CreateCategory = () => {
  const navigate = useNavigate();
  const [errors,setErrors] = useState("");
  const [value,setValue] = useState<string|undefined>();
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
       setValue(e.target.value);
    }
  const onSubmit = (ev:React.FormEvent<HTMLFormElement>)=>{
    ev.preventDefault();
    const payload = {
      category_name: value
    }
    axiosClient.post('/category',payload)
    .then(()=>{
         navigate('/category');
         
    }).catch((err)=>{
      // const response = err.response;
      setErrors(err?.response?.data?.errors)
        // setErrors(response.data.errors.category_name)
         console.log(err?.response?.data?.errors,"this all are errors: ");
      // }
    })
  }
  return (
    <>
        <h3>Add Category</h3>
      <div className='container'>
      <Container sx={{marginTop:"20px"}}>
      {errors &&
            <div className="alert">
              {Object.keys(errors).map((key:any) => (
                <Alert severity="error" sx={{marginBottom:"20px"}} key={key}>{errors[key]}</Alert>
              ))}
            </div>
          }
       <form onSubmit={onSubmit}>
       <TextField onChange={handleChange} value={value}id="outlined-basic" label="Add Category" variant="outlined" sx={{width:"100%",height:"100%"}}/>
       <Button variant="contained" sx={{ marginTop: '20px' }} type="submit">Submit</Button>
       </form>
      </Container>
      </div>
    </>
  )
}

export default CreateCategory