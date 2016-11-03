class XorLogicBlock extends LogicBlock {
  constructor() {
    super();
    this.input = [];
  }
  tick() {
    var state = false;
    for (let input of this.input) {
      if (input.value > 0) {
        if (state) {
          state = false;
          break;
        }
        else
          state = true;
      }
    }
  }
}