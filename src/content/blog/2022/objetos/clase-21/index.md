---
title: Vigésimo primera clase
date: '2022-10-17'
description: Vigésimo primera clase de PdeP.
tags: [objetos, herencia vs composición, herencia, composición]
---

Hicimos [este](https://docs.google.com/document/d/18JRl-6X4FTc1mGOPYvX8ooIYTaRi02YeJoeBtp6vjDs/edit?usp=sharing) ejercicio.

# Herencia

Como ya habíamos visto, La Herencia la podemos utilizar cuando tenemos lógica repetida entre distintos objetos, y queremos agruparla.

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

Ahora, ¿Qué cosas podríamos apreciar de esta solución? Por ejemplo, podríamos empezar haciendo una pregunta: **¿Puede un juego pasar de ser un MOBA a Estratégico?**

Si bien en la realidad podría pasar (El director del juego podría tener un cambio de visión), nosotres podemos decir que no podría cambiar. Es decir, la herencia es **Estática**. 

¿Por qué esta pregunta? Hay veces donde nuestra solución necesita de tener un comportamiento **Dinámico**, es decir, que su comportamiento cambie en ejecución. ¿Cuándo? Lo veremos mejor en la próxima sección.

# Composición

Si empezamos a analizar el enunciado, vemos que nos pide algo en particular por sobre las suscripciones en varios lugares:


*"Un usuario también puede **actualizar** su suscripción si así lo desea."*
*"A su vez, Gameflix al inicio de cada mes cobrará el costo de la suscripción a sus usuarios, si estos no tuviesen suficiente plata para pagarlo, inmediatamente **se les actualizará** la suscripción a la de Prueba."*

Como vemos, las suscripciones estarán cambiando a lo largo del tiempo, por lo tanto la herencia no nos podría resolver este problema, ya que no podemos cambiar de subclase en ejecución.

Para esto, podríamos utilizar la **composición**: Delegamos la lógica de la suscripción a una nueva clase, y los usuarios conocerán a una instancia de esta clase:

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
Como podemos observar, ahora podemos cambiar de subscripción a medida que se van modificando los objetos, en ejecución. Es decir, la composición es una solución **Dinámica**, que nos ayuda a resolver este tipo de contextos.

## ¿Cuándo elegir una por sobre la otra?
Esto depende del contexto del problema. Si nosotros vemos que, por ejemplo, el tipo de clase puede ir cambiando a medida que se ejecuta nuestra solución, podríamos optar por la 

**Composición**. 

Sin embargo, podemos vernos con ganas de aplicar la composición en todas partes *por las dudas*, lo cual no está bueno ya que la composición es una **solución más compleja** que la herencia (Tenemos que crear una nueva clase que "hace" del tipo que queremos componer, y relacionarla a la clase que "cambiaría"). Si la clase no cambia en ejecución, podríamos optar por la **Herencia**, ya que es más simple y abstrae mejor nuestra solución.

## Tarea

Terminar la [segunda entrega del trabajo práctico de objetos](https://docs.google.com/document/d/16Uc4LCv2OcRB1mBJSxD-F5sp17IS9n7v0NafRohLCXA/edit?usp=sharing)

## Links útiles

- [Video de la clase](https://drive.google.com/file/d/18qvrP2XBGfK10Cu0vl5QHff2Q8wpHJj7/view)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2022/tree/master/Objetos/Clase24)
- [Diagrama de clases de la clase](https://github.com/pdep-lunes/pdep-clases-2022/blob/master/Objetos/Clase24/diagrama.png)
- [Composición](https://wiki.uqbar.org/wiki/articles/composicion--oop-.html)


