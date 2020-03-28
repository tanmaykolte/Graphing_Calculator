import { math_function } from "./math_function.js";

// Wave class : handles all sine waves and its properties
export function Wave(
  startX,
  startY,
  canvas,
  color,
  time,
  width,
  amplitude,
  phase
) {
  let wave = this;
  wave.startX = startX;
  wave.startY = startY;
  wave.time = time || 2;
  wave.width = width || 10;
  wave.amplitude = amplitude || 1;
  wave.phase = phase || 0;
  wave.canvas = canvas;
  wave.context = canvas.getContext("2d");
  wave.color = color || "#4E69AB";
  wave.linewidth = 5;
  wave.resolution = 0.01;
  wave.scale_factor = null;
  wave.x_points = []; // all x points on sine wave
  wave.y_points = []; // all y points on sine wave
}

// plotting waves on canvas with zoom/scale factor
Wave.prototype.draw = function(origin_x, origin_y, scale_factor) {
  let wave = this; // base
  wave.scale_factor = scale_factor;
  wave.startX = origin_x;
  wave.startY = origin_y;
  let c = wave.context;
  c.beginPath();
  c.strokeStyle = wave.color;
  c.lineWidth = wave.linewidth;

  wave.x_points = [];
  wave.y_points = []; // clean previous sine points

  c.beginPath();
  c.moveTo(wave.startX, wave.startY);

  for (let i = 0; i < wave.width; i += wave.resolution) {
    // x coordinates
    let point_x = wave.startX + i * scale_factor;
    // y coordinates
    let point_y = wave.startY + math_function(i, wave) * scale_factor;

    c.lineTo(point_x, point_y);
    wave.x_points.push(parseInt(point_x, 10)); // update sine points
    wave.y_points.push(parseInt(point_y, 10));
  }
  c.stroke();
  c.lineWidth = 1;
};
