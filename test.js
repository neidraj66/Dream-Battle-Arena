let assert = (statement, message) => {
// I added a poopy comment
  if (!statement) {
    if (message) {
      throw message;
    } else {
      throw "assertion error";
    }
  }
};

class MockUI extends UI {
  drawDungeon() {}
  drawEnemy() {}
  drawDie() {}
  die = {
    roll() {},
  };
}
const test_starting_a_new_game_draws_a_new_dungeon = () => {
  let ui = new MockUI();
  let dungeonDrawn = false;
  ui.drawDungeon = () => {
    dungeonDrawn = true;
  };
  startGame(ui);

  assert(dungeonDrawn, "did not draw dungeon when new game was started");
};
test_starting_a_new_game_draws_a_new_dungeon();

const test_new_dungeon_contains_an_enemy = () => {
  let ui = new MockUI();
  let enemyDrawn = false;
  ui.drawEnemy = (enemy) => {
    enemyDrawn = true;
  };

  startGame(ui);

  assert(enemyDrawn, "did not draw enemy in new dungeon");
};
test_new_dungeon_contains_an_enemy();

const test_user_is_presented_a_die_to_face_enemy = () => {
  let ui = new MockUI();
  let dieDrawn = false;
  ui.drawDie = () => {
    dieDrawn = true;
  };

  startGame(ui);

  assert(dieDrawn, "did not draw die");
};
test_user_is_presented_a_die_to_face_enemy();

const test_when_user_rolls_die_an_event_is_broadcast_to_take_a_turn = () => {
  let ui = new MockUI();
  let dream = new Dream(ui);
  let uiDie = new UIDie(dream.die);
  ui.die = uiDie;

  let turnTaken = false;
  window.addEventListener("turnTaken", (event) => {
    turnTaken = true;
  });

  uiDie.roll();
  setTimeout(() => {
    assert(turnTaken, "turn was never taken!");
  }, 3000);
};
test_when_user_rolls_die_an_event_is_broadcast_to_take_a_turn();

const test_when_turn_taken_event_is_received_arena_executes_event = () => {
  let arena = new BattleArena({ ui: new MockUI() });
  let turnTaken = false;
  arena.takeTurn = () => {
    turnTaken = true;
  };

  let event = new Event("turnTaken");
  window.dispatchEvent(event);

  setTimeout(() => {
    assert(turnTaken, "take turn was not executed when event was broadcast");
  }, 3000);
};
test_when_turn_taken_event_is_received_arena_executes_event();

console.log("all tests have passed!");
