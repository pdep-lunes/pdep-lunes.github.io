---
title: Décima clase
date: '2020-07-13'
description: Décima clase de PdeP
tags: [listas, findall]
---

## Tarea: 
- Entregar la [segunda parte del TP grupal](https://docs.google.com/document/d/1nGpaTRQlGVXMOqAmUyXeHePva_ilNVlUs_zbc08k1Lg/edit) para el lunes que viene (20/07).

## ¿Qué vimos hoy?
- Listas
- findall

## findall y listas

Ahora queremos saber el puntaje de un autor, este se calcula como `3 * cantidad de obras best seller que escribió.`

Recordemos, que en nuestra base de conocimientos, contamos con un predicado `esBestSeller/1` que nos dice si una obra es best seller.

```
esBestSeller(UnaObra) :-
  copiasVendidas(UnaObra, CantidadVendida),
  CantidadVendida > 50000.
```

Por ende, podemos arrancar escribiendo un predicado que nos diga las obras que escribió un autor que son best sellers:

```
escribioBestSeller(Autor, Obra):-
    escribio(Autor, Obra),
    esBestSeller(Obra).).
```

Y en nuestra consola podemos hacer consultas como esta:

```
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

Para lograr esto contamos con un predicado llamado `findall/3`. Este se escribe de la forma `findall(Formato, Consulta, Lista)` y es inversible para su último argumento. Al igual que forall, findall es un predicado de orden superior, ya que su segundo parámetro es una consulta. La idea del findall es generar los individuos que cumplan con la consulta y agruparlos en una lista.  

Entonces, ahora podríamos escribir un predicado `obrasBestSellerQueEscribio/2` que relacione a un autor con todos las obras que escribió y que además son best sellers.

```
obrasBestSellerQueEscribio(Autor, Obras):-
    escribio(Autor, _),
    findall(Obra, escribioBestSeller(Autor, Obra), Obras).
```

Y podemos consultar:

```
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

```
cantidadDeObrasBestSeller(Autor, Cantidad):-
    obrasBestSellerQueEscribio(Autor, UnasObras),
    length(UnasObras, Cantidad).
```

Y ahora, por fin, ya podemos resolver nuestro problema inicial 😝:

```
puntaje(Autor, Puntaje):-
    cantidadDeObrasBestSeller(Autor, Cantidad),
    Puntaje is 3 * Cantidad.
```

Volamos un segundo a analizar `obrasBestSellerQueEscribio`. ¿Por qué es necesario generar al autor? Probemos qué pasa sin generarlo:

```
?- obrasBestSellerQueEscribio(Autor, Obras).
Obras = [socorro, sandman, watchmen, cienBalas, elCaballeroOscuroRegresa, batmanAnioUno, americanGods, buenosPresagios, buenosPresagios|...].
```

¿Qué es lo que estamos haciendo mal? Al no ligar la variable autor a cada uno de los individuos, la pregunta que estamos haciendo en este caso es: ¿Cuáles son obras best seller? cuando lo que realmente se quiere lograr es ¿Cuáles son obra best seller de cada Autor?

En el segundo parámetro del findall, podemos llegar a necesitar consultas más complejas. Por ejemplo, además de best sellers queremos que también le gusten a gus, por lo que vamos a hacer obrasBestSellerQueEscribioQueLeGustanAGus 🥵:

```
obrasBestSellerQueEscribioQueLeGustanAGus(Autor, Obras):-
    escribio(Autor, _),
    findall(Obra, (escribioBestSeller(Autor, Obra), leGustaA(gus, Obra)), Obras).
```

Es importante ver que muy probablemente si tenemos consultas compuestas en un findall, nos convendría delegar en una consulta que las abarque a ambas:

```
obrasBestSellerQueEscribioQueLeGustanAGus(Autor, Obras):-
    escribio(Autor, _),
    findall(Obra, esBestSellerDelGustoDeGus(Autor, Obra), Obras).

esBestSellerDelGustoDeGus(Autor, Obra):-
	escribioBestSeller(Autor, Obra), 
	leGustaA(gus, Obra).
```

Además de poder generar conjuntos, también podemos utilizar listas con individuos dentro de nuestro modelado. Para mostrar esto, vamos a introducir las obras fantásticas, las cuáles cuentan con un conjunto de elementos mágicos. Agreguemos el nuevo tipo de obra:

```
%fantastica(ElementosMágicos)
esDeTipo(sandman, fantastica([yelmo, bolsaDeArena, rubi])).
```

Vamos a agregar un nuevo tipo copado para las obras fantásticas: aquellas obras que tengan un rubi. ¿Cómo podemos saber si una lista incluye un elemento? Tan simple como usar el predicado `member/2`:

```
esTipoCopado(fantastica(ElementosFantasticos)):-
  member(rubi, ElementosFantasticos).
```

Es importante tener cuidado con el uso de member. Un clásico error del paradigma lógico es utilizar un member con un conjunto armado con un findall. Cuando queremos utilizar un findall para tener un conjunto, nunca deberíamos querer saber si un elemento está dentro de ese conjunto ya que contábamos con la condición para saberlo previamente. Sigamos el siguiente ejemplo: quiero saber si una obra es best seller del gusto de gus:

```
obrasBestSellerQueEscribioQueLeGustanAGus(Autor, Obras):-
    escribio(Autor, _),
    findall(Obra, (esBestSeller(Autor, Obra), leGustaA(gus, Obra)), Obras).

esBestSellerDelGustoDeGus(Obra):-
  obrasBestSellerQueEscribioQueLeGustanAGus(_, Obras),
  member(Obra, Obras).
```

Este modelo es incorrecto conceptualmente: estamos armando una lista para preguntar si un elemento está en la misma cuando podíamos resolver directamente con una consulta:

```
esBestSellerDelGustoDeGus(Obra):-
  esBestSeller(Obra),
  leGustaA(gus, Obra).
```

No necesitábamos una lista para poder cumplir el requerimiento. En este caso, nuestra solución es mucho más declarativa. 


Para terminar de aclarar los conceptos, vamos a realizar otro ejercicio. Queremos saber el promedio de copias que vendió un autor en toda su vida. Para ello, podemos empezar armando un predicado que relacione un autor con cada cantidad de copias vendida por obra:

```
vendio(Autor, Copias):-
    escribio(Autor, Obra),
    copiasVendidas(Autor, Copias).
```

Con esta información podemos armar el conjunto de copias vendidas de cada autor. ¿Y cómo sumamos la lista para obtener el promedio? ¡Fácil! Prolog nos da `sum_list`:

```
promedioCopiasVendidas(Autor, Promedio):-
    escribio(Autor, _),
    findall(Copias, vendio(Autor, Copias), ListaCopias),
    sum_list(ListaCopias, TotalCopias)
    length(ListaCopias, Cantidad)
    Promedio is TotalCopias/Cantidad.
```

## Links útiles:

- [Código de la clase](https://github.com/pdep-lunes/obras/blob/master/obras.pl)
- [Video de la clase](https://drive.google.com/file/d/12-Zgt-FIicdu_3-lt13JuHoA7Q0zlW1f/view)
- [Listas y findall](http://wiki.uqbar.org/wiki/articles/paradigma-logico---listas.html)

