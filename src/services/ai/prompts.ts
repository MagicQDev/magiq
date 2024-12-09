export const prompts = [
  {
    socialMedia: "Instagram",
    type: "post",
    prompt: `crea la descripción perfecta y los hashtags adecuados para una publicación nueva en instagram de un restaurante local. Para ello, utiliza la siguiente información sobre el plato y el restaurante:

        Sobre el plato:

        Nombre del plato: [product_name]
        Descripción del plato: [product_description]
        Descripción adicional: [sabor_destacado]
        Presentación: [presentacion]
        Ocasión: [ocasion]

        Sobre el restaurante:

        Ubicación: [ubicacion]
        Nombre del restaurante: [nombredelrestaurante]

        Información adicional:

        Promoción especial: [promocion_especial]
        Evento: [evento]

        Con esta información, crea maximo una descripción que incluya:

        Un gancho atractivo: Una frase corta que llame la atención del usuario.
        Los ingredientes principales: Destacando los sabores y texturas.
        La presentación del plato: Describiendo cómo se ve y qué lo hace especial.
        Una llamada a la acción: Invitando a los usuarios a probar el plato.
        Los valores de la marca: Reflejando la personalidad del restaurante.
        Y seleccionar hashtags relevantes como:

        Relacionados con la comida: genera hashtags basado en la descripcion y tipo de comida y el publico objetivo.
        Relacionados con la ubicación: genera hashtags de la ciudad o barrio donde se encuentra el restaurante.
        Relacionados con la ocasión: genera hashtags relacionados con la ocasion del plato.
        Relacionados con la promocion: genera hashtags relacionados con la promocion del plato.
        Hashtags de marca: agrega siempre el hashtag del nombre del restaurante, #[nombredelrestaurante]

        Ejemplo de descripción:

        "Nuestra nueva pasta al pesto es una explosión de sabor en cada bocado.  Con albahaca fresca, queso parmesano y nueces, es el plato perfecto para los amantes de la comida italiana. ¡Ven a probarla y déjate llevar por el aroma! #pastaalpesto #italianfood #foodie #[nombredelrestaurante] "

        Además, recuerda no incluir más de 6 hashtags por publicación y cada descripción debe tener entre 100 y 300 caracteres.

        Nunca olvides y respeta las siguientes reglas:
        -Utilizar emojis: Para hacer la descripción más visual y divertida.
        -Incluir hashtags: Para aumentar la visibilidad de la publicación.
        -Incluir el hashtag de la marca: #[nombredelrestaurante]
        -Si algun campo tiene el valor "NO APLICA", no lo incluyas en la descripción.
        -Si algun campo tiene el valor "NO APLICA", no incluyas hashtags relacionados.
        -Las promociones y eventos son opcionales, si "NO APLICA", no los incluyas en la descripción.
        -Si la promocion o evento aplica, incluye hashtags relacionados siempre.
        -Si el plato es para una ocasión especial, incluye hashtags relacionados siempre.
        -Siempre incluye hashtags relacionados con la ubicación del restaurante.
        -NUNCA crees un hashtag con solo mayusculas. Ej: #COMIDAITALIANA es incorrecto, debe ser #comidaitaliana
        -NUNCA crees hashtags con espacios: Ej #comida italiana es incorrecto o #fin de año, debe ser #comidaitaliana #findeaño
        -Máximo 6 hashtags por publicación.
        -No superar los 300 caracteres.
        -separa cada descripción con un salto de linea.
        -Siempre da prioridad a hashtags que ayuden a posicionar la publicación. ej: #comidaitaliana #pastaalpesto es mejor que #delicioso #rico

        
        Recuerda ser creativo y original en tus descripciones.
    `,
    keys: [
      "product_name",
      "product_description",
      "sabor_destacado",
      "presentacion",
      "ocasion",
      "ubicacion",
      "nombredelrestaurante",
      "promocion_especial",
      "evento",
      "cantidad_resultados",
    ],
  },
];
