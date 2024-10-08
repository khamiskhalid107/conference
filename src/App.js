
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
import Addbook from './Visitor/Addbook';
import Addvisitor from './Visitor/Addvisitor';
import CheckBookingStatus from './Visitor/CheckBookingStatus';
import Viewvisitor from './Visitor/Viewvisitor';
import VisitorReport from './Visitor/VisitorReport';
import VisitorUpdateForm from './Visitor/VisitorUpdateForm';
import Visitordash from './Visitor/Visitordash';
import Login from './component/Login';
import Logregistration from './component/Logregistration';
import ProtectComponent from './component/ProtectComponent';
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

    <Route element={<ProtectComponent role="Admin"/>}> 
      
      <Route path='dashbords' element={<ReceptDash/>}/>
      <Route path='report' element={<VisitorReport/>}/>
       <Route path='visitor' element={<Visitor/>}/>
       <Route path='/status1' element={<Addstatus/>}/>
       <Route path='/staff' element={<Staff/>}/>
       <Route path='addvisitor' element={<Addvisitor/>}/>
     </Route>

      {/* staff */}

      <Route element={<ProtectComponent role="Staff"/>}>
      
      <Route path='vistaff' element={<Visitorstaff/>}/>
      <Route path='/status' element={<Addstatus/>}/>
      
      <Route path='/viewbooking' element={<Viewbooking/>}/>
      <Route path='/addservice' element={<AddService/>}/>
      <Route path='staffdash' element={<Dashboard1/>}/>
      <Route path='dashboard' element={<Visitordash/>}/>

</Route>

<Route element={<ProtectComponent role="Visitor"/>}>
     
     {/* Visitor */}
      {/* <Route path='addvisitor' element={<AddVisitorForm/>}/> */}
      <Route path='visitorupdateform' element={<VisitorUpdateForm/>}/>
      
      <Route path='checkbookStatus' element={<CheckBookingStatus/>}/>
      <Route path='viewvisitor' element={<Viewvisitor/>}/>
      {/* <Route path='/addbooking' element={<Addbook/>}/> */}
      <Route path='/addbooking' element={<AddBooking/>}/>
      </Route>
      </Routes>
   
    
  );
}

export default App;
