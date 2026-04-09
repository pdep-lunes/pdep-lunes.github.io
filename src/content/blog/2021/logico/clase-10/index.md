---
title: Décima clase
date: '2021-07-05'
description: Décima clase de PdeP
tags: [logico, forall, functores, is, pattern-matching, polimorfismo]
---

## ¿Qué vimos hoy?
- Forall
- Functores
- is
- Pattern Matching
- Polimorfismo

## Forall

Hasta ahora, estuvimos trabajando con **cuantificadores existenciales**, es decir, todas nuestras consultas eran del tipo:

```
∃x / p(x) => q(x)
```

Pero, sabemos que hay otro cuantificador, el *universal*. ¿Y cómo podemos trabajar con este cuantificador? 👀

Vamos a utilizar el predicado de orden superior `forall/2`:

```prolog
forall(antecedente, consecuente).
```

Para que el `forall` responda verdadero, tiene que ocurrir que **para todo antecedente que ocurra, su consecuente ocurre**.

Por ejemplo, al definir el predicado `soloEscribioComics/1` nos responde si todas las obras que alguien escribió son cómics.

```prolog
soloEscribioComics(Artista) :-
    escribio(Artista, _),
    forall(escribio(Artista, Obra), esComic(Obra)).
```

Cuidado, ya que forall no es conmutativo, si por ejemplo hiciésemos:

```prolog
forall(esComic(Obra), escribio(Artista, Obra)).
```

Esto, a diferencia de lo que hicimos en `soloEscribioComics`, significa que para todo cómic que existe lo escribió ese Artista.

Al igual que `not`, el `forall` es un  predicado de orden superior ya que recibe predicados por parámetro. ¿Y por qué ligamos al `Artista` antes de entrar al `forall`? Porque, siguiendo con las similitudes con el `not`, `forall` no liga variables. Es por este motivo que tenemos que _"generar"_ al `Artista` antes de entrar al `forall` pero teniendo la precaución de no ligar la `Obra`, ya que queremos **todas** las obras de **un** artista.

## Functores

Hasta ahora, en lógico siempre hicimos consultas en las cuales nuestros individuos eran simples.
Pero además de los individuos simples, también existen los **individuos complejos**. 🧐
Los *functores* son individuos complejos y tienen:
- Un nombre, o etiqueta, que los identifica.
- Una aridad.

En nuestra base de conocimientos teníamos obras, ahora conocemos los tipos de obras, que pueden ser:
- `novela(Genero, CantidadDeCapitulos)`
- `libroDeCuentos(CantidadDeCuentos)`
- `cientifico(Disciplina)` 
- `bestSeller(Precio, CantidadDePaginas)`

Además contamos con un predicado `esDeTipo/2` que relaciona a cada obras con su tipo.

Ahora queremos saber si una obra está buena, esto se cumple cuando:
- Es una novela policial y tiene menos de 12 capítulos.
- Es una novela de terror.
- Los libros con más de 10 cuentos siempre son buenos.
- Es un libro científico de fisicaCuantica.
- Es un best seller y el precio por página es menor a $50.

```prolog
estaBuena(Obra):-
    esDeTipo(Obra, novela(policial, Capitulos)),
    Capitulos < 12.
estaBuena(Obra):-
    esDeTipo(Obra, novela(terror, _)).
estaBuena(Obra):-
    esDeTipo(Obra, libroDeCuentos(CantidadDeCuentos)),
    CantidadDeCuentos > 10.
estaBuena(Obra):-
    esDeTipo(Obra, cientifico(fisicaCuantica)).
estaBuena(Obra):-
    esDeTipo(Obra, bestSeller(Precio, Paginas)),
    Precio / Paginas < 50.
```
> Si bien los functores se escriben como un predicado, **NO** son un predicado. Como ven, los estamos usando como parámetro en nuestras consultas.

Ahora, mirando 🔭 un poco a nuestro código anterior, podemos ver lógica repetida y eso no nos gusta mucho. 👎

Veamos cómo podríamos cambiar esto...


```prolog
estaBuena(Obra):-
    esDeTipo(Obra, Tipo),
    esTipoCopado(Tipo).

esTipoCopado(novela(policial, Capitulos)):-
    Capitulos < 12.
esTipoCopado(novela(terror, _)).
esTipoCopado(libroDeCuentos(CantidadDeCuentos)):-
    CantidadDeCuentos > 10.
esTipoCopado(cientifico(fisicaCuantica)).
esTipoCopado(bestSeller(Precio, Paginas)):-
    Precio / Paginas < 50.
```

Tenemos un par de cosas interesantes aquí. 🤔

Primero, si prestamos atención a cómo definimos el predicado `esTipoCopado`, podemos ver que estamos **deconstruyendo** (o abriendo) a los functores que representan el tipo de las obras.  
Por ejemplo, en esta claúsula, el tipo va a unificar sólo con aquellas novelas que sean policiales.
```prolog
esTipoCopado(novela(policial, Capitulos)):-
    Capitulos < 12.
% además la variable Capitulos va a unificar
% con la cantidad de capítulos de esa novela
```
Además, cada functor va a "saber" con qué claúsula del predicado quedarse.  
Todo esto gracias a que tenemos *Pattern Matching*. 🎉

En segundo lugar, podemos ver como al predicado `tipoCopado` no le importa para nada que *forma* puede llegar a tener el functor del tipo de la obra.  
Al hecho de tratar variables indistintamente de su forma lo llamamos **polimorfismo** 💗 y va a ser un concepto muy importante y útil desde ahora hasta siempre. 😱

## is

`is` es un predicado que relaciona a una cuenta *(a la derecha)* con su resultado *(a la izquierda)*. Es inversible para el resultado: liga la variable del `Resultado` al resultado de la expresión matemática de la derecha.
```prolog
Resultado is ExpresionMatematica
```
Entonces:
- ¿Cuándo usamos `is`?  
Bueno, **solamente** cuando necesitamos realizar cuentas que tienen sentido.
- ¿Y en en dónde más?  
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

## Links útiles:

- [Video de la clase de hoy](https://drive.google.com/file/d/1UQ7nDRmIqJhgj3xDexiLfoWZqwqnVuT-/view?usp=sharing)
- [Código de la clase de hoy](https://github.com/pdep-lunes/pdep-clases-2021/blob/master/logico/clase-13.pl)
- [Generación](http://wiki.uqbar.org/wiki/articles/paradigma-logico---generacion.html)
- [Forall](http://wiki.uqbar.org/wiki/articles/paradigma-logico---existe-vs-para-todo.html)
- [Functores](http://wiki.uqbar.org/wiki/articles/paradigma-logico---functores.html)
- [Polimorfismo](http://wiki.uqbar.org/wiki/articles/polimorfismo-en-el-paradigma-logico.html)
- [Aritmética/is](http://wiki.uqbar.org/wiki/articles/aritmetica-en-prolog.html)

