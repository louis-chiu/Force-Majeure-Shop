import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from 'react-icons/ai';

export const navItems = [
  {
    id: 1,
    name: 'Shop',
    icons: '',
    link: '/shop',
  },
  {
    id: 2,
    name: 'Cart',
    icons: '',
    link: '/cart',
  },
  {
    id: 3,
    name: 'Login',
    icons: '',
    link: '/login',
  },
];

export const socialMedia = [
  {
    id: 1,
    name: 'facebook',
    link: 'https://facebook.com.tw',
    logo: <AiFillFacebook />,
  },
  {
    id: 2,
    name: 'twitter',
    link: 'https://www.twitter.com',
    logo: <AiFillTwitterSquare />,
  },
  {
    id: 3,
    name: 'instagram',
    link: 'https://www.instagram.com',
    logo: <AiFillInstagram />,
  },
];

export const bannerUrlList = [
  '/src/assets/banner1.jpg',
  '/src/assets/banner2.jpg',
  '/src/assets/banner3.jpg',
];

export const productList = [{}];

export const defaultAvatarUrl =
  'https://images.unsplash.com/photo-1571988840298-3b5301d5109b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80';
