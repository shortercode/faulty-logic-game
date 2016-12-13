class ByteCodeVM {
	constructor (byteCode) {
		this.variables = new Uint8Array(256);
		this.input = Array(4);
		this.output = Array(4);
		this.instructions = new Uint8Array(this.instructions);
		
		this.run();
	}
	run () {
		const instructions = this.instructions;
		const stack = [];
		const length = instructions.length;
		const next = () => instructions[this.position++];
		const push = () => stack.push(v);
		const pop = () => stack.pop();
		const inputs = this.input;
		const outputs = this.output;
		const variables = this.variables;
		
		let position = 0;
		
		while (position < length) {
			switch (next()) {
				case 0: // Number literal
					push(next());
					break;
					
				case 1: // Add
					push(pop() + pop());
					break;
					
				case 2: // Subtract
					push(pop() - pop());
					break;
					
				case 3: // divide
					push(pop() / pop());
					break;
					
				case 4: // Multiply
					push(pop() * pop());
					break;
					
				case 5: // Modulo
					push(pop() % pop());
					break;
					
				case 6: // Greater than
					push(pop() > pop());
					break;
					
				case 7: // Less than
					push(pop() < pop());
					break;
					
				case 8: // Greater than or equal to
					push(pop() >= pop());
					break;
					
				case 9: // Less than or equal to
					push(pop() <= pop());
					break;
					
				case 10: // Equal to
					push(pop() == pop());
					break;
					
				case 11: // Not equal to
					push(pop() != pop());
					break;
					
				case 12: // Conditional go to
					let value = pop();
					let pos = pop();
					value && position = pos;
					break;
					
				case 13: // Go to
					position = pop();
					break;
					
				case 14: // Set variable
					variables[pop()] = pop();
					break;
					
				case 15: // Get variable
					push(variables[pop()]);
					break;
					
				case 16: // Print value
					console.log(pop());
					break;
					
				case 17: // Get input
					let input = pop();
					let getter = inputs[input];
					push(getter ? getter() : 0);
					break;
					
				case 18: // Set output
					let output = pop();
					let value = pop();
					output < outputs.length && outputs[output] = value;
					break;
			}
		}
	}
}