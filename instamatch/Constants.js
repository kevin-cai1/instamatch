import Home from './Home';
import Friends from './Friends';
import SettingsNav from './SettingsNav';
import { AntDesign } from '@expo/vector-icons';
import FriendsNav from "./routes/FriendsNav";
import HomeNav from "./HomeNav";

export const UNSELECTED_TINT_COLOR = '#575757';
export const TINT_COLOR = '#1C3AA1';
export const BAR_TINT_COLOR = '#f5f5f5';
export const ACCENT_COLOR = '#1C3AA1';
export const NAV_ITEMS = [
  {
    title: 'Home',
    iconName: 'home',
    nav: 'home',
    component: HomeNav,
  },
  {
    title: 'Friends',
    iconName: 'users',
    nav: 'friends',
    component: FriendsNav,
  },
  {
    title: 'Settings',
    iconName: 'settings',
    nav: 'settings',
    component: SettingsNav,
  },
];
