export function Controls(axes, draw) {
  // base
  let ctrl = this;
  ctrl.wave = null;
  ctrl.draw = draw;
  ctrl.axes = axes;

  // hide/show controls
  ctrl.hide_time = document.getElementById("hide_time_setting");
  ctrl.hide_amp = document.getElementById("hide_amp_setting");
  ctrl.hide_width = document.getElementById("hide_width_setting");
  ctrl.hide_phase = document.getElementById("hide_phase_setting");

  // time setting
  ctrl.time_val = document.getElementById("time_val");
  ctrl.time_slider = document.getElementById("time_slider");
  ctrl.time_max = document.getElementById("time_max");
  ctrl.time_min = document.getElementById("time_min");
  ctrl.time_step = document.getElementById("time_step");

  // amplitude setting
  ctrl.amplitude_val = document.getElementById("amp_val");
  ctrl.amplitude_slider = document.getElementById("amp_slider");
  ctrl.amplitude_max = document.getElementById("amp_max");
  ctrl.amplitude_min = document.getElementById("amp_min");
  ctrl.amplitude_step = document.getElementById("amp_step");

  // width setting
  ctrl.width_val = document.getElementById("width_val");
  ctrl.width_slider = document.getElementById("width_slider");
  ctrl.width_max = document.getElementById("width_max");
  ctrl.width_min = document.getElementById("width_min");
  ctrl.width_step = document.getElementById("width_step");

  // phase setting
  ctrl.phase_val = document.getElementById("phase_val");
  ctrl.phase_slider = document.getElementById("phase_slider");
  ctrl.phase_max = document.getElementById("phase_max");
  ctrl.phase_min = document.getElementById("phase_min");
  ctrl.phase_step = document.getElementById("phase_step");

  // arrow keys setting
  ctrl.arrow_keys = document.getElementById("arrow_keys");
  ctrl.key_shift = 50;
}
Controls.prototype.init = function() {
  let ctrl = this;
  ctrl.hide();
  ctrl.time_init();
  ctrl.amplitude_init();
  ctrl.width_init();
  ctrl.phase_init();
  ctrl.arrow_keys_init();
  ctrl.grid_controls_init();
  ctrl.disable_if_no_waves();
};

// Controls method for hide/show coontrol setting
Controls.prototype.hide = function() {
  let ctrl = this;
  ctrl.hide_time.addEventListener("click", () => {
    toggle_setting("ctrl_1");
  });
  ctrl.hide_amp.addEventListener("click", () => {
    toggle_setting("ctrl_2");
  });
  ctrl.hide_width.addEventListener("click", () => {
    toggle_setting("ctrl_3");
  });
  ctrl.hide_phase.addEventListener("click", () => {
    toggle_setting("ctrl_4");
  });

  function toggle_setting(id) {
    let x = document.getElementById(id);
    if (x.style.display !== "none") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }
};

// Controls method for time control of a wave
Controls.prototype.time_init = function() {
  // base
  let ctrl = this;
  // SLIDER TIME INPUTS

  ctrl.time_val.addEventListener("input", update_time_input);
  ctrl.time_slider.addEventListener("input", update_time_slider);
  ctrl.time_min.addEventListener("input", update_time_setting);
  ctrl.time_max.addEventListener("input", update_time_setting);
  ctrl.time_step.addEventListener("input", update_time_setting);

  function update_time_input(e) {
    let value = e.target.value;
    ctrl.time_slider.value = value;
    ctrl.wave.time = value;
    ctrl.draw();
  }
  function update_time_slider(e) {
    let value = e.target.value;
    ctrl.time_val.value = value;
    ctrl.wave.time = value;
    ctrl.draw();
  }
  function update_time_setting(e) {
    let value = e.target.id;
    if (value === "time_min") {
      ctrl.time_slider.min = value;
    } else if (value === "time_max") {
      ctrl.time_slider.max = value;
    } else {
      ctrl.time_slider.step = value;
    }
  }
};

// Controls method for amplitude control of a wave
Controls.prototype.amplitude_init = function() {
  // base
  let ctrl = this;
  // SLIDER Amplitude INPUTS
  ctrl.amplitude_val.addEventListener("input", update_amp_input);
  ctrl.amplitude_slider.addEventListener("input", update_amp_slider);
  ctrl.amplitude_min.addEventListener("input", update_amp_setting);
  ctrl.amplitude_max.addEventListener("input", update_amp_setting);
  ctrl.amplitude_step.addEventListener("input", update_amp_setting);

  function update_amp_input(e) {
    let value = e.target.value;
    ctrl.amplitude_slider.value = value;
    ctrl.wave.amplitude = value;
    ctrl.draw();
  }
  function update_amp_slider(e) {
    let value = e.target.value;
    ctrl.amplitude_val.value = value;
    ctrl.wave.amplitude = value;
    ctrl.draw();
  }
  function update_amp_setting(e) {
    let value = e.target.id;
    if (value === "amp_min") {
      ctrl.amplitude_slider.min = value;
    } else if (value === "amp_max") {
      ctrl.amplitude_slider.max = value;
    } else {
      ctrl.amplitude_slider.step = value;
    }
  }
};

// Controls method for width control of a wave
Controls.prototype.width_init = function() {
  // base
  let ctrl = this;
  // SLIDER Width INPUTS
  ctrl.width_val.addEventListener("input", update_width_input);
  ctrl.width_slider.addEventListener("input", update_width_slider);
  ctrl.width_min.addEventListener("input", update_width_setting);
  ctrl.width_max.addEventListener("input", update_width_setting);
  ctrl.width_step.addEventListener("input", update_width_setting);

  function update_width_input(e) {
    let value = e.target.value;
    ctrl.width_slider.value = value;
    ctrl.wave.width = value;
    ctrl.draw();
  }
  function update_width_slider(e) {
    let value = e.target.value;
    ctrl.width_val.value = value;
    ctrl.wave.width = value;
    ctrl.draw();
  }
  function update_width_setting(e) {
    let value = e.target.id;
    if (value === "width_min") {
      ctrl.width_slider.min = value;
    } else if (value === "width_max") {
      ctrl.width_slider.max = value;
    } else {
      ctrl.width_slider.step = value;
    }
  }
};

// Controls method for phase control of a wave
Controls.prototype.phase_init = function() {
  //base
  let ctrl = this;
  // SLIDER Phase INPUTS
  ctrl.phase_val.addEventListener("input", update_phase_input);
  ctrl.phase_slider.addEventListener("input", update_phase_slider);
  ctrl.phase_min.addEventListener("input", update_phase_setting);
  ctrl.phase_max.addEventListener("input", update_phase_setting);
  ctrl.phase_step.addEventListener("input", update_phase_setting);

  function update_phase_input(e) {
    let value = e.target.value;
    ctrl.phase_slider.value = value;
    ctrl.wave.phase = value;
    ctrl.draw();
  }
  function update_phase_slider(e) {
    let value = e.target.value;
    ctrl.phase_val.value = value;
    ctrl.wave.phase = value;
    ctrl.draw();
  }
  function update_phase_setting(e) {
    let value = e.target.id;
    if (value === "phase_min") {
      ctrl.phase_slider.min = value;
    } else if (value === "phase_max") {
      ctrl.phase_slider.max = value;
    } else {
      ctrl.phase_slider.step = value;
    }
  }
};

// Controls method for arrow keys (left-bottom feature)
Controls.prototype.arrow_keys_init = function() {
  // base
  let ctrl = this;
  // control with arrows

  ctrl.arrow_keys.addEventListener("click", arrow_key_handler);

  function arrow_key_handler(e) {
    let key = e.target.id;
    switch (key) {
      case "up_arrow":
        ctrl.axes.origin_y -= ctrl.key_shift;
        ctrl.draw();
        break;
      case "left_arrow":
        ctrl.axes.origin_x -= ctrl.key_shift;
        ctrl.draw();
        break;
      case "right_arrow":
        ctrl.axes.origin_x += ctrl.key_shift;
        ctrl.draw();
        break;

      case "down_arrow":
        ctrl.axes.origin_y += ctrl.key_shift;
        ctrl.draw();
        break;
      case "reset":
        ctrl.axes.reset();
        ctrl.draw();
        break;
      default:
        break;
    }
  }
};

// Controls method for grid / semi-grid (on/off) panel
Controls.prototype.grid_controls_init = function() {
  let ctrl = this;

  let grid_btn = document.getElementById("grid_btn");
  let semigrid_btn = document.getElementById("semigrid_btn");
  grid_btn.addEventListener("click", toggleGrid);
  semigrid_btn.addEventListener("click", toggleSemiGrid);

  function toggleGrid(e) {
    let isGridOn = ctrl.axes.grid_status;

    isGridOn = !isGridOn;
    if (!isGridOn) {
      grid_btn.innerText = "toggle_off";
      grid_btn.style.color = "black";
    } else {
      grid_btn.innerText = "toggle_on";
      grid_btn.style.color = "#90d429";
    }
    ctrl.axes.grid_status = isGridOn;
    ctrl.draw();
  }
  function toggleSemiGrid(e) {
    let isSemiGridOn = ctrl.axes.semigrid_status;
    isSemiGridOn = !isSemiGridOn;
    if (!isSemiGridOn) {
      semigrid_btn.innerText = "toggle_off";
      semigrid_btn.style.color = "black";
    } else {
      semigrid_btn.innerText = "toggle_on";
      semigrid_btn.style.color = "#90d429";
    }
    ctrl.axes.semigrid_status = isSemiGridOn;
    ctrl.draw();
  }
};

// Controls method for disabling control panel if no waves in list
Controls.prototype.disable_if_no_waves = function() {
  // base
  let ctrl = this;
  // check if no waves
  let state = ctrl.axes.waves.length === 0;
  let input_ele = document
    .getElementById("controls")
    .getElementsByTagName("input");

  for (let i = 0; i < input_ele.length; i++) {
    input_ele[i].disabled = state;
  }
};
