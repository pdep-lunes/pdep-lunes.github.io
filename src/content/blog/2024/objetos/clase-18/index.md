---
title: Colecciones y testing
date: '2024-09-09'
description: Décimo octava clase de PdeP
tags: [objetos, colecciones, testing]
---

## Tarea para la clase que viene:

- Comenzar con la primera parte del [TP grupal obligatorio](https://docs.google.com/document/d/1tBWSjC5v5_8-s3tKPU3T7slNciWSqFH7k0IVtKz8BLU/edit#heading=h.h636er2gpslw). Si bien no se piden explícitamente, **realizar los tests correspondientes con los casos de prueba presentados**. Se debe entregar en tiempo y forma el lunes 23/09.
- Terminar los tests de la clase de hoy.
- Para practicar, realizar el [TP “Se dice atómico”](https://docs.google.com/document/d/1z6TUailAWpRV2Gu72vHCoHKDniFETWOWOOnzTeLVcEk) incluyendo los tests. Puede ser de forma individual o grupal.

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

- [Video de la clase de años pasados](https://drive.google.com/file/d/1tRWJASR27eOnyDYbK9VY7FMK2rov9MHw/view?usp=sharing)
- [Código de la clase de hoy](https://github.com/pdep-lunes/pdep-clases-2024/tree/main/Objetos/Clase03)  
