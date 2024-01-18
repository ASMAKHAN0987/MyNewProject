import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import axiosClient from '../../axios-client';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, TextField } from '@mui/material';
import { Category, Product } from "../../Types/Types";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [category,setCategory] = useState<Category[]>()
  const [selectCategory,setSelectCategory] = useState("");
  const [product,setProduct] = useState({
    id:0,
    name:'',
    price:0,
    category_id:0,
})
  const [errors,setErrors] = useState("");
  useEffect(()=>{
    getCategory();
    axiosClient.get(`product/${id}`).then(({data}:{data:any})=>{
          const response:Product = data?.data;
          setProduct(response);
          category?.forEach(element => {
                 if(response?.category_id === element?.id){
                  setSelectCategory((element?.id).toString());
                 }   
          });
    }).catch((err)=>{
            console.log("all errors: ",err);
    })
 },[])
    const getCategory = ()=>{
        axiosClient.get('/category').then(({data}:{data:any})=>{
          const response:Category[] = data?.data
          setCategory(response)
        }).catch(error=>{
          console.log(error);
        })
      }
      const onSubmit = (ev:React.FormEvent<HTMLFormElement>)=>{
        ev.preventDefault();
        axiosClient.put(`/product/${id}`,product)
        .then(()=>{
             navigate('/product')
        }).catch(err=>{
            setErrors(err.response?.data?.errors)
        })
      }
      const handleChange =(e:SelectChangeEvent<string>)=>{
        setProduct({...product,category_id:parseInt(e.target.value, 10)});
          setSelectCategory(e.target.value);
      }
  return (
    <>
    <h3>Product Update</h3>
    <div className='container'>
    <Container>
    {errors &&
            <div className="alert">
              {Object.keys(errors).map((key:any) => (
                <Alert severity="error" sx={{marginBottom:"20px"}} key={key}>{errors[key]}</Alert>
              ))}
            </div>
          }
     <form onSubmit={onSubmit}>
     <TextField  id="outlined-basic" label="Name" variant="outlined" sx={{width:"100%",height:"100%",marginBottom:'30px'}} onChange={ev=>setProduct({...product,name:ev.target.value})} value={product.name}/>
     <TextField  id="outlined-basic" label="Price" variant="outlined" sx={{width:"100%",height:"100%",marginBottom:'30px'}} type="number" onChange={ev=>setProduct({...product,price:parseInt(ev.target.value, 10)})} value={product.price}/>
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

export default ProductUpdate