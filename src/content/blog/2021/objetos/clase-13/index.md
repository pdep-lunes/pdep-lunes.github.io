---
title: Décimo tercera clase
date: '2021-08-30'
description: Décimo tercera clase de PdeP
tags: [objetos, introducción, atributos, accessors, mensaje, método, identidad]
---

## ¿Qué vimos hoy?

Así como en funcional teníamos funciones y en lógico teníamos reglas lógicas, como sugiere el nombre, en esta parte de la materia vamos a estar trabajando con objetos. Empecemos creando un objeto simple:

Tenemos a Poroto, el perro de una familia 🐕. Por lo pronto tenemos la siguiente información acerca de Poroto: tiene 4 años y 100 de energía (porque todos los perros necesitan energía para hacer cosas, claro). Entonces, vamos a decir que poroto tiene como **atributos** edad y energía. 

```
object poroto {
  var energia = 100
  var edad = 5
}
```


¿Y qué podemos hacer con poroto? Por ahora no mucho 😅. Estaría bueno que sepa hacer más cosas, como jugar. ¿Y cómo hacemos que poroto juegue? 🤔 Se lo tenemos que decir (poroto, jugá! 🗣️) y la forma que tenemos para decirle a un objeto que haga algo es **enviándole un mensaje**, y esto se hace así:

`poroto.jugar()`

Los mensajes siempre son enviados a un objeto y son la manera de comunicarnos con los mismos.

Si corremos el código anterior, ¿qué pasa?

`ERROR: poroto does not understand jugar() (line: 4)` 💥

Claro, le dijimos a poroto que juegue, pero nunca le “enseñamos” cómo hacerlo 👨‍🏫👩‍🏫. De alguna forma le tenemos que decir qué es lo que queremos que haga cuando le digamos que juegue, y esto lo hacemos con lo que llamamos un **método**. Repasando: un método es lo que un objeto hace cuando le enviamos un mensaje particular. Enseñémosle entonces a `poroto` a jugar. Vamos a querer que cuando `poroto` juegue, su energía baje 20 unidades. Esto en el código se escribe así: 👨‍💻👩‍💻

```
object poroto {
  var energia = 100
  var edad = 5

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

Por otro lado, como todo buen perro, `poroto` tiene un ladrido. Para ello crearemos el método ladrido que retorna "Guau Guau"

```
method ladrido() {
  return "Guau Guau"
}
```

La principal diferencia entre métodos como `ladrido` y `jugar` es que el primero retorna un valor mientras que el segundo tiene efecto de lado, es decir, modifica el estado de nuestro objeto. Es muy importante mantener diferenciados estos dos tipos y no definir comportamiento que tenga efecto y retorne en un mismo método.

Ahora, vamos a crear otro objeto: vamos a crear al dueño de poroto, Billy. De Billy conocemos su edad, su comida favorita, su energía y su compañere.
Sabemos que Billy puede jugar con poroto, entonces podemos hacer un método que sea `jugar`, el cual haga que Billy pierda 50 de energía (se cansa más rápido que su perro) y también hace que poroto juegue.

```
object billy {
  var edad = 12
  var comidaFavorita = "Fideos"
  var energia = 200
  var companiere = poroto

  method jugar() {
    energia -= 50
    companiere.jugar()
  }

  method companiere() {
    return companiere;
  }
}
```

Como vemos acá, Billy le está mandando un mensaje a su compañere, que en este caso es poroto. Billy le dijo a su compañere jugá y Poroto jugó.
Ahora agregamos a Mandy que tiene como mascota a su perra Sally que empieza con la misma energía y edad que poroto y pierde la misma energía al jugar. Al jugar, Mandy pierde 30 de energía y hace que su compañere juegue dos veces.

```
object mandy {
   var edad = 15
   var comidaFavorita = "Fideos"
   var energia = 200
   var companiere = sally

  method jugar() {
    energia -= 30
    companiere.jugar()
    companiere.jugar()
  }
 
  method companiere() {
    return companiere;
  }
}

object sally {
  var energia = 100
  var edad = 5

  method jugar() {
    energia = energia - 20
  }

  method ladrido() {
    return "Guau Guau"
  }
  
  method energia() {
    return energia
  }

  method energia(unaEnergia) {
    energia = unaEnergia
  }

}
```

### Identidad vs Igualdad

`Identidad`: decimos que dos objetos son idénticos si son el mismo objeto. Dentro del ambiente podemos tener dos referencias diferentes al mismo objeto. En Wollok el operador usado para comparar dos objetos por identidad es ===.

`Igualdad`: (o equivalencia) por defecto dos objetos son iguales si son idénticos, o sea si son el mismo objeto. Al mismo tiempo dos objetos que no son idénticos pueden ser iguales.


A pesar de que `sally` y `poroto` tengan los mismos atributos, con los mismos valores iniciales y sus métodos sean iguales no son objetos idénticos, es decir, no tienen la misma identidad.


## Links útiles:

- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2021/blob/master/objetos/clase_01/src/clase_01.wlk)
- [Video de la clase](https://drive.google.com/file/d/1gBVoGA3rzSzl9D0gpFlxcEfk4485Meu_/view?usp=sharing)
