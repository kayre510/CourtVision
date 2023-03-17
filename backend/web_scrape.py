from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

#NBA Season I'll be analyzing
year = 2023

#URL page I'll be scraping
url = "https://www.basketball-reference.com/leagues/NBA_2023_per_game.html".format(year)

#this is the HTML from the given URL
html = urlopen(url)

soup = BeautifulSoup(html)

#use findAll() to get the column headers
soup.findAll('tr', limit=2)

#use getText() to extract the text we need into a list
headers = [th.getText() for th in soup.findAll('tr', limit=2)[0].findAll('th')]

#exclude  the first column as we will not need the ranking order from Basketball Reference for the analysis
headers = headers[1:]
headers

#avoid the first header row. this logic extracts the data from the cells of the table
rows = soup.findAll('tr')[1:]
player_stats = [[td.getText() for td in rows[i].findAll('td')] for i in range(len(rows))]

# create a data frame with:
player_stats_df = pd.DataFrame(player_stats, columns = headers)
player_stats_df.head(10)
