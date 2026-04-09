---
title: Tercera clase
date: "2022-04-11"
description: "Tercera clase de PdeP"
tags: [funcional, aplicacion-parcial, orden-superior, tuplas, listas]
---

## Tarea para la clase que viene:
Lecciones 5 y 6 de [Mumuki](https://mumuki.io/pdep-utn/chapters/435-programacion-funcional)
Resolver hasta el punto del **nombreDeLaBiblioteca** (incluído) del [TP "Hora de lectura"](https://docs.google.com/document/d/1YBTaPNfEd4s82UxmsRjYRZXCCA8-lQgFaLOEVbr0fGw/edit?usp=sharing).
## ¿Qué vimos hoy? 

- Tuplas: conjunto de elementos de diferentes tipos cuya longitud es fija. Por ejemplo:

```haskell
("Bufanda", 2500)
-- una dupla (tupla de dos elementos) con un string y un número.

("hola", 1, 'e')
-- una terna (tupla de 3 elementos) compuesta de elementos de diferentes tipos.
```

Vimos algunas funciones que podemos usar con tuplas de dos elementos como `fst` y `snd` que devuelven el primer y el segundo elemento, respectivamente, de una tupla de dos elementos.

```haskell
> fst ("Bufanda", 2500)
“Bufanda”


> snd ("Bufanda", 2500)
2500
```

También vimos el uso de **variables anónimas** (los `_`). Las vamos a utilizar cuando necesitemos recibir un parámetro pero que no nos interesa conocer su valor (no nos es útil conocerlo) para la definición de la función.

```haskell
precioConDescuentoDeProducto :: Num a => (String, a) -> a  -> a
precioConDescuentoDeProducto (_, unPrecio) descuento = unPrecio - descuento

> precioConDescuentoDeProducto (“Bufanda”, 2500) 500
2000
```

Una cuestión muy importante a tener en cuenta es que en funcional existen tres mundos: **el de los valores, el de los tipos y el de los patrones**. 

```haskell
nombreDeLaFuncion :: Mundo de los Tipos
nombreDeLaFuncion Mundo de los Patrones = Mundo de los Valores
```

Las variables anónimas solo viven en el mundo de los patrones. Por lo tanto, **van del lado izquierdo del igual y nunca deben ir del lado derecho ni en el tipado.** En el mundo de los tipos no puede ir porque tenemos que especificar los tipo es nuestras funciones y valores, aún cuando son variables. En el de los valores tampoco tiene sentido porque es donde especificamos nuestros retornos, no podemos devolver "lo que sea".

- Listas: conjunto de elementos de un mismo tipo. Por ejemplo:

```haskell
[1, 2, 4, 5, 6, 8, 10, 100, 20000]
-- listas de números.

["die", "bart", "die"]
-- lista de strings.

[True, True]
-- lista de booleanos.

[("@skinnerOk", "Es una aurora boreal"), ("@archuN", "puedo verla??"), ("@skinnerOk", "no")]
-- listas de tuplas (representan un tweet).

[]
-- lista vacía.
```
Vimos que hay varias funciones que podemos usar con las listas:

```haskell
> length ["hola", "¿cómo", "estás?"]
3
> length [6,7,8,9,10,11,12]
7
-- length: devuelve la cantidad de elementos de la lista.

> sum [1,2,3,4]
10
-- sum: devuelve la suma de todos los elementos de una lista. ¡Sólo funciona con lista de números!
```

- Aplicación parcial: aplicar a una función con menos argumentos de los "normales", para obtener otra que reciba los faltantes. Por ejemplo: 

```haskell
> max 6 9
9
-- max está aplicada totalmente (tiene los dos parámetros) y devuelve 9.

> max 6 
<function>
-- en esta ocasión max está aplicada parcialmente (le falta un parámetro) y devuelve una función.
```

Como vimos en clase, un ejemplo de composición con aplicación parcial podría ser: 

```haskell
dobleDelSiguiente :: Num a => a -> a  -> a
dobleDelSiguiente unNumero = (*2).(+1) $ unNumero

> dobleDelSiguiente 4 
10
```

- Orden superior: Funciones que reciben por parámetro otra función 🤯. ¡El orden superior es buenísimo porque nos permite crear funciones que reciban comportamiento (otras funciones) por parámetro! De esa forma podemos pensar de forma mucho más declarativa. 

Como ejemplos de funciones de orden superior vimos: 

```haskell
> filter (>4) [1,2,7,1,9]
[7,9]
-- filter: dada una condición (función que devuelve un booleano) y una lista, devuelve otra lista que contenga los elementos que cumplan la condición. Algo interesante de este ejemplo es que estamos usando aplicación parcial en (>4) ya que a la función (>) le estamos pasando un sólo parámetro (el 4) y está esperando que le llegue el que le falta (que está en la lista).

> map length ["hola", "murcielago"] 
[4, 10]

> map (+1) [100, 41, 26]
[101, 42, 27]
-- map: dada una función y una lista, devuelve otra lista que contenga a los elementos como resultado de aplicarles la función.
```

Otras más que ya vimos, son la composición (`.`) o la aplicación (`$`).

¡Y hasta acá llegamos por hoy! La clase que viene seguimos. 👋

## Links Útiles

- [Aplicación parcial](http://wiki.uqbar.org/wiki/articles/aplicacion-parcial.html)
- [Orden superior](http://wiki.uqbar.org/wiki/articles/orden-superior.html)
-[Video de esta clase en 2021](https://drive.google.com/file/d/1f72a6efSuhUyH5KX-xXYlEXY_M4C6Zz7/view)

