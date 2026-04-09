---
title: Introducción a Objetos
date: '2025-08-25'
description: Décimo octava clase de PdeP
tags: [objetos, introducción, atributos, accessors, mensaje, método, identidad]
---

## Tarea para la clase que viene

- Instalarse Wollok siguiendo los pasos de [ésta página](https://www.wollok.org/getting_started/installation/). ⚠️ **¡¡Usá siempre git bash para no tener problemas!!**.
- Explorar y experimentar con Wollok. Acá está su guía de lenguajes.

## ¿Qué vimos hoy?

Así como en funcional teníamos funciones y en lógico teníamos reglas lógicas, como sugiere el nombre, en esta parte de la materia vamos a estar trabajando con objetos. Empecemos creando un objeto simple:

Tenemos a Poroto, el perro de una familia 🐕. Por lo pronto tenemos la siguiente información acerca de Poroto: es un perro Salchicha con 500 de energía (porque todos los perros necesitan energía para hacer cosas, claro). Entonces, vamos a decir que poroto tiene como **atributos** raza y energía. 

```
object poroto {
  var energia = 500
  const raza = "Salchicha"
}
```


¿Y qué podemos hacer con poroto? Por ahora no mucho 😅. Estaría bueno que sepa hacer más cosas, como jugar. ¿Y cómo hacemos que poroto juegue? 🤔 Se lo tenemos que decir (poroto, jugá! 🗣️) y la forma que tenemos para decirle a un objeto que haga algo es **enviándole un mensaje**, y esto se hace así:

`poroto.jugar()`

Los mensajes siempre son enviados a un objeto y son la manera de comunicarnos con los mismos.

Si corremos el código anterior, ¿qué pasa?

`ERROR: poroto does not understand jugar() (line: 4)` 💥

Claro, le dijimos a poroto que juegue, pero nunca le “enseñamos” cómo hacerlo. De alguna forma le tenemos que decir qué es lo que queremos que haga cuando le digamos que juegue, y esto lo hacemos con lo que llamamos un **método**. Repasando: un método es lo que un objeto hace cuando le enviamos un mensaje particular. Enseñémosle entonces a `poroto` a jugar. Vamos a querer que cuando `poroto` juegue, su energía baje 20 unidades. Esto en el código se escribe así: 👨‍💻👩‍💻

```
object poroto {
  var energia = 100
  const raza = "Salchicha"

  method jugar() {
    energia = energia - 20 // o energia -= 20
  }
}
```

Buenísimo, ahora que `poroto` sabe jugar, enviemosle el mensaje de nuevo.

Ahora queremos ver si su energía cambió, por lo que deberíamos preguntarle a poroto cuál es su energía. Para esto vamos a tener que declarar un _getter_.

```
method energia() {
  return energia
}
```

Si quisiéramos cambiarla, haríamos un _setter_:

```
method energia(unaEnergia) {
  energia = unaEnergia
}
```

Este tipo de métodos en los que accedemos al valor de un atributo o lo modificamos se llaman _accessors_. No es necesario que todos los atributos tengan los suyos, sólo aquellos que los necesitan.

Por otro lado, como todo buen perro, `poroto` tiene un ladrido. Para ello crearemos el método ladrido que retorna "¡Guau!"

```
method ladrido() {
  return "¡Guau!"
}
```

La principal diferencia entre métodos como `ladrido` y `jugar` es que el primero retorna un valor mientras que el segundo tiene efecto de lado, es decir, modifica el estado de nuestro objeto. Es muy importante mantener diferenciados estos dos tipos y no definir comportamiento que tenga efecto y retorne en un mismo método.

Ahora, vamos a crear otro objeto: vamos a crear al dueño de poroto, Billy. De Billy conocemos su alegría y su mascota.
Sabemos que Billy puede jugar con Poroto, entonces podemos hacer un método que sea `jugarConSuMascota`, el cual haga que Billy gane 50 de alegría y también hace que su mascota juegue.

```
object billy {
  const nombre = "William"
  var alegria = 200
  var mascota = poroto

  method jugarConSuMascota() {
    alegria += 50
    mascota.jugar()
  }
}
```

Como vemos acá, Billy le está mandando un mensaje a su mascota, que en este caso es Poroto. Billy le dijo a su mascota jugá y Poroto jugó.
Ahora agregamos a Mandy que tiene como mascota a su perra Sally que pierde la misma energía al jugar que Poroto. Al jugar, Mandy gana 100 de alegría y hace que su mascota juegue dos veces.

```
object mandy {
   const nombre = "Magdalena"
   var alegria = 200
   var mascota = sally

  method jugar() {
    alegria += 100
    mascota.jugar()
    mascota.jugar()
  }
}

object sally {
  var energia = 100
  var raza = "Caniche"

  method jugar() {
    energia = energia - 20
  }

  method ladrido() {
    return "¡Miau!"
  }
}
```

## Links útiles

- [Código de ejemplo de la bitácora](https://github.com/pdep-lunes/pdep-clases-2023/blob/main/Objetos/Clase01/src/Clase01.wlk)
- En la página de pdep y en la documentación de Wollok van a encontrar mucho material útil.
