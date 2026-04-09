---
title: Cuarta clase
date: "2020-04-27"
description: "Cuarta clase de PdeP"
tags: [orden superior, aplicación parcial, pattern matching, guardas, type alias, type class]
---

## ¿Qué vimos hoy? 

Hicimos una puesta en común del [TP "Hora de lectura"](https://docs.google.com/document/d/11uYGXvG-TnNhveawDjKD1iSWKW9Qy8PVqlvtHhV58F8/edit) que hicimos la clase pasada. 🧐

¿Por dónde empezamos? 😅 Si vamos a trabajar con libros, empecemos por ahí. ¡A modelarlos! 🎨

⚠️ Disclaimer: Es muy importante leer todo el enunciado antes de ponerse a codear. En este caso, vamos a ir a nuestro ritmo sólo por fines pedagógicos. ⚠️

Tenemos que crear cada libro, para eso, vamos a crear… ¿variables? ¡No! 😠 En funcional **no existen las variables** porque las cosas no varían. Recordá: **en Haskell no hay estado**. Es por eso que vamos a crear **etiquetas** 🏷️ representando a cada libro. ¿Y cómo los vamos a representar? 💭 Bueno, sabemos que cada título del libro tiene un autor y una cantidad de páginas, entonces podríamos crear a *"El visitante"* y a *"Shingeki no Kyojin capítulo 1"* de esta forma:

```haskell
elVisitante :: (String, Int)
elVisitante = ("Stephen King", 592)

shingekiNoKyojin1 = (String, Int)
shingekiNoKyojin1 = ("Hajime Isayama", 40)
```

Y así seguimos con los demás títulos. Peeeero, antes de avanzar, ¿no hay algo que te llame la atención? 🤔 Pongámonos a filosofar: ¿qué es `elVisitante `? ¿qué es `shingekiNoKyojin1`? ¡Son libros 📚! Entonces, ¿no estaría bueno poder llamarlos como corresponde?

```haskell
elVisitante :: Libro
elVisitante = ("Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("Hajime Isayama", 40)
```

Por suerte, esto no va a quedar en un deseo. Lo vamos a poder hacer realidad con el **type alias** (en criollo: un apodo o un alias). Gracias a esta herramienta vamos a lograr que nuestro código sea más expresivo 😌. Entonces, para hacer esto posible deberemos agregar a nuestra solución un type alias:

```haskell
type Libro = (String, Int)

elVisitante :: Libro
elVisitante = ("Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("Hajime Isayama", 40)
```

¡Y podemos seguir mejorando la expresividad de nuestro código! Si sabemos que nuestro libro es una dupla compuesta por el autor y la cantidad de páginas… Mirá 👀:

```haskell
type Autor = String
type CantidadDePaginas = Int
type Libro = (Autor, CantidadDePaginas)

elVisitante :: Libro
elVisitante = ("Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("Hajime Isayama", 40)
```

Y una vez que hayamos modelado todos los libros, ¡es hora de armar la biblioteca! Para eso vamos a usar vari... ¡Noooo! 😡 Crearemos una etiqueta. ¿Y cómo va a ser la biblioteca? Bueno, una lista con los libros que modelamos. ¿Y su tipo? ¿Una lista de `(String, Int)`? ¿O una lista de `Libro`s? 💭 Si bien dijimos que `(String, Int)` y `Libro` eran lo mismo, para darle un sentido semántico a nuestra solución, vamos a elegir como tipo de la biblioteca a lista de `Libro`s:

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

Ya modelamos los libros y la biblioteca. Es hora de definir las funciones que nos piden 👩‍💻👨‍💻. La primera es `promedioDeHojas`. ¿Por dónde la encaramos 😵? **Nuestro consejo es empezar por el tipo de la función**. De esa forma, vamos a tener en mente qué parámetros toma y qué devuelve para luego definirla. 😊
¿Cuántos parámetros toma `promedioDeHojas`? Uno solo, la biblioteca. Entonces, vamos a empezar poniendo una sol flechita (**recordá que el tipo de una función tiene la misma cantidad de flechitas que de parámetros**):

```haskell
promedioDeHojas :: ...  -> ...   
```

A veces, es muy claro qué devuelve una función, por lo que podemos empezar completando ese espacio del tipo de la misma. En este caso, como vamos a hacer un promedio, vamos a obtener como resultado un número, ¡pero no cualquier número! Un número que podría tener una coma, es decir, un `Float`:

```haskell
promedioDeHojas :: ...  -> Float
```

¿Y de qué tipo es el parámetro que toma? Dijimos que era una biblioteca y el tipo de la biblioteca es `Biblioteca`:

```haskell
promedioDeHojas :: Biblioteca -> Float
```

¡Wooohooo 🎉! Tenemos el tipo de nuestra función. Ahora, definámosla:

```haskell
promedioDeHojas :: Biblioteca -> Float
promedioDeHojas unaBiblioteca = fromIntegral (cantidadDeHojas unaBiblioteca) / genericLength unaBiblioteca

cantidadDeHojas :: Biblioteca -> Int
cantidadDeHojas unaBiblioteca = (sum . map cantidadDePaginas) unaBiblioteca
 
cantidadDePaginas :: Libro -> Int
cantidadDePaginas (_, unasPaginas) = unasPaginas
```

Algo muy importante que hicimos en esta solución fue **delegar**. Es decir, dividimos nuestro gran problema en partecitas más pequeñas para poder resolverlo más fácilmente. De esta forma obtenemos un código más **declarativo**.

Enfoquémonos en `cantidadDePaginas` 🔍. Es una función que dada una tupla, nos devuelve un elemento en específico de la misma. Esto es lo que llamamos un **accessor**. 

En este punto de la clase surgió la duda de si `Int` es lo mismo que `Integral`. Si no lo recordás, dijimos que no son lo mismo. `Int` es un tipo de dato mientras que `Integral` es una restricción de tipo, también llamada clase de tipo o **type class**. Este es un diagrama en donde lo escrito en negro ⚫ son clases de tipo y lo escrito en rojo 🔴 son tipos de dato:

![diagrama_tipo_clases](https://raw.githubusercontent.com/pdep-lunes/bitacora/2019-completo/content/blog/funcional/haskell-type-classes.jpg 'Diagrama de tipos de clases')

Ahora toca el turno de definir `esLecturaObligatoria`. De vuelta vamos a descomponerla en funciones para que sea más fácil construirla. 💡 Un consejo que solemos dar definir la función de tal forma que cuando la leamos, quede igual que el enunciado. Y la única forma de hacer esto posible es delegando:

```haskell
type Saga = [Libro]

sagaDeEragon :: Saga
sagaDeEragon = [eragon, eldest, brisignr, legado]

autor :: Libro -> Autor
autor (unAutor, _) = unAutor

esLecturaObligatoria :: Libro -> Bool
esLecturaObligatoria unLibro = esDeStephenKing unLibro || perteneceASagaEragon unLibro || esFundacion unLibro

esDeStephenKing :: Autor -> Libro -> Bool
esDeStephenKing unAutor unLibro = ((== "Stephen King") . autor) unLibro

perteneceASagaEragon :: Libro -> Bool
perteneceASagaEragon unLibro = elem unLibro sagaDeEragon

esFundacion :: Libro -> Bool
esFundacion unLibro = unLibro == fundacion
```

Fijate que la función `esLecturaObligatoria` quedó igual que el enunciado; el mismo dice: *”Es una lectura obligatoria cuando es de Stephen King o de la saga de Eragon o es el ejemplar de Fundación de 230 páginas de Isaac Asimov”*. A esto nos referimos con delegar y que se pueda leer como una oración del TP. 😁

Hagamos una observación 🔍: cuando creamos la `sagaDeEragon`, le pusimos como tipo `Saga`, donde saga es `[Libro]`. ¡Lo mismo que la biblioteca! ¿Y por qué no reutilizamos el tipo `Biblioteca` si también es `[Libro]` 🤨? Porque si bien *sintácticamente* son lo mismo, *semánticamente* no lo son. Es decir, si bien las dos son del tipo `[Libro]`, una biblioteca no es lo mismo que una saga (y si no nos crees, buscalas en el diccionario 😜). Haciendo esta diferencia ganamos expresividad.

Veamos otra versión de `esLecturaObligatoria` con **pattern matching** (y nuestra versión preferida porque usa una herramienta del paradigma funcional y además, es más declarativa): 

```haskell
esLecturaObligatoria' :: Libro -> Bool
esLecturaObligatoria' ("Stephen King", _) = True
esLecturaObligatoria' ("Isaac Asimov", 230) = True
esLecturaObligatoria' unLibro = perteneceASagaEragon unLibro
esLecturaObligatoria' _ = False
```

⚠️ Hay que tener mucho cuidado con el orden cuando utilizamos pattern matching. Los casos deben ir de lo más particular a lo más general. ⚠️
En este caso `("Stephen King", _)` y `("Isaac Asimov", 230)` matchean con duplas que tengan ese formato, mientras que `unLibro` matchea con cualquier tupla (por eso va después) y por último va la variable anónima (`_`) que matchea con cualquier cosa. Así vamos de los casos más específicos a los generales.


Y así como tenemos una solución preferida, tenemos una que no nos gusta para nada 🤬:

```haskell
esLecturaObligatoria :: Libro -> Bool 
esLecturaObligatoria unLibro
            | unLibro == eragon = True
            | unLibro == eldest = True
            | unLibro == brisignr = True
            | unLibro == legado = True
            | autor unLibro == "Stephen King" = True
            | unLibro == fundacion = True
	|otherwise = False
```

Hacerlo de esta forma es un 2️⃣ automático en el parcial, un desaprobado. Es un **mal uso de booleanos** y una **muy muy mala práctica** de programación. Dicho esto, quien avisa no traiciona… 👀

¡Sigamos! Es el turno de `esFantasiosa`. Comencemos con su tipo, así que como recibe un parámetro, ponemos una flechita:

```haskell
esFantasiosa :: ... -> ...
```

Sabemos que devuelve un booleano, por lo tanto:

```haskell
esFantasiosa :: ... -> Bool
```

Y sabemos que toma una biblioteca:

```haskell
esFantasiosa :: Biblioteca -> Bool
```

Tadáaa 🎉, tenemos el tipo de nuestra función. Ahora definámosla:

```haskell
esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esLibroFantasioso :: Libro -> Bool
esLibroFantasioso unLibro = esDeChristopherPaolini unLibro || esDeNeilGaiman unLibro

esDeChristopherPaolini :: Autor -> Libro -> Bool
esDeChristopherPaolini unAutor unLibro = ((== "Christopher Paolini") . autor) unLibro

esDeNeilGaiman :: Autor -> Libro -> Bool
esDeNeilGaiman unAutor unLibro = ((== "Neil Gaiman") . autor) unLibro
```

Mmmm, un momento ✋. Algo está oliendo mal 🤢… ¡a repetición de lógica! 🤮 Mirá estas tres funciones:


```haskell
esDeStephenKing :: Autor -> Libro -> Bool
esDeStephenKing unAutor unLibro = ((== "Stephen King") . autor) unLibro

esDeChristopherPaolini :: Autor -> Libro -> Bool
esDeChristopherPaolini unAutor unLibro = ((== "Christopher Paolini") . autor) unLibro

esDeNeilGaiman :: Autor -> Libro -> Bool
esDeNeilGaiman unAutor unLibro = ((== "Neil Gaiman") . autor) unLibro
```

Son prácticamente iguales 😱. En todas se **repite la lógica** de obtener el autor de un libro para fijarnos si es un autor en especial 😵. Para solucionar esto, vamos a crear una función que tenga sólo la lógica repetida, parametrizando lo único que cambia (que en este caso son los nombres de los autores):

```haskell
esDe :: Autor -> Libro -> Bool
esDe unAutor unLibro = ((== unAutor) . autor) unLibro
```

Nuestra solución ahora quedaría así:

```haskell
esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esLibroFantasioso :: Libro -> Bool
esLibroFantasioso unLibro = esLibroFantasioso' unLibro = esDe "Christopher Paolini" unLibro || esDe "Neil Gaiman" unLibro
```

Hagamos una observación 🔍 a estas soluciones:

```haskell
esLibroFantasioso unLibro = esLibroFantasioso' unLibro = esDe "Christopher Paolini" unLibro || esDe "Neil Gaiman" unLibro

esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esFantasiosa' :: Biblioteca -> Bool
esFantasiosa' unaBiblioteca = any (esDe "Christopher Paolini") unaBiblioteca || any (esDe "Neil Gaiman") unaBiblioteca
```

Las funciones `esFantasiosa` y `esFantasiosa'` hacen exactamente lo mismo. Es lo mismo hacer `any (condicion1 || condicion2) lista` que `any condicion1 lista || any condicion2 lista`. Siempre vamos a preferir la primer solución ya que es más declarativa. 
Lo mismo ocurre tambien con `map` y `filter`: 
- `(map funcion1.map funcion2) lista` es lo mismo que `map (funcion1.funcion2) lista`
- `(filter condicion1.filter condicion2) lista` es lo mismo que `filter (condicion1 && condicion2) lista`

Sigamos con `nombreDeLaBiblioteca`. Acá es cuando nos damos cuenta que, por no leer el enunciado completo antes de empezar, la forma en que modelamos al `Libro` no nos alcanza para implementar nuestra solución 🥴. Nos estaría faltando agregar a la tupla el elemento que hace referencia el título del libro. Por suerte hicimos el TP de tal forma que, en el caso de que esto llegara a pasar (¡y pasó! 😱), no fuese complicado hacer estos cambios 😌. 
Para solucionar esto vamos a agregar el título a cada libro y, como creamos el alias `Libro`, vamos a tener que modificar el tipo sólo en ese lugar y no en cada libro (ni en la saga ni en la biblioteca):

```haskell
type Libro = (String, Autor, Int)

elVisitante :: Libro
elVisitante = ("El Visitante", "Stephen King", 592)

shingekiNoKyojin1 :: Libro
shingekiNoKyojin1 = ("Shingeki no Kyojin 1", "Hajime Isayama", 40)
```
¡No hay que olvidarse de modificar los accessors! (Y crear el nuevo):

```haskell
cantidadDePaginas :: Libro -> Int
cantidadDePaginas (_, _, unasPaginas) = unasPaginas

autor :: Libro -> String
autor (_, unAutor, _) = unAutor

titulo :: Libro -> String
titulo (unTitulo, _, _) = unTitulo
``` 

¿Te imaginás si en vez de usar nuestros propios accessors hubiésemos usado `fst` y `snd`? ¡Hubiese sido un lío tener que modificar todo 😭! Pero como usamos las herramientas que nos da el lenguaje y el paradigma, ¡no fue difícil ni estresante hacer ese cambio! 🙌 

Entonces, `nombreDeLaBiblioteca` va a quedar así:

```haskell
nombreDeLaBiblioteca :: Biblioteca -> String
nombreDeLaBiblioteca unaBiblioteca = (sacarVocales . nombreDeLaBibliotecaConVocales) unaBiblioteca

sacarVocales :: String -> String
sacarVocales unTitulo = filter esConsonante unTitulo

esConsonante :: Char -> Bool
esConsonante unCaracter = (not . elem unCaracter) "aeiouAEIOU"

nombreDeLaBibliotecaConVocales :: Biblioteca -> String
nombreDeLaBibliotecaConVocales unaBiblioteca = concatMap titulo unaBiblioteca
```

Recordá que como un `String` es una `[Char]` es lo mismo "aeiouAEIOU" que ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O' , 'U'] y es una forma mucho más fácil de escribirlo 😅. Si te quedó la duda de por qué repetimos las vocales en minúscula y mayúscula, es para que matchee de las dos formas. 😄

¡Llegamos a la última función! La que nos dice si una biblioteca es ligera:


```haskell
esBibliotecaLigera :: Biblioteca -> Bool
esBibliotecaLigera unaBiblioteca = all esLibroLigero unaBiblioteca

esLibroLigero :: Libro -> Bool
esLibroLigero unLibro = ((<= 40) . cantidadDePaginas) unLibro
```

Y de esa forma completamos el TP usando las herramientas que aprendiste hasta ahora. 👏


## Links Útiles

- [Solución del TP](https://gist.github.com/julian-berbel/ac5d66c1a96487db6a6d1d397cab7963)
- [Video de la clase](https://drive.google.com/file/d/1MpsHO26ETM2_ihiXG3B-yQwmSF_xkKUx/view)
- [Uso de paréntesis en Haskell](https://www.youtube.com/watch?v=ymCuneefgKU)
- [Inferencia de tipos](https://www.youtube.com/watch?v=iWPWbPuEEQ0)
