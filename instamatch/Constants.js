import Home from './Home';
import Friends from './Friends';
import Settings from './Settings';
import { AntDesign } from '@expo/vector-icons';
import FriendsNav from "./FriendsNav";

export const UNSELECTED_TINT_COLOR = '#575757';
export const TINT_COLOR = '#536BBF';
export const BAR_TINT_COLOR = '#f5f5f5';
export const NAV_ITEMS = [
  {
    title: 'Home',
    iconName: 'home',
    nav: 'home',
    component: Home,
  },
  {
    title: 'Friends',
    iconName: 'addusergroup',
    nav: 'friends',
    component: FriendsNav,
  },
  {
    title: 'Settings',
    iconName: 'setting',
    nav: 'settings',
    component: Settings,
  },
];
