const { prefix, color } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'Lists all available commands or info about a specific one.',
  args: false,
  usage: '<Command>',
  execute(message, args) {
    const { commands } = message.client;
    var embed = new Discord.MessageEmbed().setColor(color);
    if (!args.length) {
      // Send general help
      embed
        .setTitle('Help')
        .addField('Here\'s a list of available my commands:', commands.map(command => command.name).join(', '))
        .setFooter(`You can send "${prefix}help [command name]" to get info about a specific command!`);
    }
    else {
      // Handle specific command
      const command_name = args[0].toLowerCase();
      const command = commands.get(command_name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));
      if (!command) {
        return message.reply('That\'s not a valid command!');
      }

      embed
        .setTitle(`${command_name} command`)
        .setDescription(command.description)
        .addField('Usage', `${prefix}${command_name} ${command.usage}`);
      if (command.aliases) embed.addField('Aliases', command.aliases.join(', '));
    }

    return message.channel.send(embed);
  },
};
