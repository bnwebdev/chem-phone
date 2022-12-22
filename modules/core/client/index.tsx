import { forwardRef } from "react";
import ReactDOM from "react-dom/client";
import { LinkProps } from "@mui/material/Link";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import {
  BrowserRouter,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import { ClientModule } from "@app/module-client";
import { Module } from "@app/module-common";

import { client } from "./graphql";
import App from "./App";
import "./index.css";

const onAppCreate = async (typeApprovedModules: Module) => {
  const modules = typeApprovedModules as ClientModule;

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  let wrappedComponent = <App modules={modules} />;

  modules.contextProviders.forEach((Wrapper) => {
    wrappedComponent = <Wrapper>{wrappedComponent}</Wrapper>;
  });

  root.render(wrappedComponent);
};

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
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

export default new ClientModule({
  onAppCreate: [onAppCreate],
  contextProvider: [
    ({ children }) => (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    ),
  ],
});
