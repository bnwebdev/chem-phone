import { FC } from "react";
import { Switch } from "react-router-dom";
import { Container } from "@mui/material";

import { ClientModule } from "@app/module-client";

import NavBar from "./components/NavBar";

type Props = {
  modules: ClientModule;
};

const App: FC<Props> = ({ modules }) => {
  const { leftNavItems, rightNavItems } = modules;

  return (
    <>
      <NavBar leftItems={leftNavItems} rightItems={rightNavItems}></NavBar>
      <Container>
        <Switch>{modules.routes}</Switch>
      </Container>
    </>
  );
};

export default App;
