class PulseLogicBlock extends LogicBlock {
	constructor (duration = 1, strength = MAX_SIGNAL) {
		super();
		this.duration = duration;
		this.counter = 0;
		this.lastInputValue = 0;
	}
	tick () {
		var value = this.input ? this.input.value : 0;
	}
}