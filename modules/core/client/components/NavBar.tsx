import { FC, MouseEvent, useContext, useMemo, useState } from "react";

import { NavItem } from "@app/module-client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  TextField,
  MenuItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

import AppNavLink from "./AppNavLink";
import AppSideNavLink from "./AppSideNavLink";
import { useAuth } from "../../../../packages/client/src/modules/auth/context/AuthProvider";
import { TranslationContext } from "@app/i18n";

type Props = {
  leftItems: NavItem[];
  rightItems: NavItem[];
};

const normalizeNavItems = (
  navItems: NavItem[],
  identity: { username: string } | null | undefined
) => {
  const plainNormalized = navItems.filter(
    ({ auth }) => auth === undefined || !!identity === auth
  );

  const deepNormalized = plainNormalized.map((item) => {
    if ("children" in item) {
      item.children = normalizeNavItems(item.children, identity);
    }

    return item;
  });

  return deepNormalized;
};

const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ua",
    label: "Українська",
  },
];

const NavBar: FC<Props> = ({
  leftItems: rawLeftItems,
  rightItems: rawRightItems,
}) => {
  const { identity } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const leftItems = useMemo(
    () => normalizeNavItems(rawLeftItems, identity),
    [identity, rawLeftItems]
  );
  const rightItems = useMemo(
    () => normalizeNavItems(rawRightItems, identity),
    [identity, rawRightItems]
  );

  const { language, setLanguage } = useContext(TranslationContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CHEMPHONE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {leftItems
                .concat(rightItems)
                .map((item, idx, arr) => [
                  <AppSideNavLink
                    item={item}
                    key={item.label + `${idx}`}
                    buttonProps={{ onClick: handleCloseNavMenu }}
                    hideModals={!Boolean(anchorElNav)}
                  />,
                  idx !== arr.length - 1 && <Divider key={`divider-${idx}`} />,
                ])}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CHEMPHONE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {leftItems.concat(rightItems).map((item, idx) => (
              <AppNavLink item={item} key={item.label + `${idx}`} />
            ))}
          </Box>
          <TextField
            select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            {...{ SelectProps: { style: { color: "white" } } }}
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
