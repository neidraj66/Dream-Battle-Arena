class Enemy {
  hitPoints;

  constructor() {
    this.hitPoints = 10;
  }
  set hitPoints(newHitPoints) {
    if (newHitPoints <= 0) {
      this.die();
    }
  }
  takeSignificantDamage() {
    this.hitPoints -= 5;
  }
  receiveGlancingBlow() {
    this.hitPoints -= 3;
  }
  die() {}
  dodge() {}
}
