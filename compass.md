## Compass overkill v1!

![Compass](https://github.com/user0451/Truckers-GPS-Pro/blob/master/media/compass2.gif)

A little engine to position and style the compass directions based on the current heading of the truck. This will allow us to keep the directions upright and readable as the truck turns, and also allow us to scale and fade them based on their distance from the top of the compass, bringing depth of field to the compass.

``` js
const centre = 48; // centre of the compass in pixels (ie, the centre of the compass circle)
const radius = 42; // radius of the compass in pixels (ie, distance from centre to our N/S/E/W icons)

function moveLeft(direction) {
	const offset = offsetByCardinalDirection(direction);
	return Math.round(centre - Math.sin((offset - getHeading()) * Math.PI / 180) * radius);
}
// Because we need to invert the E/W directions when positioning them on the screen, 
// I've chosen to invert the E/W directions in the offsetByCardinalDirection function, 
// and then use -sin and -cos here to get the correct screen positions. 
// I could have used +sin and +cos, and then inverted the N/S directions, but it seems cleaner to invert the E/W.
function moveTop(direction) {
	const offset = offsetByCardinalDirection(direction);
	return Math.round(centre - Math.cos((offset - getHeading()) * Math.PI / 180) * radius);
}

function fontSize(direction, min = 8) {
	const minFontSize = min;
	const fontSizeRange = 10;
	const minAngle = 80;
	const maxAngle = 280;
	return evaluateHeadingScale(direction, minFontSize, fontSizeRange, minAngle, maxAngle);
}

function opacity(direction, min = 20) {
	const minOpacity = min; //variable, so we can set it to 0 for the flat horizonal compass layout; really, we want the min/max angles exposed too
	const opacityRange = 100 - minOpacity;
	const minAngle = 110;
	const maxAngle = 250;
	return evaluateHeadingScale(direction, minOpacity, opacityRange, minAngle, maxAngle);
}
```

Each of these functions take a direction (N, S, NE, etc) and return a value based on the current heading of the truck. We can then use them in the overlay to position and style each compass direction. For example:

- moveLeft('N') will return the left screen position for the N textbox on the compass,
- moveTop('N') will return the top screen position for the N textbox,
- fontSize('N') will return a font size for the N textbox based on the compasses field of view, and
- opacity('N') will return a opacity for the N textbox, again based on the compasses field of view.

And so four textboxes (eight, if you wanna go nuts!) can be positioned and styled based on the current heading of the truck, keeping our directions upright and readable as the truck turns.

``` js
// ---------- Helpers ----------

// Sometimes, when screen coordinates meet map coordinates, confusion ensues; at least in my brain. 
// We need to rotate either N/S or E/W by 180 degrees to get the right result. I chose to rotate E/W by 180 degrees.
function offsetByCardinalDirection(direction) {
	//should make sure the input is valid...
	return ucase(direction).includes('E') || ucase(direction).includes('W') ?
		getDirectionalOffset(direction, true) : getDirectionalOffset(direction);
}

// This function takes a direction and returns a value between minScaleValue and maxScaleValue 
// based on the current heading of the truck. 
// The minAngle and maxAngle define the range of angles where the scale value will be at its minimum. 
// Outside of this range, the scale value will increase towards maxScaleValue. 
// This contrived function is really here because opacity and fontSize both require the exact same logic, so may as well wrap it for both.
function evaluateHeadingScale(direction, minScaleValue, maxScaleValue, minAngle, maxAngle) {
	const heading = (getDirectionalOffset(direction) + getHeading()) % 360;
	if (heading >= minAngle && heading <= maxAngle) {return minScaleValue;} // Keep the lower half(ish) at minimum value
	let angle = heading > maxAngle ? heading - 360 : heading; // fallback if angle is greater than maxAngle
	let scale = Math.cos((angle / minAngle) * Math.PI / 2);
	return Math.round(minScaleValue + scale * maxScaleValue);
}

// ATS/ETS2 returns 0-1 based on the current heading of the truck. 0/1 is North, 0.75 is East, 0.5 is South, and 0.25 is West. 
// Multiplying by 360 gives us a value in degrees, which is what we need for our compass calculations.
function getHeading() {
	return $prop('GameRawData.TruckValues.CurrentValues.PositionValue.Orientation.Heading') * 360;
}

// This function takes a direction and returns the offset in degrees from North. 
// If invert is true, it will return the offset in the opposite direction (ie, 90 instead of 270). 
// This way, we can hide all the logic for swapping the E/W directions in one place, and keep the dashboard/overlay code really simple. 
// The offsets are based on a compass, where North is 0 degrees, East is 90 degrees, South is 180 degrees, and West is 270 degrees.
function getDirectionalOffset(direction, invert = false) {
	const offsets = {
		N: 0,
		NE: 45,
		E: 90,
		SE: 135,
		S: 180,
		SW: 225,
		W: 270,
		NW: 315
	};
	let offset = offsets[ucase(direction)] ?? 0;
	return invert ? (360 - offset) % 360 : offset;
}

// TODO: Future me, if you can be bothered: 
// - I haven't really dealt with the slight offset of the directions as they move around the compass. 
// due to them being in a text box. We could add a pixel here and there to adjust; but it's minor, alright for now I think, with current font and radius hiding the sins...
// - more or less zero error handling; if the direction is invalid, it will return 0.
// - am I sure I've understood the inversion correctly? It works, but have I over-complicated it...
```
