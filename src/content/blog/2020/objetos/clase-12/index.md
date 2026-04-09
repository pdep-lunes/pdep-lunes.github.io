---
title: Doceava clase
date: '2020-08-31'
description: Doceava clase de PdeP
tags: [objetos, self, encapsulamiento, responsabilidad, delegación, polimorfismo.]
---

## ¿Qué vimos hoy?

Identidad vs Igualdad

`Identidad`: decimos que dos objetos son idénticos si son el mismo objeto. Dentro del ambiente podemos tener dos referencias diferentes al mismo objeto. En Wollok el operador usado para comparar dos objetos por identidad es ===.

`Igualdad`: (o equivalencia) por defecto dos objetos son iguales si son idénticos, o sea si son el mismo objeto. Al mismo tiempo dos objetos que no son idénticos pueden ser iguales. La igualdad == puede ser redefinida para que funcione acorde a nuestro dominio.

```
object lanzamientoWindows98 {
	const property dia = 25
	const property mes = 6
	const property anio = 1998
	
	override method ==(otroDia) {
		return dia  == otroDia.dia()
			&& mes  == otroDia.mes()
			&& anio == otroDia.anio()
	}
}

object fechaDeNacimiento {
	const property dia = 25
	const property mes = 6
	const property anio = 1998
	
	override method ==(otroDia) {
		return dia  == otroDia.dia()
			&& mes  == otroDia.mes()
			&& anio == otroDia.anio()
	}	
}

// Sin redefinir el ==
> lanzamientoWindows98 == fechaDeNacimiento // => false
> lanzamientoWindows98 === fechaDeNacimiento // => false

// Redefiniendo el ==
> lanzamientoWindows98 == fechaDeNacimiento // => true
> lanzamientoWindows98 === fechaDeNacimiento // => false, siguen sin ser el mismo objeto
```


Para probar esto vamos a retomar el ejercicio anterior donde teníamos mascotas y personas que eran dueñas de mascotas. Vamos a introducir un par de cambios, vamos a hacer que los dueños puedan cambiar de mascota y que nos digan si pueden o no jugar con sus mascotas. Una persona puede jugar con su mascota siempre y cuando su energía esté por arriba de 100 y la mascota tenga más de 80 de energía.
 
Si billy pasa a tener a sally como mascota vemos que en el diagrama tanto él como mandy “apuntan”/”conocen” a la misma mascota. Como ambos tienen a la misma mascota (el mismo objeto) lo que haga uno con esa mascota afecta a lo que pueda hacer el otro.
 
Si billy juega dos veces con sally ahora mandy no puede jugar.

```
billy.mascota(sally)
billy.jugarConMascota()
billy.jugarConMascota()
mandy.puedeJugar() // => false
```

Realizamos el ejercicio `PDEPCargas` y vimos los siguientes conceptos:

Self

Empezando a realizar el objeto `camionDeGanado`, podríamos pensar esto como primera opción:

```
object camionGanado {
  var kilometraje = 700000
  var cantidadVacas = 10

  method pesoCarga() = cantidadVacas * 600

  method velocidadMaxima() = 80 - (cantidadVacas * 600) / 1000
}
```
 
Esto nos presenta un problema: Tenemos una repetición de lógica entre `velocidadMaxima` y `pesoCarga`. ¿Cómo podríamos llamar a ese mensaje?

una opción podría ser `camionGanado.pesoCarga()`, pero vemos que wollok nos indica un warning:

`Don’t use the name within the object. Use ‘self’ instead.`

Self es una manera con la cual el objeto se conoce a sí mismo. Con self, puedo enviar mensajes que entienda el propio objeto, para poder abstraer lógica repetida en otros métodos del mismo objeto. self es una referencia al mismo objeto.

Esto, con self, se puede resolver de la siguiente manera:

```
object camionGanado {
  var kilometraje = 700000
  var cantidadVacas = 10

  method pesoCarga() = cantidadVacas * 600

  method velocidadMaxima() = 80 - self.pesoCarga() / 1000
}
```

Hacemos el resto de los camiones, haciendo los métodos con las firmas necesarias (por ejemplo, `recorrerRuta` podría tener diferentes firmas y no estar en el `scannion5000`).

Puesto rutatlántica

Arrancando el puesto, podríamos hacer un primer approach:

```
object rutatlantica {
  method pasar(unCamion) {
    pdepCargas.cobrar(7000 + 100 * unCamion.pesoCarga() / 1000)
    if (unCamion == camionGanado) {
       unCamion.kilometraje(unCamion.kilometraje() + 400)
    } else if (unCamion == camionCerealero) {
       unCamion.nivelDeDeterioro(unCamion.nivelDeDeterioro() + 0.max(unCamion.velocidadMaxima().min(75) - 45))
    }
  }
}
```

Hay un poco de ruido en esta solución: ¿Es necesario que comparemos camión por camión para saber qué lógica implementar? ¿Está bien que esta lógica la implemente el puesto? ¿Está bien que el puesto modifique el estado de los camiones?

La respuesta, según el concepto `encapsulamiento`, es no.

El `encapsulamiento` es la manera con la cual un objeto sólo usa lo que necesita de otro objeto para poder interactuar con éste. Es decir, utiliza la `interfaz` (mensajes que entiende) del objeto para interactuar con él. Cada objeto es responsable de su propio estado, y no el de otros.

La `responsabilidad`, a nivel objetos, son las cosas que el objeto es responsable de hacer. Por ejemplo, el puesto rutatlantica en este caso NO es responsable de cambiar el kilometraje de los camiones, pero SI es responsable de cobrarle a pdepCargas una cantidad que debe calcular.

Podríamos hacer un segundo approach:

```
object rutatlantica {
  method pasar(unCamion) {
    pdepCargas.cobrar(7000 + 100 * unCamion.pesoCarga() / 1000)
    unCamion.recorrerRuta(400, unCamion.velocidadMaxima().min(75))
  }
}
```

Ahora vemos que le vamos a querer decir a un camión que recorra una ruta. ¿Esto funciona para todos los camiones que hicimos? ¿Qué pasa con la firma del método en los diferentes camiones? ¿Y si no definimos el método?

¿Queremos que el método funcione para todos los camiones? Sí, ya que a todo camión que pase por el puesto se le debe mandar un mensaje para que recorra 400 kms y a 75 km/h como máximo.

De esto surge el `polimorfismo`: Queremos que `recorrerRuta(kilometraje, velocidad)` lo entiendan todos los camiones, para que rutatlántica los pueda usar indistintamente. Es decir, el `polimorfismo` en objetos es la capacidad de que un objeto pueda utilizar indistintamente a otros objetos, siendo que potencialmente estos otros sean distintos. Con esto en mente, deberíamos cambiar el método `recorrerRuta` en todos los camiones:

```
object camionGanado {
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

- Se encarga de realizar el cobro a pdepCargas
- Realiza el cálculo para saber cuánto hay que cobrarle
- Le dice a un camión que recorra una ruta
- Calcula la velocidad a la cual el camión debe de recorrer la ruta


Dentro de estas cuatro cosas que está haciendo el método `pasar()`, ¿Es `responsable` el método de hacerlo todo? ¿A qué nos referimos por `responsable`?

Nos referimos por `responsabilidad`, en métodos, a eso que el método debe de hacer. Es decir, por ejemplo, que nuestro método `pasar()` tiene responsabilidad “de más”: Cuando pasa un camión sólo le queremos cobrar a pdepCargas una cantidad y decirle al camión que recorra la ruta. El resto de la lógica podríamos abstraerla, para poder tener un código más legible y con métodos con sus respectivas “responsabilidades”.


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

- [Código de la clase]()
- [Video de la clase](https://drive.google.com/file/d/1gFTPSS11aW4aT1XUbvFZbK9DPq1Zmv_X/view?usp=sharing)
- [Pdep cargas](https://docs.google.com/document/d/1TIcIGa_rabX2MK9lR-AIDlhsCQ56a6HmakGah_zyl6g/edit#)
