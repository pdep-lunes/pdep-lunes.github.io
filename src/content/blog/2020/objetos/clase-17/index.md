---
title: Decimoseptima clase
date: '2020-10-19'
description: Decimoseptima clase de PdeP.
tags: [objetos, excepciones, interfaz]
---

Hicimos [este](https://docs.google.com/document/d/1YPZMyKI4fFij22QM8QfbDU8pfV78bP7vesl2__HIj64/edit?usp=sharing) ejercicio.

# Introducción

Cuando ejecutamos un programa, pueden ocurrir problemas que hacen que éste no se comporte de la manera la cual nosotros esperábamos. En otras palabras, pueden ocurrir **errores.** ¿Qué deberíamos hacer ante un error?

Si nosotros ignoramos el error, se puede convertir en una _bola de nieve_ y desencadenar en otros errores, que pueden ser peores :fire:. Por lo tanto, lo mejor que podemos hacer es **fallar**. Una forma de lograr esto es mediante el uso de **excepciones**.

# Excepciones

Una excepción es una indicación de que algo salió mal en la ejecución nuestro programa.

¿Y cómo las podemos utilizar en Wollok?
Hay dos maneras de hacerlo:

- Usando el mensaje `error`, el cual entienden los objetos y nos sirve para lanzar una excepción:

```java
self.error("mensaje del error")
```

- Usando throw y la clase `Exception`:

```java
 throw new Exception(message = "mensaje del error")
```

También podemos crear nuestras propias excepciones :wink:. Para esto podemos crear una clase que herede de `Exception`. Esto nos va a ser útil más adelante.:

```java
class ExcepcionParticularDelPrograma inherits Exception {}
```

y la tiramos como antes:

```java
throw new ExcepcionParticularDelPrograma(message = "mensaje del error")
```

Además, es importante que nuestros mensajes de excepción sean expresivos. Así si algo rompe :boom: sabremos por qué :grinning:.

Ahora, todo bien, pero ¿para qué me sirven en la ejecución del programa? ¿Qué hacen?

```java
class Rick{
  method aumentarDemencia(unaCantidad) {
    if (nivelDeDemencia + unaCantidad > 100)
      throw new EstoyReDementeException()
    nivelDeDemencia += unaCantidad // nunca será ejecutado si se entra al if anterior
  }
}
```

Luego de tirar la excepción se corta la ejecución del programa. Además, decimos que las excepciones _burbujean_ por lo que si otro objeto llamó a `aumentarDemencia` de un Rick y ese método lanza la excepción, también cortará el flujo de ejecución para ese objeto.

Entonces, ¿si lanzamos una excepción esta _subirá_ indefinidamente? Bueno, en realidad no, porque si esto pasara cada vez que se lanza una excepción terminaría nuestro programa. Así que ahora veremos una forma de manejar excepciones ...

# Atrapando Excepciones

Cuando sabemos qué hacer ante una excepción, tenemos la opción de **atrapar** la excepción y utilizar otro código que se tiene que ejecutar si ocurrió tal excepción. :confetti_ball:  
En wollok, esto se realiza de la siguiente forma:

```java
try {
	// código que puede fallar
} catch e : ExcepcionQueQuieroAtrapar {
	// código a ejecutar si ocurre ExcepcionQueQuieroAtrapar
}
```

Algo a notar, es que la excepción a atrapar tiene que ser **la que quiero atrapar y lo menos general posible.** Si atrapo, por ejemplo, `Exception`, seguramente esté atrapando errores que no hubiese querido atrapar (Por ejemplo, división por cero).

## Interfaz

Una interfaz es un contrato que cumplen dos o más clases u objetos la cual obliga a que estos cumplan con la implementación de un conjunto de métodos.

Cuando dos objetos o clases tienen una interfaz en común, es posible para un tercero utilizar sus instancias de forma polimórfica, aunque recordemos que el polimorfismo solo está si efectivamente un tercero interactua indistintamente.

Las interfaces nos sirven para explicitar lógica que debe ser cumplida para quienes las implementen. En algunos lenguajes, las interfaces se escriben en código y existen validaciones de compilación para asegurar su cumplimiento. En `Wollok` no se escriben las interfaces en código, pero en la materia siempre vamos a explicitar las interfaces en el diagrama de clases.

¿Cuál es la diferencia entre una interfaz y una clase abstracta? Si bien son similares, la clase abstracta tiene como objetivo reutilizar comportamiento, ya que siempre la tenemos en código y la idea es que otras clases puedan heredar de la misma implementando sus métodos. En cambio, el concepto de la interfaz es demostrar partes comunes entre clases u objetos para que puedan ser utilizados polimórficamente.

En el diagrama de clases, la podemos ver indicada con una _I_, en este caso en el Familiar.

## Tarea

- Mumuki: [Lección 9](https://mumuki.io/pdep-utn/lessons/91-programacion-con-objetos-excepciones)

## Links útiles

- [Video de la clase](https://drive.google.com/file/d/1FD4I1kKZKB1REJVXmDA9Aoxzd97uQu7b/view?usp=drivesdk)
- [Código de la clase](https://github.com/pdep-lunes/clase17-objetos-2020)
- [Diagrama de clases de la clase](http://www.plantuml.com/plantuml/png/bL7RIiD047sVhzZ716m_GHeKmOU2w1TCDbFSk9SmkniGzT-TqBB6sXNw5iwPSzcJNKp8AJiBnYVY0sfI3-YCDSZg0wPC0ptoFNKp-PGPcmFfLsnXDhFX0hOma2El3NPJu8J30dq1T7rCZ3eLovE2E8ZvkQQMTj6zmJwswho6P6gBCQgz7BvBHaIRXxtmQA5wNDf9N3BpqWsNp_0K-Ddejxho9Jj7_mubfw4VnKoDn2oLhdbbFNYfjPeGpCeltWNVJCGnU1pfHlqqkV0RjjlFsp80_5bYiodqMWR7VMliQPOrNIpXkCFltEKv0gsG7VaXE_iD)
- [Wiki excepciones](http://wiki.uqbar.org/wiki/articles/excepciones.html)
- [Apunte](https://docs.google.com/document/d/1T87tmdXv_39RoE_zR7alVFK8TUl-KJYOhdoIsoVTRb4/edit#) de excepciones
- [Clase abstracta vs interfaz](https://wiki.uqbar.org/wiki/articles/clase-abstracta-vs-interfaz.html)
