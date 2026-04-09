---
title: Vigésima clase
date: '2023-10-09'
description: Vigésimo clase de PdeP.
tags: [objetos, herencia vs composición, herencia, composición]
---

## Tarea

- Realizar correcciones, si las hubiera, de la primera entrega del trabajo práctico de objetos.
- Comenzar la [segunda entrega del trabajo práctico de objetos](https://docs.google.com/document/d/1elTFomdJHPToAFxPji8W_nypPzI4G_LJyDZl2O-_VdU/edit). Tienen tiempo de entregar hasta las 23:59 hs del 29/10.
- Terminar el modelados de los juegos del enunciado de hoy ([Gameflix](https://docs.google.com/document/d/18JRl-6X4FTc1mGOPYvX8ooIYTaRi02YeJoeBtp6vjDs/edit)) para continuarlo la próxima clase.

## Repaso diagrama de clases

El diagrama de clases es la herramienta que tenemos para comunicar las relaciones entre las clases y objetos de nuestra solución, sin mostrar el código. En él, tanto las clases como los objetos deben estar siempre conectados. Las relaciones que existen son:

| Relación ➡️ / Característica ⬇️ | tiene o conoce | usa | implementa | hereda |
|----------|----------|----------|----------|----------|
| Flecha    | Contínua con punta abierta   | Punteada con punta abierta   | Punteada con punta cerrada   | Contínua con punta cerrada  |
| Flecha en plantUMl    | -->   | ..>   | ..\|\>  | --\|\> |
| Se usa cuando una clase u objeto …    |  …tiene/conoce un atributo. Si es una colección debe llevar un asterisco (--> "*")  | …usa a otro objeto como argumento de un método  | …implementa una interfaz (comparte los mismos mensajes que otros, aprovechando el polimorfismo) | …hereda de una clase  |


## Parciales de objetos para ir practicando

Recomendamos ir haciendo de la [página de pdep](https://www.pdep.com.ar/material/parciales):

- todos los que tengan una posible solución;
- Intensa Mente;
- Jalogüin;
- Navidad;
- Yaar;
- Estanciero (modificado).

## Links útiles

- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2023/tree/main/Objetos/Clase07)
- [Diagrama de clases de la clase](https://github.com/pdep-lunes/pdep-clases-2023/blob/main/Objetos/Clase07/diagrama/diagrama.png)
- [Código del diagrama de clases](https://github.com/pdep-lunes/pdep-clases-2023/blob/main/Objetos/Clase07/diagrama.plantuml) 


