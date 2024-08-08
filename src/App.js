
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Header from './component/Navigation/Header';
import AddBooking from './Visitor/AddBooking';
import Visitordash from './Visitor/Visitordash';
import ReceptDash from './Receptionist/ReceptDash';
import Dashboard1 from './Staff/Dashboard1';
import Visitor from './Receptionist/Visitor';
import VisitorReport from './Visitor/VisitorReport';
import AddVisitorForm from './Visitor/AddVisitorForm';
import VisitorUpdateForm from './Visitor/VisitorUpdateForm';
import Addvisitor from './Visitor/Addvisitor';
import Viewvisitor from './Visitor/Viewvisitor';
import Logregistration from './component/Logregistration';
import Visitorstaff from './Staff/Visitorstaff';
import Addstatus from './Staff/Addstatus';
import Staff from './Staff/Staff';





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

      <Route path='staffdash' element={<Dashboard1/>}/>

      <Route path='visitor' element={<Visitor/>}/>
      <Route path='report' element={<VisitorReport/>}/>
      {/* <Route path='addvisitor' element={<AddVisitorForm/>}/> */}
      <Route path='visitorupdateform' element={<VisitorUpdateForm/>}/>
      <Route path='addvisitor' element={<Addvisitor/>}/>
      </Routes>
   
    
  );
}

export default App;
