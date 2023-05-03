# Start Up
python -m flask --app server run --debug

# Getting the app to run locally
Make sure you are in the current directory that contains server.py
To start the Flask Server, run the following command:
python -m flask --app server run

To start the front-end server, run the following command:
npm start

# Live demo of Court Vision
![](https://github.com/kayre510/CourtVision/blob/main/gifs/courtvision_demo.gif)

# How to navigate the site
NBA Logo leads to home page

Players
1. Players links to a list of all active players in the NBA
2. Type a players name into the search bar to see their stats

1v1
1. Type a players name into either of the search bars, there must be two players selected, one in each search bar
2. Select the category you wish to compare stats
3. Press the Face Off button to compare selected stat

BoxScore
1. Shows scores and data of current REGULAR season games
2. Click on each box to open up a modal with more detail game info

Teams
1. Shows a list of teams in each division

League Standings
1. Shows a list of the team rank complete with stats for each team for current season
