import { LibJS_FileReader } from "./classes/LibJS.js"

export const titles = ["🔥 NILCIRCUIT V2 🔥", "💧 NILCIRCUIT V2 💧"];

export const Elements = {
    Container:                      document.getElementById(`website-shell`),
    Toolbar: {
        Container:                  document.getElementById(`TB`),
        NewPresetMenu: {
            Container:              document.getElementById(`TB_NP`),
            BackButton:              document.getElementById(`NP_Back`)
        },
        MainMenu: {
            Container:              document.getElementById(`TB_Main`),
            ColorSchemeButton:      document.getElementById(`MM_CS`),
            AudioPlaygroundButton:  document.getElementById(`MM_AP`),
            TestButton:             document.getElementById(`MM_Test`)
        },
        ColorSchemeMenu: {
            Container:              document.getElementById(`TB_CS`),
            BackButton:             document.getElementById(`CS_Back`),
            DarkModeButton:         document.getElementById(`CS_Dark`),
            LightModeButton:        document.getElementById(`CS_Light`),
            StrobeButton:           document.getElementById(`CS_Strobe`),
            CustomLayoutsButton:    document.getElementById(`CS_CL`)
        },
        CustomLayoutMenu: {
            Container:              document.getElementById(`TB_CL`),
            BackButton:             document.getElementById(`CL_Back`),
            MainAreaButton:         document.getElementById(`CL_MainArea`),
            TopMenuButton:          document.getElementById(`CL_TopMenu`),
            ToolbarButton:          document.getElementById(`CL_Toolbar`),
            NewPresetButton:        document.getElementById('CL_NP')
            
        },
        AudioPlaygroundMenu: {
            Container:              document.getElementById(`TB_AP`),
            BackButton:             document.getElementById(`AP_Back`),
            LoadButton:             document.getElementById(`AP_Load`),
            UnloadButton:           document.getElementById(`AP_Unload`),
            PlayButton:             document.getElementById(`AP_Play`),
            StopButton:             document.getElementById(`AP_Stop`)
        }
    },
    ContentAreas: {
        MainArea:                   document.getElementById(`MAIN_CC`),
        TestArea:                   document.getElementById(`Content_TEST`),
        AudioArea: {
            Area:                   document.getElementById(`Content_AP`),
            Canvas:                 document.getElementById(`AP_Canvas`)
        }
    },
    TopMenu: {
        Container:                  document.getElementById(`BannerContainer`)
    },
    Info:{
        Container:                  document.querySelector(`.info`),
        IP:                         document.getElementById(`ip`),
        Date:                       document.getElementById(`date`),
        Country:                    document.getElementById(`country`),
        Icon:                       document.querySelector(`.info-icon`)
    }
}

export const JS_FileReader = new LibJS_FileReader();

// FUNCTIONS
export const newDiv = () => { return document.createElement("div") };
export const newImg = () => { return document.createElement("img") };
export const newPar = () => { return document.createElement("p") };
export const newUl = () => { return document.createElement("ul") };
export const newOl = () => { return document.createElement("ol") };
export const newLi = () => { return document.createElement("li") };
export const blobToBase64 = (blob) => {}