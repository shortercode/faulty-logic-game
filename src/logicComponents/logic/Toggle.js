class ToggleLogicBlock extends LogicBlock {
	constructor (power = MAX_SIGNAL, active) {
		super();
		this.power = power;
		this.value = active ? power : 0;
	}
	tick () {
		// do nothing
	}
	update () {
		// ToggleLogicBlock does not have a locked state
		if (this.readState === STATE_DONE)
			return;
		this.readState = STATE_DONE;
		if (this.input) {
			this.input.update();
			this.tick();
		}
	}
}