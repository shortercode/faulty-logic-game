class TimerLogicBlock extends LogicBlock {
  constructor(interval = 10) {
    super();
    this.interval = interval;
    this.counter = interval;
  }
  tick() {
    let input = this.input && this.input.value;
    this.counter = input ? this.interval : this.counter - 1;
    this.value = 0;
    if (this.counter <= 0) {
      this.value = MAX_SIGNAL;
      this.counter = this.interval;
    }
  }
}