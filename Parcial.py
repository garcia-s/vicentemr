# EJERCICIO 1

from consumo_api import get_all_sw_characters_names, get_charter_by_id
from consumo_api import altura
from consumo_api import peso
from random import randint

sw_data= get_charter_by_id, get_all_sw_characters_names 


id1 = randint(1,83),
personaje1 = get_charter_by_id(1)


id2 = randint(1,83),
personaje2 = get_charter_by_id(2)
if (altura(personaje1) > altura(personaje2)) :
   print ("El personaje mas alto es",personaje1["name"],"la altura es", altura(personaje1))

else:
    print ("El personaje mas alto es",personaje2["name"],"la altura es", altura(personaje2))

if (peso(personaje1)) > (peso(personaje2)):

   print ("El personaje mas pesado es",personaje1["name"],"el peso es", altura(personaje1))

else:
    print ("El personaje mas pesado es",personaje2["name"],"el peso es", altura(personaje2))

if (personaje1 == "Yoda" or personaje2 == "Grievous" or  personaje1 == "Grievous" or personaje2 == "Yoda") :
    print(personaje1)
    print(personaje2)


# EJERCICIO 2
import json
import requests

def consultar_personajes(url):
    respuesta = requests.get(url)
    if respuesta.status_code == 200:
        diccionario = json.loads(respuesta.text)
        # lo de arriba lo transforma a el formato json
        return diccionario
    else:
        print('nope')
urlbase = consultar_personajes('https://swapi.dev/api/people/')

# def criterio (item):
#     '''sirve para ordenar por sublistas '''
#     return item['name']
#     # return int(item['height'])


sw_data = []

while(urlbase['next'] is not None):
    for doc in urlbase['results']:
        sw_data.append(doc)
    urlbase = consultar_personajes(urlbase['next'])


def nombre (item):
    '''sirve para ordenar por sublistas convertidas a numeros en este caso la altura '''
    return (item['name'])

sw_data.sort(key=nombre)

for index, character in enumerate(sw_data):
    
    print(character['name'])
    print(character['species'])
    print(character['homework'])






# EJERCICIO 3

import random

lista = []

for i in range(77):
    lista.append(random.randint(1,3000))


print('El numero mas bajo es %s' % (lista[0]))
print('El numero mas alto es %s' % (lista[len(lista)-1]))


print('---------------------------------------')

impares = []

for x in lista:
    if((x % 2) != 0):
        impares.append(x)
print(impares)