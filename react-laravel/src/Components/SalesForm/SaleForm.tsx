import '../../style.css'
import { useEffect, useState } from 'react'
import DropDown from '../DropDown/DropDown'
import SalesFormTable from './SalesFormTable'
import axiosClient from '../../axios-client'
import { SelectChangeEvent } from '@mui/material'
import { Customer } from '../../Types/Types'
import { Selects } from '../../utility/constant'
const SaleForm = () => {
    useEffect(()=>{
        getProduct();
    },[])
    const [customer,setCustomer] = useState<Customer[]>();
    const [selectCustomer,setSelectCustomer] = useState("");
    const getProduct = ()=>{
        axiosClient.get('/customer').then(({data}:{data:any})=>{
             const response:Customer[] =data?.data; 
            setSelectCustomer(data?.data?.[0].id)
          setCustomer(response)
        }).catch(error=>{
          console.log(error);
        })
    }
    const handleChange = (e:SelectChangeEvent<string>)=>{
      
          setSelectCustomer(e.target.value);
      }
  return (
    <>
       <div className='margin'>Select Customer: <DropDown selectData={selectCustomer} handleChange={(e)=>handleChange(e)} dropDowndata={customer!} label={Selects.SELECT_CUSTOMER}/>
        <SalesFormTable/>
       </div>
    </>
  )
}

export default SaleForm