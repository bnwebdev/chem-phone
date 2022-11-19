import { FC, MouseEvent, useMemo, useState } from "react";

import { NavItem } from "@app/module-client";

import MenuIcon from '@mui/icons-material/Menu';;
import {Divider, Tooltip, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

import AppNavLink from './AppNavLink'
import AppSideNavLink from './AppSideNavLink'
import { useIdentity } from "../../../../packages/client/src/modules/auth/graphql/queries";

type Props = {
    leftItems: NavItem[]
    rightItems: NavItem[]
}

const normalizeNavItems = (navItems: NavItem[], identityData?: { username: string }) => {
  const plainNormalized = navItems.filter(({ auth }) => auth === undefined || !!identityData === auth)

  const deepNormalized = plainNormalized.map((item) => {
    if ('children' in item) {
      item.children = normalizeNavItems(item.children, identityData)
    }

    return item;
  })

  return deepNormalized
}

const NavBar: FC<Props> = ({ leftItems: rawLeftItems, rightItems: rawRightItems }) => {
  const { identityData, identityLoading } = useIdentity()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const leftItems = useMemo(() => normalizeNavItems(rawLeftItems, identityData), [identityData, rawLeftItems]) 
  const rightItems = useMemo(() => normalizeNavItems(rawRightItems, identityData), [identityData, rawRightItems])
  
  if (identityLoading) {
    return null
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CHEMPHONE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {leftItems.concat(rightItems).map((item, idx, arr) => ([
                <AppSideNavLink item={item} key={item.label + `${idx}`} buttonProps={{onClick: handleCloseNavMenu}} hideModals={!Boolean(anchorElNav)}/>,
                idx !== arr.length - 1 && <Divider key={`divider-${idx}`}/>
              ]))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CHEMPHONE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {leftItems.concat(rightItems).map((item, idx) => (
                <AppNavLink item={item} key={item.label + `${idx}`} />
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;