class OrLogicBlock extends LogicBlock {
  constructor() {
    super();
    this.input = [];
  }
  tick() {
    var state = false;
    for (let input of this.input) {
      if (input.value > 0) {
        state = true;
        break;
      }
    }
  }
}