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
  takeSignificantDamageFromUser(user) {
    this.hitPoints -= 5;
    user.respondToEnemyTakingSignificantDamage();
  }
  receiveGlancingBlow() {
    this.hitPoints -= 3;
  }

  backAway(user) {
    user.stamina += 1;
  }
  die() {}
  dodge() {}
  isDefeated() {
    return this.defeated;
  }
}
