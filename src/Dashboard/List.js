import { faHome, faBook, faCog, faUsers, faUserPlus, faChartLine, faShieldAlt, faTools, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = {
  Visitor: [
    {label: <><FontAwesomeIcon icon={faHome} /> Visitor Dashboard</>, path: '/viewvisitor'},
    {label: <><FontAwesomeIcon icon={faBook} /> Add Booking</>, path: '/addbooking'},
    {label: <><FontAwesomeIcon icon={faTools} /> Setting</>, path: '/updatepassword'},
    {label: <><FontAwesomeIcon icon={faTools} /> Edit Information</>, path: '/updatepassword'},
    {label: <><FontAwesomeIcon icon={faChartLine} /> Check Booking Status</>, path: '/checkbookStatus'}
  ],

  Admin: [
    {label: <><FontAwesomeIcon icon={faHome} /> Admin Dashboard</>, path: '/dashbords'},
    {label: <><FontAwesomeIcon icon={faUsers} /> All Visitors</>, path: '/visitor'},
    {label: <><FontAwesomeIcon icon={faChartLine} /> Check Status</>, path: '/status'},
    {label: <><FontAwesomeIcon icon={faUserPlus} /> Add Staff</>, path: '/staff'},
    {label: <><FontAwesomeIcon icon={faShieldAlt} /> Register</>, path: '/addvisitor'},
    {label: <><FontAwesomeIcon icon={faCog} /> Setting</>, path: '/updatepassword'},
    {label: <><FontAwesomeIcon icon={faFileInvoice} /> Report</>, path: '/report'}
  ],

  Staff: [
    {label: <><FontAwesomeIcon icon={faHome} /> Dashboard</>, path: '/dashboard'},
    {label: <><FontAwesomeIcon icon={faUsers} /> All Visitors</>, path: '/vistaff'},
    {label: <><FontAwesomeIcon icon={faChartLine} /> Add Status</>, path: '/status'},    
    {label: <><FontAwesomeIcon icon={faTools} /> Add Service</>, path: '/addservice'},
    {label: <><FontAwesomeIcon icon={faChartLine} /> View Booking</>, path: '/viewbooking'}
  ]
};

export default List;
