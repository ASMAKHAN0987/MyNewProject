import { useEffect, useState } from "react"
import axiosClient from '../../axios-client';
import { Button} from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField } from '@mui/material';
import { Customer } from "../../Types/Types";
const UpdateCustomer = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    name: '',
    email: '',
  })
  useEffect(()=>{
    setLoading(true);
    axiosClient.get(`customer/${id}`).then(({data}:{data:any})=>{
           const response:Customer = data?.data;
          setCustomer(response);
          setLoading(false)
    }).catch(()=>{
          setLoading(false)
    })
 },[])
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const onSubmit = (ev:React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    axiosClient.put(`/customer/${id}`, customer)
      .then(() => {
        navigate('/customer')
      }).catch(err => {
        console.log("This all are errors: ", err);
        setErrors(err.response?.data?.errors)
      })
  }
  return (
    <>
     <h3>Update Customer</h3>
      <div className='container'>
        <Container sx={{marginTop:"30px"}}>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map((key:any) => (
                <Alert severity="error" sx={{marginBottom:"20px"}} key={key}>{errors[key]}</Alert>
              ))}
            </div>
          }
          {loading?
        <div>
            <h2 className='loading'>Loading.....</h2>
        </div>: 
          <form onSubmit={onSubmit}>
            <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ width: "100%", height: "100%", marginBottom: '30px' }} onChange={ev => setCustomer({ ...customer, name: ev.target.value })} value={customer.name}/>
            <TextField id="outlined-basic" label="email" variant="outlined" sx={{ width: "100%", height: "100%", marginBottom: '30px' }} type="email" onChange={ev => setCustomer({ ...customer, email: ev.target.value })} value={customer.email}/>
            <Button variant="contained" sx={{ marginTop: '20px' }} type="submit">Update</Button>
          </form>}
        </Container>
      </div>
    </>
  )
}

export default UpdateCustomer