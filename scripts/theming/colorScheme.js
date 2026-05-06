import {
    Elements
} from '../globalVariables.js'

import {
    SubMenu
} from '../classes/UI.js'



const submenu = document.getElementsByClassName('submenu')[0];
const toolbarMainMenu = document.getElementsByClassName('main-menu')[0];


// Elements.Toolbar.MainMenu.ColorSchemeButton.addEventListener('click', () => {
//     Elements.Toolbar.MainMenu.Container.style.transform = "translateX(-250px)";
//     Elements.Toolbar.ColorSchemeMenu.Container.style.transform = "translateX(0%)";
// });


// Elements.Toolbar.ColorSchemeMenu.CustomLayoutsButton.addEventListener('click', () => {
//     Elements.Toolbar.ColorSchemeMenu.Container.style.transform = "translateX(-250px)";
//     Elements.Toolbar.CustomLayoutMenu.Container.style.transform = "translateX(0%)";
// });

const ColorSchemeMenu = new SubMenu(Elements.Toolbar.MainMenu.Container, "Color Scheme", "TB_CS");
ColorSchemeMenu.addAndBindButton("Dark Mode", "DarkMode", ()=>{
    document.body.classList = "dark-mode";
    document.body.style.backgroundColor = "black";
    console.log("Dark mode");
});

ColorSchemeMenu.addAndBindButton("Light Mode", "LightMode", ()=>{
    document.body.classList = "light-mode";
    document.body.style.backgroundColor = "white";
    console.log("Light mode");
})

let strobe = {
    "toggled": false,
    "event": null,
    "currTheme": document.body.classList
}
ColorSchemeMenu.addAndBindButton("Toggle Strobe Mode", "StrobeMode", () => {
    if (!strobe.toggled) {
        strobe.toggled = true;
        strobe.event = setInterval(() => {
            if (strobe.currTheme == "dark-mode") {
                strobe.currTheme = "light-mode";
                document.body.classList = "light-mode";
                document.body.style.backgroundColor = "white";
            } else {
                strobe.currTheme = "dark-mode";
                document.body.classList = "dark-mode";
                document.body.style.backgroundColor = "black";
            }
        }, 100)
    } else {
        strobe.toggled = false;
        clearInterval(strobe.event);
    }
});

ColorSchemeMenu.addButton("Custom Layouts", "CustomLayouts");