import { num_format, get_random_color, distance_between } from "./utils.js";
import { Wave } from "./wave.js";
import { drag } from "./drag_layout.js";
import { zoom } from "./zoom_layout.js";

export function Axes(
  origin_x,
  origin_y,
  canvas,
  grid_space,
  draw,
  semi_grid,
  factor,
  redraw_window,
  direction,
  controls
) {
  let ax = this;
  ax.origin_x = origin_x;
  ax.origin_y = origin_y;
  ax.grid_space = grid_space;
  ax.semi_grid = semi_grid || 5;
  ax.zoom_factor = factor || 1;
  ax.zoom_direction = direction || 0;
  ax.redraw_window = redraw_window || 20;
  ax.context = canvas.getContext("2d");
  ax.canvas = canvas;
  ax.grid_color = "#ddd";
  ax.semi_grid_color = "#aaa";
  ax.grid_status = true;
  ax.semigrid_status = true;
  ax.waves = []; // list of wells to display
  ax.wave_num = 0;
  ax.close_buttons = []; // list of close btn of waves
  ax.setting_buttons = []; // list of setting btn of waves
  ax.draw = draw || null;
  ax.controls = controls || null;
  ax.disable_controls();
}

Axes.prototype.disable_controls = function(state) {};
// initiate Axes Class
Axes.prototype.init = function() {
  let ax = this; // base
  // start all axes features
  drag(ax.canvas, ax, ax.draw);
  zoom(ax, ax.draw);
  ax.add_waves();
  ax.remove_wave();
  ax.tooltip_init();
};

// draw x-y axis lines
Axes.prototype.draw_axis = function() {
  let ax = this; // base
  let c = ax.context;
  c.beginPath();
  c.lineWidth = 1;
  c.strokeStyle = "#000";
  c.moveTo(0, ax.origin_y);
  c.lineTo(ax.canvas.width, ax.origin_y);
  c.moveTo(ax.origin_x, 0);
  c.lineTo(ax.origin_x, ax.canvas.height);
  c.stroke();
};

// draw grid lines
Axes.prototype.draw_grid_init = function(spacing, color) {
  let ax = this; // base
  let c = ax.context;

  c.beginPath();
  c.strokeStyle = color;
  // positive x grid
  for (let i = ax.origin_y; i > 0; i -= spacing) {
    c.moveTo(0, i);
    c.lineTo(ax.canvas.width, i);
  }
  // negative x grid
  for (let i = ax.origin_y; i <= ax.canvas.height; i += spacing) {
    c.moveTo(0, i);
    c.lineTo(ax.canvas.width, i);
  }
  // positive y grid
  for (let i = ax.origin_x; i <= ax.canvas.width; i += spacing) {
    c.moveTo(i, 0);
    c.lineTo(i, ax.canvas.height);
  }
  // negative y grid
  for (let i = ax.origin_x; i > 0; i -= spacing) {
    c.moveTo(i, 0);
    c.lineTo(i, ax.canvas.height);
  }

  c.stroke();
};

// draw label numbers on x-y axis
Axes.prototype.draw_axis_label = function() {
  let ax = this; // base

  let spacing = ax.grid_space * ax.semi_grid;
  let c = ax.context;
  let curr_label = 0;
  let offset_label_x = -12;
  let offset_label_y = 18;
  let origin_val = 0;

  c.textAlign = "center";
  c.font = "17px Arial";
  c.fillText(
    origin_val,
    ax.origin_x + offset_label_x,
    ax.origin_y + offset_label_y
  );
  // positive x labels
  curr_label = origin_val;
  for (let i = ax.origin_y; i > 0; i -= spacing) {
    c.fillText(
      num_format((curr_label + 1) * ax.zoom_factor),
      ax.origin_x + offset_label_x,
      i - spacing + offset_label_y * 0.4
    ); // x & y coordinates for labels
    curr_label++;
  }
  // negative x labels
  curr_label = origin_val;
  for (let i = ax.origin_y; i <= ax.canvas.height; i += spacing) {
    c.fillText(
      num_format((curr_label - 1) * ax.zoom_factor),
      ax.origin_x + offset_label_x,
      i + spacing + offset_label_y * 0.4
    );
    curr_label--;
  }
  // positive y labels
  curr_label = origin_val;
  for (let i = ax.origin_x; i <= ax.canvas.width; i += spacing) {
    c.fillText(
      num_format((curr_label + 1) * ax.zoom_factor),
      i + spacing,
      ax.origin_y + offset_label_y
    );
    curr_label++;
  }
  // negative y labels
  curr_label = origin_val;
  // negative y grid
  for (let i = ax.origin_x; i > 0; i -= spacing) {
    c.fillText(
      num_format((curr_label - 1) * ax.zoom_factor),
      i - spacing,
      ax.origin_y + offset_label_y
    );
    curr_label--;
  }
};

// reset axes class to default
Axes.prototype.reset = function() {
  let ax = this; // base
  ax.grid_space = 20;
  ax.zoom_direction = 0;
  ax.zoom_factor = 1;
  ax.origin_x = ax.canvas.width / 3;
  ax.origin_y = ax.canvas.height / 2;
};

// draw grid wrapper
Axes.prototype.draw_grid = function() {
  let ax = this;
  if (ax.grid_status) {
    ax.draw_grid_init(ax.grid_space, ax.grid_color);
  }
};

// draw semi grid wrapper
Axes.prototype.draw_semigrid = function() {
  let ax = this;
  if (ax.semigrid_status) {
    ax.draw_grid_init(ax.grid_space * ax.semi_grid, ax.semi_grid_color);
  }
};

// add waves to list
Axes.prototype.add_waves = function() {
  let ax = this; // base
  document
    .getElementById("add_wave_btn")
    .addEventListener("click", e => add_wave_handler(ax));
};

// deleting wave from DOM and waves list
Axes.prototype.remove_wave = function() {
  let ax = this; // base
  document.body.addEventListener("click", e => remove_wave_handler(e), false);

  function remove_wave_handler(e) {
    let clicked_id = e.target.id;
    remove_wave_element_dom(ax, clicked_id);
    update_wave_controls(ax, clicked_id);
  }
};

// initiating Tooltip feature
Axes.prototype.tooltip_init = function() {
  let ax = this;
  canvas.addEventListener("mousemove", e => {
    tooltip_handler(e, ax.waves);
  });
};

// HELPER FUNCTIONS

function add_wave_handler(ax) {
  let color = get_random_color();
  let random = 1.5; // added to new wave amplitude
  ax.wave_num += 1;

  // append wave to waves list
  let wave = new Wave(
    ax.origin_x,
    ax.origin_y,
    ax.canvas,
    color,
    ax.waves.length + random
  );
  ax.waves.push(wave);
  add_new_wave_element(color, ax); // create DOM element
  ax.draw();
}

// creates DOM element with new sine wave
function add_new_wave_element(color, ax) {
  let parent = document.getElementById("add_wave_parent");
  let div = document.createElement("div");
  div.className = "add_wave";
  div.style.backgroundColor = color;

  // button to edit wave
  let span = document.createElement("span");
  span.className = "material-icons";
  span.id = `wave_${ax.wave_num}`;
  ax.setting_buttons.push(`wave_${ax.wave_num}`);
  span.innerHTML = "settings";

  // button to remove wave
  let close = document.createElement("span");
  close.className = "material-icons close";
  close.id = `close_${ax.wave_num}`;
  ax.close_buttons.push(`close_${ax.wave_num}`);
  close.innerHTML = "clear";

  let h3 = document.createElement("h3");
  h3.innerText = `Wave ${ax.wave_num}`;

  div.appendChild(close);
  div.appendChild(h3);
  div.appendChild(span);

  parent.parentNode.insertAdjacentElement("beforeend", div);
}

function remove_wave_element_dom(ax, clicked_id) {
  if (ax.close_buttons.includes(clicked_id)) {
    let idx = ax.close_buttons.indexOf(clicked_id);
    if (idx !== -1) {
      // remove sine wave from lists
      ax.close_buttons.splice(idx, 1);
      ax.waves.splice(idx, 1);
      ax.setting_buttons.splice(idx, 1);
    }
    let remove_ele = document.querySelector(`#${clicked_id}`);
    if (remove_ele) {
      remove_ele.parentNode.parentNode.removeChild(remove_ele.parentNode);
    }
    ax.controls.disable_if_no_waves(); // enable controls
    ax.draw();
  }
}

function update_wave_controls(ax, clicked_id) {
  if (ax.setting_buttons.includes(clicked_id)) {
    let idx = ax.setting_buttons.indexOf(clicked_id);
    if (idx !== -1) {
      let wave_selected = ax.waves[idx];
      ax.controls.wave = wave_selected;
      document.querySelector(
        "#controls"
      ).style.backgroundColor = `${wave_selected.color}99`;
      update_slider(wave_selected);
      ax.controls.disable_if_no_waves(); // enable controls
    }
  }
}

function tooltip_handler(e, waves) {
  let tooltip = document.getElementById("tooltip");
  let ex = e.clientX;
  let ey = e.clientY;
  let nearest_x = null;
  let nearest_y = null;
  let min_dist = Number.MAX_SAFE_INTEGER;
  let tip_color = null;

  // iterate through all sine waves and all points on waves
  for (let w = 0; w < waves.length; w++) {
    for (let i = 0; i < waves[w].x_points.length; i++) {
      let dist = distance_between(
        ex,
        ey,
        waves[w].x_points[i],
        waves[w].y_points[i]
      );
      if (dist < min_dist) {
        min_dist = dist;
        tip_color = waves[w].color;
        nearest_x = waves[w].x_points[i];
        nearest_y = waves[w].y_points[i];
      }
    }
  }
  // radius of hover pointer
  let radius_hover = 10;
  if (min_dist > radius_hover) {
    tooltip.style.display = "none";
    return;
  }
  let ox = waves[0].startX;
  let oy = waves[0].startY;

  // tooltip DOM element
  tooltip.style.display = "flex";
  tooltip.style.top = `${ey - 50}px`;
  tooltip.style.left = `${ex + 20}px`;
  let x_value = num_format((nearest_x - ox) / waves[0].scale_factor);
  let y_value = num_format((oy - nearest_y) / waves[0].scale_factor);
  tooltip.innerHTML = `x:${x_value} y:${y_value}`;
  tooltip.style.background = tip_color;
}

// update slider and its values with selected sine wave
function update_slider(wave_selected) {
  document.getElementById("time_val").value = wave_selected.time;
  document.getElementById("time_slider").value = wave_selected.time;
  document.getElementById("amp_val").value = wave_selected.amplitude;
  document.getElementById("amp_slider").value = wave_selected.amplitude;
  document.getElementById("width_val").value = wave_selected.width;
  document.getElementById("width_slider").value = wave_selected.width;
  document.getElementById("phase_val").value = wave_selected.phase;
  document.getElementById("phase_slider").value = wave_selected.phase;
}
