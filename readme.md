## Truckers GPS PRO: Dashboard and Overlays for ETS2 and ATS
This is a custom dashboard and set of overlays for Euro Truck Simulator 2 (ETS2) and American Truck Simulator (ATS) created using Simhub. The dashboard and overlays are designed to provide additional information about the world around you while you are driving, such as your location, ETA, rest stops, fuel stops, and more. The dashboard is designed to be used on a separate screen, while the overlays can be used on the main game screen to provide additional information without taking up too much space.


### About
https://www.simhubdash.com/

I use this program to create a dashboard for ETS2 and ATS. A dashboard is like an additional screen that can link to and display live information from certain games as well as send information to that game, so we could push a button for example to perform some function, such as switching the truck lights on and off.

The aim of this dashboard is not to focus on the truck however (lots of lovely buttons, knobs and dials), but rather to focus on the world itself.  There are many excellent Simhub dashboards already focused on the truck, but I wanted to create something that would be more focused on the world around me and the journey itself. I want to know where I am, where I'm going, how long it will take me to get there, and what I can expect along the way.

I want it to be "smart"; to figure things out for me that I want to know on my trip, not just show me returned values; let's do some things with the returned values and make them a bit more meaningful and engaging...

>- I want to see my real ETA for a job, which includes any expected rest stops
>- I want to see how many rest stops I need to take during my journey
>- I want to know if I need to stop for fuel during the journey
>- I want to see what day it is and what day and time my load is due
>- I want to see which Country I am travelling to
>- I want to see which direction we are currently moving
>- I want to know where I am right now - what city is this? or Country?
>- I want to know where the nearest Service points are (Fuel, Rest, Service, etc)

Is that too much to ask! Well, as it turns out; nope, we've got all that and more.

It's just a personal project I've been messing with for a year or so, set up for how I like to play. I originally created it for a 7" display, but I have since moved it to a 1080p display, so it's not optimised for the smaller screen anymore. Therefore, the dashboard requires a seperate screen to run on. 

However, this is why I created the Simhub Overlays, which can be used on the main game screen, so you can have the best of both worlds. The dashboard is designed to be used on a seperate screen and features much more information, but the overlays are designed to be used on the main game screen. Show you current location or direction on the main game screen, and then look at the dashboard for more detailed information about your trip. You can choose which information you want to see on the main game screen and which information you want to see on the dashboard, it's up to you.

**It would be great to see youTubers and streamers using the Location Overlays on their main game screen, so we can all see where they are in the world...** You learn a lot about Geography when you play these games!

I must confess, the code is not polished, and there are some things that I would like to improve (some features are pretty pointless!), but it works and I am happy with it for now. I may continue to make improvements and add new features as I have time, but for now, I am happy to share it for others to use, if I can reach my target audience of about two people! If they don't like something, they can remove it or change it to their liking, that's the beauty of Simhub and this project.

Feel free to use any of the ideas or code that I have included in my dashboard, and if you do create something similar, please share it with me, I'd love to see what you come up with!

### Simhub
https://www.simhubdash.com/. It is free to use and supports a wide range of games, including ETS2 and ATS. Simhub allows you to create custom dashboards and overlays that can display live information from the game and send information back to the game. It is a powerful tool that can be used to create all sorts of custom button boxes, screens, dashboards and overlays for your games. You can pay a small amount for a licensed version to help the devs.

You can use Simhub just to view your dashboard, or you can get creative with it. It can be easy or complex to use, depending on how much customisation you want to do. You can create a simple dashboard with just a few elements, or you can create a more complex dashboard with many different elements, javascript and other features. 

The software takes a bit of time to learn; but view that as a good thing... the more time you spend learning how to use it, the more you can get out of it and the more fun you can have creating your own custom dashboards and overlays. There are many tutorials and resources available online to help you learn how to use Simhub, so don't be afraid to dive in and start experimenting with it. And I haven't got it all figured out myself, so you don't have to either! Just have fun with it and see what you can create.

### Basic Installation and Setup
1. Download and install Simhub from the official website: 
2. Download the dashboard files: https://github.com/user0451/Truckers-GPS-Pro/releases/tag/v1.42
   - You can grab the main Dashboard or any/all of the individual Overlays
3. Open Simhub and go to the "Dashboards" section.
4. Click on "Import Dashboard" and select the downloaded dashboard file (or files). This will import the dashboard into Simhub and make it available for you to use.
5. Once the dashboard is imported, you can select it from the list of available dashboards.
6. If you have a separate screen, you can drag the dashboard window to that screen and resize it as needed.
7. If you want to use the Overlays on your main game screen, you can go to the "Dash Studio/Overlays" section in Simhub to add a New Overlay. **You can then position and resize the overlay on your main game screen as needed**.

### Actions
The dashboard provides some functionality for you to play with:
>- *Action A*: (Or press the Job ETA label) This will switch beween showing the Eta including resting time, and the ETA without resting time. If you switch off Fatigue in the game, then the ETA without resting time will be for you, but if you have Fatigue on, then the ETA including resting time will be more accurate. So you can choose which one to show based on your preferences and how you play the game.
>- *Action B*: (or press the km/h label) This will switch between showing the current speed in km/h and mph. You may want mph when in the UK, but km/h when in the rest of Europe. It's up to you. ETS2 defaults to km/h; ATS defaults to mph.
>- *Action C*: (or press the clock) This will switch between 12h and 24h time formats.
>- *Action D*: (or press the Services section) This will toggle though three states for the nearest service points: 
	- show nearest service points with no scaling
	- show nearest services points with game scaling
	- switch off service points

There are additional binds for some overlays:
>- *Location & Scale*: 
>		- bind a key to Next or Previous to switch between text alignment (left, centre (British!), right). 
>For example, if you display the location overlay on the top left of the screen, you can align the text to the left to match.
>- *Compass*: 
bind a key to Next or Previous to switch between the compass display modes:
	- rotating needle with fixed rose
	- rotating rose with fixed needle; whatever floats your boat!

### Customisation
- You can edit any of the text, colours, fonts, and other elements in the dashboard and overlays to your liking. Just go to the "Dashboards" or "Overlays" section in Simhub, select the dashboard or overlay you want to edit, and click "Edit". This will open the editor where you can make changes to the design and layout.
- You can also add new elements or remove existing ones if you want to further customise the dashboard to your liking. Just use the editor to add new text fields, images, or other elements, and then use the Simhub variables to link them to the game data you want to display.
- Want to know how I've done some of the things in the dashboard? Look at the code in the elements and see how I've used the Simhub variables and functions to create the features. I may add some specific docs for some of the more complex features in the future, but for now, you can just look at the code and see how I've done it. 
### Feedback and Suggestions
- We're not getting a Discord server! No mailing lists, no forums, no support channels! This is a one man show, so if you have any feedback or suggestions, please just reach out to me on GitHub. I would love to hear from you and see what you think of the dashboard and overlays. If you have any ideas for new features or improvements, please let me know, and I will see if I can add them in future updates. 

If just want you to enjoy any extra immersion and fun that the dashboard and overlays can add to your gaming experience, then that's more than enough for me! I hope you enjoy using them as much as I do.

### Thanks/Credits
Why is my software free? Because these guys did most of the work!

- SCS Software - for creating such amazing games that allow us to explore the world and have fun driving trucks around. But mostly, for exposing the telemetry data that allows us to have more immersive experiences. The telemetry data is what allows us to access the information we need to create the features in the dashboard and overlays, so without it, this project would not be possible. Fundamentally, this is the tool that has kept me in the game for so long; not the game itself!
It needs some love though guys; there are plenty of new values that could be exposed, and there are some odd data errors creeping in here and there (max fuel on the new trucks...)
- https://github.com/SHWotever/SimHub - Thanks to the Simhub team for creating such an amazing tool that allows us to create custom dashboards and overlays for our games. Without Simhub, this project would not have been possible. Well, it would, but it would be much messier... A special thanks for keeping the Truckmaps up to date in Simhub.
- https://github.com/dariowouters/ts-map/ - for maintaining the Truckmaps project so diligently. These are an essential part of my dashboard and overlays. The Truckmaps provide the data that allows us to display the location information and other features in the dashboard. Legend.
- https://github.com/nlhans/ets2-map - The original Truckmaps project, thanks dude.

## License
Help yourself to the code or ideas in this project.