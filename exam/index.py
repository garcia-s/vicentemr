import random
import json
import requests
def get_docs(ruta):
    req = requests.get(ruta)
    if(req.status_code == 200):
        dic = json.loads(req.text)
        return dic
        

def get_charter_by_id(id):
    data = get_docs("https://swapi.dev/api/people/"+str(id))
    return data

primerid = random.randint(1,20)
segundoid = random.randint(1,20)

primer_personaje = get_charter_by_id(primerid)
segundo_personaje= get_charter_by_id(segundoid)

if(int(primer_personaje['height']) > int(segundo_personaje['height'])):
    print(primer_personaje['name'] + ' Es mas alto')
else:
    print(segundo_personaje['name'] + ' Es mas alto')

if(float(primer_personaje['mass']) > float(segundo_personaje['mass'])):
    print(primer_personaje['name'] + ' Es mas Pesado')
else:
    print(segundo_personaje['name'] + ' Es mas Pesado')

if(len(primer_personaje['films']) > len(segundo_personaje['films'])):

    print(primer_personaje['name'] + ' Ha estado en mas films')
elif (len(primer_personaje['films']) < len(segundo_personaje['films'])):
     print(segundo_personaje['name'] + ' Ha estado en mas films')
else:
    print('Ambos tienen la misma cantidad de films')

    