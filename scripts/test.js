import { Elements } from "./globalVariables.js";
import { Table, AreaBuilder, SubMenu } from "./classes/UI.js";
import { LibJS_FileReader, LibJS_Buffer, LibJS_Array, LibJS_Lexer } from "./classes/LibJS.js";

const JS_FileReader = new LibJS_FileReader();
const JS_Lexer      = new LibJS_Lexer.JavaScript();

const menu = new SubMenu(Elements.Toolbar.MainMenu.Container, "Testing Menu", "testMenuId");

menu.addAndBindButton("Load File", "loadFile", () => {
    JS_FileReader.promptFile();
});

menu.addAndBindButton("Dump File", "dumpFile", () => {
    if (JS_FileReader.file) {
        JS_FileReader.getFileContents("arraybuffer")
        .then((v) => {
            console.log(v);
        })
    }
});