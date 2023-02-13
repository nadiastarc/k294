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

import Dozenten from '../Sites/Dozenten/Dashboard';
import DozentEdit from '../Sites/Dozenten/DozentenEdit';
import DozentAdd from '../Sites/Dozenten/DozentenAdd';

import Lernende from '../Sites/Lernende/Dashboard';
import LernendeEdit from '../Sites/Lernende/LernendeEdit';
import LernendeAdd from '../Sites/Lernende/LernendeAdd';

import Lehrbetrieb from '../Sites/Lehrbetrieb/Dashboard';
import LehrbetriebEdit from '../Sites/Lehrbetrieb/LehrbetriebEdit';
import LehrbetriebAdd from '../Sites/Lehrbetrieb/LehrbetriebAdd';

import Land from '../Sites/Land/Dashboard';
import LandEdit from '../Sites/Land/LandEdit';
import LandAdd from '../Sites/Land/LandAdd';

import KursBesuch from '../Sites/Kursbesuche/Dashboard';

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
              <CDBSidebarMenuItem icon="th">Kurse</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="male">Lernende</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dozenten" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="male">Dozenten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetrieb" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lehrbetrieb</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laender" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="map-signs">Land</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/kursbesuche" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list-ul">Kursbesuche</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetrieb_lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list-ul">Lehrfirmen</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/kurse" element={<Kurse />} />
         <Route path="/kurse/edit/:id" element={<KurseEdit />} />
         <Route path="/kurse/add/" element={<KurseAdd />} />
         
         <Route exact path="/dozenten/" element={<Dozenten />} />
         <Route path="/dozent/edit/:id" element={<DozentEdit />} />
         <Route path="/dozent/add/" element={<DozentAdd />} />

         <Route exact path="/lernende/" element={<Lernende />} />
         <Route path="/lernende/edit/:id" element={<LernendeEdit />} />
         <Route path="/lernende/add/" element={<LernendeAdd />} />

         <Route exact path="/lehrbetrieb/" element={<Lehrbetrieb />} />
         <Route path="/lehrbetrieb/edit/:id" element={<LehrbetriebEdit />} />
         <Route path="/lehrbetrieb/add/" element={<LehrbetriebAdd />} />

         <Route exact path="/laender/" element={<Land />} />
         <Route path="/laender/edit/:id" element={<LandEdit />} />
         <Route path="/laender/add/" element={<LandAdd />} />

         <Route exact path="/kursbesuche/" element={<KursBesuch/>} />


      </Routes>
    </div>
  );
};

export default Sidebar;