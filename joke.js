
const { Client, GatewayIntentBits, Guild } = require('discord.js')
const fs = require('fs')
const { parse } = require('path')
const c = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] })

let steve_memory = {
    // This is just a temp memory it will hold users temp data like temp settings and stuff untill users tyoe cammand to save
}
// These are the some of the common propterty which applied to every new users untill it's changed 
let steve = {
    "cammands": {
        "add": "Used to add new genre",
        "status": "used to check all the active genre",
        "start": "use to start the service",
        "help": "read all the available cammands"
    },
    "category": {
        "Programming": false,
        "Misc": false,
        "Dark": false,
        "Pun": false,
        "spooky": false,
        "christmas": false

    },
    "part": {
        "twopart": true,
        "single": false

    }


}
let older_message;
let prefix = "sudo"
c.on('guildCreate', (guild) => {
    // this program will automatically create a format if  a  bot is added into new server 
    steve_memory[guild.id] = {
        "name": guild.name,
        "id": guild.id,
        "category": { ...steve.category },

    }








})
c.once('ready', () => {
    console.log('ready')
})

c.on('messageCreate', (m) => {

    if (!m.author.bot) {
        if (m.content.toLocaleLowerCase().startsWith(prefix)) {
            //     console.log(m.content.split(' ')[1])
            if (m.guild.id in steve_memory) {

            }
            else {
                // This is same as above i used two of them because in case of a server restart i'll lose the temp data so this will maintain my structure hehe
                steve_memory[m.guild.id] = {
                    "name": m.guild.name,
                    "id": m.guild.id,
                    "category": { ...steve.category },// Here i used spread oprator since js stored non premitive data as refrence 

                }

            }






            if (m.content.split(' ')[1] in steve.cammands) {
                let o = fs.readFileSync('./data.json', 'utf8') // This is to restore the data lose from the bot restart and stuff
                o = JSON.parse(o)
                if (m.guild.id in o) {
                    steve_memory[m.guild.id] = o[m.guild.id]

                }
                //   console.log(steve_memory)

                switch (m.content.split(' ')[1]) {
                    case "add":
                        if (JSON.parse(m.content.split(' ')[3]) === true || JSON.parse(m.content.split(' ')[3]) === false) {

                            steve_memory[m.guild.id].category[m.content.split(' ')[2]] = JSON.parse(m.content.split(' ')[3])
                            console.log(steve_memory)
                            m.channel.send(`Chaning steve setting category ${m.content.split(' ')[2]} to ${m.content.split(' ')[3]}  `)


                        }
                        else {
                            m.channel.send(`${m.content.split(' ')[3]} isn't a boolean value a boolean value can be either true(on) or false(off)`)
                        }
                        break;
                    case "status":

                        m.channel.send(JSON.stringify(steve_memory[m.guild.id].category))


                        break;
                    case "start":


                        save(m.guild.id)
                        break;
                    case "help":
                        m.channel.send('1) sudo status: to view all the available category \n 2) sudo add <category> <true/false> to change the  joke according to your liking \n 3) sudo start to save all the previous cammand and to start the bot ')
                        break;

                    default:

                        break;
                }

            }
            else {
                m.channel.send('`Cammand not found`')
            }

        }


    }

    function save(id) {
        older_message = fs.readFileSync('./data.json', 'utf8')
        older_message = JSON.parse(older_message)
        older_message[id] = steve_memory[id]




        m.channel.send('setting saved ')

        older_message = JSON.stringify(older_message)
        fs.writeFileSync('./data.json', older_message)
        console.log('already')
    }


    setTimeout(() => { })  // why don't i create a timer according to users  ? i'm lazy af don't wana think so hard BRAIN 404 just chill with every hour hehe 

})
c.login('')
