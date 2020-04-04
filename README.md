# Cibus

### A project by Paolo Torrado, Henry Lin, Liam Hayes, and Jack Sorensen
## Table of Contents
[Description](#Description)

[Technology](#Technology)

[Feedback](#Feedback)

[Thoughts](#Thoughts)

### Description
Social networking has taken a turn for the worse as of late, and we aim to change that with Cibus. Cibus is a social networking app aimed at bringing people together using one of the oldest and truest methods: a good meal.

Open Cibus with your phone, and create an account. From there you can take images of food you have eaten or seen and share with others. Discuss what you liked about it, tag it so others can search for it in their culinary adventures, and follow delicious meals posted by others. 

Cibus is open and flexible enough that the casual user can post pictures on the go, and robust enough to allow restaurants and food bloggers to showcase food and recipes on their pages. 

### Technology

Clarifai API

Nutritionix API

Ate-i Engine 

React/Express/MySql/Heroku/Mlab/image

### Feedback
I really enjoyed this project because it was a culmination of everything that we learned during our 3 month full stack webdevelopment course. We definitely were too ambitious and trying to create a social media application. There were many aspects of our site that we were no able to complete (create user, commenting, nutrition facts). However, the core of the application will work if you use mechea as the username and coolstuff as the password. While I do not plan to continue this project, I may recreate something that is smaller in scale.
### Thoughts
First, I need to thank Joe Rehfuss, Clint Brodar, Denis Malloy and the UW Coding Bootcamp for all their help in instructing and guiding us through the project. 

I'd also like to thank W3 schools for their plethora of useful, albeit sometimes vague information
https://www.w3schools.com/ 

***Brought to you by Innovative Innovations*** (i2)

Please NPM install before working on Cibus:

react-router-dom
@material-ui/core
@material-ui/icons
@material-ui/core/Button
@material-ui/core/Menu
@material-ui/core/MenuItem


package.json changes line 27

This is what heroku needs to launch
"start": "node server/server.js",


Replace with this if you are testing on local device
"start": "react-scripts start",
