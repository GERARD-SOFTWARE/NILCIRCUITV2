// ============================================================================
// FILE READER
// ============================================================================
export class LibJS_FileReader {
    constructor() {
        this.file = null;
        this.input = document.createElement("input");
        this.error = {
            isRaised: false,
            code: 0,
            asString: "No error",
        };
        this.input.type = "file";
        this.input.addEventListener("change", (event) => {
            const target = event.target;
            if (target?.files && target.files.length > 0) {
                this.file = target.files[0];
                this.error = {
                    isRaised: false,
                    code: 0,
                    asString: "No error"
                };
            }
            else {
                this.error = {
                    isRaised: true,
                    code: -1,
                    asString: "No file selected"
                };
            }
        });
    }
    promptFile() {
        this.input.click();
    }
    getError() {
        if (this.error.isRaised) {
            const errorSnapshot = { ...this.error };
            this.error = {
                isRaised: false,
                code: 0,
                asString: "No error"
            };
            return errorSnapshot;
        }
        return null;
    }
    getFile() {
        return this.file;
    }
    async getFileContents(format = "text") {
        if (!this.file) {
            this.error = {
                isRaised: true,
                code: -2,
                asString: "No file available"
            };
            return null;
        }
        const file = this.file;
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    this.error = {
                        isRaised: false,
                        code: 0,
                        asString: "No error"
                    };
                    resolve(event.target.result);
                }
            };
            reader.onerror = () => {
                this.error = {
                    isRaised: true,
                    code: -3,
                    asString: "Error reading file"
                };
                resolve(null);
            };
            if (format === "text") {
                reader.readAsText(file);
            }
            else if (format === "arraybuffer") {
                reader.readAsArrayBuffer(file);
            }
            else if (format === "dataurl") {
                reader.readAsDataURL(file);
            }
        });
    }
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================
export var LibJS_Array = {
    /**
     * Generate an array filled with zeros of a specified size
     */
    "zeros": (size) => {
        return Array(size).fill(0);
    },
    
    /**
     * Generate an array filled with a specific value
     */
    "fill": (size, value) => {
        return Array(size).fill(value);
    },
    
    /**
     * Generate an array of numbers from start to end (inclusive)
     */
    "range": (start, end, step = 1) => {
        const result = [];
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    }
};

// ============================================================================
// BUFFER UTILITIES
// ============================================================================
export var LibJS_Buffer = {
    /**
     * Create a writable ArrayBuffer of specified size (in bytes)
     */
    "createWritable": (size) => {
        return new ArrayBuffer(size);
    },

    /**
     * Create a typed array view for easier manipulation (Uint8Array by default)
     */
    "createTypedView": (buffer, type = "uint8") => {
        switch (type) {
            case "uint8": return new Uint8Array(buffer);
            case "uint16": return new Uint16Array(buffer);
            case "uint32": return new Uint32Array(buffer);
            case "int8": return new Int8Array(buffer);
            case "int16": return new Int16Array(buffer);
            case "int32": return new Int32Array(buffer);
            case "float32": return new Float32Array(buffer);
            case "float64": return new Float64Array(buffer);
            default: return new Uint8Array(buffer);
        }
    },
    
    /**
     * Convert ArrayBuffer to string (UTF-8)
     */
    "toString": (buffer) => {
        const view = new Uint8Array(buffer);
        const decoder = new TextDecoder();
        return decoder.decode(view);
    },
    
    /**
     * Convert string to ArrayBuffer (UTF-8)
     */
    "fromString": (str) => {
        const encoder = new TextEncoder();
        return encoder.encode(str).buffer;
    }
};


// ============================================================================
// WASM UTILITIES
// ============================================================================
export var LibJS_WASM = {
    /**
     * Load a WASM module from a URL
     */
    "load": async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Failed to fetch WASM: ${response.statusText}`);
            const buffer = await response.arrayBuffer();
            const wasmModule = await WebAssembly.instantiate(buffer);
            return wasmModule.instance;
        }
        catch (error) {
            console.error("WASM load error:", error);
            return null;
        }
    },
    
    /**
     * Load WASM module with imports
     */
    "loadWithImports": async (url, imports) => {
        try {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Failed to fetch WASM: ${response.statusText}`);
            const buffer = await response.arrayBuffer();
            const wasmModule = await WebAssembly.instantiate(buffer, imports);
            return wasmModule.instance;
        }
        catch (error) {
            console.error("WASM load error:", error);
            return null;
        }
    }
};

export var LibJS_Lexer = {
    /**
     * JavaScript Lexer - Basic tokenization of JS code
     */
    "JavaScript": class {
        constructor() {
            this.keywords = new Set([
                "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",
                "char", "class", "const", "continue", "debugger", "default", "delete", "do",
                "double", "else", "enum", "eval", "export", "extends", "false", "final",
                "finally", "float", "for", "function", "goto", "if", "implements", "import",
                "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null",
                "package", "private", "protected", "public", "return", "short", "static", "super",
                "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try",
                "typeof", "var", "void", "volatile", "while", "with", "yield"
            ]);
        }
        tokenize(code) {
            const tokens = [];
            let i = 0;
            let line = 1;
            let column = 1;
            while (i < code.length) {
                const char = code[i];
                // Whitespace
                if (/\s/.test(char)) {
                    if (char === '\n') {
                        line++;
                        column = 1;
                    }
                    else {
                        column++;
                    }
                    i++;
                    continue;
                }
                // Comments
                if (char === '/' && code[i + 1] === '/') {
                    while (i < code.length && code[i] !== '\n')
                        i++;
                    continue;
                }
                if (char === '/' && code[i + 1] === '*') {
                    i += 2;
                    while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) {
                        if (code[i] === '\n')
                            line++;
                        i++;
                    }
                    i += 2;
                    continue;
                }
                // Strings
                if (char === '"' || char === "'" || char === '`') {
                    const quote = char;
                    let value = '';
                    i++;
                    while (i < code.length && code[i] !== quote) {
                        if (code[i] === '\\')
                            i++;
                        value += code[i];
                        i++;
                    }
                    tokens.push({ type: 'string', value: quote + value + quote, line, column });
                    i++;
                    column += value.length + 2;
                    continue;
                }
                // Numbers
                if (/\d/.test(char)) {
                    let value = '';
                    const startCol = column;
                    while (i < code.length && /[\d.]/.test(code[i])) {
                        value += code[i];
                        i++;
                    }
                    tokens.push({ type: 'number', value, line, column: startCol });
                    column += value.length;
                    continue;
                }
                // Identifiers and Keywords
                if (/[a-zA-Z_$]/.test(char)) {
                    let value = '';
                    const startCol = column;
                    while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
                        value += code[i];
                        i++;
                    }
                    const type = this.keywords.has(value) ? 'keyword' : 'identifier';
                    tokens.push({ type, value, line, column: startCol });
                    column += value.length;
                    continue;
                }
                // Operators and Punctuation
                if (/[+\-*/%=<>!&|^~?:;,.()[\]{}]/.test(char)) {
                    tokens.push({ type: 'operator', value: char, line, column });
                    i++;
                    column++;
                    continue;
                }
                i++;
                column++;
            }
            return tokens;
        }
    },
    
    /**
     * C Language Lexer - Basic tokenization of C code
     */
    "C": class {
        constructor() {
            this.keywords = new Set([
                "auto", "break", "case", "char", "const", "continue", "default", "do",
                "double", "else", "enum", "extern", "float", "for", "goto", "if",
                "inline", "int", "long", "register", "restrict", "return", "short",
                "signed", "sizeof", "static", "struct", "switch", "typedef", "union",
                "unsigned", "void", "volatile", "while", "_Bool", "_Complex", "_Imaginary"
            ]);
        }
        tokenize(code) {
            const tokens = [];
            let i = 0;
            let line = 1;
            let column = 1;
            while (i < code.length) {
                const char = code[i];
                // Whitespace
                if (/\s/.test(char)) {
                    if (char === '\n') {
                        line++;
                        column = 1;
                    }
                    else {
                        column++;
                    }
                    i++;
                    continue;
                }
                // Comments
                if (char === '/' && code[i + 1] === '/') {
                    while (i < code.length && code[i] !== '\n')
                        i++;
                    continue;
                }
                if (char === '/' && code[i + 1] === '*') {
                    i += 2;
                    while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) {
                        if (code[i] === '\n')
                            line++;
                        i++;
                    }
                    i += 2;
                    continue;
                }
                // Strings
                if (char === '"' || char === "'") {
                    const quote = char;
                    let value = '';
                    i++;
                    while (i < code.length && code[i] !== quote) {
                        if (code[i] === '\\')
                            i++;
                        value += code[i];
                        i++;
                    }
                    tokens.push({ type: 'string', value: quote + value + quote, line, column });
                    i++;
                    column += value.length + 2;
                    continue;
                }
                // Numbers
                if (/\d/.test(char)) {
                    let value = '';
                    const startCol = column;
                    while (i < code.length && /[\d.xXuUlL]/.test(code[i])) {
                        value += code[i];
                        i++;
                    }
                    tokens.push({ type: 'number', value, line, column: startCol });
                    column += value.length;
                    continue;
                }
                // Identifiers and Keywords
                if (/[a-zA-Z_]/.test(char)) {
                    let value = '';
                    const startCol = column;
                    while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
                        value += code[i];
                        i++;
                    }
                    const type = this.keywords.has(value) ? 'keyword' : 'identifier';
                    tokens.push({ type, value, line, column: startCol });
                    column += value.length;
                    continue;
                }
                // Operators and Punctuation
                if (/[+\-*/%=<>!&|^~?:;,.()[\]{}#]/.test(char)) {
                    tokens.push({ type: 'operator', value: char, line, column });
                    i++;
                    column++;
                    continue;
                }
                i++;
                column++;
            }
            return tokens;
        }
    },
    
    /**
     * HTML Lexer - Basic tokenization of HTML markup
     */
    "HTML": class {
        tokenize(code) {
            const tokens = [];
            let i = 0;
            let line = 1;
            let column = 1;
            while (i < code.length) {
                // Tags
                if (code[i] === '<') {
                    const startCol = column;
                    let value = '';
                    while (i < code.length && code[i] !== '>') {
                        value += code[i];
                        i++;
                    }
                    if (i < code.length)
                        value += code[i++];
                    tokens.push({ type: 'tag', value, line, column: startCol });
                    column += value.length;
                    continue;
                }
                // Text content
                if (code[i] !== '<') {
                    const startCol = column;
                    let value = '';
                    while (i < code.length && code[i] !== '<') {
                        if (code[i] === '\n') {
                            line++;
                            column = 0;
                        }
                        value += code[i];
                        i++;
                        column++;
                    }
                    if (value.trim()) {
                        tokens.push({ type: 'text', value, line, column: startCol });
                    }
                    continue;
                }
                i++;
                column++;
            }
            return tokens;
        }
    }
};
