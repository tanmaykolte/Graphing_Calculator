# Graphing Calculator

This is a web application for graphing sine waves and playing with its parameters such as Time, Amplitude, Duration of the signal and Phase offset. This application is written in vanila javascript and HTML Canvas.

## Use

There's a control panel on the left, click on **add new sine waves** and play with it. You can drag and zoom the coordinate system with mouse wheel and click. You have an option to choose between grid lines and rulers. Also navigate on axes using arrow keys on screen (right-bottom)

## Sine Waves

Sine waves are generated with random colors, hover over them to get their x,y values. Start playing with the parameters by clicking on settings icon next to wave you wish to edit. Control Panel remains disabled until you choose a wave to edit. Control Panel changes its color to the wave color.

## Parameters

Each parameter supports slider or user to enter values, click on setting icon to open up slider settings , minimum and maximum value of the slider and its steps.

## SERVER

Run a simple python server to start the application locally.

```python
python server.py
```

You can find the localhost URL at the output.
