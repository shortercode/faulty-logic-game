class Vector {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  set (x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }
  copy (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  sub (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  add (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  multiply (s) {
    this.x *= s;
    this.y *= s;
    return this;
  }
  inverse () {
	this.x = -this.x;
	this.y = -this.y;
	return this;
  }
  rotate (sin, cos) {
	let x =
	let y =
	this.x = x;
	this.y = y;
  }
  divide (s) {
	s = 1 / s;
	this.x *= s;
    this.y *= s;
    return this;
  }
  normalise () {
    let s = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
	this.x *= s;
    this.y *= s;
    return this;
  }
  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  lengthSq () {
    return this.x * this.x + this.y * this.y;
  }
  distanceTo (v) {
	let dx = v.x - this.x;
	let dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  distanceToSq (v) {
	let dx = v.x - this.x;
  	let dy = v.y - this.y;
    return dx * dx + dy * dy;
  }
  static add (array, v) {
	for (let vec of array) {
  	  vec.add(v);
  	}
  }
  static rotate (array, angle) {
	let sin = Math.sin(angle);
	let cos = Math.cos(angle);
	for (let vec of array) {
	  vec.rotate(sin, cos);
	}
  }
}