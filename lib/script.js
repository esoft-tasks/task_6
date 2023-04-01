const cellsElem = document.querySelector('.cells');
const winnerElem = document.querySelector('.winner');

const checkWins = (moves) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [x, y, z] = winningCombinations[i];

    if (moves[x]) {
      if (moves[x] === moves[y] && moves[x] === moves[z]) {
        if (i <= 2) return `"${moves[x]}" победил, так как есть 3 заполненные клетки по горизонтали`;
        if (i <= 5) return `"${moves[x]}" победил, так как есть 3 заполненные клетки по вертикали`;
        return `"${moves[x]}" победил, так как есть 3 заполненные клетки по диагонали`;
      }
    }
  }

  for (let i = 0; i < moves.length; i++) {
    if (!moves[i]) return false;
  }

  return 'ничья';
};

class GameField {
  _state = [null, null, null, null, null, null, null, null, null];

  mode = 'x';

  isOverGame() {
    return checkWins(this._state);
  }

  getGameFieldStatus() {
    return this._state;
  }

  setMode() {
    if (this.mode === 'x') {
      this.mode = 'y';
    } else {
      this.mode = 'x';
    }
  }

  fieldCellValue(position) {
    if (this._state[position] !== null || (position > 8 || position < 0)) return true;

    const changeMoves = this._state;
    changeMoves[position] = this.mode;

    this._state = changeMoves;
  }
}

const gameField = new GameField();

while (!gameField.isOverGame()) {
  const movePosition = prompt(`Ход "${gameField.mode}".\n\nВведите позицию (0 - 8)`);

  if (movePosition) {
    if (gameField.fieldCellValue(movePosition)) alert(`${movePosition}-ая клетка занята или вне диапазона 0-8`);
    else gameField.fieldCellValue(movePosition);
    gameField.setMode();
  }
}

winnerElem.textContent = gameField.isOverGame();

gameField._state.map((move) => {
  const cellElem = document.createElement('div');
  cellElem.classList.add('cells__cell');

  if (move === null) cellElem.textContent = '';
  else cellElem.textContent = move;
  cellsElem.append(cellElem);
});
