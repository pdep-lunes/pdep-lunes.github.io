---
title: Sexta clase
date: '2020-05-11'
description: 'Sexta clase de PdeP'
tags: [funcional, currificacion, recursividad, fold]
---

## Tarea para la clase que viene

- Hacer los nuevos puntos del [Monopoly Recargado](https://docs.google.com/document/d/1--4XJTZqk49fEXxwGJjoQwoc_MfNAymheY-BJ2IRS40)
- Ver la [solución propuesta](https://github.com/pdep-lunes/monopoly) a la primera parte del tp y hacer consultas (hay un [video](https://www.youtube.com/watch?v=lXsX8wsR7AI) con el paso a paso).

---

## ¿Qué vimos hoy?

Empezamos repasando lambdas, conociendo el concepto de currificación y viendo cómo es que llegamos a poder escribir con parámetros implícitos debido a lo anterior. Seguimos viendo que es la recursividad, cuando la usamos, cuando repetimos lógica y cómo podemos usar fold para evitar esa repetición y ser más declarativos.

---

### Currificación y parámetros implícitos

```haskell
-- Sin currificar
sumaDe3 :: Int -> Int -> Int -> Int
sumaDe3 numero1 numero2 numero3 = numero1 + numero2 + numero3
```

¡Hay otra forma de escribir esto! Teniendo en cuenta que sumaDe3 es una función, ¡lo podemos realizar con una lambda!:

```haskell
sumaDe3' :: (Int -> Int -> Int -> Int)
sumaDe3' = (\numero1 numero2 numero3 -> numero1 + numero2 + numero3)
```

A diferencia de sumaDe3, se utiliza una lambda para realizar su definición. Por eso (de forma didáctica), su tipo es la función (Int -> Int -> Int -> Int).

Si realizamos esta consulta en consola:

```haskell
> sumaDe3 5
<function>
```

Esto ocurre porque, como ya vimos, podemos construir nuevas funciones aplicando parcialmente funciones ya definidas. Si vemos el tipo de `sumaDe3 5`:

```haskell
>:t sumaDe3 5
(sumaDe3 5) :: Int -> Int -> Int
```

Ahora, si vemos el tipo de `sumaDe3`, ¿Refleja bien lo que está ocurriendo?
Veamos si hacemos, utilizando lambdas, algo que refleje mejor esto:

```haskell
sumaDe3'' :: (Int -> (Int -> Int -> Int))
sumaDe3'' = (\numero1 -> (\numero2 numero3 -> numero1 + numero2 + numero3))
```

¡Por esto es que ocurre la aplicación parcial! Cuando llamamos a `sumaDe3'' 5`, nos va a devolver la segunda función lambda que creamos.

¡Pero sabemos que `sumaDe3 5 5` también nos devuelve una función!

Si queremos hacer una función que replique todos los casos, tendriamos que hacer algo asi:

```haskell
sumaDe3''' :: (Int -> (Int -> (Int -> Int)))
sumaDe3''' = (\numero1 -> (\numero2 -> (\numero3 -> numero1 + numero2 + numero3)))
```

¿Esto quiere decir que ahora todas las funciones las tenemos que hacer así? ¿Y tiparlas así? ¡No! A lo que llegamos, es que _Haskell hace esto sin que nos demos cuenta_: Lo que hace haskell es "partir" nuestra función en diferentes funciones de 1 parámetro, es decir, _currifica_ nuestras funciones.

Ahora, entendiendo esto, llegamos a por qué existe aplicación parcial: Si le pasamos un parámetro a `sumaDe3`, nos va a devolver la _siguiente_ función, que toma dos parámetros y nos devuelve un entero.

En Haskell, a veces, podemos dejar implícitos los parámetros que se pasan a las funciones. ¿Esto qué significa? Que no es necesario escribir a la izquierda del `=` que estamos recibiendo ese parámetro.
Veamos un ejemplo:

```haskell
siguiente numero = (+) 1 numero
-- es equivalente a
siguiente = (+) 1
```

Esto es porque al haber aplicado un `1` a la función `+`, nos va a devolver una función `Int -> Int`. Justamente, gracias a que todas las funciones en Haskell están currificadas!!

```haskell
(+)   :: Int -> Int -> Int
(+) 1 ::        Int -> Int
```

En este caso, `siguiente` estaría recibiendo implícitamente un `numero :: Int`.
Y lo que estamos haciendo es simplemente darle un nuevo nombre a esa función, porque es un valor.

Los parámetros implícitos también son útiles y frecuentemente vistos en los casos en los que componemos funciones.

Usando un ejemplo del dominio de Monopoly:

```haskell
aumentarDinero :: Dinero -> Jugador -> Jugador
cambiarTactica :: Tactica -> Jugador -> Jugador

pasarPorElBanco :: Jugador -> Jugador
                               --  (Jugador -> Jugador) . (Jugador -> Jugador)
pasarPorElBanco = cambiarTactica "Comprador Compulsivo" . aumentarDinero 40
```

En este caso `pasarPorElBanco` recibe implícitamente a un `jugador::Jugador`. Esto es porque a la derecha del igual tenemos una función `Jugador -> Jugador`, a la que le queremos poner un nombre, porque para nosotros esa función significa `pasarPorElBanco`.

---

### Recursividad

Probablemente ya hayan visto recursividad en materias como Algoritmos y Estrucutras de Datos, Matemática Discreta o hasta Análisis Matemático.

La lógica en este caso es la misma, estamos hablando de una función que se usa a si misma dentro de su definición. Consta principalmente de dos casos:

- Caso base, corta la recursividad.
- Caso recursivo, donde la función se llama a sí misma.

Ejemplos comunes de esto son la sucesión de fibonacci y el factorial:

```haskell
factorial :: Int -> Int
factorial 0 = 1                     -- caso base
factorial n = n * factorial (n - 1) -- caso recursivo

fibonacci :: Int -> Int
fibonacci 0 = 0                                     -- caso base
fibonacci 1 = 1                                     -- caso base
fibonacci n = fibonacci (n - 1) + fibonacci (n -2)  -- caso recursivo
```

Pero esto no se reduce solo a funciones matemáticas que rara vez usemos en nuestros programas, la recursividad también sirve para funciones más comunes y corrientes como `length` que nos permite saber el largo de una lista:

```haskell
length :: [a] -> Int
length []       = 0               -- caso base
length (_:cola) = 1 + length cola -- caso recursivo
```

Acá podemos hacer un parate y ver qué significa cada parte de la declaración de la función:

- Cuando decimos `length [ ] = ...` estamos diciendo que cuando la lista encaje con ese patrón (`[ ]` es el patrón de lista vacía) la función devuelve lo que está a la derecha.
- Cuando ponemos `length (_:cola) = ...` estamos diciendo que cuando la lista tenga cabeza y cola (el patrón es `(cabeza:cola)`) la función devuelve lo que está del lado derecho. Acá es importante ver como usamos la variable anónima (`_`) para decir que queremos que tenga cabeza pero que no nos importa que valor tiene la cabeza.

> Lo importante es que quede claro que lo mismo escrito del lado izquierdo del igual y del lado derecho no tienen el mismo significado, cuando vemos lo siguiente: `(cabeza:cola)` no podemos decir si eso corresponde al patrón de lista (cabeza:cola) o si corresponde a usar la función `:` con `cabeza` y `cola`. Lo mismo sucede con el patrón de lista vacía y la lista vacía (en ambos casos es `[ ]`, del lado izquierdo patrón y del lado derecho lista vacía). Por último, la variable anónima `_` no es un valor, solo la usamos como patrón.

Ahora, intentemos hacer la definición de `sum` de manera recursiva:

```haskell
sum :: Num a => [a] -> a
sum []            = 0
sum (cabeza:cola) = cabeza + sum cola
```

Si comparamos con la definición anterior de `length`, vemos que hay una repetición de lógica:

- En ambas definiciones esperamos que cuando la lista esté vacía la función retorne 0.
- Luego, en ambas definiciones realizamos una operación que involucra el primer elemento de la lista, una función `f` y una llamada recursiva de la función que estamos definiendo con la cola de la lista como parámetro.

```haskell
any :: (a -> Bool) -> [a] -> Bool
any _ []             = False
any predicado (x:xs) = predicado x || any predicado xs

all :: (a -> Bool) -> [a] -> Bool
all _ []             = True
all predicado (x:xs) = predicado x && all predicado xs
```

Para solucionar este problema de repetición de lógica, surgen las funciones de la familia `fold`

Empezamos por `foldl`:

```haskell
--    :: funcion -> neutro/semilla -> lista -> a
foldl :: (a -> b -> a) -> a -> [b] -> a

-- caso base, si la lista está vacía, retorno la semilla
foldl _ semilla []     =  semilla

-- caso recursivo, si la lista no esta vacia, ejecuto la funcion con la semilla y la cabeza, y hago una llamada recursiva con eso y la cola de la lista
foldl funcion semilla (cabeza:cola) = foldl funcion (funcion semilla cabeza) cola

-- básicamnente foldl recibe:
-- * una función
-- * una semilla o valor para el caso base
-- * una lista
-- devuelve el valor para el caso base si la lista es vacia
-- y vuelve a usar foldl usando el resultado de aplicar la funcion a la semilla y la cabeza como nueva semilla
-- y la cola de la lista como nueva lista (para este nuevo uso de foldl)
```

Ahora, las funciones de `sum` y `length` las podemos realizar sin repetir lógica:

```haskell
sum lista = foldl (+) 0 lista

sumarUno valorAnterior _ = 1 + valorAnterior
length lista = foldl sumarUno 0 lista
```

También, existe la función `foldr` que tiene la misma funcionalidad que `foldl` _pero_ aplica la función recursiva cambiando la posición de los parametros de la función que le pasamos por parametro y de otra forma:

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ semilla [] = semilla
foldr funcion semilla (cabeza:cola) =  funcion cabeza (foldr funcion semilla cola)

-- básicamnente foldr recibe:
-- * una función (con los parámetros al revés que la defoldl)
-- * una semilla o valor para el caso base
-- * una lista
-- devuelve el valor para el caso base si la lista es vacia
-- y evalua la funcion con la cabeza de la lista y el resultado de foldear la cola
```

¿Y qué pasa en los casos donde no puedo incluir una semilla? (Por ejemplo, averiguar el máximo número de una lista de números). Para esto, tenemos las funciones `foldl1` y `foldr1` que toman como semilla o valor base el primer elemento de la lista:

```haskell
foldl1 :: (a -> a -> a) -> [a] -> a
foldl1 funcion (x:xs) = foldl funcion x xs

foldr1 :: (a -> a -> a) -> [a] -> a
foldr1 funcion (x:xs) = foldr funcion x xs
```

La idea ahora **no** es que dejen de usar `sum`, `length`, `any` y `all` para hacer todo eso con foldl, justamente porque esos "problemas" ya están resueltos. Lo importante es que lo tengamos en cuenta para cuando necesitemos "plegar" una lista usando alguna función o cuando tengamos el instinto de hacer algo recursivo cuando quizás podría quedar más declarativo con `fold`.

---

## Links Útiles

<!-- - [Video de la clase](...)
-  -->

- [Video de la clase](https://drive.google.com/open?id=1mbSZHPZphl0T0jfB6hU21YjhySdoyx3p)
- Leer el documento sobre las funciones de la familia fold que está [acá](https://docs.google.com/document/d/1jSrU7lVMan4nbHBETGqvO5VpqJI0KXVWtH7fqnVASPU/)
