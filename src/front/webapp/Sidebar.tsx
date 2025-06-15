import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import { mainBackgroundColor, textColorPrimary } from '@/styles/mixins';

const menuItems = [
  {
    id: 1,
    title: 'Главная',
    path: '/telegram-page',
    icon: <HomeIcon />,
  },
  { id: 2, title: 'Профиль', path: '/profile-page', icon: <PersonIcon /> },
  { id: 3, title: 'Статистика', path: '/stats-page', icon: <BarChartIcon /> },
  { id: 4, title: 'Настройки', path: '/settings-page', icon: <SettingsIcon /> },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const pathname = usePathname() || '/';

  return (
    <Drawer
      variant='temporary'
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 250,
          backgroundColor: mainBackgroundColor,
        },
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.id} disablePadding>
              <Link
                href={item.path}
                style={{
                  textDecoration: 'none',
                  width: '100%',
                }}
                onClick={onClose}
              >
                <ListItemButton
                  selected={isActive}
                  sx={{
                    color: isActive ? 'primary.main' : textColorPrimary,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {React.cloneElement(item.icon, {
                      color: isActive ? 'primary' : 'inherit',
                      fontSize: 'medium',
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 'medium' : 'regular',
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
