import { createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom'
import CreateCategory from './Components/category/CreateCategory';
import UpdateCategory from './Components/category/UpdateCategory';
import CreateProduct from './Components/product/CreateProduct';
import ProductUpdate from './Components/product/ProductUpdate';
import CreateCustomer from './Components/Customer/CreateCustomer';
import UpdateCustomer from './Components/Customer/UpdateCustomer';
import SaleForm from './Components/SalesForm/SaleForm';
import Layout from './Layout';
import Categorys from './pages/Categorys';
import Products from './pages/Products';
import Customers from './pages/Customers';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='/category' element={<Categorys/>}/>
        <Route path='/category/createcategory' element={<CreateCategory/>}/>
        <Route path='/category/:id' element={<UpdateCategory/>}/>
        
        <Route path='/product' element={<Products/>}/>
        <Route path='/product/createProduct' element={<CreateProduct/>}/>
        <Route path='/product/:id' element={<ProductUpdate/>}/>
        
        <Route path='/customer' element={<Customers/>}/>
        <Route path='customer/createcustomer' element={<CreateCustomer/>}/>
        <Route path='/customer/:id' element={<UpdateCustomer/>}/>
        
        <Route path='/salesform' element={<SaleForm/>}/>
    </Route>
));

export default router;
