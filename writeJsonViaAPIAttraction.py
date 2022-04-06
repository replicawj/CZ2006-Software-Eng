import requests
import json

import requests

headers = {
    'ApiEndPointTitle': 'searchKeywordByMultiDataset'
}

params = {
    'dataset': 'attractions',
    'language': 'en',
    'apikey': 'M4i4AjenzvC9JkAk0oymGGHqBJ0Q8suI',
}

response = requests.get('https://tih-api.stb.gov.sg/content/v1/search/all', headers=headers, params=params)

print(response.text)

with open('test.json','w',encoding='utf-8') as outfile:
	outfile.write(response.text)
