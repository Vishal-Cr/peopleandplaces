import "./App.css";
import {Route,Switch,Redirect } from "react-router-dom";
import Navbar from "./components/navbar/NavbarContainer.jsx";
import NewPlace from "./components/pages/NewPlace";
import Users from './components/pages/Users';
import UserPlaces from './components/pages/UserPlaces';
function App() {
  
  
  
  
  
  
  return (
   
   
      <main className='App'>
      <Navbar/>
      
      
      <Switch>

       <Route path='/' exact>
        <Users/>

        
          </Route>
       
       <Route path='/my/:id/places'>
     <UserPlaces/>
        {/* <h1>My Places</h1> */}
       </Route>

    
    
     <Route path="/places/new">
      <NewPlace/>
       {/* <h1>New pLace</h1> */}
     </Route>

     <Route path="/auth">
       <NewPlace/>
       {/* <h1>Authentication</h1> */}
     </Route>
      
       
      </Switch>

      </main>
    

    
  );
}

export default App;
