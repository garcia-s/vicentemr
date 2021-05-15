import  json
 solicitudes de importación


def  get_docs ( ruta ):
    req  =  solicitudes . obtener ( ruta )
    # Imprimimos el resultado si el código de estado HTTP es 200 (OK):
    si  req . status_code  ==  200 :
        dic  =  json . cargas ( req . texto )
        volver  dic


def  get_charter_by_id ( id ):
    data  =  get_docs ( "https://swapi.dev/api/people/" + str ( id ))
    devolver  datos


def  búsqueda_caracteres_por_nombre ( nombre ):
    data  =  get_docs ( "https://swapi.dev/api/people?search=" + str ( nombre ))
    devolver  datos [ 'resultados' ]

def  get_all_sw_characters ():

    sw_data  = []

    data  =  get_docs ( "https://swapi.dev/api/people/" )

    while (el dato [ "siguiente" ] no es  Ninguno ): 
        para  personaje  en  datos [ "resultados" ]:
            sw_data . append ( personaje ) #print (doc ["nombre"], doc ["url"] [28: -1])
        datos  =  get_docs ( datos [ "siguiente" ])
    
    devolver  sw_data




# print (get_all_sw_characters ())
# print (get_charter_by_id (20))
# print (buscar_caracteres_por_nombre ('cielo'))


# print (resultado)
# para clave en el resultado:
# print (clave, ':', resultado [clave])


#dic = get_docs ("https://swapi.dev/api/starships/")
# while (dic ["next"] no es None):
# de documento en dic ["resultados"]:
# print (doc ["nombre"], doc ["url"] [31: -1])
# dic = get_docs (dic ["siguiente"])