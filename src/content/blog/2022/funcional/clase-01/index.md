---
title: Primera clase
date: "2022-03-28"
description: "Primera clase de PdeP"
tags: [funcional. composición]
---

## Tarea para la clase que viene:
Crearse una cuenta en GitHub y en Mumuki. Para eso, lee este [instructivo](https://docs.google.com/document/d/146pNb0NQyR5szaHcGiX-v0LPZ7XFdP_4m_FPqR5_avM/edit?usp=sharing).
Hacer las lecciones 1 y 2 de [Mumuki](https://mumuki.io/pdep-utn).

## Primero un poco de burocracia…
Dadas las circunstancias actuales debido a la pandemia 👑🦠, esta cursada será virtual. Nuestro medio de comunicación será [discord](https://discordapp.com/)

La materia tiene 3️⃣ parciales.  

¿Cómo los promociono?
8 o más en los 3 parciales (con la posibilidad de recuperar 1 si te sacaste menos de 8).
TPs aprobados.

¿Cómo simplemente los apruebo?
6 o más en los 3 parciales (hay 2 recuperatorios por cada parcial).
TPs aprobados.

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

```c
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

```haskell
cantidadDeNumerosPares numeros = (length.filter even) numeros
```

No te asustes si no pudiste darte cuenta tan fácilmente qué solución era más expresiva o declarativa que la otra 😨. Es una habilidad que se va adquiriendo con la experiencia, así que ¡a hacer muchos ejercicios! 💪💻

## Paradigma funcional 
Es el paradigma con el vamos a arrancar. Y trata sobre… ¡adivinaste! Funciones 😝. Y acá es donde hacemos esa gran pregunta tan temida en Análisis Matemático: ¿qué es una función? 😅 Es la relación entre un dominio e imagen, en donde, para una entrada tenemos una salida (existencia) y esa salida es única (unicidad). Esta misma norma se va a cumplir para las *funciones* que creemos en `Haskell`, el lenguaje correspondiente a este paradigma.

Dicho esto, adentrémonos en Haskell. Estos son los ejemplos de funciones que vimos en clase con sus respectivos tipos:

```haskell
doble :: Int -> Int
doble numero = numero * 2

siguiente :: Int -> Int
siguiente numero = numero + 1

suma :: Int -> Int -> Int
suma unNumero otroNumero = unNumero + otroNumero
```

Es importante tener en cuenta que el tipo de una función NO es el tipo de su retorno, sino que está compuesto por el tipo de sus valores de entrada y el de salida. Recordemos como regla mnemotécnica que la cantidad de flechas del tipo es igual a la cantidad de parámetros que tiene la función.

Ahora supongamos que queremos ver si queremos saber el doble del siguiente de un número. ¿Cómo lo resolvemos? 😱 Usando **composición**:
```haskell
> (doble.siguiente) 2
=> 6
```

¿Qué lo qué está pasando? 😱 Lo mismo que con la composición de funciones matemáticas ( FoG(x) ) 🤓. Primero se aplica la función de la derecha con el valor y luego se aplica la de la izquierda con el valor que nos devolvió la función anterior.

Recordemos que, como en matemática, el valor que retorne la función de la derecha, tiene que ser un valor que la función de la izquierda pueda operar. Es decir, que la imagen de la función de la derecha esté incluida en el dominio de la función de la izquierda.

Y ya que estamos, démosle un nombre al cálculo del doble del siguiente. Lo haremos creando una nueva función llamada... ¡`dobleDelSiguiente`!

```haskell
dobleDelSiguiente unNumero = (doble.siguiente) unNumero
```

Y entonces, lo que nos queda después de componer dos funciones es… ¡una nueva función! 😮


## Links Útiles

- [Concepto de función](http://wiki.uqbar.org/wiki/articles/concepto-de-funcion.html)
- [Composición](http://wiki.uqbar.org/wiki/articles/composicion.html)
- [Video de esta clase en 2021](https://drive.google.com/file/d/1gcybc5zNBqQ7vu6Ku7NGeUWhlLGwnbqf/view?usp=sharing)

