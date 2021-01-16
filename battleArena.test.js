// Coding Practice - Battle Arena Dream Loop

// For this exercise, you are going to trap your user in a dream loop. The dream will repeat over and over. There is no way to escape it except to close the application

// Set-Up

let assert = (statement, message) => {
  if (!statement) {
    if (message) {
      throw message;
    } else {
      throw "assertion error";
    }
  }
};

const test_user_is_in_battle_arena_on_start = () => {
  const dream = new Dream();
  const arena = dream.battleArena;

  assert(arena != undefined, "battle arena not created in dream");
  assert(arena.user != undefined, "user not in battle arena");
};
test_user_is_in_battle_arena_on_start();

const test_user_has_survival_stats = () => {
  const mockDream = {};
  const user = new User(mockDream);

  assert(user.stamina == 10, "user stamina did not start at 10");
  assert(user.panicLevel == 10, "user panic level did not start at 10");
};
test_user_has_survival_stats();

test_if_stamina_reaches_zero_user_dies = () => {
  const mockDream = {};
  let died = false;
  const mockDie = () => {
    died = true;
  };
  const user = new User(mockDream);
  user.die = mockDie;

  user.setStamina(0);

  assert(died == true, "user did not die when stamina reached 0");
};
test_if_stamina_reaches_zero_user_dies();

test_if_panic_reaches_twenty_user_dies = () => {
  const mockDream = {};
  let died = false;
  const mockDie = () => {
    died = true;
  };
  const user = new User(mockDream);
  user.die = mockDie;

  user.setPanicLevel(20);

  assert(died == true, "user did not die when panic reached 0");
};
test_if_panic_reaches_twenty_user_dies();

const test_enemy_starts_with_ten_hit_points = () => {
  const enemy = new Enemy();

  assert(enemy.hitPoints == 10, "enemy did not start with ten hit points");
};
test_enemy_starts_with_ten_hit_points();

const test_arena_starts_with_enemies = () => {
  const arena = new BattleArena();

  assert(arena.enemies.length > 0, "user has no enemies to battle");
};
test_arena_starts_with_enemies();

test_die_rolls_randomly_between_one_and_six = () => {
  const die = new Die();

  die.roll();
  assert(Number.isInteger(die.face), "die was not an integer");
  assert(die.face > 0 && die.face < 7, "die did not roll between 1 and 6");
  die.roll();
  assert(Number.isInteger(die.face), "die was not an integer");
  assert(die.face > 0 && die.face < 7, "die did not roll between 1 and 6");
  die.roll();
  assert(Number.isInteger(die.face), "die was not an integer");
  assert(die.face > 0 && die.face < 7, "die did not roll between 1 and 6");
  die.roll();
  assert(Number.isInteger(die.face), "die was not an integer");
  assert(die.face > 0 && die.face < 7, "die did not roll between 1 and 6");
  die.roll();
  assert(Number.isInteger(die.face), "die was not an integer");
  assert(die.face > 0 && die.face < 7, "die did not roll between 1 and 6");
  die.roll();
  assert(Number.isInteger(die.face), "die was not an integer");
  assert(die.face > 0 && die.face < 7, "die did not roll between 1 and 6");
};
test_die_rolls_randomly_between_one_and_six();

console.log("All the tests passed!");
// 1 – The user gets hit, and their panic level increases by 2
// 2 – The user dodges the attack, but their stamina is reduced by 1
// 3 – The user deflects the attack. There is no stat change
// 4 – The enemy backs away; the user’s stamina increases by 1
// 5 – The enemy dodges, but the user strikes a glancing blow. The user’s panic is reduced by 1. The enemy loses 3 hit points.
// 6 – The enemy takes significant damage. The user’s panic is reduced by 3. Their stamina is increased by 2. The enemy loses 5 hit points.

// The user has 10 rolls of the die to defeat the enemy.

// Battle Results
// After every roll, if the enemy has not died, the user’s panic increases by 1. Their stamina is reduced by 1.

// If the enemy has died, another enemy enters the arena. The player’s panic and stamina stay where it is.

// If the player has run out of turns, their panic reaches the max level.
// If the player has died, the dream starts over from the beginning.

// Final Instructions
// Coding is supposed to be fun, so get creative and have a good time with this. Share your GitHub link when your done so I can see what you came up with.
