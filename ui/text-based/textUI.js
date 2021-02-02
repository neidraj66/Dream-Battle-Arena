class TextUI extends UI {
  constructor() {
    super();
    this.interface = document.getElementById("text-interface");
  }
  drawDungeon() {
    this.interface.innerHTML = "A new dream has begun ...";
  }
  drawEnemy() {
    setTimeout(() => {
      this.interface.innerHTML = "A big hairy, ogre gets in your face!";
    }, 2000);
  }
  drawDie() {
    setTimeout(() => {
      this.die = new TextDie();
      this.interface.appendChild(this.die.element);
    }, 2000);
  }
  drawDieRolling() {
    this.die.element.innerHTML = "Rolling...";
  }
  drawDieFace(face) {
    setTimeout(() => {
      this.die.element.innerHTML = face;
    }, 1000);
  }
  drawUserGettingHit() {
    setTimeout(() => {
      this.interface.innerHTML = "Ouch! The hairy ogre has hit me!";
    }, 2000);
  }
  drawUserDodging() {
    setTimeout(() => {
      this.interface.innerHTML =
        "Whoo! Fast bobbing and weaving. You dodged an attack!";
    }, 2000);
  }
  drawUserDeflecting() {
    setTimeout(() => {
      this.interface.innerHTML = "Good job! You deflected the ogre's blow!";
    }, 2000);
  }
  drawUserBackingAway() {
    setTimeout(() => {
      this.interface.innerHTML = "The ogre approaches, but you back away.";
    }, 2000);
  }
  drawEnemyDodging() {
    setTimeout(() => {
      this.interface.innerHTML = "You strike! But the ogre dodges your attack!";
    }, 2000);
  }
  drawUserGlancingBlowOnEnemy() {
    setTimeout(() => {
      this.interface.innerHTML =
        "You deliver a glancing blow upon the nasty ogre!";
    }, 2000);
  }
  drawEnemyTakingSignificantDamage() {
    setTimeout(() => {
      this.interface.innerHTML =
        "Hooray! You wound the ogre, causing significant damage!";
    }, 2000);
  }
  drawUserReactingToEnemyNotDying() {
    setTimeout(() => {
      this.interface.innerHTML =
        "Oh no! How can this be? The ogre did not die!!";
    }, 2000);
  }
  drawRemainingTurns() {
    setTimeout(() => {
      this.interface.innerHTML = "The ogre approaches, but you back away.";
    }, 2000);
  }
  drawUserReactingToEnemyDying() {
    setTimeout(() => {
      this.interface.innerHTML = "Bravo! You've defeated the ogre!";
    }, 2000);
  }
  drawEnemyBeingRemovedFromArena() {}
  drawAddingEnemyToArena() {}
}
