class TextDie extends UIDie {
  constructor() {
    super();
    this.element = document.createElement("button");
    this.element.style =
      "width: 10em; height: 10em;display: block; background-color: CornFlowerBlue; border-radius: 5px";
    this.element.innerText = "Roll Me";
    this.element.addEventListener("onclick", () => {
      this.roll();
    });
  }
}
