const COLORS = {
  1 : "red",
  2 : "blue",
  3 : "green",
  4 : "yellow",
  5 : "purple",
  6 : "orange",
}

const _NUMS_WINNING_ = []
const _WINNING_COLORS_ = []
let _selected_colors_ = []
let _board_ = ''

function random_numbers() {
  let max = 6;
  while (_NUMS_WINNING_.length < 4) {
   let rand_num = Math.floor(Math.random() * max) + 1;
    if (_NUMS_WINNING_.includes(rand_num)) continue;
    _NUMS_WINNING_.push(rand_num);
  } 
}
function colors_randomizer() {
  for(const COLOR of _NUMS_WINNING_) {
    _WINNING_COLORS_.push(COLORS[COLOR])
  }
}

function new_game() {  
  random_numbers()
  colors_randomizer()
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
  // cerca i contenitori dei pin che non hanno lo stato "complete"
  let pins_containers = document.getElementById("try_board").querySelectorAll(".pins_left")
  pins_containers = Array.from(pins_containers).filter(cont_pin => !cont_pin.classList.contains("complete"))
  return pins_containers
}
function select_color(el) {
  let color = el.getAttribute("data-color");
  let pins_containers = get_pins_containers();
  let len_pins_containers = pins_containers.length - 1;
  if (len_pins_containers === -1) return
  // cerca nella coda tutti i nodi che non hanno data-color
  let pins_not_color = pins_containers[len_pins_containers].querySelectorAll(":not([data-color])");
  //cerca se hai selezionato lo stesso colore
  let is_color_used = _selected_colors_.includes(color)

  if (!pins_not_color.length) return allert_game("Limit reached"); 
  if (is_color_used) return allert_game("Color already used"); // XXX fare un errore es."stai usando lo stesso colore"
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
  _selected_colors_ = []
  new_game()
}
function is_found_combination() {
  // XXX fare algoritmo per la verifica dei colori se sono posizionati correttamente
}
function check_color() {
  let pins_containers = get_pins_containers()
  let len = pins_containers.length - 1
  if (len === -1) return

  let pins_containers_tail = pins_containers[len]
  let pins_colors = pins_containers_tail.querySelectorAll("[data-color]") 
  if (pins_colors.length === 4) pins_containers_tail.classList.add("complete") 
  else return

  // XXX fare il check dei colori e delle posizioni
  // XXX mostrare il risultato in caso di successo
  if (is_found_combination()) true
  else _selected_colors_ = []
}

function init_game() {
  new_game()
}

document.addEventListener("DOMContentLoaded", () => {
  _board_ = document.querySelector(".board").innerHTML
  init_game()
})
