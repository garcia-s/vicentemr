import requests
from consumo_api import get_weather_city


params ={}
params ["q"] = "London"
params  ["appid"] = "a819530cf94d3ae1253831c55d4217af"

api_key = '4d66756d2f1463d481841de10d882e5a'
url = "https://api.openweathermap.org/data/2.5/weather" 
clima = get_weather_city(url,params)

def get_data(ruta):
    req = requests.get(ruta)
    if(req.status_code == 200):
        res = req.json()
        return res
    else:
        print("Error en la API")

def get_weather(city, lat=None, lon=None):
    if(lat and lon != None):
        ruta = f'{url}weather?lat={lat}&lon={lon}{params}{api_key}'
    else:
        ruta = f'{url}weather?q={city}{params}{api_key}'
    weather = get_data(ruta)
    info = {
        'Ciudad': weather['name'],
        'Descripcion': weather['weather'][0]['description'],
        'Sensacion termica': str(weather['main']['feels_like']),
        'Temp': str(weather['main']['temp']),
        'Humedad': str(weather['main']['humidity']),
    }
    return info


def show_weather(weather):
    for item in weather:
        print(item + ': ' + weather[item])


def get_forecast(city, lat=None, lon=None):
    if(lat and lon != None):
        ruta = f'{url}forecast?lat={lat}&lon={lon}{params}{api_key}'
    else:
        ruta = f'{url}forecast?q={city}{params}{api_key}'
    forecast = get_data(ruta)
    return forecast

def show_forecast(forecast):
    for item in forecast['list']:
        time = item['dt_txt']
        date = time.split(' ')
        info = {           
            'Clima': item['weather'][0]['description'],
            'Sensacion termica': str(item['main']['feels_like']),
            'Temp minima': str(item['main']['temp_min']),
            'Temp maxima': str(item['main']['temp_max']),
            'Humedad': str(item['main']['humidity']),
            'Presion': str(item['main']['pressure']),
        }
        for item in info:
            print(item + ': ' + info[item])
        print()

def salir():
    print('But... Luke.... I\'m your father')
    print('Please....')

def main():
    main_menu_exit = False
    # Bucle infinito
    print('------------------------------------------------')
    print('      . BIENVENIDO AL CLIMA CON PAUL VASO')
    print('------------------------------------------------')
    while not main_menu_exit:
        # Opciones
        opciones =[{
            'description': "Clima por ciudad", 
            'flag': '-cc',
            'action': 'REEMPlAZAR POR FUNCION'
        },
        {
            'description': "Clima por coordenadas",
            'flag': '-cl',
            'action': 'Otra funcion'
        },
        {
            'description': "Pronostico por ciudad",
            'flag': '-pc',
            'action': 'OTRA FUNCION'
        },
        {
            'description': "Pronostico por cooreenadas",
            'flag': '-pl',
            'action': 'OTRA FUNCION'
        },
        {
            'description': "Salir de la aplicacion",
            'flag': '-qq',
            'action': salir
        }]
        # Imprimir menu de opciones
        print('|  OPCION |  INFORMACION')
        print('------------------------------------------------')
        for opcion in opciones:
            print('|   ' +opcion['flag']+'   |  '+ opcion['description'])
            print('------------------------------------------------')
            
        # Insertar el input de opcion
        into = input('Seleccione una opcion: ')
        # bandera para chequear si existe
        match = False


        # revisar opciones a ver si el input esta en la lista
        for opcion in opciones:
            if opcion['flag'] == into:
                # AQUI EJECUTAR LA ACCION QUE QUIERAN 
                opcion['action']()
                match = True
        main_menu_exit = match
                
if __name__ == "__main__":
    main()


   
