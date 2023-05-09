export default {
  name: '8ball',
  category: 'Entertainment',
  description: 'Genera una respuesta aleatoria a una pregunta.',
  example: '[prefix]8ball ¿Voy a ganar la lotería?',
  usage: '[prefix]8ball <question>',
  aliases: [ 'magicball', 'predict', 'question' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Retornar si no hay pregunta */
      if(!args[0]) return message.reply({
        content: `**${msg.authorUsername}** debes preguntar algo...`
      });
      /** Definiendo las respuestas y eligiendo una al azar */
      const response = [
        'sí 😼',
        'no 😿',
        'tal vez 🫢',
        'definitivamente no 😢',
        'absolutamente si 😎',
        'de ninguna manera 😡',
        'por supuesto 🤩',
        'no lo sé 😔',
        'pregunta de nuevo más tarde 🙄'
      ][Math.floor(Math.random() * 9)];
      /** Respondiendo al comando */
      message.reply({
        content: `🎱 **${message.author.username}** ${response}`
      });
    } catch (err) {
      /** Enviando mensaje de alerta en caso de error */
      message.reply({
        content: `Ups! ha ocurrido un error al ejecutar el comando \`${this.name}\`.\n\n\`\`\`${err.stack}.\`\`\``
      });
      /** Registrando el error en consola */
      console.log(err);
    };
  }
};