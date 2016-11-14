const spritesheetURL = "";
const spritesize = 64;
const sprites = {
	blank: {
		x: 0,
		y: 0
	},
	not: {
		
	}
}
const textures = new Map();
const spritesheet = loadSpritesheet();
function loadSpritesheet (url) {
	return fetch(url).then(res => res.blob());
}
function getTexture (name) {
	let texture = textures.get(name);
	if (texture)
		return Promise.resolve(texture);
	else
		return loadTexture(name);
}
function loadTexture (name) {
	return spritesheet.then(img => createImageBitmap(
		sprites[name].x || 0,
		sprites[name].y || 0,
		spritesize,
		spritesize
	)).then(texture => {
		textures.set(name, texture);
		return texture;
	});
}
class BlockElement {
	constructor () {
		this.rect = new Rectangle(0, 0, spritesize, spritesize);
		//this.activeTexture = null;
		//this.inactiveTexture = null;
		this.active = false;
		this.texture = null;
	}
	// setActive (bool) {
	// 	this.active = !!bool;
	// 	this.texture = bool ? this.activeTexture : this.inactiveTexture;
	// }
	loadTexture (name, type) {
		loadTexture(name || "blank").then(texture => {
			this.texture = texture;
			// if (type === "active" || type === "both") {
			// 	this.activeTexture = texture;
			// 	if (this.active)
			// 		this.texture = texture;
			// }
			// if (type === "inactive" || type === "both") {
			// 	this.inactiveTexture = texture;
			// 	if (!this.active)
			// 		this.texture = texture;
			// }
		});
	}
	render (ctx) {
		if (this.texture)
			ctx.drawImage(this.texture, this.rect.left, this.rect.top);
		else {
			ctx.fillStyle = "#CCC";
			ctx.fillRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
		}
	}
}