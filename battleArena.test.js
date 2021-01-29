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

const test_if_stamina_reaches_zero_user_dies = () => {
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

const test_if_panic_reaches_twenty_user_dies = () => {
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

const test_die_rolls_randomly_between_one_and_six = () => {
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

const test_when_die_rolls_one_user_gets_hit = () => {
  const loadedDie = {
    getFace: () => {
      return 1;
    },

    roll: () => {},
  };
  let getHitCalled = false;
  const mockGetHit = () => {
    getHitCalled = true;
  };
  const arena = new BattleArena();
  arena.user.getHit = mockGetHit;

  arena.takeTurn(arena.user, arena.enemies[0], loadedDie);

  assert(getHitCalled, "user not hit on die roll of one");
};
test_when_die_rolls_one_user_gets_hit();

const test_when_user_gets_hit_panic_level_increases_by_2 = () => {
  const user = new User();
  const originalPanicLevel = user.panicLevel;

  user.getHit();

  assert(
    user.panicLevel == originalPanicLevel + 2,
    "user panic level did not increase by 2 when hit"
  );
};
test_when_user_gets_hit_panic_level_increases_by_2();

const test_when_die_rolls_2_user_dodges_attack = () => {
  const loadedDie = {
    getFace: () => 2,
    roll: () => {},
  };
  let dodgeCalled = false;
  const mockDodge = () => {
    dodgeCalled = true;
  };
  const arena = new BattleArena();
  arena.user.dodge = mockDodge;

  arena.takeTurn(arena.user, arena.enemies[0], loadedDie);

  assert(dodgeCalled, "user did not dodge on die roll of 2");
};
test_when_die_rolls_2_user_dodges_attack();

const test_when_user_dodges_attack_stamina_reduced_by_1 = () => {
  const user = new User();
  const originalStamina = user.stamina;

  user.dodge();

  assert(
    user.stamina == originalStamina - 1,
    "user stamina reduced by 1 when dodges attack"
  );
};
test_when_user_dodges_attack_stamina_reduced_by_1();

const test_when_die_rolls_3_user_deflects_the_attack = () => {
  const loadedDie = {
    getFace: () => 3,
    roll: () => {},
  };
  let deflectCalled = false;
  const mockDeflect = () => {
    deflectCalled = true;
  };
  const arena = new BattleArena();
  arena.user.deflect = mockDeflect;

  arena.takeTurn(arena.user, arena.enemies[0], loadedDie);

  assert(deflectCalled, "user did not deflect on die roll of 3");
};
test_when_die_rolls_3_user_deflects_the_attack();

const test_when_user_deflects_attack_there_is_no_stat_change = () => {
  const user = new User();
  const originalPanicLevel = user.panicLevel;
  const originalStamina = user.stamina;

  user.deflect();

  assert(
    user.panicLevel == originalPanicLevel,
    "user panic level changed when user deflected attack"
  );
  assert(
    user.stamina == originalStamina,
    "user stamina changed when user deflected attack"
  );
};
test_when_user_deflects_attack_there_is_no_stat_change();

const when_die_rolls_four_enemy_backs_away_from_user = () => {
  const loadedDie = {
    getFace: () => 4,
    roll: () => {},
  };
  let backAwayCalled = false;
  let userBackedAwayFrom;

  const mockBackAway = (user) => {
    backAwayCalled = true;
    userBackedAwayFrom = user;
  };
  const arena = new BattleArena();
  arena.enemies[0].backAway = mockBackAway;

  arena.takeTurn(arena.user, arena.enemies[0], loadedDie);

  assert(backAwayCalled, "enemy did not back away with die roll of four");
  assert(
    userBackedAwayFrom === arena.user,
    "enemy did not back away from a user with a die roll of four"
  );
};
when_die_rolls_four_enemy_backs_away_from_user();

const when_enemy_backs_away_user_stamina_increases_by_one = () => {
  const user = new User();
  const originalUserStamina = user.stamina;
  const enemy = new Enemy();

  enemy.backAway(user);

  assert(
    user.stamina == originalUserStamina + 1,
    "user stamina did not increase by one when enemy backs away"
  );
};
when_enemy_backs_away_user_stamina_increases_by_one();

const when_die_rolls_five_enemy_dodges_and_user_strikes_glancing_blow = () => {
  const loadedDie = {
    getFace: () => 5,
    roll: () => {},
  };
  let enemyDodgeCalled = false;
  const mockEnemyDodge = () => {
    enemyDodgeCalled = true;
  };
  let userStruckGlancingBlow = false;
  let enemyWhichBlowStruckWasAgainst;
  const mockUserGlancingBlow = (enemy) => {
    userStruckGlancingBlow = true;
    enemyWhichBlowStruckWasAgainst = enemy;
  };
  const arena = new BattleArena();
  const enemy = arena.enemies[0];
  enemy.dodge = mockEnemyDodge;
  arena.user.glancingBlow = mockUserGlancingBlow;

  arena.takeTurn(arena.user, enemy, loadedDie);

  assert(enemyDodgeCalled, "enemy did not dodge with a roll of five");
  assert(
    userStruckGlancingBlow,
    "user did not strike glancing blow with a roll of five"
  );
  assert(
    enemyWhichBlowStruckWasAgainst === enemy,
    "enemy was not struck with glancing blow by user with a roll of five"
  );
};
when_die_rolls_five_enemy_dodges_and_user_strikes_glancing_blow();

const test_when_user_strikes_glancing_blow_user_panic_is_reduced_by_one = () => {
  const user = new User();
  const originalUserPanicLevel = user.panicLevel;

  user.glancingBlow(new Enemy());

  assert(
    user.panicLevel == originalUserPanicLevel - 1,
    "user panic was not reduced by one when striking glancing blow"
  );
};
test_when_user_strikes_glancing_blow_user_panic_is_reduced_by_one();

const test_when_user_strikes_glancing_blow_enemy_receives_glancing_blow = () => {
  const user = new User();
  const enemy = new Enemy();
  let enemyReceivedGlancingBlow = false;
  const mockReceiveGlancingBlow = () => {
    enemyReceivedGlancingBlow = true;
  };
  enemy.receiveGlancingBlow = mockReceiveGlancingBlow;

  user.glancingBlow(enemy);

  assert(
    enemyReceivedGlancingBlow,
    "enemy did not receive glancing blow when user struck glancing blow"
  );
};
test_when_user_strikes_glancing_blow_enemy_receives_glancing_blow();

const test_when_user_strikes_glancing_blow_enemy_loses_three_hit_points = () => {
  const user = new User();
  const enemy = new Enemy();
  const originalEnemyHitPoints = enemy.hitPoints;

  user.glancingBlow(enemy);

  assert(
    enemy.hitPoints == originalEnemyHitPoints - 3,
    "enemy did not lose three hit points when receiving glancing blow"
  );
};
test_when_user_strikes_glancing_blow_enemy_loses_three_hit_points();

const test_when_die_rolls_six_enemy_takes_significant_damage_from_user = () => {
  const loadedDie = {
    getFace: () => 6,
    roll: () => {},
  };
  let takeSignificantDamageFromUserCalled = false;
  let userFromWhichSignificantDamageWasTaken;
  const mockTakeSignificantDamageFromUser = (user) => {
    takeSignificantDamageFromUserCalled = true;
    userFromWhichSignificantDamageWasTaken = user;
  };
  const arena = new BattleArena();
  arena.enemies[0].takeSignificantDamageFromUser = mockTakeSignificantDamageFromUser;

  arena.takeTurn(arena.user, arena.enemies[0], loadedDie);

  assert(
    takeSignificantDamageFromUserCalled,
    "enemy did not take significant damage with die roll of six"
  );
  assert(
    userFromWhichSignificantDamageWasTaken === arena.user,
    "enemy did not take significant damage from the correct user on a die roll of six"
  );
};
test_when_die_rolls_six_enemy_takes_significant_damage_from_user();

const test_when_enemy_takes_significant_damage_user_responds = () => {
  const enemy = new Enemy();
  const user = new User();
  let userRespondedToEnemyTakingDamage = false;
  const mockRespondToEnemyTakingDamage = () => {
    userRespondedToEnemyTakingDamage = true;
  };
  user.respondToEnemyTakingSignificantDamage = mockRespondToEnemyTakingDamage;

  enemy.takeSignificantDamageFromUser(user);

  assert(
    userRespondedToEnemyTakingDamage,
    "user did not respond to enemy taking significant damage"
  );
};
test_when_enemy_takes_significant_damage_user_responds();

const test_when_enemy_takes_significant_damage_user_panic_is_reduced_by_three = () => {
  const enemy = new Enemy();
  const user = new User();
  let originalUserPanicLevel = user.panicLevel;

  enemy.takeSignificantDamageFromUser(user);

  assert(
    user.panicLevel == originalUserPanicLevel - 3,
    "user panic level did not reduce by three when enemy took significant damage"
  );
};
test_when_enemy_takes_significant_damage_user_panic_is_reduced_by_three();

const test_when_enemy_takes_significant_damage_user_stamina_is_increased_by_two = () => {
  const enemy = new Enemy();
  const user = new User();
  let originalUserStamina = user.stamina;

  enemy.takeSignificantDamageFromUser(user);

  assert(
    user.stamina == originalUserStamina + 2,
    "user stamina did not increase by two when enemy took significant damage"
  );
};
test_when_enemy_takes_significant_damage_user_stamina_is_increased_by_two();

test_enemy_loses_five_hit_points_when_enemy_takes_significant_damage = () => {
  const enemy = new Enemy();
  let originalEnemyHitPoints = enemy.hitPoints;

  enemy.takeSignificantDamageFromUser(new User());

  assert(
    enemy.hitPoints == originalEnemyHitPoints - 5,
    "enemy did not lose five hit points when enemy took significant damage"
  );
};
test_enemy_loses_five_hit_points_when_enemy_takes_significant_damage();

test_user_has_ten_rolls_of_die_to_defeat_enemy = () => {
  const mockUser = new User();
  const mockEnemy = {
    isDefeated: () => false,
  };
  const mockDie = {
    getFace: () => {},
    roll: () => {},
  };
  let gameOverCalled = false;
  const mockGameOver = () => {
    gameOverCalled = true;
  };
  const arena = new BattleArena();
  arena.user = mockUser;
  arena.gameOver = mockGameOver;

  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);
  arena.takeTurn(mockUser, mockEnemy, mockDie);

  assert(
    gameOverCalled,
    "game did not end when user did not defeat enemy after ten rolls"
  );
};
test_user_has_ten_rolls_of_die_to_defeat_enemy();

const test_after_roll_if_enemy_has_not_died_user_panic_increases_by_1 = () => {
  const mockEnemy = {
    isDefeated: () => false,
  };
  const brokenDie = {
    getFace: () => 0,
    roll: () => {},
  };
  const user = new User();
  const arena = new BattleArena();
  const originalPanicLevel = user.panicLevel;

  arena.takeTurn(user, mockEnemy, brokenDie);

  assert(
    user.panicLevel == originalPanicLevel + 1,
    "user panic level did not increase when enemy did not die after roll"
  );
};
test_after_roll_if_enemy_has_not_died_user_panic_increases_by_1();

const test_after_roll_if_enemy_has_not_died_user_stamina_is_reduced_by_1 = () => {
  const mockEnemy = {
    isDefeated: () => false,
  };
  const brokenDie = {
    getFace: () => 0,
    roll: () => {},
  };
  const user = new User();
  const arena = new BattleArena();
  const originalStamina = user.stamina;

  arena.takeTurn(user, mockEnemy, brokenDie);

  assert(
    user.stamina == originalStamina - 1,
    "user stamina did not reduce by one when enemy did not die after roll"
  );
};
test_after_roll_if_enemy_has_not_died_user_stamina_is_reduced_by_1();

const test_if_the_enemy_dies_the_user_remaining_turns_are_reset = () => {
  const arena = new BattleArena();
  arena.user.isDead = () => false;
  const originalEnemy = arena.enemies[0];
  originalEnemy.isDefeated = () => true;
  arena.user.remainingTurns = User.TOTAL_TURNS - 2;

  arena.takeTurn(arena.user, originalEnemy, new Die());

  assert(
    arena.user.remainingTurns == User.TOTAL_TURNS,
    "user turns did not reset"
  );
};
test_if_the_enemy_dies_the_user_remaining_turns_are_reset();

const test_if_the_enemy_dies_they_are_removed_from_the_arena = () => {
  const arena = new BattleArena();
  arena.user.isDead = () => false;
  const originalEnemy = arena.enemies[0];
  originalEnemy.isDefeated = () => true;

  arena.takeTurn(arena.user, originalEnemy, new Die());

  assert(
    arena.enemies.indexOf(originalEnemy) == -1,
    "enemy not removed from arena"
  );
};
test_if_the_enemy_dies_they_are_removed_from_the_arena();

const test_if_the_enemy_has_died_another_enemy_enters_the_arena = () => {
  const mockEnemy = {
    isDefeated: () => true,
  };
  const brokenDie = {
    getFace: () => 0,
    roll: () => {},
  };
  const user = new User();
  let enemyEnteredTheArena = false;
  const mockEnemyEnter = () => {
    enemyEnteredTheArena = true;
  };
  const arena = new BattleArena();
  arena.addEnemyToArena = mockEnemyEnter;
  const originalStamina = user.stamina;

  arena.takeTurn(user, mockEnemy, brokenDie);

  assert(
    enemyEnteredTheArena,
    "new enemy did not enter the arena when another enemy died after roll"
  );
};
test_if_the_enemy_has_died_another_enemy_enters_the_arena();

const test_add_enemy_to_arena_adds_a_new_enemy = () => {
  const arena = new BattleArena();
  const originalNumberOfEnemies = arena.enemies.length;

  arena.addEnemyToArena();

  assert(
    arena.enemies.length == originalNumberOfEnemies + 1,
    "addEnemyToArena did not add a new enemy to the arena"
  );
};
test_add_enemy_to_arena_adds_a_new_enemy();

const test_when_an_enemy_enters_the_arena_all_the_players_panic = () => {
  let player1Panicked = false;
  const mockPlayer1 = {
    panic: () => {
      player1Panicked = true;
    },
  };
  let player2Panicked = false;
  const mockPlayer2 = {
    panic: () => {
      player2Panicked = true;
    },
  };
  let player3Panicked = false;
  const mockPlayer3 = {
    panic: () => {
      player3Panicked = true;
    },
  };
  const arena = new BattleArena();
  arena.players = [mockPlayer1, mockPlayer2, mockPlayer3];

  arena.addEnemyToArena();

  assert(player1Panicked, "player 1 did not panic when enemy entered arena");
  assert(player2Panicked, "player 2 did not panic when enemy entered arena");
  assert(player3Panicked, "player 3 did not panic when enemy entered arena");
};
test_when_an_enemy_enters_the_arena_all_the_players_panic();

const test_when_player_panics_stamina_stays_the_same = () => {
  const player = new User();
  const originalStamina = player.stamina;

  player.panic();

  assert(
    player.stamina == originalStamina,
    "stamina changed when player panicked"
  );
};
test_when_player_panics_stamina_stays_the_same();

const test_if_the_player_has_run_out_of_turns_their_panic_reaches_max_level = () => {
  const player = new User();
  player.remainingTurns = 0;

  player.checkRemainingTurns();

  assert(
    player.panicLevel == player.MAX_PANIC_LEVEL,
    "player did not reach max panic level when they ran out of turns"
  );
};
test_if_the_player_has_run_out_of_turns_their_panic_reaches_max_level();

const test_if_the_player_has_died_the_dream_starts_over_from_the_beginning = () => {
  const dream = new Dream();
  const oldArena = dream.battleArena;
  let dreamRestartCalled = false;
  const mockRestartDream = () => {
    dreamRestartCalled = true;
  };
  dream.restart = mockRestartDream;

  oldArena.gameOver();

  assert(dreamRestartCalled, "dream did not restart when game ended");
};
test_if_the_player_has_died_the_dream_starts_over_from_the_beginning();

const test_main_user_only_fights_one_enemy_at_a_time = () => {
  const dream = new Dream();
  const mainUser = dream.battleArena.user;
  const mainEnemy = dream.battleArena.enemies[0];
  mainUser.isDead = () => false;
  mainEnemy.isDefeated = () => false;

  let timesTakeTurnCalled = 0;
  const mockTakeTurn = (user, enemy, die) => {
    timesTakeTurnCalled++;
    assert(user === mainUser, "more than one user fighting");
    assert(enemy === mainEnemy, "more than one enemy being fought");
  };
  dream.battleArena.takeTurn = mockTakeTurn;

  dream.playRound();
  dream.playRound();
  dream.playRound();
  dream.playRound();
  dream.playRound();
  dream.playRound();
  dream.playRound();

  assert(timesTakeTurnCalled == 7, "take turn not called every round");
};
test_main_user_only_fights_one_enemy_at_a_time();

console.log("All the tests passed!");
