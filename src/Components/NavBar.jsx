import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useMediaQuery } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CertificateUpload from './CertificateUpload';
import CollegeLogo from '../assets/CollegeLogo.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './Footer';
import {
  faBars, faCircleUser, faFileArrowUp, faFileLines,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/NavBarStyle.css';
import GlobalTheme from '../Themes/GlobalTheme';
import CertificatePortal from './CertificatePortal';
import About from './About';

const drawerWidth = 240;

const NavBar = (props) => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const Icons = [faFileArrowUp, faFileLines, faCircleUser];
  const Links = ['Certificate Upload', 'Certificate Portal', 'About'];
  const LinksPath = ['/', '/certificates', '/about'];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      style={{ textAlign: 'center', marginTop: 45 }}
    >
      {Links.map((text, index) => (
        <MenuItem key={text} onClick={handleMenuClose}>
          <Link to={LinksPath[index]} id='nav-links'
            style={{ fontFamily: GlobalTheme.fontFamily }}
          >
            <FontAwesomeIcon icon={Icons[index]} style={{ height: '1.5em' }} />
            <>{text}</>
          </Link>
        </MenuItem>
      ))}
      {/* <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="small"
          color="inherit"
          id='log-out'
          style={{ fontFamily: GlobalTheme.fontFamily }}
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Log Out
        </IconButton>
      </MenuItem> */}
    </Menu>
  );

  const isMobile = useMediaQuery('(max-width:499px)');

  return (
    <>
      <Box sx={{ display: 'flex' }} className='nav'>
        <React.Fragment>
          <CssBaseline />
          <AppBar component="nav" style={{ backgroundColor: GlobalTheme.backgroundColor }}>
            <Toolbar>
              <a href='https://www.srivasaviengg.ac.in/' target='blank'>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <img src={CollegeLogo} alt="College Logo" className='collegeLogo' />
                </IconButton>
              </a>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'flex', md: 'flex', margin: 0 } }} id='nav-items' >
                {isMobile ? (
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    {isMobileMenuOpen ? (
                      <FontAwesomeIcon icon={faXmark} />
                    ) : (
                      <FontAwesomeIcon icon={faBars} />
                    )}
                  </IconButton>
                ) : (
                  <>
                    {Links.map((text, index) => (
                      <IconButton size="small" color="inherit" key={index}>
                        <Link to={LinksPath[index]} id='nav-links'
                          style={{ fontFamily: GlobalTheme.fontFamily }}
                        >
                          <FontAwesomeIcon icon={Icons[index]} style={{ height: '1.5em' }} />
                          <>{text}</>
                        </Link>
                      </IconButton>
                    ))}
                    {/* <IconButton
                      size="small"
                      color="inherit"
                      id='log-out'
                      style={{ fontFamily: GlobalTheme.fontFamily }}
                      onClick={() => {
                        localStorage.clear();
                        navigate('/login');
                      }}
                    >
                      Log Out
                    </IconButton> */}
                  </>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <Routes>
            <Route path="/" element={<CertificateUpload />} />
            <Route path="/certificates" element={<CertificatePortal />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </React.Fragment>
      </Box>
      <Footer />
    </>
  );
}

export default NavBar;
