import { Axes } from "./axes.js";
import { Controls } from "./control_panel.js";

window.onload = function() {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // default settings
  let grid_space = 20;
  let origin_x = canvas.width / 3;
  let origin_y = canvas.height / 2;

  // initiate
  let axes = new Axes(origin_x, origin_y, canvas, grid_space, draw);
  let ctrl = new Controls(axes, draw);

  axes.controls = ctrl; // attaching controls to axes

  // execute
  draw();
  axes.init();
  ctrl.init();

  function draw() {
    let scale_factor = (axes.grid_space * axes.semi_grid) / axes.zoom_factor; // zoom factor

    context.clearRect(0, 0, canvas.width, canvas.height); // clear screen
    axes.draw_grid();
    axes.draw_semigrid();
    axes.draw_axis();

    // draw all sine waves
    axes.waves.forEach(sine => {
      sine.draw(axes.origin_x, axes.origin_y, scale_factor);
    });

    axes.draw_axis_label();
  }
};
