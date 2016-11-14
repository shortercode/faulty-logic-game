class Menu extends alloy('div') {
  constructor (parent, x, y) {
	super();
    this.class.add('menu');
	
    parent.appendChild(this.element);
    this.element.style.cssText = `left: ${x}px; top: ${y}px;`;
    this.element.focus();
    this.element.onblur = () => this.destroy();
  }
  
  add (name, callback) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.textContent = name;
    this.element.appendChild(item);
    item.onclick = () => {
      this.destroy();
      callback();
    };
  }
  
  addSubmenu (name) {
	  const item = document.createElement('div');
      item.classList.add('item');
      item.textContent = name;
      this.element.appendChild(item);
      item.onmouseover = () => {
        this.destroy();
        callback();
      };
  }
  
  destroy () {
    this.element.remove();
    this.element = null;
  }
}