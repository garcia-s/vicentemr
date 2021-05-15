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