class User {
  static MAX_PANIC_LEVEL = 20;
  static TOTAL_TURNS = 10;
  stamina;
  panicLevel;

  constructor() {
    this.stamina = 10;
    this.panicLevel = 10;
    this.remainingTurns = User.TOTAL_TURNS;
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
    if (newPanicLevel >= User.MAX_PANIC_LEVEL) {
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
    this.panicLevel -= 1;
    enemy.receiveGlancingBlow();
  }

  die() {
    this.dead = true;
  }

  respondToEnemyTakingSignificantDamage() {
    this.panicLevel -= 3;
    this.stamina += 2;
  }

  reactToEnemyNotDying() {
    this.panicLevel += 1;
    this.stamina -= 1;
  }
  reactToEnemyDying() {
    this.remainingTurns = User.TOTAL_TURNS;
  }

  rollDie(die) {
    die.roll();
  }

  takeSignificantDamage() {}

  panic() {}

  checkRemainingTurns() {
    if (this.remainingTurns <= 0) {
      this.panicLevel = this.MAX_PANIC_LEVEL;
    }
  }

  reduceRemainingTurns() {
    this.remainingTurns -= 1;
  }

  isDead() {
    return this.dead;
  }
  isGameOverForUser() {
    return this.remainingTurns == 0;
  }
}
