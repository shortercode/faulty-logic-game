class NotLogicBlock extends LogicBlock {
  constructor(threshold = 0) {
    super();
    this.threshold = threshold;
  }
  tick() {
    this.value = !this.input || this.input.value < threshold ? MAX_SIGNAL : 0;
  }
}