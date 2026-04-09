---
title: Quinta clase
date: '2020-05-04'
description: 'Quinta clase de PdeP'
tags: [funcional, data, expresiones-lambda]
---

## Tarea para la clase que viene:

- Realizar el [TP Monopoly](https://docs.google.com/document/d/1EAN_RC2zngF1jiy4MGCuLvYQvr1euHj1Xx4ORiDh-nE/) y **entregarlo por GitHub**.
- De forma opcional pero *muy recomendable* se puede hacer la guía de [uso de consola y Git de Mumuki](https://mumuki.io/pdep-utn/chapters/438-control-de-versiones).
- También de forma opcional se pueden hacer las guías de Mumuki de [Expresiones Lambda](https://mumuki.io/pdep-utn/lessons/743-programacion-funcional-expresiones-lambda) y [Data](https://mumuki.io/pdep-utn/lessons/745-programacion-funcional-modelado).

## ¿Qué vimos hoy?

Volvimos al TP de la clase pasada [TP "Hora de lectura"](https://docs.google.com/document/d/11uYGXvG-TnNhveawDjKD1iSWKW9Qy8PVqlvtHhV58F8/edit) para seguir trabajando con él y agregando nuevos ejercicios. 🙌 

Queremos saber de qué género es un libro. Eso va a depender de:

- Si tiene menos de 50 páginas, es un cómic. 💬
- Si el autor es Stephen King, es de terror. 🤡
- Si el autor es japonés, es un manga. 🗾
- En cualquier otro caso, no sabemos el género. 🤷

Aprendimos cómo ver si un libro tiene cierta de cantidad de páginas o si es de un autor en especial pero… ¿cómo averiguamos la nacionalidad de un autor? 😅 ¿Deberíamos agregar la nacionalidad del autor en cada libro? ¡Momento ✋! Sólo interesa saber quiénes son de Japón y, como en nuestra solución, el único autor japonés es *"Hajime Isayama"*, no tendría sentido agregar más información a cada libro. La forma más fácil de resolverlo es con una función:

```haskell
esJapones :: Autor -> Bool
esJapones "Hajime Isayama" = True
esJapones _ = False
```

¡Ya tenemos lo necesario para definir la función `genero`! 

```haskell
genero :: Libro -> String
genero unLibro
  | ((>50).cantidadDePaginas) unLibro = "Comic"
  | esDe "Stephen King" unLibro = "Terror"
  | (esJapones.autor) unLibro = "Manga"
  | otherwise = "No clasificado"
```

Recordá no olvidarte el `otherwise` cuando utilices guardas ya que es donde entra todo lo que no abarcan las guardas de encima de él. Y, ¿por qué pasa eso? 🤔 Resulta que `otherwise` es un sinónimo de `True`, por lo que siempre se va a poder entrar por esa condición cuando no se no cumplan ninguna de las demás. Utilizamos `otherwise` porque es más expresivo.

La clase anterior contamos en qué situaciones **no** usar las guardas ❌. Pero el caso de arriba es cuando sí queremos usarlas ✔️. Entonces, ¿cuándo usar guardas y cuando pattern matching? 😩
Usamos pattern matching cuando tenemos algo que encaja con un patrón, por ejemplo una tupla de 3 elementos, una lista vacía, etc. 🧩
Usamos guardas cuando queremos evaluar conjuntos de dominios (en matemática, esto es muy similar a las funciones partidas). 🔀

¡Excelente! Ya tenemos funcionando la función `genero` 🎉. ¿Qué pasa si le mandamos como argumento una tupla que representa a una persona? No debería funcionar porque explicitamos en su tipo que recibía un `Libro`... Veamos qué pasa con la tupla que representa a nuestro querido profe Gus: 👀

```haskell
genero ("Gustavo", "Trucco", 28)
> "Comic"
```

¿¡Entonces el profe es un cómic!? 😱 Ya quisiera, pero no lo es. Lo que pasó es que si bien dijimos que `genero` funciona sólo con `Libro`s, un `Libro` es una tupla de tipo `(String, String, Int)`, ¡el mismo tipo que la tupla que representa a una persona! 😅
Recordá que al usar el type alias, **no estamos creando un nuevo tipo de dato**, sino que le estamos dando un nombre a una estructura que tiene sentido para nuestra solución y así ganar expresividad.

Entonces, ¿cómo lo solucionamos? 🤨 Creando nuestro propio tipo de dato con **Data**:

```haskell
data Libro = UnLibro String Autor Int
```

En donde `UnLibro` es una función que llamamos **constructor** y su tipo es `UnLibro :: String -> Autor -> Int -> Libro`. Es decir, es una función que recibe los parámetros necesarios para crear un libro. 

Modelemos a "El visitante":

```haskell
UnLibro "El visitante" "Stephen King" 592
```

Si quisiéramos probarlo en la consola, nos tiraría un error porque el data que construimos no es "mostrable" 😩. Es decir, Haskell no sabe cómo mostrar nuestro tipo de dato, pero lo solucionamos escribiendo `deriving Show` al final de la declaración del data: 

```haskell
data Libro = UnLibro String Autor Int deriving Show
```

Y entonces, ¿qué ventajas tenemos al usar data? Porque pareciera ser lo mismo que usar tuplas con el type alias 🙄. La diferencia está en que, con el data, estamos creando nuestro propio tipo de dato y, gracias a eso, vamos a poder restringir a las funciones a que sólo funcionen con el tipo de dato que le decimos. Ahora, `genero` sólo va a recibir `Libro`s, de otra forma, romperá. 💥
Otra ventaja es que podemos utilizar data con **record syntax** y, de esta forma, nos genera automáticamente los accessors:

```haskell
data Libro = UnLibro { titulo :: String, autor :: Autor, cantidadDePaginas :: Int } deriving Show
```

En este caso tanto `libro` como `autor` y `cantidadDePaginas ` son funciones (accessors) que van a acceder a cada elemento del data 🙌. ¿Cómo nos damos cuenta? Porque estamos explicitando el tipo de cada una al momento de crear el tipo de dato.

En conclusión, ambas sintaxis para definir datas son equivalentes, solo que record syntax nos regala las funciones para acceder a las propiedades. 🎁

Por otro lado, si queremos comparar una instancia de data con otra, tenemos que decirle a Haskell que queremos que sean comparables. ¿Cómo hacemos eso? Agregando `Eq`:

```haskell
data Libro = UnLibro { titulo :: String, autor :: Autor, cantidadDePaginas :: Int } deriving (Show, Eq)
```

Ahora vamos a modelar la función `agregarPaginas`. ¿Esta función va a modificar al libro original? ¡No! Los data, al igual que todo en funcional, siguen siendo inmutables. Por ende, la función nos devolverá una copia del libro con la cantidad de páginas aumentada.

```haskell
agregarPaginas :: Libro -> Int -> Libro
agregarPaginas (UnLibro unTitulo unAutor unaCantidadDePaginas) paginasAAgregar = UnLibro unTitulo unAutor (unaCantidadDePaginas + paginasAAgregar)
```

Podemos hacer lo mismo con record syntax:

```haskell
agregarPaginas :: Libro -> Int -> Libro
agregarPaginas unLibro paginasAAgregar = unLibro { cantidadDePaginas = cantidadDePaginas unLibro +  paginasAAgregar}
```

Es importante destacar que para devolver la nueva cantidad de páginas debemos sumar la cantidad de páginas original. Para eso, utilizamos el accessor `cantidadDePaginas` y es importante pasarle por parámetro `unLibro` para que pueda darnos el valor. No olvidar que `cantidadDePaginas` sigue siendo una función que necesita su parámetro.

¿Quedan dudas? 😕 ¡Veamos otro ejemplo! Definamos `sacarSecuela`, que agrega un "2" al final del título y cuyas páginas siempre serán 400:

```haskell
sacarSecuela :: Libro -> Libro
sacarSecuela unLibro = { cantidadDePaginas = 400, titulo = ((++ " 2").titulo) unLibro }
```

Lo sentís, ¿no? ¡El olor a repetición de lógica! 🤢 En ambas estamos cambiando las páginas de alguna forma. Así que vamos a abstraer esa lógica en la función `cambiarCantidadDePaginas`:

```haskell
cambiarCantidadDePaginas :: (Int -> Int) -> Libro -> Libro
cambiarCantidadDePaginas unaFuncion unLibro = unLibro { cantidadDePaginas = unaFuncion (cantidadDePaginas unLibro) }
```

Ahora la cantidad de páginas se cambia según el criterio (una función) que reciba por parámetro (concepto de **órden superior**). Pero... en `sacarSecuela` no usábamos una función, asignábamos 400 y ¡listo! 😨 ¿Cómo hacemos para utilizar esta nueva función? Con `const`, la cual recibe dos parámetros y siempre se queda con el primero:

```haskell
sacarSecuela unLibro = (cambiarCantidadDePaginas (const 400) . cambiarTitulo (++ " 2")) unLibro
```

Y ya que estamos... podemos abstraer el cambio de título de forma similar al cambio de cantidad de páginas: 🌚

```haskell
cambiarTitulo :: (String -> String) -> Libro -> Libro
cambiarTitulo unaFuncion unLibro = unLibro { titulo = unaFuncion (titulo unLibro) }
```

Nuestras funciones quedarían:

```haskell
agregarPaginas' :: Libro -> Int -> Libro
agregarPaginas' algunLibro paginasAAgregar = cambiarCantidadDePaginas (+ paginasAAgregar) algunLibro

sacarSecuela :: Libro -> Libro
sacarSecuela unLibro = (cambiarCantidadDePaginas (const 400) . cambiarTitulo (++ " 2")) unLibro
```

Pasemos ahora a modelar a las personas 👩👨. Las cuales tienen un nombre y un conjunto de libros que le gustan:

```haskell
type Persona = (String, [Libro])

gustos :: Persona -> [Libro]
gustos unaPersona = snd unaPersona
```

Para saber si a una persona le gusta un libro, definimos la función `leGusta`.

```haskell
leGusta :: Libro -> Persona -> Bool
leGusta unLibro unaPersona = any (== unLibro) (gustos unaPersona)
```

De esta forma asumimos que a una persona siempre le gustan algunos libros. Ahora hagamos un cambio al modelado. En vez de tener los libros que le gustan a la persona, definamos un criterio por el cual a una persona le gusta un libro:

```haskell
type Persona = (String, [Libro -> Bool])

julian :: Persona
julian = ("Julian", [esLibroLigero, esLibroFantasioso, esDe "Stephen King"])
```

Y ahora nuestra función leGusta quedaría:

```haskell
leGusta :: Libro -> Persona -> Bool
leGusta unLibro unaPersona = any (leGustaSegun unLibro) (gustos unaPersona)

leGustaSegun ::  Libro -> (Libro -> Bool) ->         Bool
leGustaSegun    unLibro       unGusto     =     unGusto unLibro
```

¿Que pasa con la función `leGustaSegun`? No tiene demasiada lógica, y además es difícil encontrar un nombre expresivo para esta función auxiliar. Para eso, dentro de Haskell contamos con las **expresiones lambda** o **funciones anónimas**: funciones sin nombre que usamos para este tipo de casos particulares. Reescribamos la función `leGusta` utilizando lambda:

```haskell
leGusta :: Libro -> Persona -> Bool
leGusta unLibro unaPersona = any (\unGusto -> unGusto unLibro) (gustos unaPersona)
```

La lambda está definida entre paréntesis. En este caso recibe un solo parámetro, pero podría recibir varios. La `->` indica dónde terminan los parámetros y empieza la función. Las expresiones lambda o funciones anónimas nos sirven para este tipo de casos específicos.

## Links Útiles

- [Solución del ejercicio de hoy](https://gist.github.com/julian-berbel/902aa2942c210c2dbeef3adcf9ec147b)
- [Guía rápida de Git](https://docs.google.com/document/d/147cqUY86wWVoJ86Ce0NoX1R78CwoCOGZtF7RugUvzFg/edit#heading=h.pfzudah6sze2)
- [Resolución de conflictos en Git y VSCode](https://www.youtube.com/watch?v=Z1PBoZoQ_pQ)
- [Video de la clase](https://drive.google.com/open?id=1rWu_COUxQ2puK1ReqZkclHZ8fWW3x-c6)
