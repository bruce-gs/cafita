export default {
  name: 'flip',
  category: 'Entertainment',
  description: 'Lanza una moneda y devuelve cara o cruz.',
  example: '[prefix]flip',
  usage: '[prefix]flip',
  aliases: [ 'coinflip', 'caraocruz' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Obteniendo el resultado */
      const result = ['cara', 'cruz'][Math.floor(Math.random() * 2)];
      /** Respondiendo al comando */
      message.reply({
        content:
          `**${msg.authorUsername}**, la moneda cayó en \`${result}\`! 🪙😸`
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