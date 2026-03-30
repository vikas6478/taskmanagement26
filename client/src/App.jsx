

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './admin/Dashboard'
import Layout from './layout'
import Home from './pages/Home'
import CreateUser from './admin/CreateUser'
import WelcomePage from './admin/WelcomePage'

const App = () => {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/> 
          <Route path="/home" element={<Home/>}/> 
        
         
       
        </Route>
      
      </Routes>
      <Routes>
        <Route path='/admindashboard' element={<Dashboard/>}>
        
          <Route index element={<WelcomePage/>}/> 
          <Route path="createuser" element={<CreateUser/>}/> 
          
       
        </Route>
      
      </Routes>
      </BrowserRouter>
   
   </>
  )
}

export default App
