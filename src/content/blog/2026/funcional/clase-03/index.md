---
title: Guardas y Data
date: "2026-04-27"
description: "Uso de guardas y definición de tipos con data"
tags: [funcional, guardas, data, pattern-matching]
---

## Tarea para la clase que viene:

- Instalar Haskell **con PdePreludat**.
- Instalar Miyuki.
- Terminar el ejercicio de **Braulio Estrella**.
- Realizar el TP 0

---

## ¿Qué vimos hoy?

En esta clase retomamos conceptos de la clase anterior como **pattern matching** y comenzamos a ver nuevas herramientas del paradigma funcional: **guardas** y **data**.

## Guardas

Hasta ahora veníamos resolviendo problemas utilizando **pattern matching**, es decir, comparando estructuras específicas de datos.

Por ejemplo:
```haskell
tematica :: Festejo -> String
tematica (_, _, "Aula", _) = "Educativo"
tematica (_, (_, 2), _, _) = "San valentiniano"
tematica (_, _, _, 10) = "Ligero"
tematica _ = "Sin definir"
```
Este enfoque funciona bien cuando queremos matchear **valores exactos**.  
Pero… ¿qué pasa si queremos evaluar condiciones más generales?
Ahora queremos cambiar la condición para que los cumpleaños sean ligeros, van a ser ligeros cuando la cantidad de regalos sea menor a 30.

Para estos casos usamos **guardas**:
```haskell
tematica :: Festejo -> String
tematica (nombre, (dia, mes), lugar, regalos)
  | lugar == "Aula" = "Educativo"
  | mes == 2 = "San valentiniano"
  | regalos < 30 = "Ligero"
  | otherwise = "Sin definir"
```


Las guardas permiten evaluar condiciones booleanas más complejas
Recordá no olvidarte el `otherwise` cuando utilices guardas ya que es donde entra todo lo que no abarcan las guardas de encima de él. Y, ¿por qué pasa eso? 🤔 Resulta que `otherwise` es un sinónimo de `True`, por lo que siempre se va a poder entrar por esa condición cuando no se no cumplan ninguna de las demás. Utilizamos `otherwise` porque es más expresivo.


Pero el código anterior se puede hacer mucho más declarativo y expresivo delegando en otras funciones a las condiciones:


```haskell
tematica unFestejo
  | esEducativo unFestejo = "Educativo"
  | esSanValentiniano unFestejo = "San valentiniano"
  | esLigero unFestejo = "Ligero"
  | otherwise = "Sin definir"
  ```
Entonces... ¿Cómo saber si usar pattern matching y guardas?
- Pattern matching -> Cuando depende del patrón.
- Guardas -> Cuando depende de condiciones más generales.

⚠️ Importante:
No usar guardas para devolver `True` o `False` ya es un **mal uso de booleanos** y una **muy muy mala práctica** de programación. Si llegas a una solución de ese estilo recordá que directamente podés retornar esa expresión booleana que estás evaluando.

## Data

Hasta ahora veníamos modelando con tuplas usando type alias
```haskell 
type Festejo = (String, (Int, Int), String, Int) 
```
El problema es que esto no crea un nuevo tipo de dato, sólo un alias o apodo a esa estructura.
Por ejemplo, podemos modelar una torta con el siguiente formato:
```haskell
type Torta = (TipoDeTorta, FechaDeVencimiento, Mensaje, cantidadDePorciones)
tortaDeVicky= (“chocotorta”,(20,4),”Feliz cumple vicky!!”, 8)
```
Y mandarla como argumento a la función `tematica`:
```
> tematica tortaDeVicky
“Ligero”
```
Y… ¿está bien que la torta de vicky sea ligera? NOOOO, porque rompe con el dominio. 

Para crear nuestros propios tipos de datos existe **data**:

```haskell
data Festejo = UnFestejo Nombre Fecha Lugar CantidadDeRegalos
```
Donde también pueden coexistir los type alias:

```haskell
type Nombre = String
type Fecha = (Int, Int)
type Lugar = String
type CantidadDeRegalos = Int
data Festejo = UnFestejo Nombre Fecha Lugar CantidadDeRegalos
```



Ahora si modelamos un festejo, por ejemplo `festejoOrne` nos quedaría de la siguiente manera:

```haskell 
festejoOrne :: Festejo
festejoOrne = UnFestejo “Orne” (26,4) “Parque aéreo” 50
```

Si quisiéramos probarlo en la consola, nos tiraría un error porque el data que construimos no es "mostrable" 😩. Es decir, Haskell no sabe cómo mostrar nuestro tipo de dato, pero lo solucionamos escribiendo `deriving Show` al final de la declaración del data:

```haskell
data Festejo = UnFestejo Nombre Fecha Lugar CantidadDeRegalos deriving Show
```

y si queremos poder comparar dos instancias de festejos tenemos que agregar `Eq`:
```haskell
data Festejo = UnFestejo Nombre Fecha Lugar CantidadDeRegalos deriving (Show, Eq)
```
 
Y entonces, ¿qué ventajas tenemos al usar data? Porque pareciera ser lo mismo que usar tuplas con el `type alias` 🙄. La diferencia está en que, con el data, estamos creando nuestro propio tipo de dato y, gracias a eso, vamos a poder restringir a las funciones a que sólo funcionen con el tipo de dato que le decimos. Ahora, `tematica` sólo puede recibir `Festejos`, de otra forma, romperá. 

### Data con Record Syntax
Es un [“azúcar sintáctico”](https://es.wikipedia.org/wiki/Az%C3%BAcar_sint%C3%A1ctico) que nos da algunas ventajas respecto de la otra forma de definir un data:
- Ya viene con las funciones para acceder a cada campo de la estructura (getters).
- Podés definir los valores de un data en particular nombrando los campos y sin tener que acordarte el orden en que los declaraste.
- Permite “modificar” sólo los datos que necesites sin tener que desarmarlo y volver a armarlo a mano. 


```haskell
  data Festejo = UnFestejo { 
  nombre :: String, 
  fecha :: (Dia,Mes),
  lugar :: String,
  cantidadDeRegalos :: Int
  } deriving Show
  -- Esto genera automáticamente funciones para acceder a los campos:
  > nombre festejoOrne
  "Orne"
```

Ahora vamos a modelar la función `agregarRegalos`. ¿Esta función va a modificar al festejo original? ¡No! El data, al igual que todo en el Paradigma Funcional, sigue siendo inmutable. Por ende, la función nos devolverá una copia del festejo con la cantidad de regalos aumentada.

```haskell
agregarRegalos :: Festejo -> Int -> Festejo
agregarRegalos unFestejo unaCantidad =
  unFestejo { cantidadDeRegalos = cantidadDeRegalos unFestejo + unaCantidad }
 ```
Es importante destacar que para devolver la nueva cantidad de regalos debemos sumar la cantidad de regalos original. Para eso, utilizamos el accessor `cantidadDeRegalos` y es importante pasarle por parámetro `unFestejo` para que pueda darnos el valor. No olvidar que `cantidadDeRegalos` sigue siendo una función que necesita su parámetro.  
  
Podemos hacerlo sin record syntax:
```haskell
agregarRegalos (UnFestejo unNombre unaFecha unLugar unaCantidadRegalos) unaCantidad =    UnFestejo unNombre unaFecha unLugar (unaCantidadRegalos + unaCantidad)
```

## Braulio Estrella

Comenzamos el ejercicio y trabajamos:

- Modelado con data
- Primeras funciones
- Identificación de repetición de lógica


## Ideas clave

- Guardas → condiciones
- Pattern matching → estructura
- Data → tipos propios
- Código declarativo y sin repetición

## Link útiles

- [Data](http://wiki.uqbar.org/wiki/articles/data--definiendo-nuestros-tipos-en-haskell.html)
- [Nuevo enunciado “Hora de Lectura”](https://docs.google.com/document/d/1YNnnn1bVDi1E0ErvyaPBpqcyYmxBWdgOenKztIvzk9E/edit#heading=h.poq6zqz17xui) 
- [Código con la resolución de “Hora de Lectura”](https://github.com/pdep-lunes/pdep-clases/blob/main/2023/funcional/clase-04/src/Lib.hs)
