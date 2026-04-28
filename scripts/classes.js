export class Table {
    _table = [];
    constructor(width, height) {
        for (let row = 0; row < height; row++) {
            this._table.push([]);
            for (let col = 0; col < width; col++) {
                this._table[row].push("");
            }
        }
    }

    setEntry(x, y, text)
    {
        this._table[x][y] = text;
    }

    getEntry(x, y)
    {
        return this._table[x][y];
    }

    dumpEntry(x, y)
    {
        console.log(`Entry at ${x}, ${y}: ${this._table[x][y]}`);
    }
}

export class AreaBuilder {
    /*
        NOTES:
        It is standard for this class to return any elements it creates through functions to the user
        for them to use as variables;
    */
    _parent;
    _elements = [];
    constructor (area)
    {
        this._parent = area;
    }

    pushAppend(element)
    {
        this._elements.push(element);
        this._parent.appendChild(element);
    }

    appendLine(text) {
        let t = document.createElement("p");
        t.innerText = text;
        this.pushAppend(t);
        return t; 
    }

    appendInfo(text) {
        let t = this.appendLine('');
        t.innerHTML = `<b>[INFO] ${text}</b>`
        return t;
    }

    appendWarning(text) {
        let t = this.appendLine('');
        t.innerHTML = `<b>[WARN] ${text}</b>`
        t.style.color = "#ffb300";
        return t;
    }

    appendError(text) {
        let t = this.appendLine('');
        t.innerHTML = `<b>[ERROR] ${text}</b>`
        t.style.color = "#ff0000";
        throw new Error(text);
    }

    appendSubArea() {
        let t = document.createElement("div");
        this.pushAppend(t);
        return t;
    }

    appendList(title, ...args) {
        let t = document.createElement("ul");
        t.innerText = title;
        for (const text in args) {
            let l = document.createElement("li");
            l.innerText = text;
            t.appendChild(l);
        }
        this.pushAppend(t);
        return t;
    }

    appendTable(table) {
        let w = table._table.length;
        let h = 0;
        if (w > 0) {
            h = table._table[0].length
        }

        let t = document.createElement("table");
        for (let row = 0; row < h; row += 1)
        {
            let tr = document.createElement("tr");

            for (let col = 0; col < w; col += 1)
            {
                let td = document.createElement("td");
                td.textContent = table.getEntry(col, row);
                tr.appendChild(td);
                table.dumpEntry(col, row)
            }
            t.appendChild(tr);
        }
        this.pushAppend(t);
        return t;
    }

    appendImage(imageUrl, w = 100, h = 100) {
        let t = document.createElement("img");
        t.src = imageUrl;
        t.style.width = `${w}px`;
        t.style.height = `${h}px`;
        this.pushAppend(t);
        return t
    }

    appendAudio(audioUrl) {
        let t = document.createElement("audio");
        t.src = audioUrl;
        this.pushAppend(t);
        return {
            element: t,
            url: audioUrl,
            play: () => {t.play()},
            pause: () => {t.pause()},
            restart: () => {t.currentTime = 0},
            volume: (vol) => {t.volume = vol/100}
        };
    }

    getElements() {
        return this._elements;
    }

    getIndexOfElement(element) {
        return this._elements.findIndex(element);
    }
}

export class SubMenu {
    _parent;
    _container;
    title;
    id;
    buttons = {};
    constructor(parentElement, title, id) {
        this._parent = parentElement;
        this._container = document.createElement("div");
        this._container.classList = `menu submenu`;
        this._container.id = id;
        this.id = id;
        this.title = document.createElement(`header`);
        this.title.innerText = title;
        this.title.classList = `menu-header`;
    }

    addButton(title, id) {
        const idNew = `${this.id}_${id.replace(" ", "-")}`;
        let button = document.createElement("button");
        button.innerText = title;
        button.id = idNew;
        this._container.appendChild(button);
        this.buttons[idNew] = button;
        return button;
    }

    bindButton(id, callback) {
        let button = this.buttons[`${this.id}_${id.replace(" ", "-")}`]
        if (button != undefined && button != null) {
            return button.addEventListener('click', callback);
        }
        return Error("No button belonging to this submenu containing that id."); // Return an error, just in case someone calls without a real id
    }

    
}