import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";

import "./index.css";

import logo from "../../assets/icons/giphy-logo.svg";

const Navbar = () => {
  return (
    <>
      <AppBar>
        <AppBarSpacer style={{ width: 4 }} />

        <AppBarSection>
          <img src={logo} alt="GIPHY logo" />
          <h1 className="title">GIPHY API</h1>
        </AppBarSection>

        <AppBarSection>
          <span>Made by Staanb</span>
        </AppBarSection>

      </AppBar>
    </>
  );
};

export default Navbar;
