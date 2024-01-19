import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, SelectChangeEvent, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import axiosClient from '../../axios-client';
import { Category, Product, Row } from '../../Types/Types';
import DropDown from '../DropDown/DropDown';
import { Selects } from '../../utility/constant';
export default function SalesFormTable() {
    useEffect(()=>{
        getCategory();
        getProduct();
    },[])
    const [category,setCategory] = useState<Category[]>([]);
    const [product,setProduct] = useState<Product[]>([]);
    const [discount,setDiscount] = useState(0);
    const [netTotal,setNetTotal] = useState(0);
    const [fixedDisc,setFixedDisc] = useState(true)
    const [netTotalDiscount,setNetTotalDiscount] = useState(netTotal)
    const [rows,setRows] = useState([{
        id: new Date().getTime().toString(),
        selectDataCat:"",
        selectDataProd:"",
        category: category,
        product: product,
        price: 0,
        Quantity: 0,
        Amount: 0
    }])
    const netTot = (updatedRows:Row[])=>{
       const netTotal = updatedRows.reduce((acc,curr)=>{
            acc = acc + curr.Amount;
            return acc
        },0)
        setNetTotal(netTotal);
        setNetTotalDiscount(netTotal);
    }
    const addMoreRows = ()=>{
        const myNewInputData = {
            id: new Date().getTime().toString(),
            selectDataCat:"",
            selectDataProd:"",
            category: category,
            product: product,
            price: 0,
            Quantity: 0,
            Amount: 0
          };
          setRows([...rows, myNewInputData])
          setDiscount(0)
    }
    const handleChangeCat = (e:SelectChangeEvent<string>,id:string)=>{
       var data = parseInt(e.target.value,10);
        const fetchProducts = product.filter((prod) => data === prod?.category_id);
        setRows(rows.map((row)=>{
            if(row.id===id){
               return  {...row,selectDataCat:e.target.value,product:fetchProducts,price:0,Quantity:0,Amount:0}
            }
            return row
        }))
      }
      const handleQuantity = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,id:string)=>{
        const fetchDataForPrice = rows.find((row)=>row.id === id);
           let data = 0;
           if(e.target.value){
               data = parseInt(e.target.value,10);
           }
         if(fetchDataForPrice!.price){
        setRows((prevRows) => {
            const updatedRows = prevRows.map((row) => {
              if (row.id === id) {
                return { ...row, Quantity: data, Amount: data * row.price };
              }
              return row;
            });
            netTot(updatedRows); // Pass the updatedRows to netTot
            return updatedRows; // Return the updatedRows for setRows
          });
        }else{
          return
        }
        };
      const handleChangeProd =(e:SelectChangeEvent<string>,id:string)=>{        
         const fetchPrice = product.find((prod)=>parseInt(e.target.value,10) === prod.id)
        setRows(rows.map((row)=>{
            if(row.id===id){
               return  {...row,selectDataProd:e.target.value,price:fetchPrice!.price,Amount:0,Quantity:0}
            }
            return row
        }))
      }
      const handleDiscount = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,fixedDisc:boolean)=>{
        var discounts = 0;
        var data = parseInt(e.target.value,10);
            e.preventDefault();
            if(data){
            if(fixedDisc){
            if(data && data<=100){
                discounts = data/100*netTotal;
            }
            else if(data>100){
                alert('Discount percentage should be less than or equal to 100.');                   
                return        
            }
        }
        else{
            if(data>netTotal){
                alert('Discount fixed should be less than or equal to net total.');                   
                return 
            }
            discounts = data;
        }
            setDiscount(data)
            const afterDiscount = netTotal-discounts; 
            setNetTotalDiscount(afterDiscount)
      }
      else{
        setDiscount(data)
      }
        }
      const handleFixedDisc = ()=>{
            setFixedDisc(!fixedDisc);
            setDiscount(0);
            setNetTotalDiscount(netTotal)
        }
    const onDelete = (id:string)=>{
        if(!window.confirm("Are you sure you want to delete it?")){
            return
           }
           else{
        const updatedList = rows.filter((item) => {
            return item.id !== id
          })
          setRows(updatedList)
          netTot(updatedList)
          setDiscount(0)
    }
}
   const getCategory = ()=>{
    axiosClient.get('/category').then(({data}: {data:any})=>{
          const response:Category[] =  data?.data
      setCategory(response)
    }).catch(error=>{
      console.log(error);
    })
   }
   const getProduct = ()=>{
    axiosClient.get('/product').then(({data}:{data:any})=>{
         const response:Product[] = data
        setProduct(response);
    }).catch(error=>{
      console.log(error);
    })
   }

  return (
    <>
    <div className='container'>
      <div>
     <div className='createCatBut'>
                      <Button variant="contained"  onClick={()=>addMoreRows()}>Add More Rows</Button>
      </div>                
    <TableContainer component={Paper} sx={{ overflowY: "scroll"}}>
      <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Category</TableCell>
            <TableCell align='center'>Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
            rows?.map((row)=>(
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                 <DropDown selectData={row.selectDataCat} handleChange={(e:SelectChangeEvent<string>)=>handleChangeCat(e,row.id)} dropDowndata={category} label={Selects.ADD_CATEGORY}/>
              </TableCell>
              <TableCell component="th" scope="row">
                <DropDown selectData={row.selectDataProd} handleChange={(e:SelectChangeEvent<string>)=>handleChangeProd(e,row.id)} 
                dropDowndata={row.product} label={Selects.PRODUCT} id={row.id}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="outlined-basic" label="Outlined" variant="outlined" value={row.price} itemType='number'/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="outlined-basic" label="Outlined" variant="outlined" type='number' onChange={(e)=>handleQuantity(e,row.id)} value={row.Quantity}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="outlined-basic" label="" variant="outlined" value={row.Amount}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <Button variant="contained"  onClick={()=>onDelete(row.id)}><DeleteIcon/></Button>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
     <h5>Discount: 
        <div>
        <TextField id="outlined-basic" label="" variant="outlined" sx={{marginTop:'30px',width:'100px'}} onChange={(e)=>handleDiscount(e,fixedDisc)} value={discount} type='number'/>
        <Button variant="contained" sx={{marginTop:'30px',width:'100px',padding:'15px'}} onClick={() => handleFixedDisc()}>{fixedDisc ? "%" : "fixed"}</Button>
        </div>
     </h5>
     
     <h5>Net Total: {netTotalDiscount}</h5>
    </div>
</div>
    </>
  );
}
