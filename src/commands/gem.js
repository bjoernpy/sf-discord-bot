const { color } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'gem',
  //aliases: ['gems'],
  description: 'Calculates the possible levels of a gem.',
  args: true,
  usage: '<Playerlevel> <Minelevel> <Knighthall>',
  execute(message, args) {
    if (args.length != 3) {
      return message.channel.send('Please enter three numbers.');
    }

    const playerlevel = parseInt(args[0]);
    const minelevel = parseInt(args[1]);
    const knighthall = parseInt(args[2]);

    // Check for positive integer
    if (isNaN(playerlevel) || isNaN(minelevel) || isNaN(knighthall)) {
      return message.channel.send('Please enter only numbers!');
    } else if (playerlevel < 1 || minelevel < 1 || knighthall < 1) {
      return message.channel.send('Please enter only positve nubmers!');
    }

    // Source for this calculation: https://sfgame.fandom.com/de/wiki/Edelsteine
    const max_value = Math.round(playerlevel * 0.4 * (1 + (minelevel - 1) * 0.15) + knighthall / 3);
    const min_value = Math.round(max_value * 0.85);

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Gem Calculator')
      .addField('Gem value',`${min_value}-${max_value}`)
      .addField('Provided levels',`Playerlevel: ${playerlevel}, Minelevel: ${minelevel}, Knighthall: ${knighthall}`);

    message.channel.send(embed);
  },
};
