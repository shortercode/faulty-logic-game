class DelayLogicBlock extends LogicBlock {
  constructor(delay = 1) {
    super();
    this.buffer = new Uint8ClampedArray(delay);
    this.delay = delay;
  }
  tick() {
    // not used
  }
  write() {
    // set value to last value in buffer
    this.value = this.buffer[this.delay - 1];
    // shift the whole buffer 1 index forward
    this.buffer.copyWithin(1, 0);
  }
  read() {
    // set the first value on the buffer to current input
    this.buffer[0] = this.input ? this.input.value : 0;
  }
  update() {
    // DelayLogicBlock does not have a locked state
    if (this.readState === STATE_DONE) return;
    this.write();
    this.readState = STATE_DONE;
    if (this.input) {
      this.input.update();
      this.read();
    }
  }
}