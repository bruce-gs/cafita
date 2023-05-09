import { EmbedBuilder } from 'discord.js';

export default {
  name: 'about',
  category: 'Support',
  description: 'Información general sobre el bot.',
  example: '[prefix]about',
  usage: '[prefix]about',
  aliases: [ 'acercade' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Creamos el embed para el comando */
      const embedAbout = new EmbedBuilder()
        .setColor('2F2F2F')
        .setTitle(`Algo de información sobre mí`)
        .setDescription(
`**Nombre:** ${msg.clientUsername}
**Discriminador:** ${msg.clientDiscriminator}
**ID:** ${msg.clientId}
**Fecha de creación:** <t:${Math.floor(client.user.createdAt / 1000)}:d> (<t:${Math.floor(client.user.createdAt / 1000)}:R>)
**Idioma:** Español (México)
**Prefijo por defecto:** \`. (.help)\`
**Servidores presente:** ${client.guilds.cache.size}
**Owner:** <@625883579062288386>
**Servidor de soporte:** [Enlace a mi servidor](https://discord.gg/VwDZWHJrkt)`
        )
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({
          text: `${msg.clientUsername}, creada usando discord.js`,
          iconURL: client.user.avatarURL()
        });
      /** Respondiendo al comando */
      message.reply({
        embeds: [ embedAbout ]
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