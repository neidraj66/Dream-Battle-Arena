class User {
  dream;
  stamina;
  panicLevel;
  remainingRolls;

  constructor(dream) {
    this.dream = dream;
    this.stamina = 10;
    this.panicLevel = 10;
    this.remainingRolls = 10;
  }

  getStamina() {
    return this.stamina;
  }
  setStamina(newStamina) {
    this.stamina = newStamina;
    if (newStamina <= 0) {
      this.die();
    }
  }
  setPanicLevel(newPanicLevel) {
    if (newPanicLevel >= MAX_LEVEL) {
      this.die();
    }
  }
  getHit() {
    this.panicLevel += 2;
  }
  dodge() {
    this.stamina -= 1;
  }
  deflect() {}
  glancingBlow(enemy) {
    this.panic -= 1;
    enemy.receiveGlancingBlow();
  }
  die() {
    this.dream.restart();
  }
  pushAwayEnemy(enemy) {
    enemy.backAway();
    this.stamina += 1;
  }
  giveSignificantDamage(enemy) {
    enemy.takeSignificantDamage();
    this.panic -= 3;
    this.stamina += 2;
  }
  reactToEnemyDeath() {
    this.panic += 1;
    this.stamina -= 1;
  }
  rollDie(die) {
    die.roll();
  }
  takeSignificantDamage() {}
}
