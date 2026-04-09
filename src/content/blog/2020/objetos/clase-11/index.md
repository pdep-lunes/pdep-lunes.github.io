---
title: Onceava clase
date: '2020-08-10'
description: Onceava clase de PdeP
tags: [objetos, introducción, atributos, accessors, mensaje, método]
---

## ¿Qué vimos hoy?

Así como en funcional teníamos funciones y en lógico teníamos reglas lógicas, como sugiere el nombre, en esta parte de la materia vamos a estar trabajando con objetos. Empecemos creando un objeto simple:

Tenemos a Poroto, el perro de una familia 🐕. Por lo pronto tenemos la siguiente información acerca de Poroto: tiene 4 años y 100 de energía (porque todos los perros necesitan energía para hacer cosas, claro). Entonces, vamos a decir que poroto tiene como **atributos** edad y energía. 

```wollok
object poroto {
  var energia = 100
  var edad = 4
}
```


¿Y qué podemos hacer con poroto? Por ahora no mucho 😅. Estaría bueno que sepa hacer más cosas, como jugar. ¿Y cómo hacemos que poroto juegue? 🤔 Se lo tenemos que decir (poroto, jugá! 🗣️) y la forma que tenemos para decirle a un objeto que haga algo es **enviándole un mensaje**, y esto se hace así:

`poroto.jugar()`

Los mensajes siempre son enviados a un objeto y son la manera de comunicarnos con los mismos.

Si corremos el código anterior, ¿qué pasa?

`ERROR: poroto does not understand jugar() (line: 4)` 💥

Claro, le dijimos a poroto que juegue, pero nunca le “enseñamos” cómo hacerlo 👨‍🏫👩‍🏫. De alguna forma le tenemos que decir qué es lo que queremos que haga cuando le digamos que juegue, y esto lo hacemos con lo que llamamos un **método**. Repasando: un método es lo que un objeto hace cuando le enviamos un mensaje particular. Enseñémosle entonces a poroto a jugar. Vamos a querer que cuando poroto juegue, su energía baje 20 unidades. Esto en el código se escribe así: 👨‍💻👩‍💻

```wollok
object poroto {
  var energia = 100
  var edad = 4

  method jugar() {
    energia = energia - 20 // o energia -= 20
  }
}
```

Buenísimo, ahora que poroto sabe jugar, enviemosle el mensaje de nuevo.

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

Ahora, vamos a crear otro objeto: vamos a crear al dueño de poroto, Billy. De Billy conocemos su edad, su comida favorita, su energía y su mascota.
Sabemos que Billy puede jugar con poroto, entonces podemos hacer un método que sea `jugarConMascota`, el cual haga que Billy pierda 50 de energía (se cansa más rápido que su perro) y también hace que poroto juegue.

```wollok
object billy {
  var edad = 12
  const comidaFavorita = "asado"
  var energia = 200
  var mascota = poroto

  method jugarConMascota() {
    energia -= 50
    mascota.jugar()
  }

  method mascota() {
    return mascota;
  }
}
```

Como vemos acá, Billy le está mandando un mensaje a su mascota, que en este caso es poroto. Billy le dijo a su mascota jugá y Poroto jugó.
Ahora agregamos a Mandy que tiene como mascota a su perra Sally que empieza con la misma energía y edad que poroto y pierde la misma energía al jugar. Hacemos que mandy juegue con su mascota dejando a Sally con el mismo estado que Poroto.

```wollok
object mandy {
   var edad = 15
   const comidaFavorita = "milanesa"
   var energia = 200
   var mascota = sally

  method jugarConMascota() {
    energia -= 30
    mascota.jugar()
  }
 
  method mascota() {
    return mascota;
  }
}

object sally {
  var energia = 100
  var edad = 4

  method jugar() {
    energia = energia - 20
  }
}
```

## Links útiles:

- [Código de la clase](https://github.com/pdep-lunes/pdep-clases/tree/main/2020/objetos/clase-01)
- [Video de la clase](https://drive.google.com/file/d/1n86oHvWveNmiK6j91OkqOLm7d8m2MMt5/view)



 

