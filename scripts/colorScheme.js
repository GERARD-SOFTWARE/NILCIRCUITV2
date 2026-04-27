import {
    Elements
} from './globalVariables.js'


const submenu = document.getElementsByClassName('submenu')[0];
const toolbarMainMenu = document.getElementsByClassName('main-menu')[0];


Elements.Toolbar.MainMenu.ColorSchemeButton.addEventListener('click', () => {
    Elements.Toolbar.MainMenu.Container.style.transform = "translateX(-250px)";
    Elements.Toolbar.ColorSchemeMenu.Container.style.transform = "translateX(0%)";
});


Elements.Toolbar.ColorSchemeMenu.CustomLayoutsButton.addEventListener('click', () => {
    Elements.Toolbar.ColorSchemeMenu.Container.style.transform = "translateX(-250px)";
    Elements.Toolbar.CustomLayoutMenu.Container.style.transform = "translateX(0%)";
});

Elements.Toolbar.ColorSchemeMenu.BackButton.addEventListener('click', () => {
    Elements.Toolbar.ColorSchemeMenu.Container.style.transform = "translateX(250px)";
    Elements.Toolbar.MainMenu.Container.style.transform = "translateX(0%)";
});

Elements.Toolbar.ColorSchemeMenu.LightModeButton.addEventListener('click', () => {
    document.body.classList = "light-mode";
    document.body.style.backgroundColor = "white";
});

Elements.Toolbar.ColorSchemeMenu.DarkModeButton.addEventListener('click', () => {
    document.body.classList = "dark-mode";
    document.body.style.backgroundColor = "black";
});



let strobeToggled = false;
let STROBE_EVENT;
let currTheme = document.body.classList;
Elements.Toolbar.ColorSchemeMenu.StrobeButton.addEventListener('click', () => {
    if (!strobeToggled) {
        strobeToggled = true;
        STROBE_EVENT = setInterval(() => {
            if (currTheme == "dark-mode") {
                currTheme = "light-mode";
                document.body.classList = "light-mode";
                document.body.style.backgroundColor = "white";
            } else {
                currTheme = "dark-mode";
                document.body.classList = "dark-mode";
                document.body.style.backgroundColor = "black";
            }
        }, 100)
    } else {
        strobeToggled = false;
        clearInterval(STROBE_EVENT);
    }
})