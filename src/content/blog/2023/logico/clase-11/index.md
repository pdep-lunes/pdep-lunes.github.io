---
title: Décimo primera clase
date: "2023-06-26"
description: "Décimo primera clase de PdeP"
tags: [logico, hechos, reglas, universo-cerrado, negacion, unificacion-asignacion, inversibilidad]

---

## Tarea

- Instalar el entorno de [SWI Prolog](https://www.pdep.com.ar/software/swi-prolog).
- Realizar como práctica individual [Muerte en la Mansión Dreadbury](https://docs.google.com/document/d/1eZomztuiSXx1ywKhrJU6cw1rNOJGqnXYDbHox6szDfw/edit).

## ¿Qué vimos hoy?

¡Hoy comenzamos con el paradigma Lógico! Peeero, empezamos planteando un problema utilizando el paradigma Funcional. Podés repasar esa parte en el siguiente [video](https://youtu.be/4M-lzIOhVbI).

Luego construimos el siguiente código:

```prolog
% BASE DE CONOCIMIENTOS

%escribio(AutorOAutora, Obra) -> hecho (hay 24 claúsulas)
escribio(elsaBornemann, socorro).
escribio(neilGaiman, sandman).
escribio(alanMoore, watchmen).
escribio(brianAzarello, cienBalas).
escribio(warrenEllis, planetary).
escribio(frankMiller, elCaballeroOscuroRegresa).
escribio(frankMiller, batmanAnioUno).
escribio(neilGaiman, americanGods).
escribio(neilGaiman, buenosPresagios).
escribio(terryPratchett, buenosPresagios).
escribio(isaacAsimov, fundacion).
escribio(isaacAsimov, yoRobot).
escribio(isaacAsimov, elFinDeLaEternidad).
escribio(isaacAsimov, laBusquedaDeLosElementos).
escribio(joseHernandez, martinFierro).
escribio(stephenKing, it).
escribio(stephenKing, misery).
escribio(stephenKing, carrie).
escribio(stephenKing, elJuegoDeGerald).
escribio(julioCortazar, rayuela).
escribio(jorgeLuisBorges, ficciones).
escribio(jorgeLuisBorges, elAleph).
escribio(horacioQuiroga, cuentosDeLaSelva).
escribio(horacioQuiroga, cuentosDeLocuraAmorYMuerte).

% Agregamos qué obras son cómics.

esComic(sandman).
esComic(cienBalas).
esComic(watchmen).
esComic(planetary).
esComic(elCaballeroOscuroRegresa).
esComic(batmanAnioUno).

% Queremos saber si alguien es artista del noveno arte (comics).
% Lo resolvemos por comprensión.
% esArtistaDelNovenoArte/1 predicado con dos claúsulas (una regla y un hecho).

% p ^ q => r -> en discreta
% r <= p ^ q -> en lógico

esArtistaDelNovenoArte(Artista) :- % regla
    escribio(Artista, Obra),
    esComic(Obra).

% En lógico no asignamos. Sí ligamos o unificamos, por eso no hace falta decir que la "Obra" es la misma.

% Y si también queremos aclarar que Art Spiegelman es un artista del noveno arte, hacemos:

esArtistaDelNovenoArte(artSpiegelman). % hecho

% Un artista es reincidente si escribió al menos 2 obras.

esReincidente(Artista) :-
    escribio(Artista, UnaObra),
    escribio(Artista, OtraObra),
    UnaObra \=  OtraObra.

```

Introducimos el concepto de **inversibilidad** que es una característica del paradigma Lógico que nos permite realizar consultas del tipo existenciales, además de las individuales. Lo podemos ver en el siguiente ejemplo:

```prolog
% Una obra es un libro cuando NO es un comic.
% not no es inversible!! No puede ligar las variables dentro de su predicado.
% Si a esLibro no le agregamos el generador, no sería un predicado inversible porque el not no es inversible.
% El generador nos "achica" el universo de opciones.

esLibro(Obra) :-
    esObra(Obra), % generador para que esLibro sea inversible
    not(esComic(Obra)).

esObra(Obra) :-
    escribio(_, Obra).
```

## Links útiles

* [Video de introducción al paradigma lógico](https://youtu.be/4M-lzIOhVbI)
* [PPT de la introducción al paradigma Lógico](https://docs.google.com/presentation/d/1XJY_jdb52BPj7PvuRICEf3NZdCaxg3Kul2OeC9pHIXk/edit#slide=id.p).
* [Video de la clase de 2022](https://drive.google.com/file/d/1JdKDX0UB0geLR2f5cmql-FHoqr-DVEj5/view?usp=sharing).
* [Universo cerrado](http://wiki.uqbar.org/wiki/articles/paradigma-logico---introduccion.html)
* [¿Qué podemos encontrar en lógico?](http://wiki.uqbar.org/wiki/articles/paradigma-logico---un-poco-de-nomenclatura.html)
* [Conjunción y disyunción](http://wiki.uqbar.org/wiki/articles/paradigma-logico---conjuncion-y-disyuncion.html)
* [Consulta existencial](http://wiki.uqbar.org/wiki/articles/paradigma-logico---multiples-respuestas.html)
* [Inversibilidad](http://wiki.uqbar.org/wiki/articles/paradigma-logico---inversibilidad.html)
