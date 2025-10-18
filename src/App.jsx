import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import DashboardLayout from './layouts/DashboardLayout'

import Products from './pages/Products'
import Dashbaord from './pages/Dashbaord'
import NewProductForm from './components/NewProductForm'
import NotFound from './pages/NotFount'
import EditProductForm from './components/EditProductForm'
import ProductDetails from './components/ProductDetails'
import RemoveProduct from './components/RemoveButton'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      {/* === ProtectedRoute === */}
      <Route path='/' 
      element={
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
      }>
        <Route index element={<Dashbaord />}/>
        <Route path="/products" element={<Products />} /> 
        <Route path='/products/new' element={<NewProductForm />}/>
        <Route path='/products/:id/edit-product' element={<EditProductForm />}/>
        <Route path='/products/:id' element={<ProductDetails />}/>
        <Route path='/products/:id/remove-product' element={<RemoveProduct />}/>
      </Route>
      {/* === 404 Fallback === */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App