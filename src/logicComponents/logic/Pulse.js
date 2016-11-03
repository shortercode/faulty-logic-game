class PulseLogicBlock extends LogicBlock {
  constructor(duration = 1) {
    super();
    this.duration = 1;
    this.counter = 0;
    this.value = 0;
    this.lastValue = 0;
  }
  tick() {
    let value = this.input ? this.input.value : 0;

    this.counter = this.counter == 0 ? 0 : this.counter - 1;
    
    if (value > this.lastValue) {
      this.counter = this.duration;
    }

    this.value = this.counter > 0 ? MAX_SIGNAL : 0;
    this.lastValue = value;
  }
}