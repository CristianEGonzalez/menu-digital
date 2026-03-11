import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "../src/pages/Home"
import Admin from './pages//Admin/Admin'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> } />
        {/* <Route path="/login" element={ <Login /> } /> */}
        <Route path="/*" element={ <Navigate to="/" /> } />
        <Route path="/admin" element={ <Admin/>} />


      {/* COMO QUEDARIA CON LA AUTENTICACIÓN APLICADA */}
        {/* <Route path="/admin" element={ 
          <PrivateRoute>
            <Admin/>
          </PrivateRoute>}
        /> */}
        
        
      </Routes>
    </>
  );
};

export default App;
