# %%
import requests
# import json
import pandas as pd

# %% ---GATHERING DATA FROM API---
url = 'https://ssd-api.jpl.nasa.gov/fireball.api'
# params = {'date-min': '2000-01-01', 
#           'date-max': '2024-01-01'}
response = requests.get(url)
data = response.json()
data_df = pd.DataFrame(data['data'], columns=data['fields'])
data_df['lat'] = pd.to_numeric(data_df['lat'])
data_df['lon'] = pd.to_numeric(data_df['lon'])
data_df_coords = data_df.copy()
data_df_coords['lat'] = ''
data_df_coords['lon'] = ''

# %% ---CLEANING DATA---
for i in range(len(data_df_coords)):
    if data_df_coords['lat-dir'][i] == 'S':
        data_df_coords['lat'][i] = data_df['lat'][i] * -1
    else:
        data_df_coords['lat'][i] = data_df['lat'][i]
    if data_df_coords['lon-dir'][i] == 'W':
        data_df_coords['lon'][i] = data_df['lon'][i] * -1
    else:
        data_df_coords['lon'][i] = data_df['lon'][i]

# %% ---CHANGING DTYPES AND EXPORTING---
# data_df_coords = data_df_coords[['lat', 'lon']]
data_df_coords['lat'] = pd.to_numeric(data_df_coords['lat'])
data_df_coords['lon'] = pd.to_numeric(data_df_coords['lon'])
data_df_coords['energy'] = pd.to_numeric(data_df_coords['energy'])
data_df_coords.rename(columns = {'lon': 'lng'}, inplace=True)
data_df_coords.dropna(inplace=True)
data_df_coords.to_json('data/data.json')


