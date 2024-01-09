import { createBrowserRouter, createRoutesFromElements,Navigate,Route } from 'react-router-dom'
import Category from '../../withoutTypescript/src/components/category/Category';
const router = createBrowserRouter(createRoutesFromElements(
    <Route path=''>
        <Route path = '/category' element={<Category/>}/>
    </Route>
))
export default router;