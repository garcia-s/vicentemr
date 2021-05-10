
def recursive():
    valor_dolar = 93

    precio_producto = input('CUAL ES EL PRECIO EN DOLARES: ')

    if(precio_producto.isdigit()):
        precio_pesos = int(precio_producto) * valor_dolar
        print('EL VALOR EN PESOS DEL PRODUCTO ES %a' % (precio_pesos))
    else:
        print('EL VALOR INGRESADO NO ES UN NUMERO')
        recursive()

recursive()