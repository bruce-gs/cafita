export default {
  name: 'roll',
  category: 'Entertainment',
  description: 'Tira un dado y obtén un número al azar.',
  example: '[prefix]roll 20',
  usage: '[prefix]roll <number>',
  aliases: [ 'lanzar', 'tirar' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Constantes para obtener un número al azar */
      const max = Math.max(Math.min(parseInt(args[0]) || 100, 1000), 1);
      const result = Math.floor(Math.random() * max) + 1;
      /** Respondiendo al comando */
      message.reply({
        content: `🎲 **${msg.authorUsername}** ha tirado un dado de \`${max}\` y ha obtenido un \`${result}\`!`
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