import React from 'react';
/* Import library für Sidebar */
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

/* Import für Router library */
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

/* Seiten Importieren */
import Kurse from '../Sites/Kurse/Dashboard';
import KurseEdit from '../Sites/Kurse/KurseEdit';
import KurseAdd from '../Sites/Kurse/KurseAdd';
import Home from '../Sites/Home';

/* Hier wird die Sidebar erstellt. Ebenso wird hier der Router für die Seiten erstellt. Alle neuen Routen müssen hier definiert werden.*/
const Sidebar = () => {
   return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/kurse" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Kurse</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lernende</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetriebe" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lehrbetrieb</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dozent" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dozenten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laender" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Land</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/kurs_lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Kurs_Lernende</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetrieb_lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lehrbetrieb_Lernende</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/kurse" element={<Kurse />} />
         <Route path="/kurse/edit/:id" element={<KurseEdit />} />
         <Route path="/kurse/add/" element={<KurseAdd />} />
      </Routes>
    </div>
  );
};

export default Sidebar;