import random
import json
import requests

def get_docs(ruta):
    req = requests.get(ruta)
    if(req.status_code == 200):
        dic = json.loads(req.text)
        return dic