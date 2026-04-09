# pdep-lunes bitácora

## 📖 ¿Cómo crear un post?

1. **Crear el archivo**

   Cada post vive en su propia carpeta dentro de `src/content/blog/`, siguiendo esta estructura:

   ```
   src/content/blog/{año}/{paradigma}/{nombre-clase}/index.md
   ```

   Por ejemplo:
   ```
   src/content/blog/2025/funcional/clase-03/index.md
   ```

   Eso genera la URL: `https://pdep-lunes.github.io/bitacora/2025/funcional/clase-03`

   Los paradigmas disponibles son: `funcional`, `logico`, `objetos`.

2. **Respetar el frontmatter**

   Todo post debe comenzar con este bloque de metadata:

   ```yaml
   ---
   title: Título de la clase
   date: 'AAAA-MM-DD'
   description: 'Una descripción breve sobre el contenido de la clase'
   tags: [funcional, orden-superior, listas]
   ---
   ```

   - `title`: aparece como encabezado en la página y en el listado.
   - `date`: se usa para ordenar los posts. Formato `AAAA-MM-DD`.
   - `description`: texto que se muestra debajo del título en el listado.
   - `tags`: lista de etiquetas relacionadas al contenido.

3. **Escribir en markdown**

   El contenido del post se escribe en [Markdown](https://guides.github.com/features/mastering-markdown/). También se puede usar [MDX](https://mdxjs.com/) si se necesitan componentes de Astro (renombrando el archivo a `index.mdx`).

   Para bloques de código Wollok, usar la etiqueta `wollok`:

   ````
   ```wollok
   object pepita {
     var energia = 100
     method volar() {
       energia -= 10
     }
   }
   ```
   ````

4. **Agregar imágenes**

   Poner las imágenes dentro de la misma carpeta del post y referenciarlas con una ruta relativa:

   ```
   src/content/blog/2025/funcional/clase-03/diagrama.png
   ```

   ```markdown
   ![texto alternativo](./diagrama.png "Título opcional")
   ```

   Alternativamente, las imágenes que se reutilicen en varios posts pueden ir en `public/` y referenciarse con ruta absoluta: `![texto](./diagrama.png)`.

5. **Hacer un PR (pull request)**

   Crear una rama con los cambios, hacer el commit del `index.md` (y cualquier imagen) y abrir un PR contra `main`. Una vez mergeado, el workflow de GitHub Actions construye y publica el sitio automáticamente en `https://pdep-lunes.github.io`.
