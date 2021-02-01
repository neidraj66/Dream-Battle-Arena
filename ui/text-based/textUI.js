class TextUI extends UI {
  constructor() {
    super();
    this.interface = document.getElementById("text-interface");
  }
  drawDungeon() {
    this.interface.innerHTML = "A new dream has begun...";
  }
  drawEnemy() {
    setTimeout(() => {
      this.interface.innerHTML = "A big hairy ogre gets in your face!";
    }, 2000);
  }
  drawDie() {
    setTimeout(() => {
      this.die = document.createElement("button");
      this.die.style =
        "width: 10em; height: 10em;display: block; background-color: CornFlowerBlue; border-radius: 5px";
      this.die.innerText = "Roll me";
      this.interface.appendChild(this.die);
    }, 2000);
  }
}
