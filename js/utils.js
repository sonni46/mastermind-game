function get_mastermind_try_board_node() {
  return document.querySelector(".js_mastermind_try_board");
}

function mastermind_get_pins_containers() {
  return get_mastermind_try_board_node().querySelectorAll(".pins_container");
}

function mastermind_get_pins_containers_no_completed() {
  let pins_containers = get_mastermind_try_board_node().querySelectorAll(".pins_container")
  pins_containers = Array.from(pins_containers).filter(cont_pin => !cont_pin.classList.contains("completed"))
  return pins_containers
}