class Rectangle {
	constructor (left, top, width, height) {
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
	get x () {
		return this.left;
	}
	get y () {
		return this.top;
	}
	set x (v) {
		this.left = v;
	}
	set y (v) {
		this.top = v;
	}
	get right () {
		return this.left + this.width;
	}
	get bottom () {
		return this.top + this.height;
	}
	position (left, top) {
		this.left = left;
		this.top = top;
		return this;
	}
	translate (x, y) {
		this.left += x;
		this.top += y;
		return this;
	}
	resize (width, height) {
		this.width = width;
		this.height = height;
		return this;
	}
	scale (s) {
		this.width *= s;
		this.height *= s;
		return this;
	}
	contains (v) {
		return this.left < v.x &&
			this.right > v.x &&
			this.top < v.y &&
			this.bottom > v.y;
	}
	touches (r) {
		return !(
			this.left > r.right ||
			this.right < r.left ||
			this.top > r.bottom ||
			this.bottom < r.top
		);
	}
	overlaps (r) {
		return !(
			this.left >= r.right ||
			this.right <= r.left ||
			this.top >= r.bottom ||
			this.bottom <= r.top
		);
	}
}