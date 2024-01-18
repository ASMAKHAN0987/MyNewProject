import { useEffect,useState } from 'react';
import Tables from '../Components/Table/Tables';
import { Category} from '../Types/Types';
import axiosClient from '../axios-client';
export default function Categorys() {
  useEffect(()=>{
      getCategory();
  },[]);
  const onDelete = (cat:number)=>{
       if(!window.confirm("Are you sure you want to delete it?")){
        return
       }
       else{
        axiosClient.delete(`/category/${cat}`).then(()=>{
          //notification for delete
          getCategory();
        })
       }
  }
  const [category,setCategory] = useState<Category[]>([])
  const[loading,setLoading] = useState<boolean>(false);
  const getCategory = ()=>{
    setLoading(true);
    axiosClient.get('/category').then(({data}:{data:any})=>{
      const response:Category[] = data.data;
      setLoading(false);
      // console.log("this is respnse: ", response)
      setCategory(response)
      // console.log(data.data);
    }).catch(error=>{
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <>
      <Tables category={category} loading={loading} text={"Category"} parameter={"category"} onDelete={(id)=>onDelete(id)} link='createcategory'/>
    </>
  );
}
