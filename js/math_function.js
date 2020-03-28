// SINE FUNCTION

export function math_function(x, wave) {
  // get values
  let { amplitude, time, phase } = wave;

  // input
  let rad = ((2 * Math.PI) / time) * (x - phase);

  // function
  return -amplitude * Math.sin(rad);
}
