---
title: Séptima clase
date: "2023-05-15"
description: "Séptima clase de PdeP"
tags: [funcional, listas infinitas, lazy evaluation]
---

## Tarea para la clase que viene:
- Corregir la primera entrega del TP integrador.
- Comenzar la segunda entrega del [TP integrador](https://docs.google.com/document/d/17naHWbyjj-GO0XVTxcC0eYGQP01i49Fve2Z03SAMJ7Y/edit) 
- Pueden comenzar a realizar [parciales](https://www.pdep.com.ar/material/parciales) para practicar.


## ¿Qué vimos hoy? 
Hicimos puesta en común del ejercicio de pattern matching
Listas infinitas
Lazy evaluation

## Listas infinitas

Ya vimos que en Haskell podemos modelar una biblioteca 📚 con las listas, por ejemplo: 


```haskell
biblioteca = [elVisitante, shingekiNoKyojin1, fundacion, sandman5, brisignr, legado]
```

Y también podemos modelar una lista del 1 al 5:

```haskell
unoAlCinco = [1,2,3,4,5]
```

Pero si quisiéramos hacer una lista del 1 al 1000... ¡¿deberíamos escribir mil veces los números?! 😱 Por suerte, nuestro gran amigo Haskell puede ayudarnos gracias a las _listas por rangos_:

```haskell
unoAlMil = [1..1000]
```

También podemos definir una lista de los números pares entre 1 y 100 de esta forma:

```haskell
paresAlCien = [2,4..100]
```

Y no solo sirve para números 🔢, sino también para letras 🔡: 

```haskell
abecedario = ['a'..'z']
```

Y así como podemos definir listas con límites o con rangos, también podemos tener… 🥁 ¡**listas infinitas**!

```haskell
infinita = [1..]
```

(¿Lo probaste en la consola y te olvidaste de hacer para que pare? 😰 Apretá **ctrl + c**. 😉)

## Lazy evaluation

Sabemos aplicar la función ´head´ a una lista:


```haskell
head ["hola", "como", "estás?"]
> "hola"
```

Pero, ¿qué pasará con una lista infinita? 😮 

```haskell
head [1..]
> 1
```

Por si quedan dudas de qué es lo que acaba de pasar, Haskell no esperó a que terminara la lista sino que tomó directamente lo que necesitaba. Eso es porque su forma de trabajo es la **evaluación perezosa** o **lazy evaluation**. Esto no pasa con todos los lenguajes. Otros (que seguramente ya utilizaste) usan la **evaluación ansiosa** o **eager evaluation** en donde, por ejemplo, esperarían a que la lista termine de cargar (infinitamente nunca 😵) para devolver el primer elemento.
Sipi, Haskell es lo más. 😍

Ahora, ¿cómo funciona lazy evaluation?
Este tipo de evaluación se basa en una _estrategia_ que se llama **call-by-name**... ¿eeehhh? 😨
Simplemente es operar primero las funciones que están "por fuera", antes que las funciones de sus argumentos. Es decir, las funciones se aplican antes de que se evalúen los argumentos. 😎
Si volvemos al ejemplo anterior:

```haskell
head [1..]
-- aplicará primero head, antes que evaluar la lista infinita
> 1
```

Pero también hay funciones en las cuales necesitamos evaluar primero los parámetros, antes que la función en sí:

```haskell
(*) (2+3) 5
(2+3) * 5 

-- (*) necesita que sus parámetros sean números para poder evaluar, entonces se evalúa primero (2+3).

5 * 5
> 25
```

Evaluar primero los parámetros para luego pasarle el valor final a las funciones, lo llamamos **call-by-value**. Y es la estrategia en la que se basa la eager evaluation. Veamos:

```haskell
head [1..]
-- espera a que termine la lista infinita (nunca 😝)
head [1,2..]
-- espera a que termine la lista infinita (nunca 😝)
head [1,2,3..]
-- espera a que termine la lista infinita (nunca 😝)
head [1,2,3,4..]
-- ... y así hasta el infinito de los tiempos ⏳. ¡No termina!
```

Vimos los siguientes casos teniendo en cuenta estas preguntas:

- ¿terminarán de evaluar con lazy evaluation? 
- ¿y con eager evaluation? 
- ¿qué nos devuelve? 🤔

```haskell
take 15 [1,3..]
-- Sí termina con lazy. No terminaría con eager. Devuelve [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]

last [1..]
-- No termina con lazy y tampoco con eager.

length [1..]
-- No termina con lazy y tampoco con eager.

sum [3, 6..3*10]
-- Termina con ambas y devuelve 165.

any even [2, 4..]
-- Termina con lazy pero no con eager. Devuelve True.

all even [2, 4..]
-- No termina

all odd [2, 4..]
-- Devuelve False

head . filter (> 3) $ [1..])
-- Termina con lazy pero no con eager. Devuelve 4.

head . filter (< 3) $ [5..]
-- No termina con lazy y tampoco con eager.

map (*3) [1..]
-- No termina pero devuelve [3, 6, 9…]

fst ("Hola", [1..])
-- Devuelve "Hola". No terminaría de evaluarse con eager.

fst("Hola", head [])
-- Devuelve "Hola". Con eager rompería porque no se puede hacer head de la lista vacía.

snd ([1, "Hola"], 2)
-- Rompe porque las listas deben ser homogéneas.
```

## Funciones para generar listas

```haskell
repeat "Hola"
> ["Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", .....]
iterate (*2) 2
> [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ….]

replicate 10 "Hola"
> ["Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola", "Hola"]

cycle [1, 2, 3]
> [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, ….]
```
## Links Útiles

- [Video de la clase 2022](https://drive.google.com/file/d/16vMdK3pE65NhGreuVdu0NBNGpRqxzBw6/view?usp=sharing)
- [Código de la clase]()
- [Listas infinitas](http://wiki.uqbar.org/wiki/articles/estrategias-de-evaluacion.html#tocAnchor-1-7-4)
- [Lazy evaluation](http://wiki.uqbar.org/wiki/articles/estrategias-de-evaluacion.html#tocAnchor-1-7)
- [Estrategias de evaluación](http://wiki.uqbar.org/wiki/articles/estrategias-de-evaluacion.html)

