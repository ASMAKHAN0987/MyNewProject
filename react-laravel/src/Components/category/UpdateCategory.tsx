import { Alert, Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Category } from '../../Types/Types';
const UpdateCategory = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [errors,setErrors] = useState("");
  const [updateCat,setUpdateCat] = useState<Category>({
    id:0,
    category_name:''
  });
  const [loading,setLoading] = useState(false);
    useEffect(()=>{
       setLoading(true);
       axiosClient.get(`category/${id}`).then(({data}:{data:any})=>{
           const response:Category = data?.data;
             setUpdateCat(response);
             setLoading(false)
       }).catch((err)=>{
             setErrors(err?.response?.data?.errors)
             setLoading(false)
       })
    },[])
    const onSubmit = (ev:React.FormEvent<HTMLFormElement>)=>{
        ev.preventDefault();
        axiosClient.put(`category/${updateCat.id}`,updateCat).then(()=>{
            navigate('/category');
        })

    }
     
  return (
    <>
      <h3>Update Category</h3>
      <div className='container'>
      <Container sx={{marginTop:"20px"}}>
      {errors &&
            <div className="alert">
              {Object.keys(errors).map((key:any) => (
                <Alert severity="error" sx={{marginBottom:"20px"}} key={key}>{errors[key]}</Alert>
              ))}
            </div>
          }
          
        {loading? (<div><h1>loading......</h1></div>):(<form onSubmit={onSubmit}>
       <TextField id="outlined-basic" label="Add Category" variant="outlined" sx={{width:"100%",height:"100%"}} value={updateCat.category_name} onChange={ev=>setUpdateCat({...updateCat,category_name:ev.target.value})}/>
       <Button variant="contained" sx={{ marginTop: '20px' }} type="submit">Update</Button>
       </form>
        )}
      </Container>
      </div>
    </>
  )
}

export default UpdateCategory