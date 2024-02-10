import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity'; // For 'Locais de Coleta'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuListItem from "./MenuListItem";
import Pessoas from "./Pessoas";
import TipoSanguineo from "./TipoSanguineo";
import LocaisDeColeta from "./LocaisDeColeta";
import LocaisColeta from "./LocaisDeColeta";
import Doacoes from "./Doacoes";
import Cidades from "./Cidades";
import Estados from "./Estados";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(<Typography paragraph>
    Trabalho de Sistemas Web. Escolha uma opção no menu lateral.
    Luisa Laura Linhares.
  </Typography>);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (text: string) => {

    if(text === 'Tipo Sanguíneo'){
      setContent(
          <TipoSanguineo />
      );
    }
    if( text === 'Doações'){
      setContent(
          <Doacoes />
      );
    }
    if( text === 'Pessoas'){
      setContent(
          <Pessoas></Pessoas>
      );
    }
    if( text === 'Locais de Coleta'){
      setContent(
          <LocaisColeta />
      );
    }
    if( text === 'Cidades'){
      setContent(
          <Cidades />
      );
    }
    if( text === 'Estados'){
      setContent(
          <Estados />
      );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sistema de Agendamento de Doação de Sangue
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <MenuListItem icon={<BloodtypeIcon />} text='Tipo Sanguíneo' handleItemClick={handleMenuItemClick} />
          <MenuListItem icon={<PeopleIcon />} text='Pessoas' handleItemClick={handleMenuItemClick} />
          <MenuListItem icon={<LocationCityIcon />} text='Locais de Coleta' handleItemClick={handleMenuItemClick} />
          <MenuListItem icon={<FavoriteIcon />} text='Doações' handleItemClick={handleMenuItemClick} />
        </List>
        <Divider />
        <List>
          <MenuListItem icon={<LocationCityIcon />} text='Cidades' handleItemClick={handleMenuItemClick} />
          <MenuListItem icon={<LocationCityIcon />} text='Estados' handleItemClick={handleMenuItemClick} />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {content}
      </Main>
    </Box>
);
}