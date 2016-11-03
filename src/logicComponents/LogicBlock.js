import * from "./constants";

const BLOCKS = [];
class LogicBlock {
  constructor() {
    this.value = 0;
    this.input = null;
    this.lockWarning = false;
    this.readState = STATE_READY;
    BLOCKS.push(this);
  }
  tick() {
    this.value = this.input ? this.input.value : 0;
  }
  update() {
    // if the state is LOCKED then we're in a read loop, and should just
    // return the previous value ( for instance a gate reading itself )
    if (this.readState === STATE_DONE) return;
    if (this.readState === STATE_LOCKED) {
      this.lockWarning = true;
      return;
    }
    this.lockWarning = false;
    this.readState = STATE_LOCKED;
    if (this.input) {
      // trigger
      this.input.update();
      this.tick();
    }
    this.readState = STATE_DONE;
  }
  static update() {
    for (let block of BLOCKS) {
      // reset the block states for current tick
      block.readState = STATE_READY;
    }
    for (let block of BLOCKS) {
      // likely most blocks will not require an update, they will just bail
      block.update();
    }
    // rendering can be dealt with outside of this loop, so we can separate
    // the logical component from the rendering
  }
}