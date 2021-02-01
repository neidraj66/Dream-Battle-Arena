class UIDie {
  roll() {
    let event = new Event("turnTaken");
    window.dispatchEvent(event);
  }
}
