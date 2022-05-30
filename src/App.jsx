import "./App.css";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Cards from './components/Users/UserItem';
import Users from './components/pages/Users';
function App() {
  return (
    <Router>
      <Route path='/'>
      <Users/>
      </Route>
    </Router>
  );
}

export default App;
