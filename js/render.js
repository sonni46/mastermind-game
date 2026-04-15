function init_mastermind_render() {
  render_mastermind_try_board()
}

function render_mastermind_try_board() {
  let try_board = document.getElementById("js_try_board")
  if (try_board.children.length) try_board.innerHTML = ""
  for (let i = 0; i < 10; i++) {
    try_board.innerHTML += mastermind_pins_container_tmpl()
  }
}

function create_small_pin(staus) {
  let pins_containers = mastermind_get_pins_containers()
  let len = pins_containers.length - 1
  if (len === -1) return 
  let pin = document.createElement("div")
  pin.classList.add(`small_pin`)
  pin.classList.add(staus)
  pins_containers[len].querySelector(".pins_right").append(pin) 
}

function mastermind_render_wrong_position() {  
  mastermind_wrong_position()
  _selected_colors_ = []
  _position_color_ = []
}