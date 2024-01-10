import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import './style.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axiosClient from '../../axios-client';
// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }
export default function Category() {
  useEffect(()=>{
      getCategory();
  },[]);
  const onDelete = (cat)=>{
       if(!window.confirm("Are you sure you want to delete it?")){
        return
       }
       else{
        axiosClient.delete(`/category/${cat.id}`).then(()=>{
          //notification for delete
          getCategory();
        })
       }
  }
  const [category,setCategory] = useState([])
  const[loading,setLoading] = useState(false);
  const getCategory = ()=>{
    setLoading(true);
    axiosClient.get('/category').then(({data})=>{
      setLoading(false);
      setCategory(data?.data)
      console.log(data.data);
    }).catch(error=>{
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <>
    <div className='container'>
      <div>
     <div className='createCatBut'>
     <Link to={"/createcategory"}>
                      <Button variant="contained">Create Category</Button>
                      </Link>
      </div>                
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {loading?
        <div>
            <h2 className='loading'>Loading.....</h2>
        </div>: (
        <TableBody>

           {category?.map((cat)=>(
            <TableRow key={cat.id}>
              <TableCell component="th" scope="row">
                {cat.category_name}
              </TableCell>
              <TableCell align="right">

                <TableRow>
                    <TableCell>
                      <Link to={"/category/"+cat.id}>
                      <Button variant="contained">Update</Button>
                      </Link></TableCell>
                    <TableCell onClick={ev=>onDelete(cat)}>
                    <Button variant="contained">Delete</Button>
                    </TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        )}
      </Table>
    </TableContainer>
    </div>
    </div>
    </>
  );
}
