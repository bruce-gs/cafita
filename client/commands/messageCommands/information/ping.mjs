export default {
  name: 'ping',
  category: 'Information',
  description: 'Comando para comprobar la latencia entre el bot y el servidor.',
  example: '[prefix]ping',
  usage: '[prefix]ping',
  aliases: [ 'latencia', 'latency' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Respondiendo al comando */
      message.reply({
        content: `Pong **${msg.authorUsername}**! (◠‿◠) :ping_pong:\nLatencia: \`${msg.ping}ms\``
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