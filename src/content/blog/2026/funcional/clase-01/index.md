---
title: Presentación y primeros conceptos
date: "2025-04-06"
description: "Primera clase de PdeP"
tags: [expresividad, declaratividad, paradigmas]
---

## Qué hacer para la clase que viene:
- Unirse a [discord](https://discord.gg/MErR5F7g) siguiendo este [instructivo](https://docs.google.com/document/d/1KhlCwxp0c6gOC2plRDMJvgiBwU7-z7uBRcO-fa4HIyY/edit).
- Armar grupo de 4 personas. Podés buscar integrantes en el canal `#buscando-grupo` de Discord. Una vez que ya lo tengas armado, anunciarlo en el canal `#grupos` indicando quiénes lo integran (etiquetando a las personas).
- Completar el [formulario](https://forms.gle/in82xgitZRtYgyP59) para compartirnos tu usuario de GitHub. Si aún no lo tenés, crealo teniendo en cuenta que el nombre de usuario que elijas te va a acompañar en esta materia, en esta carrera y seguramente en tu vida profesional.

## Primero un poco de burocracia…

La materia tiene 3️⃣ parciales.  

¿Cómo los promociono?
- 8 o más en los 3 parciales (con la posibilidad de recuperar 1 si te sacaste menos de 8).
- TPs aprobados en tiempo y forma.

¿Cómo simplemente los apruebo?
- 6 o más en los 3 parciales (hay 2 recuperatorios por cada parcial).
- TPs aprobados en tiempo y forma.

## Los temas de hoy
- ¿Qué es un paradigma de programación?
- Expresividad y declaratividad
- Paradigma funcional

## ¿Qué es un paradigma de programación?

Un paradigma es una forma en especial de pensar la solución a un problema, en este caso, un problema de programación 👩‍💻👨‍💻. Para ello, vamos a necesitar herramientas 🔧 y conceptos 📖 que cambiarán de paradigma en paradigma. 

Los que veremos en la cursada serán los paradigmas **funcional**, **lógico** y **de objetos** 😮. ¡Empecemos!

## Expresividad y declaratividad
Dos conceptos muy pero muy importantes que nos van a acompañar tooodoo este año. Son transversales a los 3 paradigmas.

La **expresividad** viene de la mano de cuán *entendible* es nuestro código. De cómo nombramos a las variables, funciones, métodos… Tiene que estar escrito de tal forma de que lo entiendas vos, tu colega o alguien que no sepa programación, tanto hoy como dentro de unos años. 

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

### Paradigma funcional 
Es el paradigma con el vamos a arrancar. Y trata sobre… ¡adivinaste! Funciones 😝. Y acá es donde hacemos esa gran pregunta tan temida en Análisis Matemático: ¿qué es una función? 😅 Es la relación entre un dominio e imagen, en donde, para una entrada tenemos una salida (existencia) y esa salida es única (unicidad). Esta misma norma se va a cumplir para las *funciones* que creemos en `Haskell`, el lenguaje correspondiente a este paradigma.

Dicho esto, adentrémonos en Haskell. Estos son los ejemplos de funciones que vimos en clase con sus respectivos tipos:

```haskell
doble :: Int -> Int
doble numero = numero * 2

siguiente :: Int -> Int
siguiente numero = numero + 1

sumaDe4Numeros :: Int -> Int -> Int
sumaDe4Numeros primerNumero segundoNumero tercerNumero cuartoNumero = primerNumero + segundoNumero + tercerNumero + cuartoNumero
```

Es importante tener en cuenta que el tipo de una función NO es el tipo de su retorno, sino que está compuesto por el tipo de sus valores de entrada y el de salida. Recordemos como regla mnemotécnica que la cantidad de flechas del tipo es igual a la cantidad de parámetros que tiene la función.

Ahora supongamos que queremos ver si queremos saber el doble del siguiente de un número. ¿Cómo lo resolvemos? 😱 Usando **composición**:
```haskell
> (doble.siguiente) 2
=> 6
```

¿Qué lo qué está pasando? 😱 Lo mismo que en la composición de funciones matemáticas ( FoG(x) ) 🤓. Primero se aplica la función de la derecha con el valor y luego se aplica la de la izquierda con el valor que nos devolvió la función anterior.

Recordemos que, como en matemática, el valor que retorne la función de la derecha, tiene que ser un valor que la función de la izquierda pueda operar. Es decir, que la imagen de la función de la derecha esté incluida en el dominio de la función de la izquierda.

Y ya que estamos, démosle un nombre al cálculo del doble del siguiente. Lo haremos creando una nueva función llamada... ¡`dobleDelSiguiente`!

```haskell
dobleDelSiguiente unNumero = (doble.siguiente) unNumero
```

Y entonces, lo que nos queda después de componer dos funciones es… ¡una nueva función! 😮

## Inmutabilidad

Estos son los ejemplos de funciones y valores que vimos en clase:

```haskell​​
frecuenciaCardiacaPromedio = 80
​
hacerActividadFisica unaFrecuencia = unaFrecuencia + 50
​
tieneTaquicardia unaFrecuencia = unaFrecuencia >= 180
```

De esa forma le pusimos un alias o etiqueta al valor 80 con `frecuenciaCardiacaPromedio` y creamos funciones como `hacerActividadFisica` y `tieneTaquicardia`.
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

## Composición

Ahora supongamos que queremos ver si tenemos taquicardia después de hacer actividad física. ¿Cómo lo resolvemos? 😱 Usando **composición**:

```haskell
> (tieneTaquicardia.hacerActividadFisica) 70
=> True
```

Como ya mencionamos anteriormente, el valor que retorne la función de la derecha, tiene que ser un valor que la función de la izquierda pueda operar. Si quisiéramos componerlo al revés:


```haskell
> (hacerActividadFisica.tieneTaquicardia) 70
```

Va a romper 💥 ya que `hacerActividadFisica` tiene que recibir un número, y está recibiendo un booleano.

Por último, vamos a darle un nombre a la acción de preguntar si se tiene taquicardia luego de hacer una actividad física creando la función`tieneTaquicardiaDespuesDeEntrenar`:

```haskell
tieneTaquicardiaDespuesDeEntrenar unaFrecuencia = (tieneTaquicardia.hacerActividadFisica) unaFrecuencia
```

Que no exista el estado en Haskell, hace que la composición tenga más relevancia. 
Ya que como no podemos pisar valores con variables, la composición nos permite encadenar las funciones para trabajar con diferentes valores y así poder crear soluciones más complejas. ✨

## Precedencia de operadores

En matemática, cuando tenemos una expresión como 2 \* 3 + 4, solemos operarla dependiendo de la precedencia de cada operador. Como el \* es de mayor precedencia que el +, operamos primero 2 \* 3 y luego le sumamos 4.

En Haskell también se respeta esto. Les dejamos una tabla para que puedan ver la precedencia que utiliza Haskell:

| Precedencia (Mayor número, mayor precedencia) |            "Operador"            |
| --------------------------------------------- | :------------------------------: |
| 11                                            | () |
| 10                                            | Aplicacion prefija |
| 9                                             |                .                 |
| 8                                             |                ^                 |
| 7                                             |               \*,/               |
| 6                                             |               +,-                |
| 5                                             |                :                 |
| 4                                             |       ==, /=, <, <=, >, >=       |
| 3                                             |                &&                |
| 2                                             |               \|\|               |
| 1                                             |                \$                |


## Type classes

Pensemos en la función `suma`:

```haskell
suma unNumero otroNumero = unNumero + otroNumero
```

¿Qué tipo debería tener?

### ¿Enteros?

¿Que tal `suma :: Int -> Int -> Int`?

Dados estos números:

```haskell
unEntero :: Int
unEntero = 2

otroEntero :: Int
otroEntero = 3

unFlotante :: Float
unFlotante = 2

otroFlotante :: Float
otroFlotante = 3
```

¿Qué creen que pasaría si queremos evaluar la siguiente expresión: `suma unEntero otroEntero`?

```haskell
> suma unEntero otroEntero
5
```

¿y `suma unFlotante otroFlotante`?

```haskell
> suma unFlotante otroFlotante
-- * estalla *
```

¡Tiene sentido! le dijimos a nuestra función suma que su dominio son los enteros, entonces cuando le damos un flotante, nos dice "eh, no; yo trabajo sólo con enteros"

### ¿Flotantes?

¿Y qué tal si la hubiésemos definido como `suma :: Float -> Float -> Float`? Después de todo, los enteros son un subconjunto de los reales, ¿no?

```haskell
> suma unFlotante otroFlotante
5
```

```haskell
> suma unEntero otroEntero
-- * estalla *
```

Bueno, no; si bien en la matemática es cierto que los enteros son reales, en definitiva para haskell `Float` e `Int` son tipos de datos distintos.

### ¿a?

¿Y si hago `suma :: a -> a -> a`?

\*Falla al cargar el archivo\*

Parece que haskell no nos permite sumar cualquier cosa tampoco, lo cual es de esperarse; ¿tendría sentido que nos deje sumar dos funciones? ¡no!

¿Pero qué onda? Si yo en la consola hago… 

```haskell
> unFlotante + otroFlotante
5
```
ó
```haskell
> unEntero + otroEntero
5
```

¡Me andan las dos!

### ¡Números!

Para expresar el tipo de `suma`, en realidad nos está faltando una herramienta, a la cual llamamos **Familia de Tipos**, o **Type Class**.

Mientras que a un tipo lo podríamos describir como un conjunto de valores asociado a un conjunto de operaciones con las que los podemos trabajar, una familia de tipos es más bien un contrato que te dice qué operaciones tiene que entender un tipo para pertenecer a esa familia.

Hasta acá suena todo muy abstracto, así que bajémoslo a un ejemplo concreto: ¡los números!

Esa cosa en común que tienen `Int` y `Float` que nos permite sumarlos es la familia de tipos de los números `Num`; y su contrato nos dice que cualquier tipo que pertenezca a su familia, se puede sumar `(+)`, restar `(-)`, y multiplicar `(*)`!

¿Y esto cómo lo escribimos en el código?

```haskell
suma :: Num a => a -> a -> a
suma unNumero otroNumero = unNumero + otroNumero
```

Cuando escribimos esto, estamos restringiendo a que el tipo `a` debe pertenecer a la familia de tipos `Num`.

Es importante recalcar que en toda la firma de `suma`, `a` representa a un **mismo tipo**. Si bien ahora podemos sumar enteros con enteros, y flotantes con flotantes, esto **no** nos permite sumar enteros con flotantes.

Y así como tenemos una familia de tipos para los números, tenemos otro montón con distintos propósitos, como:
* Show: Las cosas que se saben mostrar por pantalla (en la consola).
* Eq: Las cosas que se saben comparar por igualdad `(==)`.
* Ord: Las cosas que se saben comparar por orden `(>)`, `(<)`, etc.
* Num: ¡Los números! se saben sumar, restar y multiplicar.
* Integral: Para números enteros; entienden la división entera (`div`), el resto de la división `rem`, se les puede preguntar si son pares (`even`) o impares (`odd`).
* Fractional: Para números reales, que se pueden dividir con la división flotante `(/)`

Podemos los tipos que pertenecen a cada familia en el siguiente diagrama:

![image](https://github.com/user-attachments/assets/c8ae56a0-5da0-4543-94de-ebb9090cecf2)

*Es posible que haya alguna mentira blanca en este diagrama*


## Links útiles

- [Concepto de función](http://wiki.uqbar.org/wiki/articles/concepto-de-funcion.html)
- [Composición](http://wiki.uqbar.org/wiki/articles/composicion.html)
- [Tipos en Haskell](http://wiki.uqbar.org/wiki/articles/tipos-de-haskell.html) 
- [Inferencia de tipos](http://wiki.uqbar.org/wiki/articles/inferencia-de-tipos.html)
