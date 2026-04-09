---
title: Primera clase
date: "2020-04-06"
description: "Primera clase de PdeP"
tags: [funcional, composición, inmutabilidad, precedencia-de-operadores]
---

## Tarea para la clase que viene:
Crearse una cuenta en GitHub y en Mumuki. Para eso, lee este [instructivo](https://docs.google.com/document/d/1qGLqYENZ9WYgRRh_Cbn3fczQd0jMSG1nLD_dDd8jWt4/edit).
Hacer las lecciones 1, 2, 3 y 4 de [Mumuki](https://mumuki.io/pdep-utn). En clase contestaremos las dudas que te hayan surgido al hacer el contenido.

## Primero un poco de burocracia…
Dadas las circunstancias actuales debido a la pandemia 👑🦠, esta cursada será, en principio, virtual. Nuestro medio de comunicación será [discord](https://discordapp.com/)

La materia tiene 3️⃣ parciales.  

¿Cómo los promociono?
8 o más en los 3 parciales (con la posibilidad de recuperar 1 si te sacaste menos de 8).
TPs aprobados.

¿Cómo simplemente los apruebo?
6 o más en los 3 parciales (hay 2 recuperatorios por cada parcial).
TPs aprobados.

¿Cuándo y cómo van a ser? Todavía no sabemos. ¡Paciencia! 🙏

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
// Solución A
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
// Solución B
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
// Solución C
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

No te asustes si no pudiste darte cuenta tan fácilmente qué solución era más expresiva o declarativa que la otra 😨. Es una habilidad que se va adquiriendo con la experiencia, así que ¡a hacer muchos ejercicios! 💪💻

## Paradigma funcional 
Es el paradigma con el vamos a arrancar. Y trata sobre… ¡adivinaste! Funciones 😝. Y acá es donde hacemos esa gran pregunta tan temida en Análisis Matemático: ¿qué es una función? 😅 Es la relación entre un dominio e imagen, en donde, para una entrada tenemos una salida (existencia) y esa salida es única (unicidad). Esta misma norma se va a cumplir para las *funciones* que creemos en `Haskell`, el lenguaje correspondiente a este paradigma.

⚠️ Antes de seguir, vamos a dejar algo en claro: **nunca pero nunca vamos a usar un `if`para devolver un `true` o un `false`.** Es una muy mala práctica de programación y quien la haga en un parcial tendrá un 2 🦆. 
❌ El código que **no** hay que hacer sería:

```wollok
esMayorDeEdad(unaEdad) {
	if (unaEdad >= 18) {
		return true
	} else {
		return false
	}
}
```

✔️ Lo correcto sería:

```wollok
esMayorDeEdad(unaEdad) {
	return unaEdad >= 18
}
```

Dicho esto, adentrémonos en Haskell. Estos son los ejemplos de funciones y valores que vimos en clase:

```haskell
triple numero = numero * 3
​
esMayorDeEdad unaEdad = unaEdad >= 18
​
frecuenciaCardiacaPromedio = 80
​
hacerActividadFisica unaFrecuencia = unaFrecuencia + 50
​
tieneTaquicardia unaFrecuencia = unaFrecuencia >= 100
```

De esa forma le pusimos un alias o etiqueta al valor 80 con `frecuenciaCardiacaPromedio` y creamos funciones como `triple`, `esMayorDeEdad`, `hacerActividadFisica` y `tieneTaquicardia`.
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

¿Qué lo qué está pasando? 😱 Lo mismo que con la composición de funciones matemáticas ( FoG(x) ) 🤓. Primero se aplica la función de la derecha con el valor y luego se aplica la de la izquierda con el valor que nos devolvió la función anterior.

Recordemos que, como en matemática, el valor que retorne la función de la derecha, tiene que ser un valor que la función de la izquierda pueda operar. Es decir, que la imágen de la función de la derecha esté incluída en el dominio de la función de la izquierda.

Si quisiéramos componerlo al revés:


```haskell
> (hacerActividadFisica.tieneTaquicardia) 70
```

Va a romper 💥 ya que `hacerActividadFisica` tiene que recibir un número, y está recibiendo un booleano.

Y ya que estamos, démosle un nombre a la acción de preguntar si se tiene taquicardia luego de hacer una actividad física. Lo haremos creando una nueva función llamada `tieneTaquicardiaDespuesDeEntrenar`:

```haskell
tieneTaquicardiaDespuesDeEntrenar unaFrecuencia = (tieneTaquicardia.hacerActividadFisica) unaFrecuencia
```
Y entonces, lo que nos queda después de componer dos funciones es… ¡una nueva función! 😮

Que no exista el estado en Haskell, hace que la composición tenga más relevancia. 
Ya que como no podemos pisar valores con variables, la composición nos permite encadenar las funciones para trabajar con diferentes valores y así poder crear soluciones más complejas. ✨

Otro tema que vimos ya al final de la clase, en el canal de discord fue el de **precedencia de operadores**. 
En matemática, cuando tenemos una expresión como 2 \* 3 + 4, solemos operarla dependiendo de la precedencia de cada operador. Como el \* es de mayor precedencia que el +, operamos primero 2 \* 3 y luego le sumamos 4.

En Haskell también se respeta esto. Les dejamos una tabla para que puedan ver la precedencia que utiliza Haskell:

| Precedencia (Mayor numero, mayor precedencia) |            "Operador"            |
| --------------------------------------------- | :------------------------------: |
| 10                                            | Aplicacion Normal de una Funcion |
| 9                                             |                .                 |
| 8                                             |                ^                 |
| 7                                             |               \*,/               |
| 6                                             |               +,-                |
| 5                                             |                :                 |
| 4                                             |       ==, /=, <, <=, >, >=       |
| 3                                             |                &&                |
| 2                                             |               \|\|               |
| 1                                             |                \$                |

## Links Útiles

- [Concepto de función](http://wiki.uqbar.org/wiki/articles/concepto-de-funcion.html)
- [Composición](http://wiki.uqbar.org/wiki/articles/composicion.html)

