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
import Marketplace from './pages/MarketPlace/MarketPlace';
import ProductView from './pages/MarketPlace/ProductView';
import AddProduct from './pages/MarketPlace/AddProduct';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import Header from './components/Header';
import ProfilePage from './pages/Profile';
import EditProfile from './pages/editProfile';
import RoadmapView from './pages/Resources/RoadmapView';
import RoadmapHome from './pages/Resources/RoadmapHome';
import CreateRoadmap from './pages/Resources/CreateRoadmap';
import {GoogleOAuthProvider} from '@react-oauth/google';
import EditNotes from './pages/Notes/editNotes';

const Layout = ({ children }) => {
  return (
      <>
          <Header />
          <main className="pt-16">
              {children}
          </main>
      </>
  );
};


function App() {
  return (
    <GoogleOAuthProvider clientId={'838424253590-jb0517q26jg8h7k4rk8h491akf1e2beh.apps.googleusercontent.com'}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile/:id' element={<Layout><ProfilePage/></Layout>}/>
        <Route path='/home' element={<Layout><UserHome/></Layout>}/>
        <Route path='/notes' element={<Layout><NotesHub/></Layout>}/>
        <Route path='/notes/all' element={<Layout><NotesLibrary/></Layout>}/>
        <Route path='/notes/upload' element={<Layout><UploadNotes/></Layout>}/>
        <Route path='/notes/saved' element={<Layout><SavedNotes/></Layout>}/>
        <Route path='/notes/:noteId' element={<Layout><NotesView/></Layout>}/>
        <Route path='/marketplace' element={<Layout><Marketplace/></Layout>}/>
        <Route path='/marketplace/:id' element={<Layout><ProductView/></Layout>}/>
        <Route path='/marketplace/addproduct' element={<Layout><AddProduct/></Layout>}/>
        <Route path='/resetpassword' element={<ForgotPassword/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/verify' element={<VerifyEmail/>}/>
        <Route path='/roadmaps' element={<Layout><RoadmapHome /></Layout>}/>
        <Route path='/editprofile' element={<Layout><EditProfile/></Layout>}/>
        <Route path='/roadmap/:id' element={<Layout><RoadmapView/></Layout>}/>
        <Route path='/roadmaps/create' element={<Layout><CreateRoadmap/></Layout>}/>
        <Route path='/notes/edit/:id' element={<Layout><EditNotes/></Layout>}/>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
)};

export default App;
