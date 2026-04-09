---
title: Listas, is y findall
date: '2025-07-07'
description: Décimo cuarta clase de PdeP
tags: [logico, is, listas, findall, ilogico]
---

## Tarea: 
- Hacer el [TP grupal](https://docs.google.com/document/d/1ImcsLsk4HaWelo6m0esDB8RvMj0PiVvvXKRiX7p_ArQ/edit?tab=t.0#heading=h.ur5u8ali7kou) para el primer lunes pos vacaciones (04/08).
- ¡Estudiar para el parcial! Pueden practicar con todos los que aparezcan en la [página de PdeP](https://www.pdep.com.ar/material/parciales), empezando por los que tengan resolución, para que puedan ir chequeando. De esa lista recomendamos que prioricen, luego de que hagan los que tienen resolución, [Steam Summer Sale](https://drive.google.com/file/d/1xJNQzdkVdGVQcd_y4uTUKWyf0pt-OJSH/view?usp=drive_link), [Pulp Fiction](https://docs.google.com/document/d/15mo_2391atBqMjcYzLtKvGG6JiPzjbeyEGVlwZjv4B8/edit#heading=h.qr1tbl1vrwzf) y [Rey Leon](https://drive.google.com/file/d/1x4X-0AfaKK3Zv-twZfsviXRlH6Xg2Oxt/view). También les dejamos [iLógico](https://docs.google.com/document/d/1VUNyZQXITv9CiSz9VjFwoQRVe8o03CtyvTS79UNl0O8/edit?usp=sharing) que contieneerrores comunes que se pueden dar en este paradigma. Pueden encontrar la solución [acá](https://github.com/pdep-lunes/pdep-clases/blob/main/2021/logico/clase-15.pl)



## ¿Qué vimos hoy?
- `is`
- Listas
- `findall`

## is

`is` es un predicado que relaciona a una cuenta *(a la derecha)* con su resultado *(a la izquierda)*. Es inversible para el resultado: liga la variable del `Resultado` al resultado de la expresión matemática de la derecha.
```prolog
Resultado is ExpresionMatematica
```
Entonces:
- ¿Cuándo usamos `is`?  
**Solamente** cuando necesitamos realizar cuentas que tienen sentido.
- ¿Y en dónde más?  
En ningún otro caso. Usar `is` sólo para ligar variables está **MAL** y nadie quisiera reprobar su parcial de lógico por eso. 👮🏻‍

En la clase lo utilizamos cuando hicimos `cantidadDePaginas`:

```prolog
cantidadDePaginas(Obra, CantidadDePaginas) :- 
	esDeTipo(Obra, Tipo),
	paginasPorTipo(Tipo, CantidadDePaginas).

paginasPorTipo(novela(_, CantidadDeCapitulos), CantidadDePaginas):-
	CantidadDePaginas is CantidadDeCapitulos * 20.

paginasPorTipo(libroDeCuentos(CantidadDeCuentos), CantidadDePaginas):-
	CantidadDePaginas is CantidadDeCuentos * 5.

paginasPorTipo(cientifico(_), 1000).

paginasPorTipo(bestSeller(_, CantidadDePaginas), CantidadDePaginas).
```

Pero fijate que solo lo utilizamos en las novelas y en los libros de cuentos. Para los best seller y los libros científicos usamos Pattern Matching ¡porque no había cuentas!

## findall y listas

Ahora queremos saber el puntaje de un autor, este se calcula como _3 * cantidad de obras best seller que escribió._

Recordemos, que en nuestra base de conocimientos, contamos con un predicado `esBestSeller/1` que nos dice si una obra es best seller.

```prolog
esBestSeller(UnaObra) :-
  copiasVendidas(UnaObra, CantidadVendida),
  CantidadVendida > 50000.
```

Así que podemos arrancar escribiendo un predicado que nos diga las obras que escribió un autor que son best sellers:

```prolog
escribioBestSeller(Autor, Obra):-
    escribio(Autor, Obra),
    esBestSeller(Obra).
```

Y en nuestra consola podemos hacer consultas como esta:

```prolog
escribioLibroBestSeller(Artista, Obra).
Artista = elsaBornemann,
Obra = socorro ;
Artista = neilGaiman,
Obra = sandman ;
Artista = alanMoore,
Obra = watchmen ;
Artista = brianAzarello,
Obra = cienBalas ;
Artista = frankMiller,
Obra = elCaballeroOscuroRegresa ;
Artista = frankMiller,
Obra = batmanAnioUno ;
...
```
Si bien, como `escribioBestSeller` es inversible, podemos consultar por los valores que puede tomar la variable Obra. ¿Pero cómo podríamos trabajar con todas las obras best seller que escribió un autor al mismo tiempo? Bueno, ¡podríamos agruparlo en una lista!

Para lograr esto contamos con un predicado llamado `findall/3`. Este se escribe de la forma `findall(Formato, Consulta, Lista)` y es inversible para su último argumento. Al igual que `forall`, `findall` es un predicado de orden superior, ya que su segundo parámetro es una consulta. La idea del findall es generar los individuos que cumplan con la consulta y agruparlos en una lista.  

Entonces, ahora podríamos escribir un predicado `obrasBestSellerQueEscribio/2` que relacione a un autor con todos las obras que escribió y que además son best sellers.

```prolog
obrasBestSellerQueEscribio(Autor, Obras):-
    escribio(Autor, _),
    findall(Obra, escribioBestSeller(Autor, Obra), Obras).
```

Y podemos consultar:

```prolog
?- obrasBestSellerQueEscribio(Artista, Obras).
Artista = elsaBornemann,
Obras = [socorro] ;
Artista = neilGaiman,
Obras = [sandman, americanGods, buenosPresagios] ;
Artista = alanMoore,
...
```

Ahora, la cantidad de obras best seller que escribió ese autor sería el tamaño de esa lista.
Y bueno, ¿cómo creen que prolog podría relacionar a una lista con su tamaño?
Sí, ¡con un predicado 🤩! Contamos con `length(Lista, Tamanio)`, que es inversible para el tamaño.

Entonces podríamos escribir:

```prolog
cantidadDeObrasBestSeller(Autor, Cantidad):-
    obrasBestSellerQueEscribio(Autor, UnasObras),
    length(UnasObras, Cantidad).
```

Y ahora, por fin, ya podemos resolver nuestro problema inicial 😝:

```prolog
puntaje(Autor, Puntaje):-
    cantidadDeObrasBestSeller(Autor, Cantidad),
    Puntaje is 3 * Cantidad.
```

Volvamos un segundo a analizar `obrasBestSellerQueEscribio`. ¿Por qué es necesario generar al autor? Probemos qué pasa sin generarlo:

```prolog
?- obrasBestSellerQueEscribio(Autor, Obras).
Obras = [socorro, sandman, watchmen, cienBalas, elCaballeroOscuroRegresa, batmanAnioUno, americanGods, buenosPresagios, buenosPresagios|...].
```

¿Qué es lo que estamos haciendo mal? Al no ligar la variable autor a cada uno de los individuos, la pregunta que estamos haciendo en este caso es: ¿Cuáles son obras best seller? cuando lo que realmente se quiere lograr es ¿Cuáles son obra best seller de cada Autor?

Es importante tener cuidado con el uso de `member`. Un clásico error del paradigma lógico es utilizar un `member` con un conjunto armado con un `findall`. Cuando queremos utilizar un `findall` para tener un conjunto, nunca deberíamos querer saber si un elemento está dentro de ese conjunto ya que contábamos con la condición para saberlo previamente. Sigamos el siguiente ejemplo, queremos saber si una obra es best seller del gusto de Gus:

```prolog
obrasBestSellerQueEscribioQueLeGustanAGus(Autor, Obras):-
    escribio(Autor, _),
    findall(Obra, (esBestSeller(Autor, Obra), leGustaA(gus, Obra)), Obras).

esBestSellerDelGustoDeGus(Obra):-
  obrasBestSellerQueEscribioQueLeGustanAGus(_, Obras),
  member(Obra, Obras).
```

Este modelo es incorrecto conceptualmente: estamos armando una lista para preguntar si un elemento está en la misma cuando podíamos resolver directamente con una consulta:

```prolog
esBestSellerDelGustoDeGus(Obra):-
  esBestSeller(Obra),
  leGustaA(gus, Obra).
```

No necesitábamos una lista para poder cumplir el requerimiento. En este caso, nuestra solución es mucho más declarativa. 

Como pudimos observar con el ejemplo anterior, en el segundo argumento del `findall`, podemos llegar a necesitar consultas más complejas, las cuales debemos encerrar entre paréntesis (como `findall(Obra, (escribioBestSeller(Autor, Obra), leGustaAGus(Obra)), Obras).`). Pero es importante ver que muy probablemente si tenemos consultas compuestas en un findall, nos convendría delegar en una consulta que las abarque a ambas (como `esBestSellerDelGustoDeGus(Autor, Obra)`)

Además de poder generar conjuntos, también podemos utilizar listas con individuos dentro de nuestro modelado. Para mostrar esto, vamos a introducir las obras fantásticas, las cuáles cuentan con un conjunto de elementos mágicos. Agreguemos el nuevo tipo de obra:

```prolog
%fantastica(ElementosMágicos)
esDeGenero(sandman, fantastica([yelmo, bolsaDeArena, rubi])).
```

Vamos a agregar un nuevo tipo copado para las obras fantásticas: aquellas obras que tengan un rubí. ¿Cómo podemos saber si una lista incluye un elemento? Tan simple como usar el predicado `member/2`:

```prolog
esBunGenero(fantastica(ElementosMagicos)):-
  member(rubi, ElementosMagicos).
```


Para terminar de aclarar los conceptos, vamos a realizar otro ejercicio. Queremos saber el promedio de copias que vendió un autor en toda su vida. Para ello, podemos empezar armando un predicado que relacione un autor con cada cantidad de copias vendida por obra:

```prolog
vendio(Autor, Copias):-
    escribio(Autor, Obra),
    copiasVendidas(Obra, Copias).
```

Con esta información podemos armar el conjunto de copias vendidas de cada autor. ¿Y cómo sumamos la lista para obtener el promedio? ¡Fácil! Prolog nos da `sumlist`:

```prolog
promedioCopiasVendidas(Autor, Promedio):-
    escribio(Autor, _),
    findall(Copias, vendio(Autor, Copias), ListaCopias),
    sumlist(ListaCopias, TotalCopias)
    length(ListaCopias, Cantidad)
    Promedio is TotalCopias/Cantidad.
```
Y una solución un poco más declarativa podría ser delegando el `promedio` en otro predicado:

```prolog
promedioCopiasVendidas(Autor, Promedio):-
    escribio(Autor, _),
    findall(Copias, vendio(Autor, Copias), ListaCopias),
    promedio(ListaCopias, Promedio).

promedio(Lista, Promedio):-
    length(Lista, Cantidad),
    sum_list(Lista, Suma),
    Promedio is Suma / Cantidad.
```


## Links útiles:

- [Código de la clase](https://github.com/pdep-lunes/pdep-clases/blob/main/2023/logico/clase-03/clase03.pl) 
- [Aritmética/is](http://wiki.uqbar.org/wiki/articles/aritmetica-en-prolog.html)
- [Listas y findall](http://wiki.uqbar.org/wiki/articles/paradigma-logico---listas.html)



