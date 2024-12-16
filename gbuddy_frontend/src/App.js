import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import UserHome from './pages/UserHome';
import NotesHub from './pages/Notes/NotesHub';
import NotesLibrary from './pages/Notes/NotesLibrary';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<UserHome/>}/>
        <Route path='/notes' element={<NotesHub/>}/>
        <Route path='/notes/library' element={<NotesLibrary/>}/>
      </Routes>
    </BrowserRouter>
);
}

export default App;
