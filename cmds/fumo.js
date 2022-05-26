const discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json')

const info = {
	name: 'fumo',
	version: '1.0',
	usage: 'fumo fileName',
	description: 'Gets you a neat fumo :)'
};

function exec(args, vars) {

	function searchFumos(search) {
		var items = [];
		var file = fs.readdirSync(config.fumoFolder);
		const files = file.map(file => file.toLowerCase());
		for(var file of files) {
		  if(search.every(v => file.includes(v))) {
			  items.push(file);
		   }}
		return items;
	}

	var filter = args.join(' '); //if the arguments are an array by default
	var search = filter.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' '); //Cleans up the filter removing special characters and puts everything in lowercase
	var items = searchFumos(search); //calls function to get all the fumos filtered
	console.log(items); //Just for debugging
	if (items.length > 0) {

		var fumoSend = items[Math.floor(Math.random() * items.length)]; //gets random file from that list
		console.log(fumoSend);
		var finalSend = "/fumoFolder/" + fumoSend;
		console.log(finalSend);

		var embed = new discord.MessageEmbed()
		.setColor("#07B05F")
		.setTitle(fumoSend)
		.setDescription("Here ya go!" + ' <@!' + vars.msg.author + '>')
		.setImage(url='attachment://fumoSend')
		.setTimestamp()
		vars.msg.reply({embeds:[embed], files:[finalSend]});
		// vars.msg.reply("Here you go " + '<@!' + msg.author + '>', {files: [{attachment: config.fumoFolder + FumoSend}]});			Archived
		vars.msg.react('✅');
	} else {
		searchFumos();
		var consolationFumo = items[Math.floor(Math.random() * items.length)];
		console.log("epic fail");

		var embed = new discord.MessageEmbed()
		.setTitle('Sorry I couldn\'t find a file with that search')
		.setColor("#ff3c33")
		.setDescription('Here\'s a consolation fumo :3')
		.setImage([{attachment: config.fumoFolder + consolationFumo}])
		.setTimestamp();
		vars.msg.reply({embeds:[embed]});
		// vars.msg.reply("No fumo found, EPIC FAIL!||, only send one word after the command to make it easier||");			Archived
}}

exports.info = info;
exports.exec = exec;
