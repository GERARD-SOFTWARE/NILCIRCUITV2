import { Elements } from './globalVariables.js'

const BackButton = Elements.Toolbar.CustomLayoutMenu.BackButton; 
const CustomLayoutMenu = Elements.Toolbar.CustomLayoutMenu.Container;
const ColorSchemeMenu = Elements.Toolbar.ColorSchemeMenu.Container;
const TopMenuButton = Elements.Toolbar.CustomLayoutMenu.TopMenuButton;
const MainAreaButton = Elements.Toolbar.CustomLayoutMenu.MainAreaButton;
const ToolbarButton = Elements.Toolbar.CustomLayoutMenu.ToolbarButton;

BackButton.addEventListener('click', () => {
    CustomLayoutMenu.style.transform = "translateX(250px)";
    ColorSchemeMenu.style.transform = "translateX(0%)";
})

const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.accept = 'image/*'

let targetSection = null

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    if (!file || !targetSection) return
    const url = URL.createObjectURL(file)
    targetSection.style.backgroundImage = `url(${url})`
    console.log(url)
})


MainAreaButton.addEventListener('click', () => {
    targetSection = Elements.ContentAreas.MainArea
    fileInput.click()
})

TopMenuButton.addEventListener('click', () => {
    targetSection = Elements.TopMenu.Container;
    console.warn(Elements.TopMenu.Container);
    fileInput.click()
})

ToolbarButton.addEventListener('click', () => {
    targetSection = Elements.Toolbar.Container
    fileInput.click()
})