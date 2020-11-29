import React from 'react';
import { StyleSheet, View } from 'react-native'
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
            icon={
              <View style={style.container}>
                {
                  (props.selectedNav === navItem.nav) && 
                  <View style={style.line} />
                }
                <AntDesign
                  name={navItem.iconName}
                  size={30}
                  color={(props.selectedNav === navItem.nav) ? TINT_COLOR : UNSELECTED_TINT_COLOR}
                />
              </View>
              
            }
            selected={props.selectedNav === navItem.nav}
            onPress={() => props.onClickNavItem(navItem.nav)}>
            {navItem.component()}
          </TabBar.Item>
        );
      })}
    </TabBar>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },  
  icon: {
    position: 'absolute',
    top: -16,
    width: 500
  },
  line: {
    borderTopColor: TINT_COLOR,
    borderTopWidth: 3,
    width: 137
  }
})

export default Navbar;
