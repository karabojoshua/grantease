import { useClerk } from '@clerk/clerk-react';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './profile-menu';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(5),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function PrimarySearchAppBar() {
  const { user, signOut } = useClerk();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const [profileMenuUser, setProfileMenuUser] = useState(null);

  const handleProfileClick = (event) => {
    setProfileMenuUser({ anchorEl: event.currentTarget, ...user });
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/sign-in');
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> 
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate("/profile")}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && user.imageUrl ? (
              <Avatar src={user.imageUrl} alt="User Avatar" sx={{ mr: 1 }} />
            ) : (
              <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', mr: 1 }}>
                <AccountCircleIcon />
              </Avatar>
            )}
            <div>
              <Typography variant="subtitle1">{user && user.fullName}</Typography>
              {user && user.emailAddresses[0].emailAddress ? (
                <Typography variant="body2" color="textSecondary">
                  {user.emailAddresses[0].emailAddress}
                </Typography>
              ) : null}
            </div>
          </Box>
      </MenuItem>
      <MenuItem>
      <p>Messages</p>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
          {/* No icon */}
        </Badge>
      </IconButton>
    </MenuItem>
      <MenuItem>
        <p>Notifications</p>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={17} color="error">
          {/* No icon */}
        </Badge>
      </IconButton>
      </MenuItem>
      <MenuItem onClick={() => {navigate("/applications"); }}>Applications</MenuItem>
      <MenuItem onClick={() => {navigate("/dashboard"); }}>Dashboard</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }} component={'header'}>
      <AppBar position="static" elevation={0} className='navbar'component={'section'}>
        <Toolbar>
          <section className='logo-area' style={{width: '2rem'}}>
            <img src="./logo192.png" alt="website logo" style={{width: '2rem'}}  onClick={() => {navigate("/home")}}/>
          </section>
          <Typography
            variant="h6"
            noWrap
            component="section"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            GrantEase
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileClick}
              color="inherit"
            >
              {user && user.imageUrl ? (
              <Avatar src={user.imageUrl} alt="User Avatar" sx={{ mr: 1 }} />
            ) : (
              <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', mr: 1 }}>
                <AccountCircleIcon />
              </Avatar>
            )}
            </IconButton>
            <ProfileMenu
              user={profileMenuUser}
              onClose={() => setProfileMenuUser(null)}
              onSignOut={handleSignOut}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
