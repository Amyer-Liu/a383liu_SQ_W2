# Week 2 Camel Escape

## What This Code Demonstrates

- **Player object** — groups all player data (position, velocity, size, tuning values) into one object instead of separate variables
- **`keyIsDown()`** — checks if a key is held this frame, allowing smooth continuous movement; different from `keyPressed()` which fires once per press
- **Velocity** — instead of moving the player directly, we add to `vx` and `vy` each frame and then apply them to position, giving movement a natural feel
- **`constrain()`** — clamps a value within a min and max range; used here to cap horizontal speed
- **Friction** — multiplying velocity by a value less than 1 each frame gradually slows the player when no key is pressed
- **Gravity** — adding a constant to `vy` every frame pulls the player downward
- **Floor collision** — checks if the player has passed below the floor and snaps them back up
- **Platform collision** — (AABB detection) — checks overlap between the camel and platforms to determine when the player lands on a surface.
- **Custom platform mechanic** - (boost platform) — when the camel lands on the orange boost platform, it triggers a temporary speed increase and activates a timer-based state.
- **Timer system (boostTimer)** — counts down frame-by-frame to control how long the speed boost effect lasts.
- **`noise()`** — returns smooth random values used to wobble the blob's edges organically
- **`map()`** — converts a value from one range to another; used here to turn noise output into a pixel offset
- **`push()` / `pop()`** — save and restore drawing settings so styles in one function don't affect others
- **`beginShape()` / `endShape()`** — draw a custom polygon by specifying each vertex individually
- **translate() + scale()** — flips the camel sprite horizontally when moving left, so the character faces the correct direction.
- **sin() (used in animation)** — creates a pulsing glow effect on the boost platform for visual feedback.

## Setup and Interaction Instructions

To run the sketch locally, open `index.html` in Google Chrome using Live Server.

**Controls:**

- Move left/right: Arrow Keys or A/D
- Jump: Up Arrow or W

**Opening the Chrome Console**

- **Windows:** Press `F12` or `Ctrl + Shift + J`, then click the **Console** tab
- **Mac:** Press `Cmd + Option + J`

The console will show any errors in your sketch.

**Game Mechiane**
Use the keyboard to move the camel and jump across platforms. Landing on the speed boost platform increases the camel’s running speed for 3 seconds, controlled by a timer.

## Assets
Two image assets are being used: background.jpg and Camel.png.

## References

Kandoo Adventures. (2025, August 27). Our Guide to Visiting the Sahara Desert. https://www.kandooadventures.com/blog/our-guide-to-visiting-the-sahara-desert-1213.html

The lonely domestic camel isolated on white. (2017, March 5). IStock; ~UserGI15633745. https://www.istockphoto.com/photo/the-lonely-domestic-camel-isolated-on-white-gm648474610-117727857?utm_source=pixabay&utm_medium=affiliate&utm_campaign=sponsored_image&utm_content=srp_grid_media&utm_term=camel
