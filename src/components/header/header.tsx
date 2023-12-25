import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { TeamOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const Header = () => {
   const [current, setCurrent] = useState('');
   const pathName = window.location.pathname;

   const onClick: MenuProps['onClick'] = (e) => {
      setCurrent(e.key);
   };

   const items: MenuProps['items'] = [
      {
         label: <Link to="/">Home</Link>,
         key: 'home',
         icon: <HomeOutlined />,
      },
      {
         label: <Link to="/users">Manage Users</Link>,
         key: 'users',
         icon: <TeamOutlined />,
      },
   ];

   useEffect(() => {
      if (pathName === '/') {
         setCurrent('home');
      }
      if (pathName.includes('/users')) {
         setCurrent('users');
      }
   }, [pathName]);

   return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
