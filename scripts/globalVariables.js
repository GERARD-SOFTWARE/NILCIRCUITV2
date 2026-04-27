export const titles = ["🔥 NILCIRCUIT V2 🔥", "💧 NILCIRCUIT V2 💧"];

export const Elements = {
    Container:                      document.getElementById(`website-shell`),
    Toolbar: {
        Container:                  document.getElementById(`TB`),
        MainMenu: {
            Container:              document.getElementById(`TB_Main`),
            ColorSchemeButton:      document.getElementById(`MM_CS`),
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
            ToolbarButton:          document.getElementById(`CL_Toolbar`)
        }
    },
    ContentAreas: {
        MainArea:         document.getElementById(`MAIN_CC`),
        TestArea:         document.getElementById(`test`)
    },
    TopMenu: {
        Container:        document.getElementById(`BannerContainer`)
    },
    Info:{
        Container: document.querySelector(`.info`),
        IP: document.getElementById(`ip`),
        Date: document.getElementById(`date`),
        Country: document.getElementById(`country`),
        Icon: document.querySelector(`.info-icon`)
    }
}


// FUNCTIONS
export const newDiv = () => { return document.createElement("div") };
export const newImg = () => { return document.createElement("img") };
export const newPar = () => { return document.createElement("p") };
export const newUl = () => { return document.createElement("ul") };
export const newOl = () => { return document.createElement("ol") };
export const newLi = () => { return document.createElement("li") };