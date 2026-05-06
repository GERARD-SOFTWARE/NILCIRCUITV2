import { Elements } from "./globalVariables.js";
import { Table, AreaBuilder, SubMenu } from "./classes/UI.js";

const Container = Elements.Toolbar.MainMenu.Container;

const ThemeButtonMenu = new SubMenu(Elements.Toolbar.MainMenu.Container, "Theme", "TB_Theme");

const ThemeScaleMenu = new SubMenu(ThemeButtonMenu.getContainer(), "Theme Scaling", "THEME_Scale");