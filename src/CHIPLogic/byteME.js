class Stack {
	/**
	 * @param Class Type
	 * @param [Array|Integer] input
	 */
	constructor(Type, input) {
		this.elements = new Type(input); // expects typed array!
		this.length = this.elements.length;
		this.position = 0;
	}
	item(index) {
		return this.elements[index];
	}
	push(number) {
		this.elements[this.position] = number;
		this.position++;
		if (this.position >= this.length) {
			this.position = this.length - 1;
			throw "Did exceed length of stack";
		}
	}
	pop() {
		const P = this.position--;
		if (P < 0) {
			this.position = 0;
			throw "Stack is empty, unable to pop value";
		}
		const element = this.elements[P];
		this.elements[P] = 0;
		return element;
	}
	next() {
		if (this.position === this.length)
			throw "Reached end of stack, unable to return next value";
		return this.elements[this.position++];
	}
	clear() {
		this.elements.fill(0);
		this.position = 0;
	}
}

class ByteCode {
	constructor (BYTE_CODE, MEM_SIZE) {
		// intialised to the size of the instruction list
		this.instructionList = new Stack(Float64Array, BYTE_CODE);
		// max calculation stack size
		this.arithmeticStack = new Stack(Float64Array, 32);
		this.variableMap = new Map();
		this.labelMap = new Map();
		this.functionMap = new Map();
		this.executionPosition = 0;
		// max call stack size
		this.returnPositions = new Stack(Uint8Array, 10);
		this.shell = this._createShell();
	}
	
	execute () {
		const LENGTH = this.length;
		this.executionPosition = 0;
		while (this.executionPosition < LENGTH) {
			this.shell();
		}
	}
	
	debug () {
		const LENGTH = this.length;
		this.executionPosition = 0;
		while (this.executionPosition < LENGTH) {
			try {
				this.getCurrentInstruction
				this.shell();
			} catch (e) {
				console.error(e);
				break;
			}
		}
	}
	
	_getCurrentInstruction () {
		return this.instructionList.item(this.executionPosition);
	}
	
	_createShell () {
		return ((POP, PUSH, NEXT, ALLOC, GET, SET, LABEL, GOTO, RUN, RETURN) => {
			const METHOD = {
				0x0:	() => PUSH(NEXT()), // NUMBER LITERAL
				0x1:	() => PUSH(POP() + POP()), // ADD
				0x2:	() => PUSH(POP() - POP()), // SUB
				0x3:	() => PUSH(POP() * POP()), // MULT
				0x4:	() => PUSH(POP() / POP()), // DIV
				0x5:	() => console.log(POP()), // PRINT
				0x6:	() => ALLOC.set(POP(), POP()), // LET
				0x7:	() => PUSH(ALLOC.get(POP())), // GET
				0x8:	() => LABEL(POP()), // LABL
				0x9:	() => GOTO(POP()), // GOTO
				0xA:	() => RUN(POP()), // RUN
				0xB: 	() => POP() !== POP() && NEXT(), // IF --- skips next line if false
				0xC:	() => POP() === POP() && NEXT(), // IFN --- skips next line if true
				0xD: 	() => {const D = POP() - POP(); PUSH( D > 0 ? 1 : D < 0 ? -1 : 0 )}, // COMP --- returns either -1/0/1
				0xE: 	() => {LABEL(POP()); while (NEXT() !== 0xF) {}; }, // METHOD_MARKER
				0xF: 	() => RETURN()
			};
			return () => METHOD[NEXT()];
		})(
			this.arithmeticStack.pop,
			this.arithmeticStack.push,
			this.instructionList.next,
			this.GET,
			this.SET,
			(index) => this.labelMap.set(index, this.executionPosition), // we won't expose this one to the exterior class, as jumps should only be performed by the byte code
			this.GOTO,
			this.RUN,
			this.RETURN
		);
	}
	
	GET (index) {
		if (!this.variableMap.has(index))
			throw "Reference error, variable " + index + " does not exist";
		return this.variableMap.get(index);
	}
	
	SET (index, value) {
		this.variableMap.set(index, value);
	}
	
	RUN (index) {
		if (!this.labelMap.has(index))
			throw "Cannot RUN FUNCTION " + index + " as it does not exist";
		this.returnPosition.push(this.executionPosition);
		this.executionPosition = this.labelMap.get(index);
	}
	
	GOTO (index) {
		if (!this.labelMap.has(index))
			throw "Cannot GOTO LABEL " + index + " as it does not exist";
		this.executionPosition = this.labelMap.get(index);
	}
	
	RETURN () {
		if (this.returnPosition.position === 0)
			this.executionPosition = this.length; // not in a function, so we should exit the program
		else
			this.executionPosition = this.returnPosition.pop();
	}
	
	get length () {
		return this.INSTRUCTION_LIST.length;
	}
	
}

// Fibonacci sequence program
let i = 20;
let a = 0;
let b = 1;
let tmp = 0;

while (i > 0)
{
	tmp = b;
	b = b + a;
	a = tmp;
	console.log(b);
	i = i - 1;
}

LET 0 20
LET 1 0
LET 2 1
LET 3 0

LABEL 0
LET 3 (GET 2)
LET 2 (ADD (GET 2) (GET 1))
LET 1 (GET 3)
PRINT (GET 2)
LET 0 (SUB (GET 0) 1)
IFN 0 0
GOTO 0

let MAP = new Map();
let set = (k, v) => MAP.set(k, v);
let get = k => MAP.get(k);

set(0, 20);
set(1, 0);
set(2, 1);
set(3, 0);

while(1) {
	set(3, get(2));
	set(2, get(2) + get(1));
	set(1, get(3));
	console.log(get(2));
	set(0, get(0) - 1);
	if (get(0) == 0)
		break;
}

function ByteMe (input) {
	const INSTRUCTIONS = input;
	const STACK = [];
	const ALLOC = new Map();
	const LABEL = new Map();
	const INSTRUCTION_LENGTH = INSTRUCTIONS.length;
	
	const NEXT = () => INSTRUCTIONS[position++];
	const POP = () => {
		const val = STACK.pop();
		console.log("pop = " + val);
		return val;
	}
	const PUSH = a => STACK.push(a);
	const EXEC = m => METH[m]();
	const CLEAR = () => STACK.length = 0;
	
	let position = 0;
	let instruction;
	
	const METH = {
		0x0:	() => PUSH(NEXT()), // NUMBER LITERAL
		0x1:	() => PUSH(POP() + POP()), // ADD
		0x2:	() => PUSH(POP() - POP()), // SUB
		0x3:	() => PUSH(POP() * POP()), // MULT
		0x4:	() => PUSH(POP() / POP()), // DIV
		0x5:	() => console.log(POP()), // PRINT
		0x6:	() => ALLOC.set(POP(), POP()), // LET
		0x7:	() => PUSH(ALLOC.get(POP())), // GET
		0x8:	() => LABEL.set(POP(), position), // LABL
		0x9:	() => position = LABEL.get(POP()), // GOTO
		0xA:	() => CLEAR() // CLEAR
	};
	
	const METH_NAMES = {
		0x0: "NUMBER",
		0x1: "ADD",
		0x2: "SUB",
		0x3: "MULT",
		0x4: "DIV",
		0x5: "PRINT",
		0x6: "LET",
		0x7: "GET",
		0x8: "LABEL",
		0x9: "GOTO",
		0xA: "CLEAR"
	}
	
	while (position < INSTRUCTION_LENGTH) {
		instruction = NEXT();
		console.log(METH_NAMES[instruction]);
		EXEC(instruction);
	}
}

function ByteThis (str) {
	let BYTE_CODE;
	console.time("compilation");
	try {
		BYTE_CODE = TOKENZR(str).split(',');
		console.timeEnd("compilation");
		console.log("Success!");
	} catch (e) {
		console.timeEnd("compilation");
		console.error("Failure", e);
	}
	return BYTE_CODE;
}
const isLetter = c => /[a-z]/i.test(c);
const isNumber = c => !isNaN(c) && !isSpace(c);
const isBracket = c => /[()]/.test(c);
const isSpace = c => /\s/.test(c);

function TOKENZR (str) {
	const blocks = [];
	let method;
	let argA;
	let argB;
	let args = 0;
	let char;
	let current = '';
	let depth = 0;
	for (let i = 0, l = str.length; i < l; i++)
	{
		char = str[i];
		if (!method) // method detection block, much simpler!
		{
			if (current.length === 0 && isSpace(char)) // padding between arguments and method
				continue;
				
			if (isLetter(char)) // only allow letters
				current += char;
			else if (isSpace(char)) { // space delimits to arguments, so end of method
				if (!current in METH)
					throw "Unknown method";
				method = METH[current];
				current = "";
			} else
				throw "Syntax error"; // anything else shouldnt be here
		}
		else if (!argA || !argB) // works for both arguments
		{
			if (current.length === 0 && isSpace(char)) // padding between arguments and method
				continue;
				
			if (isBracket(char)) // nesting character
			{
				current += char;
				depth += char === "(" ? 1 : -1; // increase or decrease nesting level
				if (depth === 0) { // end of nest
					if (argA) // already has argument A so we're looking for B
						argB = TOKENZR(current.slice(1, -1)); // recurse the nested component
					else
						argA = TOKENZR(current.slice(1, -1)); // recurse the nested component
					args++;
					current = "";
				} else if (depth < 0) { // more closing brackets than opening brackets, definitely wrong!
					throw "Syntax error";
				}
			}
			else if (depth > 0) // in nest, so don't process
			{
				current += char;
			}
			else if (isNumber(char)) // non nesting argument
			{
				current += char;
				if (i + 1 === l) // last value, due to the lack of delimiter character this value would be shown as a syntax error without this catch
				{
					if (argA) // already has argument A so we're looking for B
						argB = 0x0 + ',' + current; // number literal
					else
						argA = 0x0 + ',' + current; // number literal
						args++;
					current = "";
				}
			}
			else if (isSpace(char)) // end of non nesting argument
			{
				if (argA) // already has argument A so we're looking for B
					argB = 0x0 + ',' + current; // number literal
				else
					argA = 0x0 + ',' + current; // number literal
					args++;
				current = "";
			}
			else // something that shouldnt be there, probably puntuation or letters in a numeric area
				throw "Syntax error";
		}
		if (method && method.arguments === args)
		{
			console.info(`Adding block(
			Method: ${method.pointer}
			Argument 1: ${argA}
			Argument 2: ${argB}
			)`);
			if (argB)
				blocks.push(argB + ',' + argA + ',' + method.pointer);
			else if (argA)
				blocks.push(argA + ',' + method.pointer);
			method = null;
			argA = null;
			argB = null;
			args = 0;
		}
	}
	if (current) // we have some characters left in the argument buffer, probably means theres an unclosed bracket somewhere
		throw "Syntax error";
	return blocks.join(',' + 0xA + ','); // delimit blocks with stack clears
}
//const TOKENZR = /(\w+)(?: +(\([]+\)|\d+)){1,2}/g;
const METH = {
	//NUMBER: {0x0,
	ADD: {
		pointer: 0x1,
		arguments: 2
	},
	SUB: {
		pointer: 0x2,
		arguments: 2
	},
	MULT: {
		pointer: 0x3,
		arguments: 2
	},
	DIV: {
		pointer: 0x4,
		arguments: 2
	},
	PRINT: {
		pointer: 0x5,
		arguments: 1
	},
	LET: {
		pointer: 0x6,
		arguments: 2
	},
	GET: {
		pointer: 0x7,
		arguments: 1
	},
	LABL: {
		pointer: 0x8,
		arguments: 1
	},
	GOTO: {
		pointer: 0x9,
		arguments: 1
	}
	/*
	CLEAR: {
		pointer: 0xA,
		arguments: 0
	}
	*/
};
/*

ADD 2 4
DIVIDE 3 2
LET 1 (DIVIDE 6 2)
DIV (ADD 2 6) (MULT 2 (DIV 16 4))

A = 6 / 2
COMMAND $1 $2

$2 $1 $N

4 2 ADD
2 3 DIVIDE
2 6 DIVIDE 1 LET
*/

const STATE_METHOD = 0x1;
const STATE_ARGUMENT = 0x2;
const STATE_CLOSED = 0x3;

class Statement {
	constructor ()
	{
		this.state = STATE_METHOD;
		this.method = null;
		this.args = [];
	}
	
	setMethod (name)
	{
		this.method = LookupMethod(name);
		this.state = STATE_ARGUMENT;
	}
	
	addArgument (value)
	{
		
	}
	
	insert (char)
	{
		// parse incoming data according to current state
		switch (this.state)
		{
			case STATE_METHOD:
				parseMethod(current, char);
				break;
			case STATE_ARGUMENT:
				parseArgument(current, char);
				break;
			case STATE_CLOSED:
				break;
		}
	}
	
	close ()
	{
		//
	}
	
	toString ()
	{
		/*
			arguments will either be strings or Statements,
			appending "" will trigger the toString method on Statements ( recursive )
			
			values delimited with ","
			
			typically returns "argument2, argument1, method"
		*/
		return this.args.map(a => a.toString())
			.reverse()
			.join(",")
			+ "," + this.method;
	}
	
	parseMethod (current, char)
	{
		if (current.length === 0 && isSpace(char)) // padding between arguments and method
			return current;
			
		if (isLetter(char)) // only allow letters
			current += char;
		else if (isSpace(char)) { // space delimits to arguments, so end of method
			this.setMethod();
		} else
			throw "Syntax error"; // anything else shouldnt be here
	}
	
	parseArgument (statement, char)
	{
		
	}
}

function LookupMethod (string)
{
	
}