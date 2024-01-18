import { useEffect,useState } from "react"
import axiosClient from '../../axios-client';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, TextField } from '@mui/material';
import { Category } from "../../Types/Types";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [category,setCategory] = useState<Category[]>([])
  const [selectCategory,setSelectCategory] = useState("");
  const [product,setProduct] = useState({
    id:null,
    name:'',
    price:'',
    category_id:'',
})
  const [errors,setErrors] = useState("");
    useEffect(()=>{
          getCategory();
    },[])
    const getCategory = ()=>{
        axiosClient.get('/category').then(({data}:{data:any})=>{
          const response:Category[] = data?.data;
          setCategory(response)
          setSelectCategory(data?.data[0]?.name);
        }).catch(err=>{
          setErrors(err.response?.data?.errors)
        })
      }
      const onSubmit = (ev:React.FormEvent<HTMLFormElement>)=>{
        ev.preventDefault();
        axiosClient.post('/product',product)
        .then(()=>{
             navigate('/product')
        }).catch(err=>{
          setErrors(err.response?.data?.errors)
        })
      }
      const handleChange = (e:SelectChangeEvent<string>)=>{
        console.log(e.target.value);
        setProduct({...product,category_id:e.target.value})
          setSelectCategory(e.target.value);
      }
  return (
    <>
    <h3>Create Product</h3>
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
     <TextField  id="outlined-basic" label="Name" variant="outlined" sx={{width:"100%",height:"100%",marginBottom:'30px'}} onChange={ev=>setProduct({...product,name:ev.target.value})}/>
     <TextField  id="outlined-basic" label="Price" variant="outlined" sx={{width:"100%",height:"100%",marginBottom:'30px'}} type="number" onChange={ev=>setProduct({...product,price:ev.target.value})}/>
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Add Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectCategory}
    label="Category"
    onChange={(e)=>handleChange(e)}
  >
 {category?.map((cat) => (
  <MenuItem key={cat?.id} value={cat?.id}>
    {cat?.category_name}
  </MenuItem>
))}
</Select>
</FormControl>
<Button variant="contained" sx={{ marginTop: '20px' }} type="submit">Submit</Button>
     </form>
    </Container>
    </div>
  </>
  )
}

export default CreateProduct