---
title: Décimo novena clase
date: '2023-10-02'
description: Décimo novena clase de PdeP
tags: [objetos, excepciones]
---

# Tarea

Continuar realizando la [entrega 1 del tp de objetos](https://docs.google.com/document/d/160poYgzhBdAekw1wSwCuSy0PiczL0V3JduwAI1Q3Jls/edit). No olvidar realizar el diagrama de clases (se agregó este último punto al TP).

# Introducción

Construimos el código para el enunciado de [Rick & Morty](https://docs.google.com/document/d/1nUlXmrR-JS9pM2vG7Q5ggIJzF-AsHopRjZutd2BhLOI/edit)

Cuando ejecutamos un programa, pueden ocurrir problemas que hacen que éste no se comporte de la manera que esperábamos. En otras palabras, pueden ocurrir **errores.** ¿Qué deberíamos hacer ante un error?

Si nosotros ignoramos el error, se puede convertir en una _bola de nieve_ y desencadenar en otros errores, que pueden ser peores :fire:. Por lo tanto, lo mejor que podemos hacer es **fallar**. Una forma de lograr esto es mediante el uso de **excepciones**.

# Excepciones

Una excepción es una indicación de que algo salió mal en la ejecución de nuestro programa.

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

y la lanzamos como antes:

```java
throw new ExcepcionParticularDelPrograma(message = "mensaje del error")
```

Además, es importante que nuestros mensajes de excepción sean expresivos. Así si algo rompe :boom: sabremos por qué :grinning:.

Ahora, todo bien, pero ¿para qué me sirven en la ejecución del programa? ¿Qué hacen?

```java
class Summer inherits Beth{
  override method irseDeViaje(unRick) {
    if (self.esLunes()) {
      super(unRick)
    } else {
      throw new NoPuedoIrmeDeViajeException(message = "¡Sólo puedo irme de aventura los lunes!")
    }
  }


}
```

Luego de tirar la excepción se corta la ejecución del programa, por lo que si había código después, no será ejecutado. Además, decimos que las excepciones _burbujean_ por lo que si otro objeto manda un mensaje y ese método lanza la excepción, también cortará el flujo de ejecución para ese objeto.

Entonces, ¿si lanzamos una excepción esta _subirá_ indefinidamente? Bueno, en realidad no, porque si esto pasara cada vez que se lanza una excepción terminaría nuestro programa. Así que ahora veremos una forma de manejar excepciones...

# Atrapando Excepciones

Cuando sabemos qué hacer ante una excepción, tenemos la opción de **atrapar** la excepción y utilizar otro código que se tiene que ejecutar si ocurrió tal excepción. :confetti_ball:  
En Wollok, esto se realiza de la siguiente forma:

```java
try {
	// código que puede fallar
} catch e : ExcepcionQueQuieroAtrapar {
	// código a ejecutar si ocurre ExcepcionQueQuieroAtrapar
}
```

Algo a notar, es que la excepción a atrapar tiene que ser **la que quiero atrapar y lo menos general posible.** Si atrapo, por ejemplo, `Exception`, seguramente esté atrapando errores que no hubiese querido atrapar como errores de que no se entiende el mensaje o la división por cero).


## Links útiles

- [Video de la clase de años anteriores](https://drive.google.com/file/d/1iMFOHQUxjrLJFvE2nPlsxFX8Cyfz7D0N/view?usp=sharing)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2023/tree/main/Objetos/Clase06/src)
- [Diagrama de clases de la clase](https://github.com/pdep-lunes/pdep-clases-2023/blob/main/Objetos/Clase06/diagrama/diagrama.png)
- [Enunciado de la clase](https://docs.google.com/document/d/1nUlXmrR-JS9pM2vG7Q5ggIJzF-AsHopRjZutd2BhLOI/edit)

