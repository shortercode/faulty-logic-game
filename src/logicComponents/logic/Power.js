class PowerLogicBlock extends LogicBlock {
  constructor(power = MAX_SIGNAL) {
    super();
    this.value = power;
  }
  tick() {
    // don't read input here, value is fixed level
  }
  update() {
    this.readState = STATE_DONE;
    // don't perform a lock / tick call, value is fixed and has no input
  }
}