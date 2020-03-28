import { get_next_point_in_line } from "./utils.js";

// ZOOM FEATURE

// zooming is achieved by zooming over origin and
// translating origin towards the pointer for zoom out and away for zoom in

export function zoom(axes, func) {
  let zoom_direction = 0;
  let zoom_sensitivity = 10;
  canvas.addEventListener("wheel", zoom_event_handler, false);

  function zoom_event_handler(e) {
    zoom_direction = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    // zoom in = 1 , zoom out = -1
    axes.grid_space += zoom_direction;

    if (axes.grid_space % axes.redraw_window === 0) {
      axes.zoom_factor *= Math.pow(2, -1 * zoom_direction);
    }
    let p1 = { x: e.pageX, y: e.pageY };
    let p2 = { x: axes.origin_x, y: axes.origin_y };

    // get new point in line and update origin
    let next_origin = get_next_point_in_line(
      p1,
      p2,
      zoom_direction * zoom_sensitivity
    );
    axes.origin_x = next_origin.x;
    axes.origin_y = next_origin.y;

    axes.grid_space = parseInt(
      (axes.grid_space % axes.redraw_window) + axes.redraw_window,
      10
    );
    func(); // redraw canvas
  }
}
