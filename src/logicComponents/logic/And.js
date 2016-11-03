class AndLogicBlock extends LogicBlock {
  constructor() {
    super();
    this.input = [];
  }
  tick() {
    var state = true;
    for (let input of this.input) {
      if (input.value === 0) {
        state = false;
        break;
      }
    }
  }
}