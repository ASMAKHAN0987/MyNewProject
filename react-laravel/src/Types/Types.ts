import { SelectChangeEvent } from "@mui/material";

export interface Category{
     id?:number;
     category_name:string;
     created_at?: string;
     updated_at?: string;
}
export interface Product{
    category:Category;
    category_id:number;
    created_at:"string";
    id:number;
    name:string;
    price:number;
    updated_at:"string";
}
export interface Customer{
    id:number;
    name:string;
    email:string;
}
export interface Data{
    category: (Category | Product | Customer)[]
    extra?:string; //extra prop
    loading:boolean;
    text:string;
    link:string;
    parameter:string;
    onDelete:(id:number)=>void;
    extra2?:string;
}
export interface DropDownProps{
    selectData:string;
    handleChange:(e:SelectChangeEvent<string>,id?:string)=>void;
    dropDowndata:(Category[] | Product[] | Customer[]);
    label:string;
    id?:string;
}
export interface Row {
    id: string;
    selectDataCat: string;
    selectDataProd: string;
    category: Category[]; // Assuming Category is another interface you have defined
    product: Product[]; // Assuming Product is another interface you have defined
    price: number;
    Quantity: number;
    Amount: number;
  }
  