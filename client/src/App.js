import './App.css';
import  { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import {Navigate} from "react-router-dom"
import { Startup } from './pages/startup';
import {Home} from "./pages/home";
import {Add} from "./pages/add";
import {Auth} from "./pages/auth";
// import {Admin} from "./pages/admin";
// import {Profile} from "./pages/profile";
// import {Profupdate} from "./pages/profupdate";
// import {Updateexpense} from "./pages/updateexpense";
// import {Updateincome} from "./pages/updateincome";
import { useAuthContext } from './hooks/useAuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <Router>        
        <Routes>

            <Route path="/home" element={user ? <Home /> : <Navigate to="/"/>} />

            <Route path='/auth' element={!user ? <Auth/> : <Navigate to="/home"/>}/>
            
          <Route path="/" element={!user ? <Startup /> : <Navigate to="/home"/>} />
         
          <Route path="/add" element={user ? <Add /> : <Navigate to="/"/>}/>
          {/* <Route path='/admin' element={<Admin/>}/>
          <Route path='/updateincome/:id' element={<Updateincome/>}/>
          <Route path='/updateexpense/:id' element={<Updateexpense/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/profupdate/:id' element={<Profupdate/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
