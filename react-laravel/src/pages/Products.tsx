import { useEffect,useState } from 'react';
import axiosClient from '../axios-client';
import Tables from '../Components/Table/Tables'
import { Product } from '../Types/Types';
import { Text } from '../utility/constant';
export default function Products() {
  useEffect(()=>{
      getProduct();
  },[]);
  const onDelete = (id:number)=>{
       if(!window.confirm("Are you sure you want to delete it?")){
        return
       }
       else{
        axiosClient.delete(`/product/${id}`).then(()=>{
          getProduct();
        })
       }
  }
  const [product,setProduct] = useState<Product[]>([])
  const[loading,setLoading] = useState(false);
  const getProduct = ()=>{
    setLoading(true);
    axiosClient.get('/product').then(({data}:{data:any})=>{
      const response:Product[] = data;
      setLoading(false);
      setProduct(response)
    }).catch(error=>{
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <>
    <Tables category={product} loading={loading} text={Text.PRODUCT} extra={"Category"} onDelete={(cat)=>onDelete(cat)} link={"createProduct"} parameter={'product'} extra2={"price"}/>
    </>
  );
}
