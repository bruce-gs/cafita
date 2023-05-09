import { EmbedBuilder } from 'discord.js';

export default {
  name: 'avatar',
  category: 'Information',
  description: 'Muestra el avatar del usuario mencionado o del autor.',
  example: '[prefix]avatar @Gwee',
  usage: '[prefix]avatar <@user>, <userId>',
  aliases: [ 'profilepic', 'icon' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Creando el embedAvatar del usuario mencionado */
      const user = msg.mentionUser;
      const avatar = user.displayAvatarURL({ size: 4096, dynamic: true }); 
      const embedAvatar = new EmbedBuilder()
        .setTitle(`Avatar de **${user.username}**`)
        .setImage(avatar)
        .setDescription(`[Enlace para el navegador](${avatar})`)
        .setColor(msg.randomColorPastel)
        .setFooter({ text: `${this.name}`, iconURL: client.user.avatarURL() })
        .setTimestamp();
      /** Respondiendo al comando */
      message.reply({
        embeds: [ embedAvatar ]
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