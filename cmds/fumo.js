const discord = require('discord.js');
const fs = require('fs');
//const requireDirectory = require('require-directory');
const config = require('../config.json');
const path = require("path");
const talkedRecently = new Set();

const info = {
	name: 'fumo',
	version: '1.0',
	usage: 'fumo fileName',
	description: 'Gets you a neat fumo :)'
};

function exec(args, vars) {
	if ((talkedRecently.has(vars.msg.author.id)) && (vars.msg.author.id !== vars.config.owner)) {
		var embed = new discord.MessageEmbed()
		.setColor("#f03607")
		.setTitle("Shut up")
		.setDescription("Bro calm tf down" + ' <@!' + vars.msg.author + '>')
		.setTimestamp();
		vars.msg.reply({embeds:[embed]})
			.then(msg => {
				setTimeout(() => msg.delete(), 3000)
			});
	} else {
		//Puts user in cooldown
		talkedRecently.add(vars.msg.author.id);
		setTimeout(() => {
			// Removes the user from the set after a minute
			talkedRecently.delete(vars.msg.author.id);
		}, 8000);

		function searchFumos(search) {
			var items = [];
			var file = fs.readdirSync(path.resolve(__dirname, "../fumoFolder/"));
			var files = file.map(file => file.toLowerCase());
			for(var file of files) {
			if(search.every(v => file.includes(v))) {
				items.push(file);
			}}
			return items;
		}

		var filter = args.join(' '); //if the arguments are an array by default
		var search = filter.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' '); //Cleans up the filter removing special characters and puts everything in lowercase
		var items = searchFumos(search); //calls function to get all the fumos filtered
		//console.log(items); //Just for debugging
		if (items.length > 0) {

			var fumoSend = items[Math.floor(Math.random() * items.length)].replace(/[ ]/g, '\ '); //gets random file from that list, if youre on windows you dont need the .replace function, this is mostly for linux users.
			//console.log(fumoSend);
			var finalSend = "./fumoFolder/" + fumoSend;
			//console.log(finalSend);

			var embed = new discord.MessageEmbed()
			.setColor("#07B05F")
			.setTitle(fumoSend)
			.setDescription("Here ya go!" + ' <@!' + vars.msg.author + '>')
			.setTimestamp();
			vars.msg.reply({embeds:[embed], files:[finalSend]});
			// vars.msg.reply("Here you go " + '<@!' + msg.author + '>', {files: [{attachment: config.fumoFolder + FumoSend}]});			Archived
			vars.msg.react('✅');
		} else {
			var embed = new discord.MessageEmbed()
			.setTitle("Sorry I couldn't find a file with that search")
			.setDescription("Don't worry you aren't in cooldown.")
			.setColor("#ff3c33")
			.setTimestamp();
			vars.msg.reply({embeds:[embed]})
			.then(msg => {
				setTimeout(() => msg.delete(), 3000)
			});
			talkedRecently.delete(vars.msg.author.id);
			vars.msg.react('❎');
			// vars.msg.reply("No fumo found, EPIC FAIL!||, only send one word after the command to make it easier||");			Archived


		} 			

}}

exports.info = info;
exports.exec = exec;
