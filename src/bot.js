const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, welcome_channel_id } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log("The Bot is now online.");
});

// Handling commands
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Read command and arguments
  const args = message.content.slice(prefix.length).split(/ +/);
  const command_name = args.shift().toLowerCase();
  const command = client.commands.get(command_name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));
  if (!command) return;

  // Check for required arguments
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: "${prefix}${command.name} ${command.usage}"`;
    }
    return message.channel.send(reply);
  }

  // Execute command
  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error);
    message.channel.send('An error occured while executing your command!');
  }

});

client.on('guildMemberAdd', member => {
  var channel;
  if (process.env.NODE_ENV === 'production') {
    channel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
  } else {
    channel = client.channels.cache.get(welcome_channel_id);
  }
  if (!channel) {
    console.log(`A new member called ${member.displayName} joined the Server ${member.guild.name}, but no welcome channel was found.`);
    return;
  }
  channel.send(`Welcome ${member.displayName} to our Server ${member.guild.name}. If you want my help call me with ${prefix}help.`);
});

// In production mode read the token from env
if (process.env.NODE_ENV === 'production') {
  client.login(process.env.BOT_TOKEN);
} else {
  client.login(token);
}
