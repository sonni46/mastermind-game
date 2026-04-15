function mastermind_get_pins_containers() {
  let pins_containers = document.getElementById("js_try_board").querySelectorAll(".pins_container")
  pins_containers = Array.from(pins_containers).filter(cont_pin => !cont_pin.classList.contains("completed"))
  return pins_containers
}