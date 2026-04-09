---
title: Quinta clase
date: "2021-05-03"
description: "Quinta clase de PdeP"
tags: [funcional, git, currificación, expresiones lambda, recursividad, fold]
---

## Tarea para la clase que viene:
* [TP Monopoly](https://docs.google.com/document/d/1WkyTU1tnUhtFIrxVt1BMgKBNEdghpTtANPsNvmdltG4/edit?usp=sharing)
* Terminar la primera entrega del [TP integrador](https://docs.google.com/document/d/1WRU-T71IJ4aGgUrwiw_OqBPXDT9V9v-uwuBLGX7inzU/edit?usp=sharing)


## ¿Qué vimos hoy? 

### Expresiones lambda

Comenzamos viendo una nueva manera de crear funciones, ¡las **expresiones lambda**! 🎉

Si por ejemplo queremos obtener los dobles de una lista de números, hasta ahora podíamos hacerlo de esta manera...

```haskell
dobles :: Num a => [a] -> [a]
dobles numeros = map doble numeros

dobles :: Num a => a -> a
doble numero = numero * 2
```

… o de esta…

```haskell
dobles :: Num a => [a] -> [a]
dobles numeros = map (*2) numeros
```

Con expresiones lambda podríamos hacer lo siguiente:

```haskell
dobles :: Num a => [a] -> [a]
dobles numeros = map (\numero -> numero * 2) numeros
```

¿Esto significa que a partir de ahora todas nuestras funciones las vamos a definir utilizando expresiones lambda? ¡No! ✋ Solo estamos viendo una nueva herramienta dentro del amplio espectro del paradigma funcional. De hecho, también se conoce a estas funciones como funciones anónimas 👤, ya que, si bien podemos darles un nombre, solemos utilizarlas para casos muy específicos donde no nos interesa darle demasiada entidad a esa lógica. 

![meme_son_la_misma_imagen](https://raw.githubusercontent.com/pdep-lunes/bitacora/master/content/assets/theyre_the_same_picture.png 'Meme the office haskell')


### Currificación y parámetros implícitos

```haskell
-- Sin currificar
sumaDe3 :: Int -> Int -> Int -> Int
sumaDe3 numero1 numero2 numero3 = numero1 + numero2 + numero3
```

¡Hay otra forma de escribir esto! 😮 Teniendo en cuenta que `sumaDe3` es una función, ¡lo podemos realizar con una lambda!:

```haskell
sumaDe3' :: (Int -> Int -> Int -> Int)
sumaDe3' = (\numero1 numero2 numero3 -> numero1 + numero2 + numero3)
```

A diferencia de `sumaDe3`, se utiliza una lambda para realizar su definición. Por eso (de forma didáctica), su tipo es la función `(Int -> Int -> Int -> Int)`.

Si realizamos esta consulta en consola:

```
> sumaDe3 5
<function>
```

Esto ocurre porque, como ya vimos, podemos crear funciones si llamamos, utilizando aplicación parcial, a otras funciones. Si vemos el tipo de `sumaDe3 5`:


```
>:t sumaDe3 5
(sumaDe3 5) :: Int -> Int -> Int
```

Ahora, si vemos el tipo de `sumaDe3`, ¿refleja bien lo que está ocurriendo?
Veamos si hacemos, utilizando lambdas, algo que refleje mejor esto:


```haskell
sumaDe3'' :: (Int -> (Int -> Int -> Int))
sumaDe3'' = (\numero1 -> (\numero2 numero3 -> numero1 + numero2 + numero3))
```
¡Gracias a esto podemos aplicar parcialmente nuestras funciones! Cuando llamamos a `sumaDe3'' 5`, nos va a devolver la segunda función lambda que creamos.

¡Pero sabemos que `sumaDe3 5 5` también nos devuelve una función! 

Si queremos hacer una función que replique todos los casos, tendríamos que hacer algo así:

```haskell
sumaDe3''' :: (Int -> (Int -> (Int -> Int)))
sumaDe3''' = (\numero1 -> (\numero2 -> (\numero3 -> numero1 + numero2 + numero3)))
```

¿Esto quiere decir que ahora todas las funciones las tenemos que hacer así? ¿Y tiparlas así? 😨 De nuevo: **¡no!** A lo que llegamos, es que _Haskell hace esto sin que nos demos cuenta_: lo que hace haskell es "partir" nuestra función en diferentes funciones de 1 parámetro, es decir, _currifica_ nuestras funciones.

Ahora, entendiendo esto, llegamos a por qué existe aplicación parcial: si le pasamos un parámetro a `sumaDe3`, nos va a devolver la _siguiente_ función, que toma dos parámetros y nos devuelve un entero.

En Haskell, a veces, podemos dejar implícitos los parámetros que se pasan a las funciones. ¿Esto qué significa? 🤔 Que no es necesario escribir a la izquierda del `=` que estamos recibiendo ese parámetro.
Veamos un ejemplo:

```haskell
siguiente :: Int -> Int
siguiente numero = (+) 1 numero
-- es equivalente a
siguiente = (+) 1
```

Esto es porque al haber aplicado un `1` a la función `+`, nos va a devolver una función `Int -> Int`. Justamente, ¡¡gracias a que todas las funciones en Haskell están currificadas!! 🙌

```haskell
(+)    :: Int -> Int -> Int
(+) 1 ::          Int -> Int
```

En este caso, `siguiente` estaría "recibiendo implícitamente" un `numero :: Int`.
Y lo que estamos haciendo es simplemente darle un nuevo nombre a esa función, porque es un valor.

Los parámetros implícitos también son útiles y frecuentemente vistos en los casos en los que componemos funciones.

Volviendo al _TP "Hora de lectura"_, teníamos esta función:

```haskell
nombreDeLaBiblioteca :: Biblioteca -> String
nombreDeLaBiblioteca unaBiblioteca = sinVocales . concatenatoriaDeTitulos $ unaBiblioteca
```

Ahora que sabemos que podemos dejar implícitos nuestros parámetros, podríamos reescribirla de esta manera:

```haskell
nombreDeLaBiblioteca :: Biblioteca -> String
nombreDeLaBiblioteca = sinVocales . concatenatoriaDeTitulos
```


En este caso `nombreDeLaBiblioteca` recibe implícitamente a un `biblioteca :: Biblioteca`. Esto es porque a la derecha del igual tenemos una función `Biblioteca -> Biblioteca`, a la que le queremos poner un nombre, porque para nosotros esa función significa `nombreDeLaBiblioteca`.

Esto no significa que de aquí en adelante sea importante dejar implícitos nuestros parámetros. Podemos hacerlo o no y nuestras funciones resolverán exactamente los mismos problemas de la misma forma ya que la lógica no cambia. 

### Recursividad

- Caso base: corta la recursividad.
- Caso recursivo: donde la función se llama a sí misma.

Ejemplos comunes de esto son la sucesión de fibonacci 🐌  y el factorial ❗:

```haskell
factorial :: Int -> Int
factorial 0 = 1                            -- caso base
factorial n = n * factorial (n - 1) -- caso recursivo

fibonacci :: Int -> Int
fibonacci 0 = 0                                                     -- caso base
fibonacci 1 = 1                                                     -- caso base
fibonacci n = fibonacci (n - 1) + fibonacci (n - 2)  -- caso recursivo
```

Pero esto no se reduce solo a funciones matemáticas que rara vez usemos en nuestros programas, la recursividad también sirve para funciones más comunes corrientes como `length` que nos permite saber el largo de una lista:

```haskell
length :: [a] -> Int
length []        = 0                   -- caso base
length (_:xs) = 1 + length xs -- caso recursivo
```

Acá podemos aprovechar y ver qué significa cada parte de la declaración de la función.
Cuando decimos `length [ ] = ...` estamos diciendo que cuando la lista encaje con ese patrón (`[ ]` es el patrón de lista vacía) la función devuelve lo que está a la derecha.
Cuando ponemos `length (_:xs) = ...` estamos diciendo que cuando la lista tenga cabeza y cola (el patrón es `(cabeza:cola)`) la función devuelve lo que está del lado derecho. Acá es importante ver como usamos la variable anónima (`_`) para decir que queremos que tenga cabeza pero que no nos importa que valor tiene la cabeza.
Lo importante es que quede claro que lo mismo escrito del lado izquierdo del igual y del lado derecho no tienen el mismo significado, cuando vemos lo siguiente: `(x:xs)` no podemos decir si eso corresponde al patrón de lista (cabeza:cola) o si corresponde a usar la función `:` con `x` y `xs`. Lo mismo sucede con el patrón de lista vacía y la lista vacía (en ambos casos es `[ ]`, del lado izquierdo patrón y del lado derecho lista vacía).

Ahora, intentemos hacer la definición de `sum` de manera recursiva:

```haskell
sum :: Num a => [a] -> a
sum [ ] = 0
sum (x:xs) = x + sum xs
```

Si comparamos con la definición anterior de `length`, vemos que hay una repetición de lógica:


- En ambas definiciones esperamos que, cuando la lista esté vacía, retornemos 0.
- Luego, en ambas definiciones realizamos una operación que involucra el primer elemento de la lista, una función `f` y una llamada recursiva de la función que estamos definiendo con la cola de la lista como parámetro.

```haskell
any :: (a -> Bool) -> [a] -> Bool
any _ []             = False
any predicado (x:xs) = predicado x || any predicado xs

all :: (a -> Bool) -> [a] -> Bool
all _ []             = True
all predicado (x:xs) = predicado x || all predicado xs
```

### Fold

Para solucionar este problema de repetición de lógica, surge `fold`:

```haskell
foldl :: (a -> b -> a) -> a -> [b] -> a

-- caso base, si la lista está vacía, retorno la semilla
foldl _ semilla []     =  semilla

-- caso recursivo, si la lista no esta vacia, ejecuto la funcion con la semilla y la cabeza, y hago una llamada recursiva con eso y la cola de la lista
foldl función semilla (x:xs) =  foldl funcion (funcion semilla x) xs 
```


Ahora, las funciones de `sum` y `length` las podemos realizar sin repetir lógica:

```haskell
sum lista = foldl (+) 0 lista

sumarUno valorAnterior _ = 1 + valorAnterior
length lista = foldl sumarUno 0 lista
```


También, existe la función `foldr` que tiene la misma funcionalidad que `foldl` _pero_ aplica la función recursiva cambiando la posición de los parámetros de la función que le pasamos por parámetro:

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ semilla [] = semilla
foldr funcion semilla (x:xs) =  funcion x (foldr funcion semilla xs)
```

¿Y qué pasa en los casos donde no puedo incluir una semilla? (Por ejemplo, averiguar el máximo número de una lista de números). Para esto, tenemos las funciones `foldl1` y `foldr1`:

```haskell
foldl1 :: (a -> a -> a) -> [a] -> a
foldl1 funcion (x:xs) = foldl funcion x xs

foldr1 :: (a -> a -> a) -> [a] -> a
foldr1 funcion (x:xs) = foldr funcion x xs
```

## Links Útiles

- [Video de la clase](https://drive.google.com/file/d/1q53Ce_1YwcDnerffkJO8_KAraGc2iJGp/view?usp=sharing)
- [Código de la clase](https://github.com/pdep-lunes/pdep-clases/blob/main/2021/funcional/clase-5.hs)
- [Guía rápida de Git](https://docs.google.com/document/d/147cqUY86wWVoJ86Ce0NoX1R78CwoCOGZtF7RugUvzFg/edit#heading=h.pfzudah6sze2)
- [Resolución de conflictos en Git y VSCode](https://www.youtube.com/watch?v=Z1PBoZoQ_pQ)

