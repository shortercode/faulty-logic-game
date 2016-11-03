class SumLogicBlock extends LogicBlock {
  constructor() {
    super();
    this.input = [];
  }
  tick() {
    var value = 0;
    for (let input of this.input) {
      value += input.value;
    }
    this.value = Math.min(MAX_SIGNAL, value);
  }
}