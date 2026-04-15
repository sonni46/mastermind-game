const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
]

let _winning_colors_ = []
let _selected_colors_ = []
let _position_color_ = []

function colors_randomizer() {
  while (_winning_colors_.length < 4) {
    let max = 6;
    let color = Math.floor(Math.random() * max);
    if (_winning_colors_.includes(COLORS[color])) continue
    _winning_colors_.push(COLORS[color])
  }
}

function mastermind_new_game() {
  _selected_colors_ = []
  _winning_colors_ = []
  _position_color_ = []
  colors_randomizer()
}

function mastermind_check_position_color() {
  for(let i = 0; i < 4; i++) {
    if (_winning_colors_[i] === _selected_colors_[i]) {
      _position_color_.push(1)
    } else if (_winning_colors_.includes(_selected_colors_[i])) {
      _position_color_.push(2)
    }
    else _position_color_.push(0)
  }
}

function is_good_color() {
  mastermind_check_position_color()
  return !_position_color_.includes(0) && !_position_color_.includes(2)
}

function is_found_combination() {
  if (is_good_color()) return true
  return false
}

function mastermind_wrong_position() {
  if (!_position_color_.length) return
  for(let i = 0; i < 4; i++) {
    if (_position_color_[i] === 1) create_small_pin("good_pos")
    if (_position_color_[i] === 2) create_small_pin("no_good_pos")
  }
}

function init_game() {
  init_mastermind_render()
  mastermind_new_game()
}
