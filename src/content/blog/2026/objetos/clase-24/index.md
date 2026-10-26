---
title: Manejo de errores y herencia vs composición
date: '2026-10-19'
description: Cómo manejar errores (propios y nativos) y herencia vs composición.
tags: [objetos, excepciones, herencia vs composición, herencia, composición]
---

# Manejo de errores

Construimos el código para el enunciado de [Rick & Morty](https://docs.google.com/document/d/1nUlXmrR-JS9pM2vG7Q5ggIJzF-AsHopRjZutd2BhLOI/edit)

Cuando ejecutamos un programa, pueden ocurrir problemas que hacen que éste no se comporte de la manera que esperábamos. En otras palabras, pueden ocurrir **errores.** ¿Qué deberíamos hacer ante un error?

Si ignoramos el error, se puede convertir en una _bola de nieve_ y desencadenar en otros errores, que pueden ser peores :fire:. Por lo tanto, lo mejor que podemos hacer es **fallar** lo antes posible. Una forma de lograr esto es mediante el uso de **excepciones**.

## Excepciones

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

## Atrapando Excepciones

Cuando sabemos qué hacer ante una excepción, tenemos la opción de **atrapar** la excepción y utilizar otro código que se tiene que ejecutar si ocurrió tal excepción. :confetti_ball:  
En Wollok, esto se realiza de la siguiente forma:

```java
try {
	// código que puede fallar
} catch e : ExcepcionQueQuieroAtrapar {
	// código a ejecutar si ocurre ExcepcionQueQuieroAtrapar
}
```

Algo a notar, es que la excepción a atrapar tiene que ser **la que quiero atrapar y lo menos general posible.** Si atrapo, por ejemplo, `Exception`, seguramente esté atrapando errores que no hubiese querido atrapar como errores de que no se entiende el mensaje o la división por cero). Por este motivo cobra relevancia crear nuestras propias excepciones.

# Herencia

Se verán los temas con el ejercicio [Gameflix](https://docs.google.com/document/d/18JRl-6X4FTc1mGOPYvX8ooIYTaRi02YeJoeBtp6vjDs/edit).

Como ya habíamos visto, la **herencia** la podemos utilizar cuando tenemos lógica repetida entre distintos objetos, y queremos agruparla.

Por ejemplo,los géneros de los juegos dentro de *Gameflix*:

```java
class JuegoViolento inherits Juego {
method jugar(unUsuario,unasHoras){
unUsuario.reducirHumor(10 * unasHoras)
}
}

class JuegoMOBA inherits Juego {
method jugar(unUsuario, unasHoras){
unUsuario.comprarSkins()
}
}

class JuegoDeTerror inherits Juego {
method jugar(unUsuario,unasHoras){
unUsuario.tirarTodoAlCarajo()
}
}

class JuegoDeEstrategia inherits Juego {
method jugar(unUsuario,unasHoras){
unUsuario.aumentarHumor(5 * unasHoras)
}
}
```

Ahora, ¿Qué podemos apreciar de esta solución? ¿Puede un juego pasar de ser un `moba` a `estratégico`? 🤔

Si bien en la realidad podría pasar (por ejemplo, quien dirige el juego podría tener un cambio de visión), en nuestro caso podemos decir que no va a cambiar. Como necesitamos que esta característica sea **estática** (no cambie durante la ejecución), usamos la **herencia**. 

¡Pero a veces necesitamos de cierto _dinamismo_ durante la ejecución del código! 🔁

# Composición

Si analizamos el enunciado, vemos que tiene que ser posible **actualizar** la suscripciones de cada cliente: 

- "La suscripción se puede **actualizar** si así se desea."
- "Gameflix cobrará el costo de la suscripción a sus clientes. En el caso de que no cuentes con suficiente saldo para pagarlo, inmediatamente se les **actualizará** la suscripción a la de Prueba 🆓."

Como vemos, las suscripciones cambian a lo largo del tiempo, por lo que la herencia no es una posible solución al problema, **ya que no se puede cambiar de subclase durante la ejecución del programa**.

Para esto, podemos utilizar la **composición**. De esta manera, delegamos la lógica de la suscripción a una nueva clase u objeto, la cual cada cliente conocerá a una instancia de esta clase a través de un atributo:

```java
class Usuario {
var suscripcion

method puedeJugar(unJuego) {
return suscripcion.permiteJugar(unJuego)
}


method actualizarSuscripcion(unaSuscripcion) {
suscripcion = unaSuscripcion
}

method pagarSuscripcion() {
if(self.leAlcanzaParaPagar(suscripcion.costo())) {
self.actualizarSuscripcion(prueba)
} else {
plataEnCuenta -= suscripcion.costo()
}
}
}
```
La composición es una solución **dinámica**, que nos ayuda a resolver este tipo de contextos.

# Herencia vs composición: ¿cuándo elegir una por sobre la otra?

Esto depende del contexto del problema. Si vemos que, por ejemplo, hay comportamiento que puede ir cambiando a medida que se ejecuta nuestra solución, podríamos optar por la **composición**. 
Sin embargo, podemos vernos con ganas de aplicar la composición en todas partes *por las dudas*, lo cual no está bueno ya que la composición es una **solución más compleja** que la herencia (tenemos que crear una nueva clase que "hace" del tipo que queremos componer, y relacionarla a la clase que "cambiaría"). Si la clase no cambia en ejecución, podríamos optar por la **Herencia**, ya que es más simple y abstrae mejor nuestra solución.

# Repaso diagrama de clases

El diagrama de clases es la herramienta que tenemos para comunicar las relaciones entre las clases y objetos de nuestra solución, sin mostrar el código. En él, tanto las clases como los objetos deben estar siempre conectados. Las relaciones que existen son:

| Relación ➡️ / Característica ⬇️ | tiene o conoce | usa | implementa | hereda |
|----------|----------|----------|----------|----------|
| Flecha    | Contínua con punta abierta   | Punteada con punta abierta   | Punteada con punta cerrada   | Contínua con punta cerrada  |
| Flecha en plantUMl    | -->   | ..>   | ..\|\>  | --\|\> |
| Se usa cuando una clase u objeto …    |  …tiene/conoce un atributo. Si es una colección debe llevar un asterisco (--> "*")  | …usa a otro objeto como argumento de un método  | …implementa una interfaz (comparte los mismos mensajes que otros, aprovechando el polimorfismo) | …hereda de una clase  |


# Links útiles

- [Video de la clase de años anteriores - Manejo de Errores](https://drive.google.com/file/d/1Q1Psk2BOOhWnzcN1-HHqHvOxte3eyJLd/view)
- [Código de la clase + diagrama - Manejo de Errores](https://github.com/pdep-lunes/pdep-clases/tree/main/2024/objetos/clase-06)
- [Video de la clase de años anteriores - Herencia cs composición](https://drive.google.com/file/d/18qvrP2XBGfK10Cu0vl5QHff2Q8wpHJj7/view)
- [Código de la clase + diagrama - Herencia cs composición](https://github.com/pdep-lunes/pdep-clases/tree/main/2024/objetos/clase-07)

