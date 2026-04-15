function mastermind_allert_game(txt) {  
  let feed_cont = document.getElementById("feedback_container") 
  if (feed_cont.innerText.length > 0) return
  feed_cont.innerText = txt
}

function mastermind_select_color(el) {
  let color = el.getAttribute("data-color");
  let pins_containers = mastermind_get_pins_containers();
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

function mastermind_check_color() {
  let pins_containers = mastermind_get_pins_containers()
  let len = pins_containers.length - 1
  
  if (len === 0) {
    mastermind_check_position_color()
    mastermind_wrong_position()
    return mastermind_allert_game("You lost game")
  } 

  let pins_containers_tail = pins_containers[len]
  let pins_colors = pins_containers_tail.querySelectorAll("[data-color]") 
  let is_all_colored = pins_colors.length === 4
  
  if ( is_all_colored && is_found_combination()) return mastermind_allert_game("You won game")
  else if (is_all_colored) mastermind_render_wrong_position() 
  if (is_all_colored) pins_containers_tail.classList.add("completed") 
}

function mastermind_reset_game() {
  render_mastermind_try_board()
  mastermind_allert_game("New game loaded")
  mastermind_new_game()
}

function mastermind_delete_color() {
  let pins_containers = mastermind_get_pins_containers()
  let end_pins = pins_containers.length - 1;
  if (end_pins === -1) return;
  let pins_containers_tail = pins_containers[end_pins].querySelectorAll("[data-color]");
  let last_color = pins_containers_tail.length - 1
  if (last_color === -1) return
  pins_containers_tail[last_color].removeAttribute("data-color");
  _selected_colors_.pop()
}