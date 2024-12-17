import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import UserHome from './pages/UserHome';
import NotesHub from './pages/Notes/NotesHub';
import NotesLibrary from './pages/Notes/NotesLibrary';
import UploadNotes from './pages/Notes/uploadNotes';
import SavedNotes from './pages/Notes/savedNotes';
import NotesView from './pages/Notes/NotesView';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<UserHome/>}/>
        <Route path='/notes' element={<NotesHub/>}/>
        <Route path='/notes/all' element={<NotesLibrary/>}/>
        <Route path='/notes/upload' element={<UploadNotes/>}/>
        <Route path='/notes/saved' element={<SavedNotes/>}/>
        <Route path='/notes/view' element={<NotesView/>}/>
      </Routes>
    </BrowserRouter>
);
}

export default App;
