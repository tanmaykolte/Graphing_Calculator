// handles number format for integer and float upto 2 decimal
export function num_format(n) {
  if (Number.isInteger(n)) {
    return parseInt(n, 10);
  } else {
    return parseFloat(n).toPrecision(2);
  }
}

// given two points, get a point inline with distance d from p1
// used for zoom logic
export function get_next_point_in_line(p1, p2, d) {
  let p3 = { x: 0, y: 0 };
  let t;
  let dist = distance_between(p1.x, p1.y, p2.x, p2.y);
  t = Math.abs((dist + d) / dist);
  if (dist < 10) {
    return p1;
  }
  p3.x = parseInt((1 - t) * p1.x + t * p2.x, 10);
  p3.y = parseInt((1 - t) * p1.y + t * p2.y, 10);
  return p3;
}

// get distance between two points
export function distance_between(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// generate hex random color
export function get_random_color() {
  var letters = "4E69AB".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
