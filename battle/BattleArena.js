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
    console.log("taking a turn...");
    this.dream.ui.drawDieRolling();
    user.rollDie(die);
    this.dream.ui.drawDieFace(die.face);
    if (die.getFace() == 1) {
      this.dream.ui.drawUserGettingHit();
      user.getHit();
    }
    if (die.getFace() == 2) {
      this.dream.ui.drawUserDodging();
      user.dodge();
    }
    if (die.getFace() == 3) {
      this.dream.ui.drawUserDeflecting();
      user.deflect();
    }
    if (die.getFace() == 4) {
      this.dream.ui.drawUserBackingAway();
      enemy.backAway(user);
    }
    if (die.getFace() == 5) {
      this.dream.ui.drawEnemyDodging();
      enemy.dodge();
      this.dream.ui.drawUserGlancingBlowOnEnemy();
      user.glancingBlow(enemy);
    }
    if (die.getFace() == 6) {
      this.dream.ui.drawEnemyTakingSignificantDamage();
      enemy.takeSignificantDamageFromUser(user);
    }
    if (!enemy.isDefeated()) {
      this.dream.ui.drawUserReactingToEnemyNotDying();
      user.reactToEnemyNotDying();
      user.reduceRemainingTurns();
      this.dream.ui.drawRemainingTurns(user.remainingTurns);
    } else if (enemy.isDefeated()) {
      this.dream.ui.drawUserReactingToEnemyDying();
      user.reactToEnemyDying();
      this.dream.ui.drawEnemyBeingRemovedFromArena(enemy);
      this.removeEnemyFromArena(enemy);
      this.dream.ui.drawAddingEnemyToArena();
      this.addEnemyToArena();
    }
    if (user.isDead()) {
      this.dream.ui.drawUserDying();
      this.dream.startOver();
    }

    if (this.user.isGameOverForUser()) {
      this.gameOver();
    }
  }
  addEnemyToArena() {
    this.enemies.push(new Enemy());
    this.dream.ui.drawEnemy(this.enemies[0]);
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
