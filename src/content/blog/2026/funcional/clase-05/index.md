---
title: Lambdas, Currificación, Recursividad y Fold
date: "2026-05-11"
description: "Funciones anónimas, currificación, recursividad y fold en Haskell"
tags: [funcional, práctica, fold, recursividad, currificación, lambda]
---

## Tarea para la clase que viene:

- Terminar la [Entrega 1](https://docs.google.com/document/d/1yYb_lHIGgk-anCsJCIsM2rpXjxXp8t8pczgkO1AavGU/edit?tab=t.0) del TP grupal de Funcional. La corrección será presencial en el horario de clase, nos vamos a estar juntando por grupos y viendo lo que hicieron mientras hacemos algunas preguntas.

## Expresiones lambda

Ya vimos varios ejemplos de uso de funciones de orden superior.

El más común y que ya mostramos varias veces desde la primera clase es el de obtener el doble de cada número de una lista de enteros.

Para esto fuimos usando distintas formas de funciones… El primero fue poniendo un nombre a la operación de duplicar cuando hicimos la función “doble”

```haskell
doble :: (Num a) => a -> a
doble x = 2 * x

dobles :: (Num a) => [a] -> [a]
dobles numeros = map doble numeros
```

Más adelante vimos el concepto de aplicación parcial, que nos permitió escribir la función de una forma más compacta y sin tener que darle un nombre.

```haskell
dobles' :: (Num a) => [a] -> [a]
dobles' numeros = map (* 2) numeros
```

Ahora vamos a ver otra forma de crear funciones sin necesidad de darles un nombre. Esto se hace con las expresiones lambda, que son funciones anónimas. Y se escriben con la sintaxis: `\parametro -> cuerpo`

```haskell
dobles'' :: (Num a) => [a] -> [a]
dobles'' numeros = map (\x -> 2 * x) numeros
```

Las tres funciones dobles, dobles' y dobles'' hacen exactamente lo mismo, y todas son correctas. Cuando usar cada una depende del contexto.

No vamos a querer usar siempre funciones lambda, pero son muy útiles para casos donde no necesitamos reutilizar la función y además no tenemos un nombre claro para la misma.

Lo mismo puede pasar cuando la aplicación parcial no es tan clara y no tenemos alternativas como por ejemplo la resta (aunque sí tenemos subtract)

```haskell
anteriores :: (Num a) => [a] -> [a]
anteriores numeros = map (\x -> x - 1) numeros
```

Puede llegar a ser más claro que escribir `map (subtract 1) numeros`

También pueden ser útiles para casos donde la función que queremos pasar a una función de orden superior es más compleja y recibe más de un parámetro. Esto se puede ver por ejemplo cuando usamos [`zipWith`](https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Prelude.html#v:zipWith), que recibe una función de dos parámetros y la aplica a cada par de elementos de dos listas.

```haskell
-- zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
preciosFinales :: [Float] -> [Float] -> [Float]
preciosFinales precios descuentos =
  zipWith (\precio descuento -> precio * (1 - descuento)) precios descuentos
```

En este caso acabamos de usar una función lambda que recibe más de un parámetro, y eso es totalmente válido. En ese caso la sintaxis es `\param1 param2 -> cuerpo`, y el cuerpo puede usar ambos parámetros.

Como dijimos antes, esta es una nueva forma de definir funciones y podríamos haberla usado para definir todas las funciones que venimos usando, por ejemplo:

```haskell
doble' :: (Num a) => a -> a
doble' = \x -> 2 * x

sumar :: (Num a) => a -> a -> a
sumar = \x y -> x + y
```

Además de llamarlas funciones lambdas se las suele llamar funciones anónimas, porque no les estamos dando un nombre.

## Currificación

Pensando en cómo funciona la aplicación parcial, la función sumar se puede escribir también como:

```haskell
sumar' :: (Num a) => a -> (a -> a)
sumar' = \x -> \y -> x + y
```

Aunque pueda parecer raro, sumar y sumar' son exactamente la misma función. Para poder entender la magia de esto vamos a pensar en cómo usamos las funciones en otros lenguajes como C o Javascript por ejemplo.

Si tratamos de definir la función multiplicar en Haskell de una forma más parecida a como hacemos en otros lenguajes, podríamos escribir algo como esto:

```haskell
multiplicar :: (Num a) => (a, a) -> a
multiplicar (x, y) = x * y

-- Y la usaríamos así:
resultado :: Int
resultado = multiplicar (3, 4)
```

¿Pero qué es `(3, 4)` en Haskell? Es un par de números, una tupla.

¿Y por qué funciona? Bueno, porque justamente dijimos que multiplicar recibe una tupla. Ahora qué pasaría si hiciéramos esto?

```haskell
resultado = multiplicar 3 4
resultado = (multiplicar 3) 4
```

Explotaría por un error de tipo, porque, como dijimos, multiplicar no recibe dos números, sino una tupla y en este caso le estaría pasando primero un 3 y luego un 4, y eso no matchea con el tipo que definimos para multiplicar.

Hacerlo con una tupla nos obliga a pasar todos los parámetros de una vez y con eso perdemos la posibilidad de usar la aplicación parcial pasando solo la `x`. En cambio, si definimos multiplicar con una función de dos parámetros podríamos ir pasando los parámetros de a uno.

Un ejemplo de esto en javascript sería algo así:

```javascript
// Sin currificar
function multiplicar(x, y) {
  return x * y;
}
// Currificada
function multiplicar(x) {
  return function (y) {
    return x * y;
  };
}
```

Y de esta forma podríamos hacer cosas como:

```javascript
const doble = multiplicar(2);
const resultado = doble(3); // resultado sería 6
```

Pero esto ahora nos obligaría a siempre pasarlos de a uno, y no podríamos hacer `multiplicar(3, 4)` directamente. En ese caso deberíamos hacer `multiplicar(3)(4)` para obtener el mismo resultado.

Esta magia que hace haskell para que ambas formas de definir la función sean equivalentes se llama currificación, y es un concepto tan fuerte que lleva el apellido de la persona que lo inventó, [Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry).

[Currificación](https://wiki.uqbar.org/wiki/articles/currificacion.html) es el proceso de transformar una función que recibe N parámetros en una función que recibe un parámetro y devuelve una nueva función que recibe N-1 parámetros, y así sucesivamente hasta llegar a una función que recibe un solo parámetro.

Es por esto que decimos que todas las funciones en Haskell reciben un solo parámetro, aunque a veces parezca que reciben más. En realidad, lo que pasa es que cuando escribimos una función con varios parámetros, Haskell la currifica automáticamente.

Y acá viene algo un poco loco... Si todas las funciones reciben un solo parámetro y dijimos que la composición de funciones servía para componer funciones de un solo parámetro, entonces... ¿podemos componer cualquier función en Haskell? La respuesta es sí. Hacerlo suele ser un poco rebuscado pero siempre que los tipos matcheen entonces será posible. Podemos ver este ejemplo donde usamos composición con `min :: (Ord a) => a -> a -> a` que es una función de dos parámetros, pero como es currificada entonces podemos usarla con composición.

```haskell
dobleConTecho :: Num a => a -> a -> a
dobleConTecho numero techo = min (2 * numero) techo

dobleConTecho' :: (Num a) => a -> a -> a
dobleConTecho' numero techo = (min . (* 2)) numero techo

dobleConTecho'' :: (Num a) => a -> a -> a
dobleConTecho'' = min . (* 2) -- usando point free

-- El tipo de las dos funciones que componemos es el siguiente:
min :: (Ord a) => a -> a -> a -- este es el tipo original
min :: Int -> Int -> Int      -- así queda pensado con Ints
min :: Int -> (Int -> Int)    -- pero lo puedo pensar así porque es currificada
(* 2) :: Int -> Int -- viene del tipo de (*) pero parcialmente aplicada a 2

-- El tipo de la composición era:
(.) :: (b -> c) -> (a -> b) -> (a -> c)

-- Y entonces en este caso tenemos que:
min = (b -> c) -- porque es el primer parámetro de la composición
(* 2) = (a -> b) -- porque es el segundo parámetro de la composición

-- Por lo tanto:
-- b = Int
-- c = (Int -> Int)

-- a = Int
-- b = Int

-- Por último, el tipo del resultado de la composición es:
-- (a -> c) = Int -> (Int -> Int)

-- Es una función que recibe un entero, al cual va a multiplicar por 2, ese valor duplicado va a pasar a ser el primer parámetro de min, y el segundo parámetro de min va a ser el techo que le pasamos a la función al final.
```

## Recursividad

Ahora vamos a ver un concepto que ya deben haber visto en otras materias como Algoritmos o Matemática Discreta (Lógica y Estructuras Discretas).

En Discreta seguramente vieron el concepto de inducción que está muy relacionado con la recursividad. De hecho, la recursividad es una forma de definir funciones o estructuras de datos de forma inductiva.

En Algoritmos seguramente vieron la diferencia entre definir un algoritmo de forma iterativa o de forma recursiva. En Haskell, la recursividad es la forma natural de definir este tipo de funciones, ya que no tenemos estructuras de control como `for` o `while`.

En C podríamos definir la función factorial de forma iterativa o recursiva así:

```c
// Iterativa
int factorialIterativo(int n) {
  int resultado = 1;
  for (int i = 1; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

// Recursiva
int factorialRecursivo(int n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorialRecursivo(n - 1);
  }
}
```

En Haskell la única forma de definir el factorial es de forma recursiva, y se vería así:

```haskell
-- Con pattern matching
factorial :: Int -> Int
factorial 0 = 1 -- Caso base
factorial n = n * factorial (n - 1) -- Caso recursivo

-- Con guardas
factorial' :: Int -> Int
factorial' n
  | n == 0 = 1 -- Caso base
  | otherwise = n * factorial' (n - 1) -- Caso recursivo
```

Volviendo a lo que vieron sobre recursividad recordamos que tiene dos partes: el caso base y el caso recursivo. El caso base es el que detiene la recursión, y el caso recursivo es el que hace la llamada a la función con un argumento diferente.

En el ejemplo del factorial, el caso base es cuando `n` es igual a 0, y el caso recursivo es cuando `n` es mayor a 0 y hace la llamada a `factorial (n - 1)`.

Ahora vamos a ver otro ejemplo de recursividad, esta vez con una función que nos diga el número N de la serie de Fibonacci.

La serie de Fibonacci es una sucesión de números donde cada número es la suma de los dos anteriores, y comienza con 0 y 1. Es decir, la serie de Fibonacci es: 0, 1, 1, 2, 3, 5, 8, 13, ...

Podemos definir la función de Fibonacci de forma recursiva así:

```haskell
fibonacci :: Int -> Int
fibonacci 0 = 0 -- Caso base
fibonacci 1 = 1 -- Caso base
fibonacci n = fibonacci (n - 1) + fibonacci (n - 2) -- Caso recursivo
```

Como dijimos antes la recursividad es una forma que tenemos en Haskell de reemplazar las estructuras de control iterativas (y con estado) que tenemos en otros lenguajes.

Veamos algunos ejemplos con listas, haciendo primero un repaso por los patrones que podemos usar.

```haskell
-- Lista vacía y variable anónima
null' :: [a] -> Bool
null' [] = True
null' _  = False

-- Lista vacía y cabeza : cola con cola como variable anónima
head' :: [a] -> a
head' []         = undefined
head' (cabeza:_) = cabeza

-- Lista vacía y cabeza : cola con cabeza como variable anónima
tail' :: [a] -> [a]
tail' []       = undefined
tail' (_:cola) = cola
```

En los ejemplos de arriba aparecen los dos patrones principales que usamos para matchear listas: `[]` y `x:xs`. El patrón de lista vacía `[]` y el patrón de cabeza : cola `x:xs` donde `x` es la cabeza y `xs` es la cola. Además, vimos que podemos usar variables anónimas para ignorar partes de la lista que no nos interesan.

Ahora vamos a redefinir algunas funciones que ya conocemos y usamos con listas, pero esta vez usando recursividad.

```haskell
sum :: Num a => [a] -> a
sum []     = 0
sum (x:xs) = x + sum xs
-- sum (x:xs) = (+) x (sum xs)

all :: (a -> Bool) -> [a] -> Bool
all _ []     = True
all f (x:xs) = f x && all f xs
-- all f (x:xs) = (&&) (f x) (all f xs)

any :: (a -> Bool) -> [a] -> Bool
any _ []     = False
any f (x:xs) = f x || any f xs
-- any f (x:xs) = (||) (f x) (any f xs)

elem :: Eq a => a -> [a] -> Bool
elem _ []     = False
elem e (x:xs) = e == x || elem e xs
-- elem e (x:xs) = (||) (e == x) (elem e xs)

map :: (a -> b) -> [a] -> [b]
map _ []     = []
map f (x:xs) = f x : map f xs
-- map f (x:xs) = (:) (f x) (map f xs)
```

### Fold

Viendo las definiciones anteriores, podemos notar que todas siguen el mismo patrón: el caso base es cuando la lista es vacía, y el caso recursivo es cuando la lista tiene al menos un elemento, donde hacemos algo con la cabeza y luego hacemos la llamada recursiva con la cola.

Si ponemos todas las funciones anteriores juntas, podemos notar que todas siguen el mismo patrón:

```haskell
-- Miremos qué tienen en común estas funciones:
sum'   (x:xs) = (+)  x     (sum' xs)
all' p (x:xs) = (&&) (p x) (all' p xs)
any' p (x:xs) = (||) (p x) (any' p xs)
map' f (x:xs) = (:)  (f x) (map' f xs)

-- Todas tienen la forma:
funcion (x:xs) = COMBINAR (hacer_algo_con x) (funcion xs)
--                 ↑              ↑                ↑
--             operación      elemento        recursión

-- Y todas tienen un caso base que devuelve un valor fijo:
sum'   [] = 0
all' _ [] = True
any' _ [] = False
map' _ [] = []
```

Acá podemos ver entonces que se repite cierta lógica y como eso no nos gusta vamos a abstraer esa lógica común en una nueva función.

Ya hicimos un primer paso importante que fue identificar qué se repite y qué cambia. Lo que se repite lo vamos a poner en la nueva función, y lo que cambia lo vamos a pasar como parámetro.

La nueva función entonces debería recibir:

- La operación que combina un elemento con el resultado de la recursión
- El valor del caso base (la semilla)
- La estructura sobre la que queremos aplicar la función (en este caso una lista)

Entonces la función quedaría así:

```haskell
funcion :: (a -> b -> b) -> b -> [a] -> b
funcion _ semilla [] = semilla
funcion combinar semilla (x:xs) = combinar x (funcion combinar semilla xs)

-- Y de esta forma podemos redefinir las funciones anteriores usando esta nueva función:
sum'' lista = funcion (+) 0 lista

all'' p lista = funcion (\x acc -> p x && acc) True lista

any'' p lista = funcion (\x acc -> p x || acc) False lista

elem'' e lista = funcion (\x acc -> e == x || acc) False lista
```

Algo que podemos notar es que esta nueva función que definimos usa dos variables de tipo genérico `a` y `b`, y recibe una función que combina un elemento de tipo `a` con un acumulador de tipo `b` para devolver un nuevo acumulador de tipo `b`. Además, recibe una semilla de tipo `b` que es el valor inicial del acumulador, y una lista de elementos de tipo `a` sobre la cual se va a aplicar la función.

En el caso del `sum''` tanto `a` como `b` son números pero en el resto de las funciones `a` es el tipo de los elementos de la lista y `b` es un booleano.

Otro ejemplo donde `a` y `b` son diferentes es en la función `map''` que vamos a definir ahora:

```haskell
map'' transformacion lista = funcion (\x acc -> transformacion x : acc) [] lista
```

Viendo la función lambda que le pasamos a `funcion` podemos notar que los parámetros `x` y `acc` son de tipos diferentes donde `x` es de tipo `a` y `acc` es de tipo `[b]`, entonces en este caso `b` es el tipo de los elementos de la lista resultante.

Entonces, esta nueva función que definimos es una función de orden superior que nos permite abstraer el patrón de recursión que se repite en varias funciones que operan sobre listas. Esta función se llama `foldr` y ya existe en Haskell.

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ semilla []     = semilla
foldr combinar semilla (x:xs) = combinar x (foldr combinar semilla xs)
```

Hasta ahora venimos viendos todos casos de fold donde tenemos una semilla para el caso base, pero nos podemos encontrar con casos donde esto no es así. Para estos casos lo más común es tomar el primer elemento de la lista como semilla, y luego aplicar la función a ese elemento y al resultado de la recursión sobre el resto de la lista. Esta variante de fold se llama `foldr1` y se define así:

```haskell
foldr1 :: (a -> a -> a) -> [a] -> a
foldr1 _ []     = error "foldr1: lista vacía" -- en este caso explota
foldr1 _ [x]    = x
foldr1 combinar (x:xs) = combinar x (foldr1 combinar xs)

-- Y lo podemos usar para definir maximum o minimum, que son funciones que no tienen un caso base fijo, sino que dependen de los elementos de la lista:
maximum' :: Ord a => [a] -> a
maximum' lista = foldr1 max lista

minimum' :: Ord a => [a] -> a
minimum' lista = foldr1 min lista
```

Otra variante de fold es `foldl` que hace la recursión asociando a la izquierda en lugar de a la derecha. La definición de `foldl` es la siguiente:

```haskell
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ semilla []     = semilla
foldl combinar semilla (x:xs) = foldl combinar (combinar semilla x) xs
```

Ahora, ¿por qué tenemos estas dos variantes de fold? ¿Cuál es la diferencia entre `foldr` y `foldl`?

La diferencia principal entre `foldr` y `foldl` es el orden en el que se aplican las combinaciones. `foldr` combina los elementos de la lista de derecha a izquierda, mientras que `foldl` combina los elementos de izquierda a derecha. Algo importante a notar es que lo que cambia es la manera en la que se asocian las operaciones y no el orden de los elementos.

En los casos donde la operación es asociativa y conmutativa, como la suma o la multiplicación, no importa el orden en el que se apliquen las combinaciones, entonces `foldr` y `foldl` darán el mismo resultado. Sin embargo, en casos donde la operación no es asociativa o conmutativa, como la resta o la división, el orden sí importa y `foldr` y `foldl` pueden dar resultados diferentes.

Vemos un ejemplo:

```haskell
foldr (-) 0 [1, 2, 3] -- Resultado: 1 - (2 - (3 - 0)) = 2
foldl (-) 0 [1, 2, 3] -- Resultado: ((0 - 1) - 2) - 3 = -6
```

Si desarrollamos el paso a paso vemos que:

```haskell
foldr (-) 0 [1, 2, 3]
= 1 - (foldr (-) 0 [2, 3])
= 1 - (2 - (foldr (-) 0 [3]))
= 1 - (2 - (3 - (foldr (-) 0 [])))
= 1 - (2 - (3 - 0)) -- acá vemos claramente como asocia a la derecha
= 1 - (2 - 3)
= 1 - (-1)
= 2

foldl (-) 0 [1, 2, 3]
= foldl (-) (0 - 1) [2, 3]
= foldl (-) ((0 - 1) - 2) [3]
= foldl (-) (((0 - 1) - 2) - 3) []
= (((0 - 1) - 2) - 3) -- acá vemos claramente como asocia a la izquierda
= ((-1 - 2) - 3)
= (-3 - 3)
= -6
```

### Bonus track

Redefiniendo funciones usando `foldr` y composición de funciones. En los ejemplos anteriores usamos lambdas para definir las funciones que le pasamos a `foldr` pero durante la clase fuimos un pasito más adelante y vimos directamente que podíamos usar composición de funciones de la misma forma que lo hicimos cuando hablamos de currificación.

```haskell
all''' :: (a -> Bool) -> [a] -> Bool
all''' predicado lista = foldr' ((&&) . predicado) True lista

any''' :: (a -> Bool) -> [a] -> Bool
any''' predicado lista = foldr' ((||) . predicado) False lista

elem''' :: Eq a => a -> [a] -> Bool
elem''' elemento lista = foldr' ((||) . (== elemento)) False lista

map''' :: (a -> b) -> [a] -> [b]
map''' transformacion lista = foldr' ((:) . transformacion) [] lista
```

## Links Útiles

- [Expresiones Lambda](http://wiki.uqbar.org/wiki/articles/expresiones-lambda.html)
- [Currificación](http://wiki.uqbar.org/wiki/articles/currificacion.html)
- [Recursividad en haskell](http://wiki.uqbar.org/wiki/articles/recursividad-en-haskell.html)
- [La familia fold](https://docs.google.com/document/d/1jSrU7lVMan4nbHBETGqvO5VpqJI0KXVWtH7fqnVASPU/edit?usp=sharing)
- Formas interactivas de ver fold y demás temas de hoy: https://stevekrouse.com/hs.js/ y https://pbv.github.io/haskelite/site/index.html
