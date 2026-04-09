---
title: Vigésimo primera clase
date: '2023-10-22'
description: Vigésimo primera clase de PdeP.
tags: [objetos, herencia vs composición, herencia, composición, práctica]
---

## Tarea

Finalizar con la [segunda entrega del trabajo práctico de objetos](https://docs.google.com/document/d/1elTFomdJHPToAFxPji8W_nypPzI4G_LJyDZl2O-_VdU/edit). Tienen tiempo de entregar hasta las 23:59 hs del 29/10.


# Herencia

Terminamos el ejercicio [Gameflix](https://docs.google.com/document/d/18JRl-6X4FTc1mGOPYvX8ooIYTaRi02YeJoeBtp6vjDs/edit).

Como ya habíamos visto, la **herencia** la podemos utilizar cuando tenemos lógica repetida entre distintos objetos, y queremos agruparla.

Por ejemplo, si vemos como resolvemos los géneros de los juegos dentro de *Gameflix*:

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

Ahora, ¿Qué cosas podríamos apreciar de esta solución? Por ejemplo, podríamos empezar haciendo una pregunta: ¿puede un juego pasar de ser un *MOBA* a *estratégico*? 🤔

Si bien en la realidad podría pasar (por ejemplo, quien dirige el juego podría tener un cambio de visión), en nuestro caso podemos decir que no va a cambiar. Como necesitamos que esta característica sea **estática** (no cambie durante la ejecución), usamos la **herencia**. 

¡Pero a veces necesitamos de cierto _dinamismo_ durante la ejecución del código!

# Composición

Si analizamos el enunciado, vemos que tiene que ser posible **actualizar** la suscripciones de cada cliente: 

- "La suscripción se puede **actualizar** si así se desea."
- "Gameflix cobrará el costo de la suscripción a sus clientes. En el caso de que no cuentes con suficiente saldo para pagarlo, inmediatamente se les **actualizará** la suscripción a la de Prueba 🆓."

Como vemos, las suscripciones cambian a lo largo del tiempo, por lo que la herencia no es una posible solución al problema, ya que no se puede cambiar de subclase durante la ejecución del programa.

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

## Práctica

Realizamos como práctica el parcial [PdePLibre](https://docs.google.com/document/d/12-nwknWda3HGG6r4vw-tDM_wmUnPUr0b4_i9WUJ8vhg/edit). 

## Links útiles

- [Video de la clase de años anteriores](https://drive.google.com/file/d/18qvrP2XBGfK10Cu0vl5QHff2Q8wpHJj7/view)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases/tree/main/2023/objetos/clase-08)


