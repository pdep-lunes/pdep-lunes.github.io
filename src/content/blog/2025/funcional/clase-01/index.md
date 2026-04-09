---
title: Presentación y primeros conceptos
date: "2025-03-31"
description: "Primera clase de PdeP"
tags: [expresividad, declaratividad, paradigmas]
---

## Qué hacer para la clase que viene:
- Unirse a [discord](https://discord.gg/4YGq8neQjB) siguiendo este [instructivo](https://docs.google.com/document/d/1KhlCwxp0c6gOC2plRDMJvgiBwU7-z7uBRcO-fa4HIyY/edit).
- Armar grupo de 5 personas. Podés buscar integrantes en el canal `#buscando-grupo` de Discord. Una vez que ya lo tengas armado, anunciarlo en el canal `#grupos` indicando quiénes lo integran (etiquetando a las personas).

## Primero un poco de burocracia…

La materia tiene 3️⃣ parciales.  

¿Cómo los promociono?
- 8 o más en los 3 parciales (con la posibilidad de recuperar 1 si te sacaste menos de 8).
- TPs aprobados.

¿Cómo simplemente los apruebo?
- 6 o más en los 3 parciales (hay 2 recuperatorios por cada parcial).
- TPs aprobados.

## Los temas de hoy
¿Qué es un paradigma de programación?
Expresividad y declaratividad
Paradigma funcional

## ¿Qué es un paradigma de programación?

Un paradigma es una forma en especial de pensar la solución a un problema, en este caso, un problema de programación 👩‍💻👨‍💻. Para ello, vamos a necesitar herramientas 🔧 y conceptos 📖 que cambiarán de paradigma en paradigma. 

Los que veremos en la cursada serán los paradigmas **funcional**, **lógico** y **de objetos** 😮. ¡Empecemos!

## Expresividad y declaratividad
Dos conceptos muy pero muy importantes que nos van a acompañar tooodoo este año. Son transversales a los 3 paradigmas.

La **expresividad** viene de la mano de cuán *entendible* es nuestro código. De cómo nombramos a las variables, funciones, métodos… Tiene que estar escrito de tal forma de que lo entiendas vos, tu colega o alguien que no sepa programación tanto hoy como dentro de unos años. 

La **declaratividad** tiene que ver con ocultar los detalles algorítmicos de nuestro código. Enfocarnos en el *qué y no en el cómo*.


Estos dos conceptos son complementarios y vamos a buscar que nuestras soluciones sean lo más declarativas y expresivas que podamos. No existe EL código expresivo y declarativo, sino que existen códigos más declarativos y expresivos que otros. 

¡Veamos unos ejemplos!

```
-- Solución A
​
int d(int c[]) {
  int a = 0;
  for (int b = 0; c[b] != NULL; b++) {
    if (c[b] % 2 == 0) {
      a++;
    }
  }
  return a;
}
​
-- Solución B
​
int cantidadDeNumerosPares(int* unosNumeros) {
  int cantidadDePares = 0;
  for (int indice = 0;  != NULL; indice++) {
    if (unosNumeros[indice] % 2 == 0) {
      cantidadDePares++;
    }
  }
  return cantidadDePares;
}
​
-- Solución C
​
int cantidadDeNumerosPares(int* unosNumeros) {
  int cantidadDePares = 0;
  for (int indice = 0;  != NULL; indice++) {
    if (esNumeroPar(unosNumeros[indice])) {
      cantidadDePares++;
    }
  }
  return cantidadDePares;
}
```

Dadas esas soluciones, ¡comparémoslas!

La solución A es menos expresiva que las otras dos, pero igual de declarativa que la B, aunque menos declarativa que la C.
La solución B es más expresiva que la A, e igual que la C, pero menos declarativa que la C, aunque igual de declarativa que la A.
La solución C es la más expresiva junto con la B y es la más declarativa.

Sin embargo, todas estas soluciones tienen algo en común: están escritas en el mismo lenguaje de programación. Hay otros lenguajes que facilitan que nuestras soluciones sean más declarativas. Por ejemplo, este mismo problema se podría solucionar utilizando el lenguaje Haskell, haciendo:

```
cantidadDeNumerosPares numeros = (length.filter even) numeros
```

No te asustes si no pudiste darte cuenta tan fácilmente qué solución era más expresiva o declarativa que la otra 😨. Es una habilidad que se va adquiriendo con la experiencia, así que ¡a hacer muchos ejercicios! 💪💻

## Links útiles

- [Video de esta clase en 2021](https://drive.google.com/file/d/1gcybc5zNBqQ7vu6Ku7NGeUWhlLGwnbqf/view?usp=sharing)
- [PPT de presentación](https://docs.google.com/presentation/d/1aIC4Zn2XTMSXj4aq3Xfri2oKkDoR1cXzyC8-UYfcjVI/edit?usp=drive_link)

