---
title: Polimorfismo, functores, forall
date: '2026-07-06'
description: Primera y segunda clase del Paradigma Lógico
tags: [logico, forall, functores, pattern-matching, polimorfismo, negacion]
---

## Tarea:
- Comenzar la [Entrega 1 de TP de Lógico](https://docs.google.com/document/d/1txUb8JSwY1t8zEM5rSj-3Q2dzQwzwJKh9o0ViuB3pIw/edit?tab=t.0#heading=h.etkst14ntq91).
- Realizar el ejercicio [La Biblioteca](https://docs.google.com/document/d/1oz2WbVi3lT_pxBy7r7Px0tD3gb8DjSC64l5LvqMQ3V0/edit?usp=sharing). Podés encontrar una posible solución [acá](https://github.com/pdep-lunes/pdep-clases/blob/main/2023/logico/clase-02/clase02.pl).
- Practicar con Miyuki y/o [ejercicios de lógico de la página](https://www.pdep.com.ar/material/gu%C3%ADa-de-ejercicios#h.yumhnbyin5hn).

## ¿Qué vimos hoy?
- Negación
- Inversibilidad
- Forall
- Functores
- Pattern Matching
- Polimorfismo

## Repaso clase pasada

```prolog
elabora(guille, empanadaDeCarne).
elabora(guille, empanadaDeVerdura).
elabora(vale, papasFritas).
elabora(vale, tiramisu).
elabora(vale, lemonPie).
elabora(ale, hamburguesa).
elabora(lu, sushi).
elabora(mar, flan).

% trabaja(Chef, Restaurante)
trabaja(guille, pinpun).
trabaja(vale, laPececita).
trabaja(vale, laParolacha).
trabaja(lu, sushiRock).
trabaja(lu, nipon).
trabaja(ale, guendis).
trabaja(mar, cantin).

% tieneEstilo(Restaurante, Estilo)
tieneEstilo(pinpun, bodegon).
tieneEstilo(laPececita, bodegon).
tieneEstilo(laParolacha, italiano).
tieneEstilo(sushiRock, oriental).
tieneEstilo(nipon, oriental).
tieneEstilo(cantin, oriental).
tieneEstilo(tacoCaja, mexicano).
tieneEstilo(guendis, comidaRapida).

% esCrack/1: un/a chef es crack si trabaja en al menos 2 restaurantes o cocina lemon pie.

esCrack(Chef):- 
trabaja(Chef, Restaurante),
trabaja(Chef, OtroResto),
Restaurante \= OtroResto.
esCrack(Chef):- 
            elabora(Chef, lemonPie).
% seMereceMichelin/1: un restaurante se merece una estrella michelin cuando tiene un/a chef crack y su estilo es michelinero. El estilo michelinero sucede cuando un restaurante tiene estilo oriental o bodegon. Los comida rapida nunca son michelineros.

esMichelinero(oriental).
esMichelinero(bodegon).

seMereceMichelin(Restaurante):-
	trabaja(Chef, Restaurante),
	esCrack(Chef),
	tieneEstilo(Restaurante, Estilo),
	esMichelinero(Estilo).
```

## Not 

Queremos saber si un chef es de bajo perfil. Un chef es de bajo perfil si trabaja en algún restaurante, pero no es crack.

```prolog
chefDeBajoPerfil(Chef) :-
    trabaja(Chef, _),
    not(esCrack(Chef)).
```

El predicado `not` es de orden superior ya que niega la consulta dada. No liga variables por lo que no es inversible (no busca quien hace verdadera o falsa esa consulta, simplemente niega lo que encuentra).


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

Por ejemplo, al definir el predicado `chefMichelinero/1` nos responde si todos los restaurantes en los que un chef trabajó, se merecen la Michelin. 

```prolog
chefMichelinero(Chef) :-
    trabaja(Chef, _),
    forall(trabaja(Chef, Restaurante), seMereceMichelin(Restaurante)).
```

Cuidado, ya que forall no es conmutativo, si por ejemplo hiciésemos:

```prolog
forall(seMereceMichelin(Restaurante), trabaja(Chef, Restaurante)).
```

Esto, a diferencia de lo que hicimos en `chefMichelinero`, significa que para todo restaurante que se merece la Michelin, trabajó ese chef.

Al igual que `not`, el `forall` es un  predicado de orden superior ya que recibe predicados como argumento. ¿Y por qué ligamos al `Chef` antes de entrar al `forall`? Porque, siguiendo con las similitudes con el `not`, `forall` no liga variables. Es por este motivo que tenemos que _"generar"_ al `Chef` antes de entrar al `forall` pero teniendo la precaución de no ligar el `Restaurante`, ya que queremos **todos** los restaurantes en los que trabajó **un** chef.
Si no ligamos la variable `Chef`, `chefMichelinero` no será inversible (no podremos hacer consultas del estilo “¿Quién es un chef michelinero?”) y además no hará lo que queremos, si no que preguntará: "Para todo chef y todo restaurante en los que exista una relación de trabajo, ¿es ese restaurante de estilo michelinero?".

## Functores

Hasta ahora, en lógico siempre hicimos consultas en las cuales nuestros individuos eran simples.
Pero además de los individuos simples, también existen los **individuos compuestos**. 🧐
Los *functores* son individuos compuestos y tienen:
- Un nombre, o etiqueta, que los identifica.
- Una aridad.

En nuestra base de conocimientos teníamos “platos clásicos” (individuos simples), ahora también hay “platos de autor” (individuos compuestos), que pueden ser:
- `deconstruccion(PlatoClasico, CantidadDeTexturas)`
- `ahumado(Ingrediente, TipoDeMadera)`
- `coccionAlVacio(Ingrediente, Horas)` 
- `espuma(Sabor, Textura)`

Por ejemplo:


```prolog
elabora(guille, deconstruccion(tiramisu, 5)). 
elabora(guille, ahumado(berenjena, nogal)). 
elabora(mar, coccionAlVacio(papa, 2)). 
elabora(valen, coccionAlVacio(calabaza, 4)).
elabora(ale, espuma(parmesano, aireada)). 
```

Ahora queremos saber si un chef elabora un plato gourmet, esto se cumple cuando:
- Es sushi o lemon pie.
- Es plato deconstruido con más de 4 texturas.
- Tiene una cocción al vacío de 2 o más horas o se cocina calabaza al vacío.
- Es un plato ahumado con madera de nogal.
- Es una espuma de parmesano aireada o cualquier espuma gelificada.

```prolog
elaboraPlatoGourmet(Chef):-
    elabora(Chef, sushi).
elaboraPlatoGourmet(Chef):-
    elabora(Chef, lemonPie).
elaboraPlatoGourmet(Chef):-
    elabora(Chef, deconstruccion(_, Texturas)),
    Texturas > 4.
elaboraPlatoGourmet(Chef):-
    elabora(Chef, coccionAlVacio(calabaza, _)).
elaboraPlatoGourmet(Chef):-
    elabora(Chef, coccionAlVacio(_, Horas)),
    Horas >= 2.
elaboraPlatoGourmet(Chef):-
    elabora(Chef, ahumado(_, nogal)).
elaboraPlatoGourmet(Chef):-
    elabora(Chef, espuma(parmesano, aireada)).
elaboraPlatoGourmet(Chef):-
    elabora(Chef, espuma(_, gelificada)).
```
> Si bien los functores se escriben como un predicado, **NO** son un predicado. Como ven, los estamos usando como parámetro en nuestras consultas.

Ahora, mirando 🔭 un poco a nuestro código anterior, podemos ver lógica repetida y eso no nos gusta mucho. 👎

Veamos cómo podríamos cambiar esto...


```prolog
elaboraPlatoGourmet(Chef):-
    elabora(Chef, Plato),
    esGourmet(Plato).

esGourmet(sushi).
esGourmet(lemonPie).

esGourmet(deconstruccion(_, Texturas)) :-
    Texturas > 4.

esGourmet(coccionAlVacio(_, Horas)) :-
    Horas >= 2.

esGourmet(coccionAlVacio(calabaza, _)).

esGourmet(ahumado(_, nogal)).

esGourmet(espuma(parmesano, aireada)).
esGourmet(espuma(_, gelificada)).
```

Tenemos un par de cosas interesantes acá. 🤔

Si prestamos atención a cómo definimos el predicado `esGourmet`, podemos ver que estamos **deconstruyendo** (o abriendo) a los functores que representan el tipo de los platos.  
Por ejemplo, en esta claúsula, el tipo va a unificar sólo con aquellos platos que sean de cocción al vacío:

```prolog
esGourmet(coccionAlVacio(_, Horas)) :-
    Horas >= 2.
% además la variable Horas va a unificar
% con la cantidad de horas que va a estar al vacío
```
Además, cada functor va a "saber" con qué claúsula del predicado quedarse.  
Todo esto gracias a que tenemos *pattern matching*. 🎉

Entonces, podemos ver como al predicado `esGourmet` no le importa para nada que *forma* puede llegar a tener el functor del tipo del plato.  
Al hecho de tratar variables indistintamente de su forma lo llamamos **polimorfismo** 💗 y va a ser un concepto muy importante y útil desde ahora hasta siempre. 😱

## Links útiles:

- [Video de la clase de 2022](https://drive.google.com/file/d/19BgJqAjgu4n4cMCt7tMj1Ytiv3evN1Nk/view?usp=sharing)
- [Código de la clase 2023](https://github.com/pdep-lunes/pdep-clases/blob/main/2023/logico/clase-02/clase02.pl) 
- [Generación](http://wiki.uqbar.org/wiki/articles/paradigma-logico---generacion.html)
- [Forall](http://wiki.uqbar.org/wiki/articles/paradigma-logico---existe-vs-para-todo.html)
- [Functores](http://wiki.uqbar.org/wiki/articles/paradigma-logico---functores.html)
- [Polimorfismo](http://wiki.uqbar.org/wiki/articles/polimorfismo-en-el-paradigma-logico.html)
