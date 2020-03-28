export function drag(canvas, axes, func) {
  let drag;
  let offset_x = 0;
  let offset_y = 0;

  // handle dragging feature
  canvas.addEventListener("mousedown", mousedown, false);
  canvas.addEventListener("mouseup", mouseup, false);
  canvas.addEventListener("mousemove", mousemove, false);

  function mousedown(e) {
    offset_x = e.pageX;
    offset_y = e.pageY;
    drag = true;
  }
  function mouseup(e) {
    drag = false;
  }
  function mousemove(e) {
    if (drag) {
      axes.origin_x += parseInt(e.pageX - offset_x, 10);
      axes.origin_y += parseInt(e.pageY - offset_y, 10);
      offset_x = e.pageX;
      offset_y = e.pageY;

      func(); // callback function
    }
  }
}
