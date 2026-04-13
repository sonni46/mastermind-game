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
let _board_ = ''

function colors_randomizer() {
  while (_winning_colors_.length < 4) {
    let max = 6;
    let rand_num = Math.floor(Math.random() * max);
    if (_winning_colors_.includes(COLORS[rand_num])) continue
    _winning_colors_.push(COLORS[rand_num])
  }
}

function new_game() {
  _selected_colors_ = []
  _winning_colors_ = []
  _position_color_ = []
  colors_randomizer()
  // console.log(_winning_colors_)
}

function allert_game(txt) {  
  let feed_cont = document.getElementById("feedback_container") 
  if (feed_cont.innerText.length > 0) return
  feed_cont.innerText = txt
  setTimeout(() => {
    feed_cont.innerText = ""
  },2000)
}

function get_pins_containers() {  
  let pins_containers = document.getElementById("try_board").querySelectorAll(".pins_container")
  pins_containers = Array.from(pins_containers).filter(cont_pin => !cont_pin.classList.contains("completed"))
  return pins_containers
}

function select_color(el) {
  let color = el.getAttribute("data-color");
  let pins_containers = get_pins_containers();
  let len_pins_containers = pins_containers.length - 1;
  if (len_pins_containers === -1) return
  // cerca nella coda tutti i nodi che non hanno data-color
  let pins_not_color = pins_containers[len_pins_containers].querySelectorAll(".pin:not([data-color])");
  //cerca se hai selezionato lo stesso colore
  let is_color_used = _selected_colors_.includes(color)

  if (!pins_not_color.length) return 
  if (is_color_used) return
  pins_not_color[0].setAttribute("data-color", color); // render color 
  _selected_colors_.push(color)
}
function delete_color() {
  let pins_containers = get_pins_containers()
  let end_pins = pins_containers.length - 1;
  if (end_pins === -1) return;
  let pins_containers_tail = pins_containers[end_pins].querySelectorAll("[data-color]");
  let last_color = pins_containers_tail.length - 1
  if (last_color === -1) return
  pins_containers_tail[last_color].removeAttribute("data-color");
  _selected_colors_.pop()
}
function reset_game() {
  document.querySelector(".board").innerHTML = _board_
  allert_game("New game loaded")
  new_game()
}

function is_good_color() {
  for(let i = 0; i < 4; i++) {
    if (_winning_colors_[i] === _selected_colors_[i]) {
      _position_color_.push(1)
    } else if (_winning_colors_.includes(_selected_colors_[i])) {
      _position_color_.push(2)
    }
    else _position_color_.push(0)
  }
  return !_position_color_.includes(0) && !_position_color_.includes(2)
}

function create_small_pin(staus) {
  let pins_containers = get_pins_containers()
  let len = pins_containers.length - 1
  if (len === -1) return 
  let pin = document.createElement("div")
  pin.classList.add(`small_pin`)
  pin.classList.add(staus)
  pins_containers[len].querySelector(".pins_right").append(pin) 
}

function is_found_combination() {
  if (is_good_color()) return true
  return false
}

function is_wrong_position() {
  for(let i = 0; i < 4; i++) {
    if (_position_color_[i] === 1) create_small_pin("good_pos")
    if (_position_color_[i] === 2) create_small_pin("no_good_pos")
  }
}

function render_wrong_position() {  
  is_wrong_position()
  _selected_colors_ = []
  _position_color_ = []
}

function check_color() {
  let pins_containers = get_pins_containers()
  let len = pins_containers.length - 1
  if (len === -1) return

  if (is_found_combination()) return allert_game("You won game")
  else render_wrong_position()
  
  let pins_containers_tail = pins_containers[len]
  let pins_colors = pins_containers_tail.querySelectorAll("[data-color]") 
  
  if (pins_colors.length === 4) pins_containers_tail.closest(".pins_container").classList.add("completed") 
  else return
}

function init_game() {
  new_game()
}

document.addEventListener("DOMContentLoaded", () => {
  _board_ = document.querySelector(".board").innerHTML
  init_game()
})
