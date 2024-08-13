
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReceptDash from './Receptionist/ReceptDash';
import Visitor from './Receptionist/Visitor';
import AddService from './Staff/AddService';
import Addstatus from './Staff/Addstatus';
import Dashboard1 from './Staff/Dashboard1';
import Staff from './Staff/Staff';
import Viewbooking from './Staff/Viewbooking';
import Visitorstaff from './Staff/Visitorstaff';
import AddBooking from './Visitor/AddBooking';
import AddVisitorForm from './Visitor/AddVisitorForm';
import Addvisitor from './Visitor/Addvisitor';
import CheckBookingStatus from './Visitor/CheckBookingStatus';
import Viewvisitor from './Visitor/Viewvisitor';
import VisitorReport from './Visitor/VisitorReport';
import VisitorUpdateForm from './Visitor/VisitorUpdateForm';
import Visitordash from './Visitor/Visitordash';
import Login from './component/Login';
import Logregistration from './component/Logregistration';
import Register from './component/Register';
import Header from './component/Navigation/Header';





function App() {
  return (
    
        <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     <Route path='/reg' element={<Logregistration/>}/>
    <Route path='logreg' element={<Logregistration/>}/>

      {/* Admin */}

      <Route path='/addbooking' element={<AddBooking/>}/>
      <Route path='dashboard' element={<Visitordash/>}/>
      <Route path='viewvisitor' element={<Viewvisitor/>}/>

      {/* staff */}

      <Route path='dashbords' element={<ReceptDash/>}/>
      <Route path='vistaff' element={<Visitorstaff/>}/>
      <Route path='/status' element={<Addstatus/>}/>
      <Route path='/staff' element={<Staff/>}/>
      <Route path='/viewbooking' element={<Viewbooking/>}/>
      <Route path='/addservice' element={<AddService/>}/>
      

      <Route path='staffdash' element={<Dashboard1/>}/>

      <Route path='visitor' element={<Visitor/>}/>
      <Route path='report' element={<VisitorReport/>}/>
      {/* <Route path='addvisitor' element={<AddVisitorForm/>}/> */}
      <Route path='visitorupdateform' element={<VisitorUpdateForm/>}/>
      <Route path='addvisitor' element={<Addvisitor/>}/>
      <Route path='checkbookStatus' element={<CheckBookingStatus/>}/>
      </Routes>
   
    
  );
}

export default App;
