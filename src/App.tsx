// import { UserCreate } from "./pages/user/Create"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/user/Login"
import { ProductCreate } from "./pages/product/Create"
import { UserProvider } from "./provider/UserProvider"
import { UserCreate } from "./pages/user/Create"

function App() {
  return (
    <>
     <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserCreate/>}/>
          <Route path="/product" element={<ProductCreate />} />
        </Routes>
      </BrowserRouter>
     </UserProvider>
    </>
  )
}

export default App
