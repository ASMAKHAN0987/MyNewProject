import { useState } from "react"
import axiosClient from '../../axios-client';
import { Button} from '@mui/material';
import {Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, TextField } from '@mui/material';
const CreateCustomer = () => {
  const navigate = useNavigate();
  const [customer,setCustomer] = useState({
    id:null,
    name:'',
    email:'',
})
  const [errors,setErrors] = useState("");
      const onSubmit = (ev:React.FormEvent<HTMLFormElement>)=>{
        ev.preventDefault();
        console.log("customer data is: ",customer);
        axiosClient.post('/customer',customer)
        .then(()=>{
             navigate('/product')
        }).catch(err=>{
          setErrors(err.response?.data?.errors)
            console.log("This all are errors: ",err);
        })
      }
  return (
    <>
    <h3>Create Customer</h3>
    <div className='container'>
    <Container sx={{marginTop:"30px"}}>
    {errors &&
            <div className="alert">
              {Object.keys(errors).map((key:any) => (
                <Alert severity="error" sx={{marginBottom:"20px"}} key={key}>{errors[key]}</Alert>
              ))}
            </div>
          }
     <form onSubmit={onSubmit}>
     <TextField  id="outlined-basic" label="Name" variant="outlined" sx={{width:"100%",height:"100%",marginBottom:'30px'}} onChange={ev=>setCustomer({...customer,name:ev.target.value})}/>
     <TextField  id="outlined-basic" label="email" variant="outlined" sx={{width:"100%",height:"100%",marginBottom:'30px'}} type="email" onChange={ev=>setCustomer({...customer,email:ev.target.value})}/>
     <Button variant="contained" sx={{ marginTop: '20px' }} type="submit">Submit</Button>
     </form>
    </Container>
    </div>
  </>
  )
}

export default CreateCustomer