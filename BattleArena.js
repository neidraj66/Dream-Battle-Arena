MAX_LEVEL = 20;

class Dream {
  constructor() {
    this.battleArena = new BattleArena();
  }
  restart() {
    this.battleArena = new BattleArena();
  }
}
class BattleArena {
  constructor() {
    this.user = new User();
    this.enemies = [];

    const firstEnemy = new Enemy();
    this.enemies.push(firstEnemy);
  }
  takeTurn(user, enemy, die) {
    user.rollDie(die);
    if (die.face == 1) {
      user.getHit();
    }
    if (die.face == 2) {
      user.dodge();
    }
    if (die.face == 3) {
      user.deflect();
    }
    if (die.face == 4) {
      user.pushAwayEnemy(enemy);
    }
    if (die.face == 5) {
      enemy.dodge();
      user.glancingBlow(enemy);
    }
    if (die.face == 6) {
      user.giveSignificantDamage(enemy);
    }
    if (!enemy.dead) {
      user.reactToEnemyDeath();
    } else if (enemy.dead) {
      this.addEnemyToArena();
    }
    user.remainingRolls -= 1;
    if (user.remainingRolls <= 0) {
      user.panic = MAX_LEVEL;
    }
    if (player.dead) {
      this.dream.startOver();
    }
  }
  addEnemyToArena() {
    this.enemies.push(new Enemy());
  }
}

class Die {
  face;
  constructor() {
    this.face = null;
  }
  roll() {
    this.face = Math.floor(Math.random() * 6) + 1;
  }
}

let startGame = () => {
  new Dream();
};
