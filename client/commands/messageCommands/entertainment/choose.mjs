export default {
  name: 'choose',
  category: 'Entertainment',
  description: 'Comando para elegir una opción al azar.',
  example: '[prefix]choose Estudiar, Dormir, Ver una película, Salir con amigos',
  usage: '[prefix]choose <option1>, <option2>',
  aliases: [ 'select', 'decide', 'elegir' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Definiendo y escogiendo entre las opciones */
      const options = args.join(' ').split(',').map(option => option.trim());
      const filteredOptions = options.filter(option => option !== '')
      if (filteredOptions.length < 2) return message.reply({
        content: `**${msg.authorUsername}** necesito dos o más opciones para poder escoger.`
      });
      const chooseOption = filteredOptions[Math
        .floor(Math.random() * filteredOptions.length)];
      /** Respondiendo al comando */
      message.reply({
        content: `🔮 Mi elección es: **${chooseOption}**.`
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