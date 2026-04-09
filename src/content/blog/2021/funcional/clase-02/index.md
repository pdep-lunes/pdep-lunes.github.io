---
title: Segunda clase
date: "2021-04-12"
description: "Segunda clase de PdeP"
tags: [funcional, tipado, inmutabilidad, precedencia-de-operadores]
---

## Tarea para la clase que viene:
* Realizar el [TP PdeP-Commerce](https://docs.google.com/document/d/14FdoEE4n2tgCSyK05P3kHryxQobbg1iwXgOIKjvPnjs/edit).
* Lecciones [2](https://mumuki.io/pdep-utn/lessons/690-programacion-funcional-introduccion-a-los-tipos-de-datos) y [4](https://mumuki.io/pdep-utn/lessons/689-programacion-funcional-practica-valores-y-funciones) de Mumuki. 

## ¿Qué vimos hoy? 

Primero completamos [esta encuesta](https://docs.google.com/forms/d/e/1FAIpQLScDqtSyf3Au2ho9Ry4o2rN7biIzZ9YMpidqpXzVn6XJ_sgLAg/viewform)

Estos son los ejemplos de funciones y valores que vimos en clase:

```haskell​
esMayorDeEdad unaEdad = unaEdad >= 18
​
frecuenciaCardiacaPromedio = 80
​
hacerActividadFisica unaFrecuencia = unaFrecuencia + 50
​
tieneTaquicardia unaFrecuencia = unaFrecuencia >= 100
```

De esa forma le pusimos un alias o etiqueta al valor 80 con `frecuenciaCardiacaPromedio` y creamos funciones como `esMayorDeEdad`, `hacerActividadFisica` y `tieneTaquicardia`.
Las funciones van a ser nuestras herramientas para poder operar a los valores.

Algo muy importante es que en Haskell **no hay efecto**. Esto quiere decir que los valores igualados no van a mutar luego de ser operados por las funciones. Este concepto se llama **inmutabilidad**.

Por ejemplo, si aplicamos `hacerActividadFisica` a la `frecuenciaCardiacaPromedio`, podemos ver que `frecuenciaCardiacaPromedio` no cambia su valor:

```haskell
> frecuenciaCardiacaPromedio
=> 80
> hacerActividadFisica frecuenciaCardiacaPromedio
=> 130
> frecuenciaCardiacaPromedio
=> 80
```

Por esto, es que en Haskell logramos tener lo que se llama **transparencia referencial**. 🤯
Es importante recordar que `frecuenciaCardiacaPromedio` no es una variable, sino que es simplemente un alias, es decir, otra manera de decirle al valor 80.

Ahora supongamos que queremos ver si tenemos taquicardia después de hacer actividad física. ¿Cómo lo resolvemos? 😱 Usando **composición**:
```haskell
> (tieneTaquicardia.hacerActividadFisica) 70
=> True
```

Como ya mencionamos anteriormente, el valor que retorne la función de la derecha, tiene que ser un valor que la función de la izquierda pueda operar. Si quisiéramos componerlo al revés:


```haskell
> (hacerActividadFisica.tieneTaquicardia) 70
```

Va a romper 💥 ya que `hacerActividadFisica` tiene que recibir un número, y está recibiendo un booleano.

Por último, vamos a darle un nombre a la acción de preguntar si se tiene taquicardia luego de hacer una actividad física creando la función`tieneTaquicardiaDespuesDeEntrenar`:

```haskell
tieneTaquicardiaDespuesDeEntrenar unaFrecuencia = (tieneTaquicardia.hacerActividadFisica) unaFrecuencia
```

Que no exista el estado en Haskell, hace que la composición tenga más relevancia. 
Ya que como no podemos pisar valores con variables, la composición nos permite encadenar las funciones para trabajar con diferentes valores y así poder crear soluciones más complejas. ✨

## Precedencia de operadores

En matemática, cuando tenemos una expresión como 2 \* 3 + 4, solemos operarla dependiendo de la precedencia de cada operador. Como el \* es de mayor precedencia que el +, operamos primero 2 \* 3 y luego le sumamos 4.

En Haskell también se respeta esto. Les dejamos una tabla para que puedan ver la precedencia que utiliza Haskell:

| Precedencia (Mayor numero, mayor precedencia) |            "Operador"            |
| --------------------------------------------- | :------------------------------: |
| 10                                            | Aplicacion prefija |
| 9                                             |                .                 |
| 8                                             |                ^                 |
| 7                                             |               \*,/               |
| 6                                             |               +,-                |
| 5                                             |                :                 |
| 4                                             |       ==, /=, <, <=, >, >=       |
| 3                                             |                &&                |
| 2                                             |               \|\|               |
| 1                                             |                \$                |


## Type classes

Pensemos en la función `suma`:

```haskell
suma unNumero otroNumero = unNumero + otroNumero
```

¿Qué tipo debería tener?

### ¿Enteros?

¿Que tal `suma :: Int -> Int -> Int`?

Dados estos números:

```haskell
unEntero :: Int
unEntero = 2

otroEntero :: Int
otroEntero = 3

unFlotante :: Float
unFlotante = 2

otroFlotante :: Float
otroFlotante = 3
```

¿Qué creen que pasaría si queremos evaluar la siguiente expresión: `suma unEntero otroEntero`?

```haskell
> suma unEntero otroEntero
5
```

¿y `suma unFlotante otroFlotante`?

```haskell
> suma unFlotante otroFlotante
-- * estalla *
```

¡Tiene sentido! le dijimos a nuestra función suma que su dominio son los enteros, entonces cuando le damos un flotante, nos dice "eh, no; yo trabajo sólo con enteros"

### ¿Flotantes?

¿Y qué tal si la hubiésemos definido como `suma :: Float -> Float -> Float`? Después de todo, los enteros son un subconjunto de los reales, ¿no?

```haskell
> suma unFlotante otroFlotante
5
```

```haskell
> suma unEntero otroEntero
-- * estalla *
```

Bueno, no; si bien en la matemática es cierto que los enteros son reales, en definitiva para haskell `Float` e `Int` son tipos de datos distintos.

### ¿a?

¿Y si hago `suma :: a -> a -> a`?

\*Falla al cargar el archivo\*

Parece que haskell no nos permite sumar cualquier cosa tampoco, lo cual es de esperarse; ¿tendría sentido que nos deje sumar `length + even`? ¡no!

¿Pero qué onda? si yo en la consola hago

```haskell
> unFlotante + otroFlotante
5
```
ó
```haskell
> unEntero + otroEntero
5
```

¡Me andan las dos!

### ¡Números!

Para expresar el tipo de `suma`, en realidad nos está faltando una herramienta, a la cual llamamos **Familia de Tipos**, o **Type Class**.

Mientras que a un tipo lo podríamos describir como un conjunto de valores asociado a un conjunto de operaciones con las que los podemos trabajar, una familia de tipos es más bien un contrato que te dice qué operaciones tiene que entender un tipo para pertenecer a esa familia.

Hasta acá suena todo muy abstracto, así que bajémoslo a un ejemplo concreto: ¡los números!

Esa cosa en común que tienen `Int` y `Float` que nos permite sumarlos es la familia de tipos de los números `Num`; y su contrato nos dice que cualquier tipo que pertenezca a su familia, se puede sumar `(+)`, restar `(-)`, y multiplicar `(*)`!

¿Y esto cómo lo escribimos en el código?

```haskell
suma :: Num a => a -> a -> a
suma unNumero otroNumero = unNumero + otroNumero
```

Cuando escribimos esto, estamos restringiendo a que el tipo `a` debe pertenecer a la familia de tipos Num.

Es importante recalcar que en toda la firma de `suma`, `a` representa a un **mismo tipo**. Si bien ahora podemos sumar enteros con enteros, y flotantes con flotantes, esto **no** nos permite sumar enteros con flotantes.

Y así como tenemos una familia de tipos para los números, tenemos otro montón con distintos propósitos, como:
* Show: Las cosas que se saben mostrar por pantalla (en la consola).
* Eq: Las cosas que se saben comparar por igualdad `(==)`.
* Ord: Las cosas que se saben comparar por orden `(>)`, `(<)`, etc.
* Num: ¡Los números! se saben sumar, restar y multiplicar.
* Integral: Para números enteros; entienden la división entera (`div`), el resto de la división `rem`, se les puede preguntar si son pares (`even`) o impares (`odd`).
* Fractional: Para números reales, que se pueden dividir con la división flotante `(/)`

Podemos los tipos que pertenecen a cada familia en el siguiente diagrama:

![diagrama_tipo_clases](https://raw.githubusercontent.com/pdep-lunes/bitacora/2019-completo/content/blog/funcional/haskell-type-classes.jpg 'Diagrama de tipos de clases')

\*Es posible que haya alguna mentira blanca en este diagrama\*

## Links Útiles

- [Video de la clase](https://drive.google.com/file/d/1h1xIVhhax2i7ohei1Ofd3U1EH9mFCCeD/view)
- [Tipos en Haskell](http://wiki.uqbar.org/wiki/articles/tipos-de-haskell.html)
- [Inferencia de tipos](http://wiki.uqbar.org/wiki/articles/inferencia-de-tipos.html)


