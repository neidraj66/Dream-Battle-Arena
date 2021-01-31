let assert = (statement, message) => {
  if (!statement) {
    if (message) {
      throw message;
    } else {
      throw "assertion error";
    }
  }
};

const test_starting_a_new_game_draws_a_new_dungeon = () => {
  let ui = new UI();
  let dungeonDrawn = false;
  ui.drawDungeon = () => {
    dungeonDrawn = true;
  };
  startGame(ui);

  assert(dungeonDrawn, "did not draw dungeon when new game was started");
};
test_starting_a_new_game_draws_a_new_dungeon();

console.log("all tests have passed!");
