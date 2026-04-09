---
title: Décimo novena clase
date: '2022-09-26'
description: Décimo novena clase de PdeP
tags: [objetos, herencia, super, clases abstractas, redefinición, diagrama de clases, interfaces]
---

## Tarea para la clase que viene:

- Terminar la [entrega 1 del TP cuatrimestral de objetos](https://docs.google.com/document/d/1h_0rOPYMgr4n0XPnNubiKdjoZp2DFBlJ7Mweydt2SN0/edit).

## Herencia

Anteriormente vimos que cuando dos objetos repiten lógica, crear una clase puede que sea nuestra solución. Pero, ¿qué hacemos cuando dos clases repiten lógica? Esto es un trabajo para… ¡la superclase! 🦸‍♀️🦸‍♂️

Al tener lógica repetida entre clases podemos crear una nueva clase con esa lógica, dejando en cada una de las clases iniciales sólo lo particular de cada una. 

Por ejemplo:

*Los perros y los gatos al jugar pierden unidades de energía según el tiempo que reciben por parámetro. Al pedirles que emitan un sonido los perros hacen guau (sí, todo muy original) y los gatos… ¡MUUU! 😲 (no, mentira, hacen miau pero casi se la creen 😂).
Pero al llegar su dueño o dueña a casa actúan distinto. Los gatos 🐈 actúan con indiferencia, es decir, no hacen nada. Los perros 🐕 en cambio aumentan en 100 su energía.*

Un código posible podría ser:

```java
class Gato {
	var energia
	
	method jugar(unTiempo) {
		energia -= unTiempo
	}

	method emitirSonido() {
		return "miau"
}

method recibirDueño() {
}
}

class Perro {
	var energia
	
	method jugar(unTiempo) {
		energia -= unTiempo
	}

	method emitirSonido() {
		return "guau"
}

method recibirDueño() {
	energia += 100
}
}
```

¿Esa lógica repetida no les hizo doler los ojos? 😵

Una solución sería crear una clase Animal (no es una frase onda "CREA UNA CLASE ANIMAL!!! MÁQUINA!!! 💪") que contenga la lógica repetida:

```java
class Animal {
	var energia
	const sonido
	
	method jugar(unTiempo) {
		energia -= unTiempo
	}

	method emitirSonido() {
		return sonido
}
}
```

Lo único que faltaría es establecer una relación entre esta nueva clase y las originales definiendo **herencia** de la siguiente manera: 👇

```java
class Perro inherits Animal(sonido = "guau") {
	method recibirDueño() {
	energia += 100
}
}

class Gato inherits Animal(sonido = "miau") {
	method recibirDueño() { }
}
```

Listo, ¡problema solucionado! 🙌 Ahora vamos a decir que `Animal` es la **superclase** de `Perro` y `Gato` o, de otra manera, que `Perro` y `Gato` son **subclases** de `Animal`. Hay que tener en cuenta que cada clase solo puede heredar de una y solo una clase.

## Super

Siguiendo con nuestro ejemplo, imaginémonos que aparece la clase `Gallina` 🐔, cada `Gallina` emite el sonido "A River lo sigo a donde va" y cuando juegan también pierde energia, peeero también ponen un huevo 🐣. Entonces tendríamos que redefinir el método `jugar`, pero teniendo en cuenta que una parte de la lógica ya está definida en la superclase `Animal`. Para hacer esto vamos a combinar `override` (para redefinir un método de la superclase) con `super` (para ver que hace la superclase):

```java
class Gallina inherits Animal(sonido = "A River lo sigo a donde va") {
	var huevosPuestos = 0

	override method jugar(unTiempo) {
	super(unTiempo)
	huevosPuestos ++
}
}
```

Podemos aprovechar `super` tanto para métodos que retornan algo (para obtener ese algo) como para métodos que no retornan nada (para ejecutar su comportamiento).

## Redefinición

Acá vemos que la `Gallina` no tiene el método `recibirDueño`, ¿debería? 🤔

Esto es una decisión de nuestro diseño, si creemos que todos los animales deberían poder recibir dueños (que los animales deban obligatoriamente tener dueños pertenece a un debate que no vamos a tener, recordemos que esto es meramente un ejemplo), debería estar presente en nuestro código. ¿Pero qué hace un animal cualquiera al recibir a su dueño? ¿Hay alguna lógica en común entre todos los animales? ¿Qué escribo en la superclase?

Claramente no conocemos un comportamiento genérico para todos los animales, pero si queremos que todos los animales sepan recibir a su dueño sin especificar una lógica podemos crear un **método abstracto** escribiendo solo la **firma** de la siguiente manera:

```java
class Animal {
	….
	method recibirDueño()
	….
}
```

❗ ❗ Es importante diferenciar `recibirDueño()` de `recibirDueño() { }`. El segundo no es un método abstracto sino un método vacío. Aquellas clases que no tiene sentido instanciarlas en nuestro dominio son llamadas **clases abstractas**. Adicionalmente, si una clase tiene un método abstracto, esta no puede ser instanciada. En nuestro ejemplo podemos tener gallinas, gatos y perros pero no animales a secas.

Luego de hacer esto es importante redefinir el método en cada subclase con la palabra `override`:

```java
class Perro inherits Animal(sonido = "guau") {
	override method recibirDueño() {
	energia += 100
}
}

class Gato inherits Animal(sonido = "miau") {
	override method recibirDueño() { }
}

class Gallina inherits Animal(sonido = "A River lo sigo a donde va") {
var huevosPuestos = 0

	override method jugar(unTiempo) {
	super(unTiempo)
	huevosPuestos ++
}

	override method recibirDueño() { 
	huevosPuestos = 0 /* el dueño llega y le roba los huevos*/
}
}
```

## Method lookup

Hasta ahora vimos que cuando le enviamos un mensaje a un **well known object**, este busca el método en la definición de ese objeto 🔎. Si se lo enviamos a una **instancia**, lo busca en la clase a la que pertenece. Esto sigue siendo correcto, pero también aprendimos que si el método no está definido en la clase de la cual el objeto es instancia buscará en la superclase, y en caso que no esté seguirá buscando "para arriba" en la jerarquía de clases 🕵️‍♀️🕵️‍♂️. En caso que la superclase más super de todas, es decir, la clase `Object` no defina ese método, obtendremos el famoso error `wollok.lang.MessageNotUnderstoodException`.

## Interfaces

Una interfaz es un contrato que cumplen dos o más clases u objetos la cual obliga a que estos cumplan con la implementación de un conjunto de métodos.

Cuando dos objetos o clases tienen una interfaz en común, es posible para un tercero utilizar sus instancias de forma polimórfica, aunque recordemos que el polimorfismo solo está si efectivamente un tercero interactúa indistintamente con ellos.

Las interfaces nos sirven para explicitar conjunto de mensajes que deben entender quienes las implementen. En algunos lenguajes, las interfaces se escriben en código y existen validaciones de compilación para asegurar su cumplimiento. En Wollok no se escriben en el código, pero en la materia siempre vamos a explicitar las interfaces en el diagrama de clases.

¿Cuál es la diferencia entre una interfaz y una clase abstracta? Si bien son similares, la clase abstracta tiene como objetivo reutilizar comportamiento, ya que siempre la tenemos en código y la idea es que otras clases puedan heredar de la misma implementando sus métodos. En cambio, el concepto de la interfaz es demostrar partes comunes entre clases u objetos para que puedan ser utilizados polimórficamente.

## Diagrama de clases

Como vimos la clase pasada, el diagrama de clases es una herramienta que nos permite modelar nuestra solución a partir de un esquema. En el mismo encontraremos las clases, objetos e interfaces, sus atributos, sus métodos y cómo se relacionan estos componentes. Es una manera de representar nuestras soluciones más allá del código.

En esta clase repasamos cómo representar clases abstractas, interfaces y las flechas de "hereda de", “usa”, "conoce" e “implementa”.

## Links útiles 

- [Video de la clase](https://drive.google.com/file/d/1AQmfdgtekWMfe43T_vyqoSgqTVMf1GMy/view?usp=sharing)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases/tree/main/2022/objetos/clase-22)
- [Diagrama de clases de la clase](https://github.com/pdep-lunes/pdep-clases/blob/main/2022/objetos/clase-22/diagramas.png)
- [Código del diagrama de clases](https://github.com/pdep-lunes/pdep-clases/blob/main/2022/objetos/clase-22/diagramas.wsd)
- [Herencia, super, redefinición y method lookup en Wollok](https://docs.google.com/document/d/1KdG7NrKPgPh4bAcyLuDG2G1iWP7Ze2GFs91qzlvDKqI/edit#heading=h.mpvsrdz55x8g)
- [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing)
