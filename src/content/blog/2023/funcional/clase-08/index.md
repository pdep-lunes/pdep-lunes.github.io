---
title: Octava clase
date: "2023-05-22"
description: "Octava clase de PdeP"
tags: [funcional, práctica]
---

## Tarea para la clase que viene:
- Continuar con la segunda entrega del [TP integrador](https://docs.google.com/document/d/17naHWbyjj-GO0XVTxcC0eYGQP01i49Fve2Z03SAMJ7Y/edit) 
- Terminar de resolver el simulacro de parcial [Haskell Chef](https://docs.google.com/document/d/13SS-HXVR7z5SOgQCwYh2Maob7QhSh858PTSzc7MymCY/edit) 
- Seguir realizando [parciales](https://www.pdep.com.ar/material/parciales) para practicar.


## ¿Qué vimos hoy? 
Practicamos con el simulacro de parcial [Haskell Chef](https://docs.google.com/document/d/13SS-HXVR7z5SOgQCwYh2Maob7QhSh858PTSzc7MymCY/edit). 

## Funciones para modificar un campo de una estructura

En parciales es muy común que tengamos estructuras de datos complejos y se repita la idea de querer “modificar” uno de los campos de esta estructura. Por ejemplo, si tenemos una persona con nombre, apellido y edad y queremos hacer que cumpla años o duplicar su edad o hacer que cumpla 100 años, etc. Estas funciones terminarían con una lógica muy similar entre sí:

```haskell
cumplirAños :: Persona -> Persona
cumplirAños    unaPersona = unaPersona { edad = edad unaPersona + 1 }

duplicarEdad :: Persona -> Persona
duplicarEdad   unaPersona = unaPersona { edad = edad unaPersona * 2 }

cumplir100Años :: Persona -> Persona
cumplir100Años unaPersona = unaPersona { edad = 100 }
```

¡Esta repetición de lógica la podemos evitar de la misma forma que siempre! 🙌 Extrayendo la lógica común en una función. 

```haskell
modificarEdad :: (Int -> Int) -> Persona -> Persona
modificarEdad unaFuncion unaPersona = unaPersona { edad = unaFuncion . edad $ unaPersona }
```

Ahora, podemos escribir nuestras funciones anteriores en función de `modificarEdad`:

```haskell
cumplirAños :: Persona -> Persona
cumplirAños    unaPersona = modificarEdad (+ 1) unaPersona

duplicarEdad :: Persona -> Persona
duplicarEdad   unaPersona = modificarEdad (* 2) unaPersona

cumplir100Años :: Persona -> Persona
cumplir100Años unaPersona = modificarEdad (const 100) unaPersona
```

El crear estas funciones auxiliares nos trae un montón de ventajas:
- Evitamos la repetición de lógica.
- Nos facilita usar composición (en el caso que queramos modificar dos campos distintos a la vez, sólo necesitamos componer dos de estas funciones).
- Agrega una pequeña capa de abstracción entre nuestra lógica de dominio y la estructura de nuestros datos. Esto hace que si nuestra estructura cambia, las únicas funciones que se ven afectadas son las auxiliares, y no las de dominio.

## Links Útiles

- [Código de la clase](https://github.com/pdep-lunes/pdep-clases-2023/blob/main/Funcional/Clase08/src/Lib.hs)



