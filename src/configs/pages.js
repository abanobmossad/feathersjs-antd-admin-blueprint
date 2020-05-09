import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';

/**
Generate pages (Route and Menu item), Based on the page specs

---- page spaces shape -----

path:"/users" >  The path of the route
title:"Users" >  Menu item title
icon:Icon,    >  Icon for the menu
supPages:{},  >  Dup pages (same shape)
props:{},     >  Props to pass to the component
component     >  The component to render
 */


export default [
  Dashboard,
  Users,
];
