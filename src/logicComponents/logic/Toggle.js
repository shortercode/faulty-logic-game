class ToggleLogicBlock extends LogicBlock {
  constructor(power = MAX_SIGNAL, active) {
    super();
    this.power = power;
    this.value = active ? power : 0;
    this.lastValue = 0;
  }
  tick() {
    let value = this.input ? this.input.value : 0;
    if (value > this.lastValue) {
      this.value = this.value ? 0 : this.power;
    }
    this.lastValue = value;
  }
}