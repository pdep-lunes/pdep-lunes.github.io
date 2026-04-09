---
title: Dieciseisava clase
date: '2020-10-05'
description: Dieciseisava clase de PdeP
tags: [herencia, super, clases abstractas, redefinición, diagrama de clases]
---

## Tarea para la clase que viene:

- Entrega 2 del TP cuatrimestral de objetos.

## Herencia

Anteriormente vimos que cuando dos objetos repiten lógica, crear una clase puede que sea nuestra solución. Pero, ¿qué hacemos cuando dos clases repiten lógica? Esto es un trabajo para… ¡la superclase! 🦸‍♀️🦸‍♂️

Al tener lógica repetida entre clases podemos crear una nueva clase con esa lógica, dejando en cada una de las clases iniciales sólo lo particular de cada una. 

Por ejemplo:

_Los perros y los gatos al jugar pierden unidades de energía según el tiempo que reciben por parámetro. Al pedirles que emitan un sonido los perros hacen guau (sí, todo muy original) y los gatos… ¡MUUU! 😲 (no, mentira, hacen miau pero casi se la creen 😂).
Pero al llegar su dueño o dueña a casa actúan distinto. Los gatos 🐈 actúan con indiferencia, es decir, no hacen nada. Los perros 🐕 en cambio aumentan en 100 su energía._

Un código posible podría ser:

```
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

```
class Animal {
	var energia
	var sonido
	
	method jugar(unTiempo) {
		energia -= unTiempo
	}

	method emitirSonido() {
		return sonido
	}
}
```

Lo único que faltaría es establecer una relación entre esta nueva clase y las originales definiendo **herencia** de la siguiente manera: 👇

```
class Perro inherits Animal {
	var sonido = "guau"
	
	method recibirDueño() {
		energia += 100
	}
}

class Gato inherits Animal {
	var sonido = "miau"
	
	method recibirDueño() { 
	}
}
```

Listo, ¡problema solucionado! 🙌 Ahora vamos a decir que `Animal` es la **superclase** de `Perro` y `Gato` o, de otra manera, que `Perro` y `Gato` son **subclases** de `Animal`. Hay que tener en cuenta que cada clase solo puede heredar de una y solo una clase.

## Super

Siguiendo con nuestro ejemplo, imaginémonos que aparece la clase `Gallina` 🐔, cada `Gallina` emite el sonido "A River lo sigo a donde va" y cuando juegan también pierde energia, peeero también ponen un huevo 🐣. Entonces tendríamos que redefinir el método `jugar`, pero teniendo en cuenta que una parte de la lógica ya está definida en la superclase `Animal`. Para hacer esto vamos a combinar `override` (para redefinir un método de la superclase) con `super` (para ver que hace la superclase):

```
class Gallina inherits Animal {
	var sonido = "A River lo sigo a donde va"
	var huevosPuestos = 0

	override method jugar(unTiempo) {
		super(unTiempo)
		huevosPuestos ++
	}
}
```

## Redefinición

Acá vemos que la `Gallina` no tiene el método `recibirDueño`, ¿debería? 🤔

Esto es una decisión de nuestro diseño, si creemos que todos los animales deberían poder recibir dueños (que los animales deban obligatoriamente tener dueños pertenece a un debate que no vamos a tener, recordemos que esto es meramente un ejemplo), debería estar presente en nuestro código. ¿Pero qué hace un animal cualquiera al recibir a su dueño? ¿Hay alguna lógica en común entre todos los animales? ¿Qué escribo en la superclase?

Claramente no conocemos un comportamiento genérico para todos los animales, pero si queremos que todos los animales sepan recibir a su dueño sin especificar una lógica podemos crear un **método abstracto** escribiendo solo la **firma** de la siguiente manera:

```
class Animal {
	….
	method recibirDueño()
	….
}
```

❗ ❗ Es importante diferenciar `recibirDueño()` de `recibirDueño() { }`. El segundo no es un método abstracto sino un método vacío. Aquellas clases que tienen métodos abstractos son llamadas **clases abstractas** y tienen la particularidad de que no pueden ser instanciadas. En nuestro ejemplo podemos tener gallinas, gatos y perros pero no animales a secas.

Luego de hacer esto es importante redefinir el método en cada subclase con la palabra `override`:

```
class Perro inherits Animal {
	var sonido = "guau"
	
	override method recibirDueño() {
		energia += 100
	}
}

class Gato inherits Animal {
	var sonido = "miau"
	
	override method recibirDueño() { 
	}
}

class Gallina inherits Animal {
	var sonido = "A River lo sigo a donde va"
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

Hasta ahora vimos que cuando le enviamos un mensaje a un **well known object** busca el método en la definición de ese objeto 🔎. Si se lo enviamos a una **instancia**, lo busca en la clase a la que pertenece. Esto sigue siendo correcto, pero también aprendimos que si el método no está definido en la clase de la cual el objeto es instancia buscará en la superclase, y en caso que no esté seguirá buscando "para arriba" en la jerarquía de clases 🕵️‍♀️🕵️‍♂️. En caso que la superclase más super de todas, es decir, la clase `Object` no defina ese método obtendremos el famoso error `wollok.lang.MessageNotUnderstoodException`.

## Diagrama de clases

El diagrama de clases es una herramienta que nos permite modelar nuestra solución a partir de un esquema. En el mismo encontraremos las clases, objetos e interfaces (aún no vieron este tema), sus atributos, sus métodos y cómo se relacionan estos componentes. Es una manera de representar nuestras soluciones más allá del código.

En esta clase en particular vimos cómo representar clases concretas, clases abstractas, objetos y las flechas de "hereda de" y "tiene".

## Links útiles 

- [Video de la clase](https://drive.google.com/file/d/1DHstVgBAM4rVCH2kNAC9zwWXoCJdkazb/view)
- [Código de la clase](https://github.com/pdep-lunes/clase16-objetos-2020)
- [Diagrama de clases de la clase](http://www.plantuml.com/plantuml/png/ZL5DJy9043splwBXr1fxq1z0842CYGI3mVlGZhXakukpirpG_-uiz4DBWbxQ-PWtR-UziMSW3fLHaurdWeAJPoJlBEmmEIgqI5iDIji3MfdKJcr9ivlXgoxOaRG6_KgQDJ29M4iyRrCJYdUWgRD2bU97q7kNgJrIYTGC5M1Pbr1cgebcE3TO2R_piY8OrfLhAbAGBGoqxfKJLO5rauLyQZh7v9uYV-aeKrzAJGrutvsxV4FhzS4bnmkekGARuGkOK7PYJLPO1Ba9w3zxfgxQ0AF0ptBSrVzxLPmwcjAea44GXPWm3NP-6hXDua7dEAj13s3Z-iw1Sxl5P68auvP0ldu1VeLUUyQODMuCBfucoX8S_tv3KXkvjeyjISSSroutEomuOKSYydL_BcqMV0Jc-UUerLxrpUkr-oRzxlwyBtRglAdd-MXuC-p6nsZBK9bl)
- [Instructivo Plant UML](https://github.com/pdep-noche-mavi/tutorial-plantuml)
- [Herencia, super, redinifición y method lookup en Wollok](https://docs.google.com/document/d/1KdG7NrKPgPh4bAcyLuDG2G1iWP7Ze2GFs91qzlvDKqI/edit#heading=h.mpvsrdz55x8g)



