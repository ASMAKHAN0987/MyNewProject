import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Category,Customer, Data, Product } from '../../Types/Types';
import { Text } from '../../utility/constant';
export default function Tables({category,extra,extra2,loading,text,parameter,onDelete,link}:Data) {
  return (
    <>
    <h4>{text}</h4>
    <div className='container'>
      <div>
     <div className='createCatBut'>
     <Link to={link}>
                      <Button variant="contained">Create {text}</Button>
                      </Link>
      </div>                
    <TableContainer component={Paper} sx={{ overflowY: "scroll"}}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
             {extra&&
            <TableCell align='center'>{extra}</TableCell>}
            {extra2&&
            <TableCell align='center'>{extra2}</TableCell>}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {loading?
        <div>
            <h2 className='loading'>Loading.....</h2>
        </div>: (
        <TableBody>

           {category?.map((cat)=>(
            <TableRow key={cat?.id}>
              <TableCell component="th" scope="row">
              {text===Text.CUSTOMER && (cat as Customer)?.name}
              {text===Text.PRODUCT && (cat as Product)?.name}
              {text===Text.CATEGORY && (cat as Category)?.category_name}
              </TableCell>
              {extra &&
              <TableCell component="th" scope="row">
                {text===Text.CUSTOMER && (cat as Customer)?.email}
                {text===Text.PRODUCT && (cat as Product)?.category?.category_name}
              </TableCell>
              }
              {extra2 &&
              <TableCell component="th" scope="row">
                {text===Text.PRODUCT && (cat as Product)?.price}
              </TableCell>
              }
              <TableCell align="right">

                <TableRow>
                    <TableCell>
                      <Link to={`/${parameter}/${cat.id}`}>
                      <Button variant="contained">Update</Button>
                      </Link></TableCell>
                    <TableCell onClick={()=>onDelete(cat?.id ?? 0)}>
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
