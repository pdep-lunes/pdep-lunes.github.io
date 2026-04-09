---
title: Décimo quinta clase
date: '2021-09-13'
description: Décimo quinta clase de PdeP
tags: [objetos, colecciones, testing]
---

## Ejercicio para practicar:

- ["Se dice atómico"](https://docs.google.com/document/d/1t68f9LUYqQLJLxJhGXonayhE7REey4NV7Yzh06KvD2c/edit#heading=h.kva2cspa7p76).

## Colecciones

En Wollok contamos con dos tipos de colecciones:
- *listas*: en donde los elementos tienen un orden y puede haber elementos repetidos. Se definen mediante el literal `[ ]`, por ejemplo:

```js
var bolsaDelSuper = [leche, manteca, jugo, jugo, jugo]
```

- *conjuntos*: no hay orden en los elementos y no puede haber elementos repetidos. Se definen mediante el literal `#{ }`, por ejemplo:

```js
var numeros = #{1, 2, 3, 4}
```

En ambos casos, la colección agrupa referencias a los objetos y no al objeto en sí.


Hicimos un ejercicio para conocer y practicar los mensajes que entienden las colecciones. Entre ellos estaban, `size`, `add`, `remove`, `filter`, `map`, `forEach` y se pueden encontrar en la [guía de lenguajes](https://docs.google.com/document/d/1oJ-tyQJoBtJh0kFcsV9wSUpgpopjGtoyhJdPUdjFIJQ/edit). 

¿Qué diferencia hay entre `map` y `forEach`? El primero lo usamos para devolver una lista y **no** queremos que haya efecto y el segundo para cuando queremos afectar a un conjunto de objetos. 

## Testing

¡Qué fiaca probar todo lo que hacíamos en la consola! 😫 Por suerte, aprendimos a hacer que la compu lo haga por nosotros (o casi 😝). Gracias a los *tests* podemos **automatizar** probar nuestro código para saber si lo que escribimos se corresponde con lo que realmente queríamos hacer.
En Wollok se hacen en un archivo a parte con extensión `.wtest`. Tenemos que tener en cuenta de escribir un nombre descriptivo para el test así es más fácil saber dónde nos equivocamos cuando falle. 
¿Y por qué son tan importantes? 😅 Si vamos a modificar cosas en nuestro código, los tests son una manera de verificar que todo andaba antes y después del cambio.

## Links útiles 

- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2021/tree/master/objetos/superHeroes/superHeroes)
- [Colecciones](https://docs.google.com/document/d/1MLbx1Fxt7I_uVg6Yv9hYfIu2IIbUQqqICbOM3s969D8/edit)
- [Testing](https://docs.google.com/document/d/1caDE_mlP1QMfzyVpyvh-tKshjAeYLXBkXDYrTX5zFUI/edit#heading=h.54t50i579i9f)
- [Video de la clase](https://drive.google.com/file/d/1gYQdIfTUwrUkJAJar2Q5hyfyBB7kjVXB/view?usp=sharing)


