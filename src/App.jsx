import { Button, HStack } from "@chakra-ui/react"
import {Route,Routes} from "react-router-dom";
import {Home} from "./pages/Home.jsx"
import {AllCountries} from "./pages/AllCountries.jsx";
import Country from "./pages/Country.jsx";
import LogIn from "./pages/login.jsx";
import SignUp from "./pages/signUp.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App() {

  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/country/all' element={<ProtectedRoute><AllCountries/></ProtectedRoute>}/>
        <Route path='/country/:id' element={<Country/>}/>
    </Routes>
  )
}

export default App
