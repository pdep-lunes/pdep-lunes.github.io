---
title: Quinta clase
date: "2022-04-25"
description: "Quinta clase de PdeP"
tags: [funcional, pattern matching, data, git]
---

## Tarea para la clase que viene:

- Subir a un repositorio de Github **propio** la solución de PdeP Commerce que hayan resuelto con tuplas. **No subirlo al repositorio grupal.**
- Comenzar a resolver la primera entrega del [TP integrador grupal](https://docs.google.com/document/d/1zNEmieCaC79F_QJ8Siwgq9-ASV_YdyLzYH-pC_j4jv8/edit?usp=sharing)
- Pueden hacer hasta la lección 11 del [capítulo 1 de Mumuki](https://mumuki.io/pdep-utn/chapters/435-programacion-funcional).

## ¿Qué vimos hoy? 

Volvimos al TP de la clase pasada ["Hora de lectura"](https://docs.google.com/document/d/11uYGXvG-TnNhveawDjKD1iSWKW9Qy8PVqlvtHhV58F8/edit para seguir trabajando con él y agregando nuevos ejercicios. 🙌 

### Pattern Matching

¿Te acordás del accessor `paginas`? El uso de este accessor es posible gracias a **pattern matching**, que es el concepto asociado al chequeo estructural de un dato respecto de una estructura esperada. Gracias a esto podemos tener un código más declarativo y simple. Sin embargo, su desventaja es que depende de los cambios de estructuras. Imaginémonos que agregamos un cuarto elemento a la tupla que representa al `Libro`. Esto haría que no fuera posible utilizar el accessor inicial, ya que estructuralmente la tupla cambió. 

Ahora toca el turno de definir `esLecturaObligatoria`. De vuelta vamos a descomponerla en funciones para que sea más fácil construirla. 💡 Un consejo que solemos dar es definir la función de tal forma que cuando la leamos, quede igual que el enunciado. Y la única forma de hacer esto posible es delegando:

```haskell
type Saga = [Libro]

sagaDeEragon :: Saga
sagaDeEragon = [eragon, eldest, brisignr, legado]

autor :: Libro -> Autor
autor (_, unAutor, _) = unAutor

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
esLecturaObligatoria' ("Fundacion", "Isaac Asimov", 230) = True
esLecturaObligatoria' (_, "Stephen King", _) = True
esLecturaObligatoria' unLibro = perteneceASagaEragon unLibro
```

⚠️ Hay que tener mucho cuidado con el orden cuando utilizamos pattern matching. Los casos deben ir de lo más particular a lo más general. ⚠️
En este caso `(_, "Stephen King", _)` y `(_, "Isaac Asimov", 230)` matchean con tuplas que tengan ese formato, mientras que `unLibro` matchea con cualquier tupla (por eso va después) y por último va la variable anónima (`_`) que matchea con cualquier cosa. Así vamos de los casos más específicos a los generales.


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

Usar **guardas** de esta forma es un 2 (2️⃣) automático en el parcial, un desaprobado. Es un **mal uso de booleanos** y una **muy muy mala práctica** de programación. Dicho esto, quien avisa no traiciona… 👀

Entonces… ¿cuándo usar guardas y cuando pattern matching? 😩<br>
Usamos pattern matching cuando tenemos algo que encaja con un patrón, por ejemplo una tupla de 3 elementos, una lista vacía, etc. 🧩<br>
Usamos guardas cuando queremos evaluar conjuntos de dominios (en matemática, esto es muy similar a las funciones partidas). 🔀

¿Y qué pasó cuando creamos una etiqueta del libro Fundación?¿Esto funcionaba?

```haskell
fundacion :: Libro
fundacion = ("Fundacion", "Isaac Asimov", 230)

esLecturaObligatoria' :: Libro -> Bool
esLecturaObligatoria' fundacion = True
esLecturaObligatoria' (_, "Stephen King", _) = True
esLecturaObligatoria' unLibro = perteneceASagaEragon unLibro
esLecturaObligatoria' _ = False
```

¡No! Eso es porque `fundacion` del lado izquierdo del igual sigue siendo un patrón y no se da cuenta que es la etiqueta `fundacion` que definimos. Es decir, sería lo mismo en ese punto poner `fundacion` o `unLibro` o `algunLibro`.

Si bien lo siguiente no lo vimos en la clase… ¡completemos el TP! Es el turno de `esFantasiosa`. Comencemos con su tipo, así que como recibe un parámetro, ponemos una flechita:

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
esLibroFantasioso unLibro = esDe "Christopher Paolini" unLibro || esDe "Neil Gaiman" unLibro
```

Hagamos una observación 🔍 a estas soluciones:

```haskell
esLibroFantasioso unLibro = esDe "Christopher Paolini" unLibro || esDe "Neil Gaiman" unLibro

esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esFantasiosa' :: Biblioteca -> Bool
esFantasiosa' unaBiblioteca = any (esDe "Christopher Paolini") unaBiblioteca || any (esDe "Neil Gaiman") unaBiblioteca
```

Las funciones `esFantasiosa` y `esFantasiosa'` hacen exactamente lo mismo. Es lo mismo hacer `any (condicion1 || condicion2) lista` que `any condicion1 lista || any condicion2 lista`. Siempre vamos a preferir la primera solución ya que es más declarativa. 
Lo mismo ocurre también con `map` y `filter`: 
- `(map funcion1.map funcion2) lista` es lo mismo que `map (funcion1.funcion2) lista`
- `(filter condicion1.filter condicion2) lista` es lo mismo que `filter (condicion1 && condicion2) lista`

Sigamos con `nombreDeLaBiblioteca`:

```haskell
titulo (unTitulo, _, _) = unTitulo

nombreDeLaBiblioteca :: Biblioteca -> String
nombreDeLaBiblioteca unaBiblioteca = sinVocales . concatenatoriaDeTitulos $ unaBiblioteca


sinVocales :: String -> String
sinVocales unString = filter (not . esVocal) unString

esVocal :: Char -> Bool
esVocal unCaracter = elem unCaracter "aeiouAEIOUÁÉÍÓÚ"

concatenatoriaDeTitulos :: Biblioteca -> String
concatenatoriaDeTitulos unaBiblioteca = concatMap titulo unaBiblioteca
```

Recordá que como un `String` es una `[Char]` es lo mismo "aeiouAEIOUÁÉÍÓÚ" que ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O' , 'U', 'Á', 'É', 'Í', 'Ó' , 'Ú'] y es una forma mucho más fácil de escribirlo 😅. Si te quedó la duda de por qué repetimos las vocales en minúscula, mayúscula y con tildes, es para que matchee de las dos formas. 😄

¡Llegamos a la última función! La que nos dice si una biblioteca es ligera:


```haskell
esBibliotecaLigera :: Biblioteca -> Bool
esBibliotecaLigera unaBiblioteca = all esLecturaLigera unaBiblioteca

esLecturaLigera :: Libro -> Bool
esLecturaLigera unLibro = ((<= 40) . cantidadDePaginas) unLibro
```

Y de esa forma completamos el TP usando las herramientas que aprendiste hasta ahora. 👏

### Data

¡Excelente! Ya tenemos funcionando la función `genero` 🎉. ¿Qué pasa si le mandamos como argumento una tupla que representa a una persona? No debería funcionar porque explicitamos en su tipo que recibía un `Libro`... Veamos qué pasa con la tupla que representa a nuestro querido profe Gus: 👀

```haskell
genero ("Gustavo", "Trucco", 30)
> "Comic"
```

¿¡Entonces el profe es un cómic!? 😱 Ya quisiera, pero no lo es. Lo que pasó es que si bien dijimos que `genero` funciona sólo con `Libro`s, un `Libro` es una tupla de tipo `(String, String, Int)`, ¡el mismo tipo que la tupla que representa a una persona! 😅
Recordá que al usar el type alias, **no estamos creando un nuevo tipo de dato**, sino que le estamos dando un nombre a una estructura que tiene sentido para nuestra solución y así ganar expresividad.

Entonces, ¿cómo lo solucionamos? 🤨 Creando nuestro propio tipo de dato con **Data**:

```haskell
data Libro = UnLibro String Autor Int
```

En donde `UnLibro` es una función que llamamos **constructor** y su tipo es `UnLibro :: String -> Autor -> Int -> Libro`. Es decir, es una función que recibe los parámetros necesarios para crear un libro. 

Modelemos a “El visitante”:

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
data Libro = UnLibro { titulo :: String, autor :: Autor, paginas :: Int } deriving Show
```

En este caso tanto `libro` como `autor` y `paginas ` son funciones (accessors) que van a acceder a cada elemento del data 🙌. ¿Cómo nos damos cuenta? Porque estamos explicitando el tipo de cada una al momento de crear el tipo de dato.

En conclusión, ambas sintaxis para definir datas son equivalentes, solo que record syntax nos regala las funciones para acceder a las propiedades. 🎁

Es importante tener en cuenta, que al utilizar data estamos creando un tipo (`Libro`), una función constructora (`UnLibro`) y un patrón (`UnLibro unTitulo unAutor paginas`).

Por otro lado, si queremos comparar una instancia de data con otra, tenemos que decirle a Haskell que queremos que sean comparables. ¿Cómo hacemos eso? Agregando `Eq`:

```haskell
data Libro = UnLibro { titulo :: String, autor :: Autor, paginas :: Int } deriving (Show, Eq)
```

Ahora vamos a modelar la función `agregarPaginas`. ¿Esta función va a modificar al libro original? ¡No! Los data, al igual que todo en el paradigma funcional, siguen siendo inmutables. Por ende, la función nos devolverá una copia del libro con la cantidad de páginas aumentada.

```haskell
agregarPaginas :: Libro -> Int -> Libro
agregarPaginas (UnLibro unTitulo unAutor unasPaginas) paginasAAgregar = UnLibro unTitulo unAutor (unasPaginas + paginasAAgregar)
```

Podemos hacer lo mismo con record syntax:

```haskell
agregarPaginas :: Libro -> Int -> Libro
agregarPaginas unLibro paginasAAgregar = unLibro { paginas = paginas unLibro +  paginasAAgregar}
```

Es importante destacar que para devolver la nueva cantidad de páginas debemos sumar la cantidad de páginas original. Para eso, utilizamos el accessor `paginas` y es importante pasarle por parámetro `unLibro` para que pueda darnos el valor. No olvidar que `paginas` sigue siendo una función que necesita su parámetro.

En caso de que queramos crear un libro editando mas de un valor, podemos hacer lo mismo que antes, separando cada valor con una `,`. Veamos un ejemplo: sacarSecuela, la cual no solo le agrega 50 páginas a un libro sino que le agrega un 2 al nombre.

```haskell
sacarSecuela :: Libro -> Libro
sacarSecuela unLibro = unLibro { titulo = titulo libro ++ " 2", paginas = paginas unLibro +  50}
```

### Git

Te recomendamos leer la [guía rápida de Git](https://docs.google.com/document/d/147cqUY86wWVoJ86Ce0NoX1R78CwoCOGZtF7RugUvzFg/edit#heading=h.pfzudah6sze2) y también ver la [resolución de conflictos en Git y VSCode](https://www.youtube.com/watch?v=Z1PBoZoQ_pQ).
**¡Importante! Ver los últimos minutos del video de la clase para ver cómo generar el token y así poder subir su código.**



## Links Útiles

- [Video de la clase](https://drive.google.com/file/d/10I86vEaVA-XDOzdaK6urWHKNr9-BEup7/view?usp=sharing)
- [Pattern Matching](http://wiki.uqbar.org/wiki/articles/pattern-matching-en-haskell.html)
- [Data](http://wiki.uqbar.org/wiki/articles/data--definiendo-nuestros-tipos-en-haskell.html)
- [Código del TP](https://github.com/pdep-lunes/pdep-clases-2022/blob/master/Funcional/Clase05/src/Lib.hs). A tener en cuenta: invertimos el orden del autor y el título con respecto a la resolución de la bitácora.

