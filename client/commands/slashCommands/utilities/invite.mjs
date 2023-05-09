import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  name: 'invite',
  category: 'Utilities',
  description: '¡Invítame a tu servidor!',
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('¡Invítame a tu servidor!')
    .addStringOption(option => option
      .setName('visibilidad')
      .setDescription(`Visible u oculto para los demás.`)
      .setRequired(true)
      .addChoices(
        { name: 'Visible', value: 'visible' },
        { name: 'Oculto', value: 'oculto' }
      )),
  async execute (interaction, data) {
    try {
      /** Creamos un nuevo embed para nuesto comando */
      const embedInvite = new EmbedBuilder()
        .setColor('C8A2C8')
        .setTitle(`Enlace de invitación`)
        .setDescription(`¡Hola **${data.authorUsername}**!\nAñádeme a tu servidor usando el siguiente enlace de invitación: [Click para invitarme](https://discord.com/api/oauth2/authorize?client_id=1089322740139438101&permissions=8&scope=bot).`)
        .setFooter({
          text: `${this.name}`,
          iconURL: interaction.client.user.avatarURL() })
        .setTimestamp();
      /** Definimos si el comando estará oculto o visible */
      const visibilityOption = interaction.options.getString('visibilidad');
      const visibility = { 'visible': false, 'oculto': true }[visibilityOption];
      /** Respondemos al comando */
      interaction.reply({
        embeds: [ embedInvite ],
        ephemeral: visibility
      });
    } catch (err) {
      /** Enviando mensaje de alerta en caso de error */
      interaction.reply({
        content: `Ups! ha ocurrido un error al ejecutar el comando \`${this.name}\`.\n\n\`\`\`${err.stack}.\`\`\``,
        ephemeral: true
      });
      /** Registrando el error en consola */
      console.log(err);
    };
  }
};