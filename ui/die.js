class UIDie {
  constructor() {}
  roll() {
    console.log("rolling...");
    let event = new Event("turnTaken");
    window.dispatchEvent(event);
  }
}
