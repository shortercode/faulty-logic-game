const SYMBOL_LESS_THAN = "<";
const SYMBOL_GREATER_THAN = ">";
const SYMBOL_LESS_THAN_EQUAL = "<=";
const SYMBOL_GREATER_THAN_EQUAL = ">=";
const SYMBOL_EQUAL = "==";
const SYMBOL_NOT_EQUAL = "!=";

const SYMBOL_ASSIGNMENT = "=";
const SYMBOL_ADD = "+";
const SYMBOL_INCREMENT = "++";
const SYMBOL_DECREMENT = "--";
const SYMBOL_SUBTRACT = "-";
const SYMBOL_MULTIPLY = "*";
const SYMBOL_EXPONENT = "**";
const SYMBOL_DIVIDE = "/";
const SYMBOL_REMAINDER = "%";

const SYMBOL_ASSIGNMENT_ADD = "+=";
const SYMBOL_ASSIGNMENT_SUBTRACT = "-=";
const SYMBOL_ASSIGNMENT_DIVIDE = "/=";
const SYMBOL_ASSIGNMENT_MULTIPLY = "*=";
const SYMBOL_ASSIGNMENT_EXPONENT = "**=";

const SYMBOL_VARIABLE = "let";
const SYMBOL_CONSTANT = "const";

const SYMBOL_IF = "if";
const SYMBOL_ELSE = "else";
const SYMBOL_WHILE = "while";
const SYMBOL_OPEN_STATEMENT = "(";
const SYMBOL_CLOSE_STATEMENT = ")";
const SYMBOL_OPEN_BLOCK = "{";
const SYMBOL_CLOSE_BLOCK = "}";

const SYMBOL_COMMENT = "//";

const SYMBOL_LIST = [
	// comparison
	"<",
	">",
	"<=",
	">=",
	"==",
	"!=",
	// modify
	"+",
	"++",
	"--",
	"-",
	"*",
	"**",
	"/",
	"%",
	// assignment
	"=",
	"+=",
	"-=",
	"/=",
	"*=",
	"**=",
	// blocks
	"(",
	")",
	"{",
	"}"
];

function symbolMatchCount(str) {
	let hits = 0;
	let i = SYMBOL_LIST.length;
	while (i--) {
		if (SYMBOL_LIST[i].indexOf(str) === 0)
			hits++;
	}
	return hits;
}

function getExactSymbolMatch(str) {
	let i = SYMBOL_LIST.length;
	while (i--) {
		if (SYMBOL_LIST[i] === str)
			return str;
	}
}

function getType(char) {
		
	if (isLetter(char))
		return "letter";
		
	if (isNumber(char))
		return "number";
	
	if (isSpace(char))
		return "space";
	
	if (isSymbol(char))
		return "symbol";
		
	throw new Error(`Parse Error: unknown character "${char}"`);
}

class PrimativeWord {
	constructor (v) {
		this.value = v;
	}
}

class PrimativeNumber {
	constructor (v) {
		if (+v != v)
			throw new Error(`Parse Error: value ${v} is not a valid`);
		this.value = v;
	}
}

class PrimativeSymbol {
	constructor (v) {
		if (!getExactSymbolMatch(v))
			throw new Error(`Parse Error: unknown operator "${v}"`);
		this.value = v;
	}
}

const isLetter = c => /[a-z]/i.test(c);
const isNumber = c => /[0-9]/.test(c);
const isSpace = c => /\s/.test(c);
const isSymbol = c => /[<>=!+-*%/(){}].test(c)/;

class Tokeniser {
	constructor () {
		this.state = {
			buffer: [],
			previous: null,
			char: null
		};
		this.parser = null;
	}
	push (str) {
		let state = this.state;
		let buffer = state.buffer;
		let previous = state.previous;
		let lastChar = state.char;
		
		let char;
		let type;
		let value;
		
		for (let i = 0, l = str.length; i < l; i++) {
			char = str[i];
			
			type = getType(char, previous);
			
			if (type !== previous)
			{
				if (
					lastChar === "." && type === "number" ||
					previous === "number" && char === "."
				) {
					type = "number";
				}
				else {
					value = this.buffer.join("");
					this.buffer.length = 0;
					switch (previous) {
						case "number":
							this.parser.push(new PrimativeNumber(value));
							break;
						case "word":
							this.parser.push(new PrimativeWord(value));
							break;
						case "symbol":
							this.parser.push(new PrimativeSymbol(value));
							break;
					}
				}
			}
			
			this.buffer.push(char);
			lastChar = char;
			previous = type;
		}
		
		state.char = char;
		state.previous = previous;
	}
	flush () {
		this.push(" "); // should close any final blocks
	}
}

class Parser {
	constructor () {
		
	}
	push (token) {
		
	}
}

