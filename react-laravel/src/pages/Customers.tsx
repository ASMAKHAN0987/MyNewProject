import { useEffect,useState } from 'react';
import axiosClient from '../axios-client';
import Tables from '../Components/Table/Tables';
import { Customer } from '../Types/Types';
import { Parameters, Text } from '../utility/constant';
export default function Customers() {
  useEffect(()=>{
      getProduct();
  },[]);
  const onDelete = (custom:number)=>{
       if(!window.confirm("Are you sure you want to delete it?")){
        return
       }
       else{
        axiosClient.delete(`/customer/${custom}`).then(()=>{
          //notification for delete
          getProduct();
        })
       }
  }
  const [customer,setCustomer] = useState<Customer[]>([])
  const[loading,setLoading] = useState<boolean>(false);
  const getProduct = ()=>{
    setLoading(true);
    axiosClient.get('/customer').then(({data}:{data:any})=>{
      const response:Customer[] = data.data;
      setLoading(false);
      setCustomer(response)
      // console.log(data);
    }).catch(error=>{
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <>
    <Tables category={customer} loading={loading} text={Text.CUSTOMER} extra={"Email"} parameter={Parameters.CUSTOMER_PARA} onDelete={(id)=>onDelete(id)} link='createcustomer'/>
    </>
  );
}
