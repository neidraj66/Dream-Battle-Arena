class TextDie extends UIDie {
  constructor() {
    super();
    this.element = document.createElement("button");
    this.element.style =
      "width: 10em; height: 10em; display: block;  color: ivory; background-color: CornFlowerBlue; border-radius: 5px; cursor: pointer;";
    this.element.innerText = "Roll Me";
    this.element.addEventListener("click", () => {
      this.roll();
    });
  }
}
