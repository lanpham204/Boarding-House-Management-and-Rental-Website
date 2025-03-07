
import { BrowserRouter as Router, Route, Routes, useNavigate, } from 'react-router-dom';
import Main from "./page/user/Main";
import DashboardAdmin from "./page/admin/child/DashboardAdmin";
import RentalHome from "./page/user/RentalHome";
import RentailHomeDetail from "./page/user/RentailHomeDetail";
import About from "./page/user/About";
import Contact from "./page/user/Contact";
import Login from "./page/login/Login";
import { useState } from "react";
import { getCurrentAdmin, getCurrentRentaler, getCurrentUser } from "./services/fetch/ApiUtils";
import { ACCESS_TOKEN } from "./constants/Connect";
import LoadingIndicator from "./common/LoadingIndicator";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./page/signup/Signup";
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import DashboardRentaler from './page/rentaler/DashboardRentaler';
import LoginRentaler from './page/login/LoginRentaler';
import LoginAdmin from './page/login/LoginAdmin';
import SignupRentaler from './page/signup/SignupRentaler';
import ForgotPassword from './common/ForgotPassword';
import ResetPassword from './common/ResetPassword';
import SuccessConfirmed from './common/SuccessConfirmed';
import AddRoom from './page/rentaler/AddRoom';
import RoomManagement from './page/rentaler/RoomManagement';
import EditRoom from './page/rentaler/EditRoom';
import Profile from './page/user/Profile';
import Message from './page/messages/pages/Home'
import ContractManagement from './page/rentaler/ContractManagement';
import AddContract from './page/rentaler/AddContract';
import EditContract from './page/rentaler/EditContract';
import MaintenceManagement from './page/rentaler/MaintenceManagement';
import AddMaintence from './page/rentaler/AddMaintence';
import EditMaintenance from './page/rentaler/EditMaintence';
import RequierManagement from './page/rentaler/RequierManagement';
import ExportBillRequier from './page/rentaler/ExportBillRequier';
import ExportCheckoutRoom from './page/rentaler/ExportCheckoutRoom';
import ProfileRentaler from './page/rentaler/ProfileRentaler';
import ChangePassword from './page/rentaler/ChangePassword';
import RoomManagementAdmin from './page/admin/child/RoomManagerment';
import AccountManagement from './page/admin/child/AccountManagement';
import SendEmail from './page/admin/child/SendEmail';
import Chat from './page/rentaler/Chat';
import Authorization from './page/admin/child/Authorization';
import ChangePasswordOfUser from './page/user/ChangePassword';
import RoomHired from './page/user/RoomHired';
import AgentsGird from './page/user/AgentsGird';
import AgentSingle from './page/user/AgentSingle';
import SendRequest from './page/user/SendRequest';
import RequestManagement from './page/user/RequestManagement';
import Follow from './page/user/Follow';
import SaveBlog from './page/user/SaveBlog';
import ChatOfUser from './page/user/ChatOfUser';
import AdminPage from './page/admin/AdminPage';
import HomePage from './page/user/HomePage';
import RentalerLayout from './page/rentaler/RentalerLayout';
import ChangePasswordAdmin from './page/admin/ChangePasswordAdmin';
import CategoryManagement from './page/admin/child/CategoryManagement';
import ChatRentaler from './page/rentaler/ChatRentaler';
import NotFoundPage from './common/NotFound';
import ProfileAdmin from './page/admin/ProfileAdmin';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setUsername(response.name);
        setRole(response.roles[0].name);
        setAuthenticated(true);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });
  }

  const loadCurrentlyLoggedInRetanler = () => {
    getCurrentRentaler()
      .then(response => {
        console.log(response);
        setCurrentUser(response);
        setUsername(response.name);
        setRole(response.roles[0].name);
        setAuthenticated(true);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });
  }

  const loadCurrentlyLoggedInAdmin = () => {
    getCurrentAdmin()
      .then(response => {
        setCurrentUser(response);
        setUsername(response.name);
        setRole(response.roles[0].name);
        setAuthenticated(true);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    toast.success("Bạn đăng xuất thành công!!!");
  }

  const exitLogoutChangePassword = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
  }

  useEffect(() => {
    loadCurrentlyLoggedInUser();
    loadCurrentlyLoggedInRetanler();
    loadCurrentlyLoggedInAdmin();
  }, []);

  if (loading) {
    return <LoadingIndicator />
  }
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} >
            <Route exact index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
            <Route exact path="login-rental" element={<LoginRentaler />} />
            <Route exact path="signup-rental" element={<SignupRentaler />} />
            <Route exact path="about" element={<About authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
            <Route exact path="rental-home/:id" element={<RentailHomeDetail authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
            <Route exact path="profile" element={<Profile authenticated={authenticated} loadCurrentUser={loadCurrentlyLoggedInUser} currentUser={currentUser} onLogout={handleLogout} />} >
              <Route exact path="save-room" element={<SaveBlog authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
              <Route exact path="follow-agents" element={<Follow authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
              <Route exact path="message" element={<ChatOfUser authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
              <Route exact path="room-history" element={<RoomHired authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
              <Route exact index element={<RoomHired authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
            </Route>
          </Route>
          <Route exact path="login-admin" element={<LoginAdmin authenticated={authenticated} currentUser={currentUser} role={role} />} />

          {/* ADMIN */}
          <Route exact path="/admin" element={<AdminPage authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} >
            <Route exact index={true} element={<DashboardAdmin authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="dashboard" element={<DashboardAdmin authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="room-manager" element={<RoomManagementAdmin authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="authorization/:userId" element={<Authorization authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="account-manager" element={<AccountManagement authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="category-manager" element={<CategoryManagement authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="send-email/:id" element={<SendEmail authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
            <Route exact path="profile" element={<ProfileAdmin authenticated={authenticated} currentUser={currentUser} role={role} loadCurrentUser={loadCurrentlyLoggedInAdmin} onLogout={handleLogout} />} />
            <Route exact path="change-password" element={<ChangePasswordAdmin authenticated={authenticated} exit={exitLogoutChangePassword} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          </Route>

          <Route exact path="/rental-home" element={<RentalHome authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/angent-gird" element={<AgentsGird authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/angent-single/:id" element={<AgentSingle authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/contact" element={<Contact authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/forgot-password" element={<ForgotPassword authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/reset-password/:email" element={<ResetPassword />} />
          <Route exact path="/success-comfirmed/:email" element={<SuccessConfirmed />} />
          <Route exact path="/change-password" element={<ChangePasswordOfUser authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />


          {/* RENTAL*/}
          <Route exact path="/rentaler/change-password" element={<ChangePassword authenticated={authenticated} exit={exitLogoutChangePassword} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/profile" element={<ProfileRentaler authenticated={authenticated} currentUser={currentUser} role={role} loadCurrentUser={loadCurrentlyLoggedInRetanler} onLogout={handleLogout} />} />
          <Route exact path="/rentaler" element={<DashboardRentaler authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/room-management" element={<RoomManagement authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/contract-management" element={<ContractManagement authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/chat" element={<Chat authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/add-room" element={<AddRoom authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/edit-room/:id" element={<EditRoom authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/add-contract" element={<AddContract authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/edit-contract/:id" element={<EditContract authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/request-management" element={<RequierManagement authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/export-bill/:id" element={<ExportBillRequier authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/export-contract/:id" element={<ExportCheckoutRoom authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/rentaler/message" element={<ChatRentaler authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} >
            <ChatOfUser authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />
          </ChatRentaler>
          } />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
        <Routes>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>

  );
}

export default App;
