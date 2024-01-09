import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import './style.css'
import { Link } from 'react-router-dom';
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
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Category-one
              </TableCell>
              <TableCell align="right">
                <TableRow>
                    <TableCell>
                      <Link to={"/createcategory"}>
                      <Button variant="contained">Update</Button>
                      </Link></TableCell>
                    <TableCell>
                    <Button variant="contained">Delete</Button>
                    </TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </>
  );
}
