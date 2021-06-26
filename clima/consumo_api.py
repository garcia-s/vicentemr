import requests

def get_weather_city(ruta,parametros):
    req = requests.get(url=ruta,params=parametros)
    #imprimimos el resultado se el codigo de estado HTTP es 200 (OK):
    if req.status_code == 200:
        dic = req.json()
        return dic
