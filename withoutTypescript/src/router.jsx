import { createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom'
import Category from './components/category/Category';
import CreateCategory from './components/category/CreateCategory';
import UpdateCategory from './components/category/UpdateCategory';
const router = createBrowserRouter(createRoutesFromElements(
    <Route path=''>
        <Route path = '/category' element={<Category/>}/>
        <Route path='/createcategory' element={<CreateCategory/>}/>
        <Route path='/category/:id' element={<UpdateCategory/>}/>
    </Route>
))
export default router;