import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Routes,
  HashRouter,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Navbar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Contacts from "./components/Contacts/Contacts";
import Channel from "./components/Channel/Channel";
import Create from "./components/Channel/Create";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProfilePage from "./components/ProfilePage/ProfilePage";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute ifloged={true}><Login/></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute ifloged={true}><SignUp/></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute><Contacts/></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProfilePage/>} />
        <Route path={"/channel/:id"} element={<ProtectedRoute><Channel/></ProtectedRoute>}/>
        {/* <Route path={"/createChannel/"} element={<ProtectedRoute><Create/></ProtectedRoute>}/> */}
      </Routes>
    </HashRouter>
  );
}

export default App;
