import React from 'react';
import {Icon, TabBar} from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';

import {
  UNSELECTED_TINT_COLOR,
  TINT_COLOR,
  BAR_TINT_COLOR,
  NAV_ITEMS,
} from './Constants';
import {NavBarProps} from './NavTypes';

const Navbar = (props: NavBarProps) => {
  return (
    <TabBar
      unselectedTintColor={UNSELECTED_TINT_COLOR}
      tintColor={TINT_COLOR}
      barTintColor={BAR_TINT_COLOR}>
      {NAV_ITEMS.map((navItem: any, index) => {
        return (
          <TabBar.Item
            key={index}
            title={navItem.title}
            icon={<AntDesign name={navItem.iconName} size={32}/>}
            selected={props.selectedNav === navItem.nav}
            onPress={() => props.onClickNavItem(navItem.nav)}>
            {navItem.component()}
          </TabBar.Item>
        );
      })}
    </TabBar>
  );
};

export default Navbar;
