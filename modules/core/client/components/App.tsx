import { FC, forwardRef } from "react";
import { BrowserRouter, Switch, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

import { ClientModule } from "@app/module-client";

import NavBar from "./NavBar";

type Props = {
    modules: ClientModule
}

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const App: FC<Props> = ({ modules }) => {
    const {leftNavItems, rightNavItems} = modules

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NavBar leftItems={leftNavItems} rightItems={rightNavItems}></NavBar>
                <Container>
                    <Switch>
                        {modules.routes}
                    </Switch>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;