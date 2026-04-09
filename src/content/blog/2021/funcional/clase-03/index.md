---
title: Tercera clase
date: "2021-04-19"
description: "Tercera clase de PdeP"
tags: [funcional, aplicacion-parcial, orden-superior, pattern-matching, tuplas, listas]
---

## Tarea para la clase que viene:
* Lecciones 5 y 6 de [Mumuki](https://mumuki.io/pdep-utn/chapters/435-programacion-funcional)
* Resolver hasta el punto del **nombreDeLaBiblioteca** (incluído) del [TP "Hora de lectura"](https://docs.google.com/document/d/11uYGXvG-TnNhveawDjKD1iSWKW9Qy8PVqlvtHhV58F8/edit)

## ¿Qué vimos hoy? 

Comenzamos a resolver el [TP "Hora de lectura"](https://docs.google.com/document/d/11uYGXvG-TnNhveawDjKD1iSWKW9Qy8PVqlvtHhV58F8/edit) y para eso vimos estos nuevos temas:

- Aplicación parcial: aplicar a una función con menos argumentos de los "normales", para obtener otra que reciba los faltantes. Por ejemplo: 

```haskell
> max 6 9
9
-- max está aplicada totalmente (tiene los dos parámetros) y devuelve 9.

> max 6 
<function>
-- en esta ocasión max está aplicada parcialmente (le falta un parámetro) y devuelve una función.
```

- Tuplas: conjunto de elementos de diferentes tipos cuya longitud es fija. Por ejemplo:

```haskell
("Pepita", 38176598)
-- una dupla (tupla de dos elementos) con un string y un número.

("hola", 1, 'e')
-- una terna (tupla de 3 elementos) compuesta de elementos de diferentes tipos.
```

- Listas: conjunto de elementos de un mismo tipo. Por ejemplo:

```haskell
[1, 2, 4, 5, 6, 8, 10, 100, 20000]
-- listas de números.

["die", "bart", "die"]
-- lista de strings.

[True, True]
-- lista de booleanos.

[("@skinnerOk", "Es una aurora boreal"), ("@archuN", "puedo verla??"), ("@skinnerOk", "no")]
-- listas de tuplas (representan un tweet).

[]
-- lista vacía.
```
Vimos que hay varias funciones que podemos usar con las listas:

```haskell
> length ["hola", "¿cómo", "estás?"]
3
> length [6,7,8,9,10,11,12]
7
-- length: devuelve la cantidad de elementos de la lista.

> sum [1,2,3,4]
10
-- sum: devuelve la suma de todos los elementos de una lista. ¡Sólo funciona con lista de números!

> filter (>4) [1,2,7,1,9]
[7,9]
-- filter: dada una condición (función que devuelve un booleano) y una lista, devuelve otra lista que contenga los elementos que cumplan la condición. Algo interesante de este ejemplo es que estamos usando aplicación parcial en (>4) ya que a la función (>) le estamos pasando un sólo parámetro (el 4) y está esperando que le llegue el que le falta (que está en la lista).

> map length ["hola", "murcielago"] 
[4, 10]

> map (+1) [100, 41, 26]
[101, 42, 27]
-- map: dada una función y una lista, devuelve otra lista que contenga a los elementos como resultado de aplicarles la función.
```

Las funciones `map` y `filter` (y otras más que iremos viendo o ya vimos, como la composición (`.`) o la aplicación (`$`)) son llamadas de **orden superior** porque reciben por parámetro otra función 🤯. ¡El orden superior es buenísimo porque nos permite crear funciones que reciban comportamiento (otras funciones) por parámetro! De esa forma podemos pensar de forma mucho más declarativa. 

¡Ahora sí! Resolvamos el ejercicio. Pero… ¿Por dónde empezamos? 😅 Si vamos a trabajar con libros, empecemos por ahí. ¡A modelarlos! 🎨

⚠️ Disclaimer: Es muy importante leer todo el enunciado antes de ponerse a codear. En este caso, vamos a ir a nuestro ritmo sólo por fines pedagógicos. ⚠️

Tenemos que crear cada libro, para eso, vamos a crear… ¿variables? ¡No! 😠 En funcional **no existen las variables** porque las cosas no varían. Recordá: **en Haskell no hay estado**. Es por eso que vamos a crear **etiquetas** 🏷️ representando a cada libro. ¿Y cómo los vamos a representar? 💭 Bueno, sabemos que cada libro tiene un título, un autor y una cantidad de páginas, entonces podríamos crear a *"El visitante"* y a *"Shingeki no Kyojin capítulo 1"* de esta forma:

```haskell
elVisitante :: (String, String, Int)
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = (String, String, Int)
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

Y así seguimos con los demás títulos. Peeeero, antes de avanzar, ¿no hay algo que te llame la atención? 🤔 Pongámonos a filosofar: ¿qué es `elVisitante `? ¿qué es `shingekiNoKyojin1`? ¡Son libros 📚! Entonces, ¿no estaría bueno poder llamarlos como corresponde?

```haskell
elVisitante :: Libro
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

Por suerte, esto no va a quedar en un deseo. Lo vamos a poder hacer realidad con el **type alias** (en criollo: un apodo o un alias). Gracias a esta herramienta vamos a lograr que nuestro código sea más expresivo 😌. Entonces, para hacer esto posible deberemos agregar a nuestra solución un type alias:

```haskell
type Libro = (String, String, Int)

elVisitante :: Libro
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

¡Y podemos seguir mejorando la expresividad de nuestro código! Si sabemos que nuestro libro es una terna compuesta por el título, autor y la cantidad de páginas… Mirá 👀:

```haskell
type Titulo = String
type Autor = String
type CantidadDePaginas = Int
type Libro = (Titulo, Autor, CantidadDePaginas)

elVisitante :: Libro
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

Y una vez que hayamos modelado todos los libros, ¡es hora de armar la biblioteca! Para eso vamos a usar vari... ¡Noooo! 😡 Crearemos una etiqueta. ¿Y cómo va a ser la biblioteca? Bueno, una lista con los libros que modelamos. ¿Y su tipo? ¿Una lista de `(String, String, Int)`? ¿O una lista de `Libro`s? 💭 Si bien dijimos que `(String, String, Int)` y `Libro` eran lo mismo, para darle un sentido semántico a nuestra solución, vamos a elegir como tipo de la biblioteca a lista de `Libro`s:

```haskell
biblioteca :: [Libro]
biblioteca = [elVisitante, shingekiNoKyojin1, shingekiNoKyojin3, shingekiNoKyojin27, fundacion, sandman5, sandman10, sandman12, eragon, eldest, brisignr, legado]
```

Sabemos lo que estás pensando… también nos gustaría tomar un helado 🍦. ¿Eh? ¿Eso no era lo que pensabas? 😳 No bueno, sí, también creemos que sería una buena idea crear un type alias para la biblioteca 😅:   

```haskell
type Biblioteca = [Libro]

biblioteca :: Biblioteca
biblioteca = [elVisitante, shingekiNoKyojin1, shingekiNoKyojin3, shingekiNoKyojin27, fundacion, sandman5, sandman10, sandman12, eragon, eldest, brisignr, legado]
```

Hagamos un recreíto de tanto código 🥴. Te vamos a contar un secreto 🤫: ¿viste el `String`? Bueno, ¡también es un apodo! ¿Te imaginás cuál es su verdadero nombre? 🙈 Es `type String = [Char]`. Así es, un `String` no es nada más ni nada menos que una lista de caracteres, una lista de `Char`. ¿Eso significa que a partir de ahora vamos a llamarle `[Char]`? ¡Nooo! El `String` va a seguir llamándose `String`, por algo alguien decidió crear ese type alias. ¿No nos crees? Mirá este ejemplo:

```haskell
> "¡Hola!" == ['¡', 'H', 'o', 'l', 'a', '!']
True
```

El string `¡Hola!` es lo mismo que la lista de caracteres `['¡', 'H', 'o', 'l', 'a', '!']`. Porque como dijimos, `String` es un type alias de `[Char]`. ¡Sigamos con el TP! 🌈

Ya modelamos los libros y la biblioteca. Es hora de definir las funciones que nos piden 👩‍💻👨‍💻. La primera es `promedioDePaginas`. ¿Por dónde la encaramos 😵? **Nuestro consejo es empezar por el tipo de la función**. De esa forma, vamos a tener en mente qué parámetros toma y qué devuelve para luego definirla. 😊
¿Cuántos parámetros toma `promedioDePaginas`? Uno solo, la biblioteca. Entonces, vamos a empezar poniendo una sola flechita (**recordá que el tipo de una función tiene la misma cantidad de flechitas que de parámetros**):

```haskell
promedioDePaginas :: ...  -> ...   
```

A veces, es muy claro qué devuelve una función, por lo que podemos empezar completando ese espacio del tipo de la misma. En este caso, como vamos a hacer un promedio, vamos a obtener como resultado un número entero:

```haskell
promedioDePaginas :: ...  -> Int
```

¿Y de qué tipo es el parámetro que toma? Dijimos que era una biblioteca y el tipo de la biblioteca es `Biblioteca`:

```haskell
promedioDePaginas :: Biblioteca -> Int
```

¡Wooohooo 🎉! Tenemos el tipo de nuestra función. Ahora, definámosla:

```haskell
promedioDePaginas :: Biblioteca -> Int
promedioDePaginas unaBiblioteca = div (cantidadDePaginasTotales unaBiblioteca) (length unaBiblioteca)

cantidadDePaginasTotales :: Biblioteca -> Int
cantidadDePaginasTotales unaBiblioteca = sum . map cantidadDePaginas $ unaBiblioteca
 
cantidadDePaginas :: Libro -> Int
cantidadDePaginas (_, _, unasPaginas) = unasPaginas
```

Algo muy importante que hicimos en esta solución fue **delegar**. Es decir, dividimos nuestro gran problema en partecitas más pequeñas para poder resolverlo más fácilmente. De esta forma obtenemos un código más **declarativo**. Peeero, tampoco debemos irnos al extremo de sobredelegar: haber creado la función `cantidadDeLibrosDeLaBiblioteca` (que recibe una biblioteca y nos devuelve su longitud) es lo mismo que hacer directamente `length biblioteca`. La razón por la que no está bueno sobredelegar es que no estamos creando funciones que hagan nuevas cosas, sino que sólo estamos renombrando funciones que ya existen y conocemos.

Enfoquémonos en `cantidadDePaginas` 🔍. Es una función que dada una tupla, nos devuelve un elemento en específico de la misma. Esto es lo que llamamos un **accessor**. 
En este caso, ya que teníamos una terna, tuvimos que hacer nuestra propia definición del accessor. Para las duplas ya tenemos definidas `fst` y `snd` que devuelven el primer y el segundo elemento, respectivamente, de una tupla de dos elementos.

El uso del accessor es posible gracias a **pattern matching**, que es el concepto asociado al chequeo estructural de un dato respecto de una estructura esperada. Gracias a esto podemos tener un código más declarativo y simple. Sin embargo, su desventaja es que depende de los cambios de estructuras. Imaginémonos que nosotros agregamos un cuarto elemento a la tupla que representa al Libro. Esto haría que no fuera posible utilizar nuestro accessor inicial, ya que estructuralmente la tupla cambió.  

Algo más para decir de esta función es que está usando **variables anónimas** (los `_`). Las vamos a utilizar cuando necesitemos recibir un parámetro pero que no nos interesa conocer su valor (no nos es útil conocerlo) para la definición de la función.

Una cuestión muy importante a tener en cuenta es que en funcional existen tres mundos: **el de los valores, el de los tipos y el de los patrones**. 

```haskell
nombreDeLaFuncion :: Mundo de los Tipos
nombreDeLaFuncion Mundo de los Patrones = Mundo de los Valores
```
     
Las variables anónimas solo viven en el mundo de los patrones. Por lo tanto, **van del lado izquierdo del igual y nunca deben ir del lado derecho ni en el tipado.** En el mundo de los tipos no puede ir porque tenemos que especificar los tipo es nuestras funciones y valores, aún cuando son variables. En el de los valores tampoco tiene sentido porque es donde especificamos nuestros retornos, no podemos devolver "lo que sea".

¡Y hasta acá llegamos por hoy! La clase que viene seguimos. 👋


## Links Útiles

- [Enunciado que hicimos en clase](https://docs.google.com/document/d/1XLtIz4GerTXo_g4Y0g1lP2wet8wnrO-F4dimnNFLup8/edit#)
- [Código del TP](https://gist.github.com/julian-berbel/909ebae46aa6e05ece5fcca2a84915e9)
- [Video de la clase](https://drive.google.com/file/d/1f72a6efSuhUyH5KX-xXYlEXY_M4C6Zz7/view)
- [Aplicación parcial](http://wiki.uqbar.org/wiki/articles/aplicacion-parcial.html)
- [Orden superior](http://wiki.uqbar.org/wiki/articles/orden-superior.html)
- [Pattern Matching](http://wiki.uqbar.org/wiki/articles/pattern-matching-en-haskell.html)



