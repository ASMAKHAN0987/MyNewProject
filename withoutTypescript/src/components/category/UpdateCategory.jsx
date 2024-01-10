import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateCategory = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [updateCat,setUpdateCat] = useState({id:null,category_name:''});
  const [loading,setLoading] = useState(false);
  const catRef = useRef();
  if(id){
    useEffect(()=>{
       setLoading(true);
       axiosClient.get(`category/${id}`).then(({data})=>{
             setUpdateCat(data?.data);
             setLoading(false)
       }).catch(()=>{
             setLoading(false)
       })
    },[])
  }
    const onSubmit = (ev)=>{
        ev.preventDefault();
        axiosClient.put(`category/${updateCat.id}`,updateCat).then(()=>{
            navigate('/category');
        })

    }
     
  return (
    <>
      <div className='container'>
      <Container>
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