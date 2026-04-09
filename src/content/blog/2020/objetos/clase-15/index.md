---
title: Quinceava clase
date: '2020-09-28'
description: Quinceava clase de PdeP
tags: [objetos, clases, method lookup, diagrama de clases, constructores.]
---

## Tarea para la clase que viene:

- Corregir la entrega 1 del TP cuatrimestral de objetos.
- Corregir la tarea Batalla de estrellas.

## Clases

¿Cómo hacemos para no repetir lógica entre objetos que hacen las mismas cosas? 😩 
El paradigma orientado a objetos nos provee un mecanismo para resolver la repetición de comportamiento, ¡las **clases**! 🙌 
Gracias a este nuevo concepto podemos abstraer la lógica repetida en un mismo "molde" para crear *instancias* a partir de él.

Es importante tener en cuenta que:
- Todo objeto es siempre instancia de **una y sólo una** clase. 
- No se puede cambiar la clase de un objeto en tiempo de ejecución. 

## Instanciación

Si definimos una clase y queremos utilizar un caso concreto de la misma para poder mandarle mensajes necesitamos crear una **instancia** 😄. Las clases no sólo nos permiten definir el comportamiento y los atributos de los objetos, también sirven para crear los mismos para luego utilizarlos en nuestro programa. ✨

No es necesario asignar cada instancia que creemos en una variable, eso depende de lo que estemos tratando de hacer 😉. Podríamos, por ejemplo, crear un objeto dentro de un método y retornarlo directamente, o crearlo para mandarle un mensaje directamente.

## Introducción a method lookup

Cuando le enviamos un mensaje a un objeto que es instancia de una clase, busca el método correspondiente en la clase a la cual pertenece. 🔝

## Diagrama de clases 

Hasta ahora siempre estuvimos trabajando con un diagrama dinámico, conocido como diagrama de objetos. Ahora que creamos clases vamos a utilizar una nueva herramienta que nos permite modelar nuestra solución con un diagrama estático, el **diagrama de clases**. En este reflejaremos cómo interactúan nuestras clases y cuáles son los atributos y mensajes correspondientes a cada una. 🙆‍♀️🙆‍♂️

## Links útiles 

- [Video de la clase](https://drive.google.com/file/d/1HKDspM8saxs8NPuUolgPKIM9q6rXvkZJ/view)
- [Código de la clase](https://github.com/pdep-lunes/clase15-objetos-2020)
- [Clases + method look up](https://docs.google.com/document/d/1Dgq_PfCbJHO1M7dXe-vGXtj4mbEUWlYhfvQ2i0RWOsk/edit)
- [Instanciación](https://docs.google.com/document/d/11c9l3sqgUIFDx1J_ULCSS86faMQXAyOV3uesg-nwaSY/edit)
