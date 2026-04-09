---
title: Décimo segunda clase
date: '2023-07-03'
description: Décimo segunda de PdeP
tags: [logico, forall, functores, pattern-matching, polimorfismo]
---

## Tarea
- Empezar a hacer el TP grupal de lógico [Democracia](https://docs.google.com/document/d/1Q4othulX9oW_vAfQNEWeFMhjrnhHd6kE3UHqBLZAYoA/edit). Con lo que saben hasta el momento pueden hacer hasta el punto 4 inclusive. A partir de la clase que viene ya pueden realizar el resto. Tienen tiempo para entregarlo hasta el 6/8 a las 23:59 hs. Como todos los TPs debe ser entregado en **tiempo y forma**. 

## ¿Qué vimos hoy?
- Forall
- Functores
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

Por ejemplo, al definir el predicado `escribioSoloComics/1` nos responde si todas las obras que alguien escribió son cómics.

```prolog
escribioSoloComics(AutorOAutora) :-
  escribio(AutorOAutora, _),
  forall(escribio(AutorOAutora, UnaObra), esComic(UnaObra)).
```

Cuidado, ya que forall no es conmutativo, si por ejemplo hiciésemos:

```prolog
forall(esComic(Obra), escribio(AutorOAutora, Obra)).
```

Esto, a diferencia de lo que hicimos en `escribioSoloComics`, significa que para todo cómic que existe lo escribió ese AutorOAutora.

Al igual que `not`, el `forall` es un  predicado de orden superior ya que recibe predicados por parámetro. ¿Y por qué ligamos al `AutorOAutora` antes de entrar al `forall`? Porque, siguiendo con las similitudes con el `not`, `forall` no liga variables. Es por este motivo que tenemos que _"generar"_ al `AutorOAutora` antes de entrar al `forall` pero teniendo la precaución de no ligar la `Obra`, ya que queremos **todas** las obras de **un** artista.

## Functores

Hasta ahora, en lógico siempre hicimos consultas en las cuales nuestros individuos eran simples.
Pero además de los individuos simples, también existen los **individuos compuestos**. 🧐
Los *functores* son individuos complejos y tienen:
- Un nombre, o etiqueta, que los identifica.
- Una aridad.

En nuestra base de conocimientos teníamos obras, ahora conocemos los tipos de obras, que pueden ser:
- `novela(Genero, CantidadDeCapitulos)`
- `libroDeCuentos(CantidadDeCuentos)`
- `cientifico(Disciplina)` 
- `bestSeller(Precio, CantidadDePaginas)`

Además contamos con un predicado `esDeGenero/2` que relaciona a cada obras con su género (no confundir con el género de la novela).

Ahora queremos saber si una obra está buena, esto se cumple cuando:
- Es una novela policial y tiene menos de 12 capítulos.
- Es una novela de terror.
- Los libros con más de 10 cuentos siempre son buenos.
- Es un libro científico de fisicaCuantica.
- Es un best seller y el precio por página es menor a $50.

```prolog
estaBuena(Obra):-
    esDeGenero(Obra, novela(policial, Capitulos)),
    Capitulos < 12.
estaBuena(Obra):-
    esDeGenero(Obra, novela(terror, _)).
estaBuena(Obra):-
    esDeGenero(Obra, libroDeCuentos(CantidadDeCuentos)),
    CantidadDeCuentos > 10.
estaBuena(Obra):-
    esDeGenero(Obra, cientifico(fisicaCuantica)).
estaBuena(Obra):-
    esDeGenero(Obra, bestSeller(Precio, Paginas)),
    Precio / Paginas < 50.
```
> Si bien los functores se escriben como un predicado, **NO** son un predicado. Como ven, los estamos usando como parámetro en nuestras consultas.

Ahora, mirando 🔭 un poco a nuestro código anterior, podemos ver lógica repetida y eso no nos gusta mucho. 👎

Veamos cómo podríamos cambiar esto...


```prolog
estaBuena(Obra):-
    esDeGenero(Obra, Tipo),
    esBuenGenero(Tipo).

esBuenGenero(novela(policial, Capitulos)):-
    Capitulos < 12.
esBuenGenero(novela(terror, _)).
esBuenGenero(libroDeCuentos(CantidadDeCuentos)):-
    CantidadDeCuentos > 10.
esBuenGenero(cientifico(fisicaCuantica)).
esBuenGenero(bestSeller(Precio, Paginas)):-
    Precio / Paginas < 50.
```

Tenemos un par de cosas interesantes acá. 🤔

Primero, si prestamos atención a cómo definimos el predicado `esBuenGenero`, podemos ver que estamos **deconstruyendo** (o abriendo) a los functores que representan el tipo de las obras.  
Por ejemplo, en esta claúsula, el tipo va a unificar sólo con aquellas novelas que sean policiales.
```prolog
esBuenGenero(novela(policial, Capitulos)):-
    Capitulos < 12.
% además la variable Capitulos va a unificar
% con la cantidad de capítulos de esa novela
```
Además, cada functor va a "saber" con qué claúsula del predicado quedarse.  
Todo esto gracias a que tenemos *Pattern Matching*. 🎉

En segundo lugar, podemos ver como al predicado `esBuenGenero` no le importa para nada que *forma* puede llegar a tener el functor del tipo de la obra.  
Al hecho de tratar variables indistintamente de su forma lo llamamos **polimorfismo** 💗 y va a ser un concepto muy importante y útil desde ahora hasta siempre. 😱

## Links útiles:

- [Video de la clase de 2022](https://drive.google.com/file/d/19BgJqAjgu4n4cMCt7tMj1Ytiv3evN1Nk/view?usp=sharing)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2023/blob/main/Logico/Clase02/clase02.pl) 
- [Generación](http://wiki.uqbar.org/wiki/articles/paradigma-logico---generacion.html)
- [Forall](http://wiki.uqbar.org/wiki/articles/paradigma-logico---existe-vs-para-todo.html)
- [Functores](http://wiki.uqbar.org/wiki/articles/paradigma-logico---functores.html)
- [Polimorfismo](http://wiki.uqbar.org/wiki/articles/polimorfismo-en-el-paradigma-logico.html)


