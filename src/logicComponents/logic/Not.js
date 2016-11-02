class NotLogicBlock extends LogicBlock {
	tick () {
		this.value = !this.input || !this.input.value ? MAX_SIGNAL : 0;
	}
}