import { Elements } from "./globalVariables.js";
import { Table, AreaBuilder } from "./classes.js";

const builder = new AreaBuilder(Elements.ContentAreas.TestArea);

let table = new Table(2, 2);
table.setEntry(0, 0, "Name")
table.setEntry(1, 0, "Age")
table.setEntry(0, 1, "Test Testingson")
table.setEntry(1, 1, "300")

Elements.Toolbar.MainMenu.TestButton.addEventListener('click', (event) => {
    builder.appendLine("Test text");
    builder.appendInfo("Test info");
    builder.appendWarning("Test warning");
    try {
        builder.appendError("Test error");
    } catch (e) {
        console.log(`Caught error: ${e}`);
    }
    
    let audio = builder.appendAudio("");

    builder.appendList("Test List", "item", "another item", "more items");
    builder.appendImage("https://placehold.co/10");
    builder.appendTable(table);
});