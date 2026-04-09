---
title: Self y polimorfismo (otra vez 😝)
date: '2024-09-02'
description: Décimo séptima clase de PdeP
tags: [objetos, self, encapsulamiento, responsabilidad, polimorfismo]
---

## Tarea para la clase que viene

- Realizar de forma **individual** estos [ejercicios](https://docs.google.com/document/d/11_PIuru6hAmbN1QSKpC7KDvc7IduOyBcbbVez2M8v_U/edit) para seguir practicando 👩‍💻👨‍💻. Pueden subir las soluciones a un repo para que podamos revisarlas si así quisieran. 

## ¿Qué vimos hoy?

- Terminamos el ejercicio [¡Qué fiesta!](https://docs.google.com/document/d/1jhvpQfmiLEq7tlSJfT-b0f-aajmAlW7zfU-vsNVamGI/edit). 
- Realizamos el ejercicio [Pdep cargas](https://docs.google.com/document/d/1NyGG-c_cpgEvrHH19pM4-x1J0YevSDqVbHqD6DvvlFg/edit) e introducimos los siguientes conceptos:

### Self

Empezando a realizar el objeto `camionDeVerduras`, podríamos pensar esto como primera opción:

```
object camionDeVerduras {
  var kilometraje = 700000
  var cajones = 10

  method pesoCarga() = cajones * 50

  method velocidadMaxima() = 80 - (cajones * 50) / 500
}
```
 
Esto nos presenta un problema: Tenemos una repetición de lógica entre `velocidadMaxima` y `pesoCarga`. ¿Cómo podríamos llamar a ese mensaje?

Una opción podría ser `camionDeVerduras.pesoCarga()`, pero vemos que Wollok nos indica un _warning_:

`No debe usar el nombre del objeto dentro del mismo. Use 'self'.`

`self` es una manera con la cual el objeto se conoce a sí mismo. Con `self`, puedo enviar mensajes que entienda el propio objeto, para poder abstraer lógica repetida en otros métodos del mismo objeto. `self` es una referencia al mismo objeto.

Esto, con `self`, se puede resolver de la siguiente manera:

```
object camionDeVerduras {
  var kilometraje = 700000
  var cajones = 10

  method pesoCarga() = cajones * 50

  method velocidadMaxima() = 80 - self.pesoCarga() / 500
}
```

Hacemos el resto de los camiones, haciendo los métodos con las firmas necesarias (por ejemplo, `recorrerRuta` podría tener diferentes firmas y no estar en el `scannion5000`).

### Encapsulamiento

Comenzando a codificar el puesto, podríamos hacer un primer acercamiento:

```
object rutatlantica {
  method pasar(unCamion) {
    pdepCargas.cobrar(7000 + 100 * unCamion.pesoCarga() / 1000)
    if (unCamion == camionDeVerduras) {
       unCamion.kilometraje(unCamion.kilometraje() + 400)
    } else if (unCamion == camionCerealero) {
       unCamion.nivelDeDeterioro(unCamion.nivelDeDeterioro() + 0.max(unCamion.velocidadMaxima().min(75) - 45))
    }
  }
}
```

Hay un poco de ruido en esta solución: ¿Es necesario que comparemos camión por camión para saber qué lógica implementar? ¿Está bien que esta lógica la implemente el puesto? ¿Está bien que el puesto modifique el estado de los camiones?

La respuesta, según el concepto de encapsulamiento, es **no**.

El **encapsulamiento** es la buena práctica de minimizar la exposición del estado de nuestros objetos. Es decir, un objeto utiliza la _interfaz_ (mensajes que entiende) de otro para interactuar con él. Cada objeto es responsable de su propio estado, y no el de otros.

### Responsabilidad

La **responsabilidad**, a nivel objetos, son las cosas que el objeto es responsable de hacer. Por ejemplo, el puesto `rutatlantica` en este caso NO es responsable de cambiar el kilometraje de los camiones, pero SÍ es responsable de cobrarle a `pdepCargas` una cantidad que debe calcular.
La responsabilidad, en la programación con objetos, está relacionada con qué objeto debería resolver las determinadas partes de nuestro problema. Si un objeto no es responsable de hacer algo lo debe delegar en el correspondiente.

Podríamos hacer un segundo acercamiento:

```
object rutatlantica {
  method pasar(unCamion) {
    pdepCargas.cobrar(7000 + 100 * unCamion.pesoCarga() / 1000)
    unCamion.recorrerRuta(400, unCamion.velocidadMaxima().min(75))
  }
}
```

Ahora vemos que le vamos a querer decir a un camión que recorra una ruta. ¿Esto funciona para todos los camiones que hicimos? ¿Qué pasa con la firma del método en los diferentes camiones? ¿Y si no definimos el método?

### Polimorfismo

¿Queremos que el método funcione para todos los camiones? Sí, ya que a todo camión que pase por el puesto (¡sin saber cuál va a ser!) se le debe mandar un mensaje para que recorra 400 kms y a 75 km/h como máximo.

De esto surge el **polimorfismo**: Queremos que `recorrerRuta(kilometraje, velocidad)` lo entiendan todos los camiones, para que `rutatlantica` los pueda usar indistintamente. Es decir, el **polimorfismo** en objetos es la capacidad de que un objeto pueda utilizar indistintamente a otros objetos, siendo que potencialmente estos otros sean distintos. Con esto en mente, deberíamos cambiar el método `recorrerRuta` en todos los camiones:

```
object camionDeVerduras {
	method recorrerRuta(extension, velocidad){
		kilometraje = kilometraje + extension
	}
}
object scanion5000 {
	method recorrerRuta(extension, velocidad){
		// no hace nada
	}
}

object camionCerealero {

	method recorrerRuta(extension, velocidad){
		nivelDeterioro += 0.max(velocidad - 45)
	}
}
```

Veamos bien qué es lo que está haciendo el método pasar:

- Se encarga de realizar el cobro a `pdepCargas`.
- Realiza el cálculo para saber cuánto hay que cobrarle.
- Le dice a un camión que recorra una ruta.
- Calcula la velocidad a la cual el camión debe de recorrer la ruta.


Dentro de estas cuatro cosas que está haciendo el método `pasar()`, ¿Es _responsable_ el método de hacerlo todo? ¿A qué nos referimos por responsable?

Nos referimos por responsabilidad, en métodos, a eso que el método debe de hacer. Es decir, por ejemplo, que nuestro método `pasar()` tiene responsabilidad “de más”: Cuando pasa un camión sólo le queremos cobrar a `pdepCargas` una cantidad y decirle al camión que recorra la ruta. El resto de la lógica podríamos abstraerla, para poder tener un código más legible y con métodos con sus respectivas “responsabilidades”.


Esto se vería de la siguiente manera:

```
object rutatlantica {
	method pasar(unCamion) {
	  pdepCargas.cobrar(self.costo(unCamion))
	  unCamion.recorrerRuta(400, self.velocidadQuePasa(unCamion))
	}

	method velocidadQuePasa(unCamion) {
	  return unCamion.velocidadMaxima().min(75)
	}

	method costo(unCamion) {
	  return 7000 + 100 * unCamion.pesoCarga() / 1000
	}
}
```

## Links útiles:

- [Código de Pdepcargas](https://github.com/pdep-lunes/pdep-clases-2024/tree/main/Objetos/Clase02/pdep-cargas/pdep-cargas)
- [Código de ¡Qué fiesta!](https://github.com/pdep-lunes/pdep-clases-2024/tree/main/Objetos/Clase02/que-fiesta)
- [Video de la clase (2021)](https://drive.google.com/file/d/1k4n41gaIBCwyo0T_ZMgryWg5EV2OdZGE/view?usp=sharing)
- [Pdep cargas](https://docs.google.com/document/d/1NyGG-c_cpgEvrHH19pM4-x1J0YevSDqVbHqD6DvvlFg/edit)
