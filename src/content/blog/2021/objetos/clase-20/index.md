---
title: Vigésima clase
date: '2021-10-25'
description: Vigésima clase de PdeP.
tags: [objetos, herencia vs composición, herencia, composición]
---

Hicimos [este](https://docs.google.com/document/d/1_SjhYafWzoMbXVYeRYEg8ajdnGGrriq2oq1JFLd7yiw/edit?usp=sharing) ejercicio.

# Herencia

Como ya habíamos visto, La Herencia la podemos utilizar cuando tenemos lógica repetida entre distintos objetos, y queremos agruparla.

Por ejemplo, si vemos como resolvemos los géneros de los juegos dentro de *Gameflix*:

```java
class Violento inherits Juego {
	method jugar(usuario,horas){
	    usuario.reducirHumor(10)
	}
}

class MOBA inherits Juego {
    method jugar(usuario,horas){
	    usuario.comprarCosmeticos(30)
    }
}
 class Terrofifico inherits Juego {
    method jugar(usuario,horas){
 	    usuario.cambiarSuscripcion(suscripcionPrueba)
    }
 }
 class Estrategico inherits Juego {
    method jugar(usuario,horas){
 	    usuario.aumentarHumor(horas)
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

Para esto, podríamos utilizar la **composición**: Delegamos la lógica de la subscripción a una nueva clase, y los usuarios conocerán a una instancia de esta clase:

```java
class Usuario {
    var suscripcion

    method juegosDeMiSubscripcion() {
	    return tipoSuscripcion.juegosSuscripcion()
    }

    method cambiarSuscripcion(unaSuscripcion){
	    tipoSuscripcion = unaSuscripcion
    }

    method pagarSuscripcion(costo) {
    // Por si no recordás, en la bitacora 19 hablamos sobre excepciones!
	try {
		self.pagar(tipoSuscripcion.costo())
	} catch e : Exception {
		self.cambiarSuscripcion(suscripcionPrueba)
	}
    }
    // Otros Metodos
    // ...
}
```
Como podemos observar, ahora podemos cambiar de subscripción a medida que se van modificando los objetos, en ejecución. Es decir, la composición es una solución **Dinámica**, que nos ayuda a resolver este tipo de contextos.

## ¿Cuándo elegir una por sobre la otra?
Esto depende del contexto del problema. Si nosotros vemos que, por ejemplo, el tipo de clase puede ir cambiando a medida que se ejecuta nuestra solución, podríamos optar por la 

**Composición**. 

Sin embargo, podemos vernos con ganas de aplicar la composición en todas partes *por las dudas*, lo cual no está bueno ya que la composición es una **solución más compleja** que la herencia (Tenemos que crear una nueva clase que "hace" del tipo que queremos componer, y relacionarla a la clase que "cambiaría"). Si la clase no cambia en ejecución, podríamos optar por la **Herencia**, ya que es más simple y abstrae mejor nuestra solución.

## Tarea

Terminar la [tercera entrega del trabajo práctico de objetos](https://docs.google.com/document/d/1FVvaRDIaaVQ3Eo-W-IO6VoO_VpiYDUuy8Fxs9XJK7to/edit)

## Links útiles

- [Video de la clase](https://drive.google.com/file/d/1y2PIsywYYZX6pcHcvfQ5vfn-3yLfYMtl/view?usp=sharing)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2021/tree/master/objetos/clase_08/src)
- [Diagrama de clases de la clase](https://github.com/pdep-lunes/pdep-clases-2021/blob/master/objetos/clase_08/diagrama.png)
- [Composición](https://wiki.uqbar.org/wiki/articles/composicion--oop-.html)


