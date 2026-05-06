import { Elements } from './globalVariables.js'

// BUTTONS

const BackButton = Elements.Toolbar.NewPreset.BackButton;
const NewPresetButton = Elements.Toolbar.NewPreset.NewPresetButton;

// CONTAINERS

const NewPresetContainer = Elements.Toolbar.NewPresetMenu.Container;
const CustomLayoutMenu = Elements.Toolbar.CustomLayoutMenu.Container;

NewPresetButton.addEventListener("click", () => {
    CustomLayoutMenu.style.transform = "translateX(-250px)";
    NewPresetContainer.style.transform = "translateX(0%)";
})

BackButton.addEventListener("click", () => {

})