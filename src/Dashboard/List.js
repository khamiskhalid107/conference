import { faTachometerAlt, faCalendarPlus, faCogs, faUsers, faUserPlus, faUserCheck, faUserShield, faUserCog, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = {
  Visitor : [
    {label: <><FontAwesomeIcon icon={faTachometerAlt} /> Visitor Dashboard</>, path: '/viewvisitor'},
    {label: <><FontAwesomeIcon icon={faCalendarPlus} /> Add Booking</>, path: '/addbooking'},
    {label: <><FontAwesomeIcon icon={faCogs} /> Setting</>, path: '/update password'},
    {label: <><FontAwesomeIcon icon={faCogs} /> Edit Informatiom</>, path: '/update password'},
    {label: <><FontAwesomeIcon icon={faCogs} /> Check Booking Status</>, path: '/checkbookStatus'}
  ],

  Admin: [
    {label: <><FontAwesomeIcon icon={faTachometerAlt} /> Admin Dashboard</>, path: '/dashbords'},
    {label: <><FontAwesomeIcon icon={faUsers} /> All Visitor</>, path: '/visitor'},
    
    {label: <><FontAwesomeIcon icon={faUserCheck} /> Check Status</>, path: '/status'},
    {label: <><FontAwesomeIcon icon={faUserPlus} /> Add Staff</>, path: '/staff'},
    {label: <><FontAwesomeIcon icon={faUserShield} /> Register</>, path: '/addvisitor'},
    {label: <><FontAwesomeIcon icon={faUserCog} /> Setting</>, path: '/update password'},
    {label: <><FontAwesomeIcon icon={faFileAlt} /> Report</>, path: '/report'}
  ],

  Staff: [
    {label: <><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</>, path: '/dashboaa'},
    {label: <><FontAwesomeIcon icon={faUsers} /> All Visitor</>, path: '/vistaff'},
    {label: <><FontAwesomeIcon icon={faUserCheck} /> Add Status</>, path: '/status'},
    
  ]
};

export default List;
