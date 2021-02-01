class Dream {
  constructor(ui) {
    this.ui = ui;
    this.die = new Die();
    this.battleArena = new BattleArena(this);
  }
  restart() {
    console.log("restart should not be called!");
    this.battleArena = new BattleArena();
  }
  playRound() {
    this.battleArena.takeTurn(
      this.battleArena.user,
      this.battleArena.enemies[0],
      this.die
    );
  }
}

class BattleArena {
  constructor(dream) {
    this.dream = dream;
    this.dream.ui.drawDungeon();
    this.user = new User();
    this.players = [this.user];
    this.enemies = [new Enemy()];
    this.enemies.forEach((enemy) => this.dream.ui.drawEnemy(enemy));
    this.dream.ui.drawDie(this.die);

    window.addEventListener("turnTaken", () => {
      this.takeTurn(this.user, this.enemies[0], this.dream.die);
    });
  }

  takeTurn(user, enemy, die) {
    user.rollDie(die);
    if (die.getFace() == 1) {
      user.getHit();
    }
    if (die.getFace() == 2) {
      user.dodge();
    }
    if (die.getFace() == 3) {
      user.deflect();
    }
    if (die.getFace() == 4) {
      enemy.backAway(user);
    }
    if (die.getFace() == 5) {
      enemy.dodge();
      user.glancingBlow(enemy);
    }
    if (die.getFace() == 6) {
      enemy.takeSignificantDamageFromUser(user);
    }
    if (!enemy.isDefeated()) {
      user.reactToEnemyNotDying();
      user.reduceRemainingTurns();
    } else if (enemy.isDefeated()) {
      user.reactToEnemyDying();
      this.removeEnemyFromArena(enemy);
      this.addEnemyToArena();
    }
    if (user.isDead()) {
      this.dream.startOver();
    }

    if (this.user.isGameOverForUser()) {
      this.gameOver();
    }
  }
  addEnemyToArena() {
    this.enemies.push(new Enemy());
    this.players.forEach((player) => player.panic());
  }
  removeEnemyFromArena(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
    }
  }

  gameOver() {
    this.dream.restart();
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
  getFace() {
    return this.face;
  }
}

let startGame = (ui) => {
  new Dream(ui);
};
