const discord = require('discord.js');

const info = {
	name: 'restart',
	version: '1.0',
	usage: 'restart',
	description: 'Restarts the bot.'
};

function exec(args, vars) {
	if(vars.msg.author.id === vars.config.owner) {
		var embed = new discord.MessageEmbed()
		.setTitle('Restarting...')
		.setColor('#33ff36');
		try { 
			vars.msg.reply({embeds:[embed]})
			.then(msg => {
				setTimeout(() => msg.delete(), 3000)
			});
		} catch(err) { console.log(err); }
		setTimeout(() => {
			process.exit(0);
		}, 250);
	} else {
		var embed = new discord.MessageEmbed()
		.setTitle('Access Denied')
		.setColor('#ff5733');
		try { 
			vars.msg.reply({embeds:[embed]})
			.then(msg => {
				setTimeout(() => msg.delete(), 3000)
			});
		} catch(err) { console.log(err); }
	}
}

exports.info = info;
exports.exec = exec;