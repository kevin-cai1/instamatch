import React, { useState } from 'react';
import Navbar from './Navbar';
import { NAV_ITEMS } from './Constants';

const Router = () => {
  const [selectedNav, setSelectedNav] = useState(NAV_ITEMS[0].nav);

  const handleClickNavItem = (navItem: string) => {
    setSelectedNav(navItem);
  };

  return (
    <Navbar selectedNav={selectedNav} onClickNavItem={handleClickNavItem} />
  );
};

export default Router;
