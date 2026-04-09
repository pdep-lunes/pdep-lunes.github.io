---
title: Herencia vs composición
date: '2024-10-07'
description: Clase 22
tags: [objetos, herencia vs composición, herencia, composición]
---

## Tarea

- Realizar correcciones, si las hubiera, de las entregas del trabajo práctico de objetos.
- Terminar la parte de cómo un cliente juega un juego de gameflix.
- Recomendamos ir haciendo de la [página de pdep](https://www.pdep.com.ar/material/parciales):
  - todos los que tengan una posible solución;
  - Intensa Mente;
  - Jalogüin;
  - Navidad;
  - Yaar;
  - Estanciero (modificado).

# Herencia

Hicimos el ejercicio [Gameflix](https://docs.google.com/document/d/18JRl-6X4FTc1mGOPYvX8ooIYTaRi02YeJoeBtp6vjDs/edit).

Como ya habíamos visto, la **herencia** la podemos utilizar cuando tenemos lógica repetida entre distintos objetos, y queremos agruparla.

Por ejemplo,los géneros de los juegos dentro de *Gameflix*:

```java
class JuegoViolento inherits Juego {
  method jugar(unUsuario, unasHoras){
    unUsuario.reducirHumor(10 * unasHoras)
  }
}

class JuegoMOBA inherits Juego {
  method jugar(unUsuario, unasHoras){
    unUsuario.comprarSkins()
  }
}

class JuegoDeTerror inherits Juego {
  method jugar(unUsuario, unasHoras){
    unUsuario.tirarTodoAlCarajo()
  }
}

class JuegoDeEstrategia inherits Juego {
  method jugar(unUsuario, unasHoras){
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

## ¿Cuándo elegir una por sobre la otra?

Esto depende del contexto del problema. Si vemos que, por ejemplo, hay comportamiento que puede ir cambiando a medida que se ejecuta nuestra solución, podríamos optar por la **composición**. 
Sin embargo, podemos vernos con ganas de aplicar la composición en todas partes *por las dudas*, lo cual no está bueno ya que la composición es una **solución más compleja** que la herencia (tenemos que crear una nueva clase que "hace" del tipo que queremos componer, y relacionarla a la clase que "cambiaría"). Si la clase no cambia en ejecución, podríamos optar por la **Herencia**, ya que es más simple y abstrae mejor nuestra solución.

## Repaso diagrama de clases

El diagrama de clases es la herramienta que tenemos para comunicar las relaciones entre las clases y objetos de nuestra solución, sin mostrar el código. En él, tanto las clases como los objetos deben estar siempre conectados. Las relaciones que existen son:

| Relación ➡️ / Característica ⬇️ | tiene o conoce | usa | implementa | hereda |
|----------|----------|----------|----------|----------|
| Flecha    | Contínua con punta abierta   | Punteada con punta abierta   | Punteada con punta cerrada   | Contínua con punta cerrada  |
| Flecha en plantUMl    | -->   | ..>   | ..\|\>  | --\|\> |
| Se usa cuando una clase u objeto …    |  …tiene/conoce un atributo. Si es una colección debe llevar un asterisco (--> "*")  | …usa a otro objeto como argumento de un método  | …implementa una interfaz (comparte los mismos mensajes que otros, aprovechando el polimorfismo) | …hereda de una clase  |

## Links útiles

- [Video de la clase de años anteriores](https://drive.google.com/file/d/18qvrP2XBGfK10Cu0vl5QHff2Q8wpHJj7/view)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases/tree/main/2024/objetos/clase-07/src)
- [Diagrama de clases de la clase](https://github.com/pdep-lunes/pdep-clases/blob/main/2024/objetos/clase-07/diagrama.plantuml)
- [Código del diagrama de clases](https://github.com/pdep-lunes/pdep-clases/blob/main/2024/objetos/clase-07/diagrama.png) 


