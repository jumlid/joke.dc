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
        "save": "to save all the changes",
        "help": "read all the available cammands",
        "joke": "To send joke",
        "start": "To start the timer"

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
                let older_Data = fs.readFileSync('./data.json', 'utf8') // This is to restore the data lose from the bot restart and stuff
                older_Data = JSON.parse(older_Data)
                if (m.guild.id in older_Data) {
                    steve_memory[m.guild.id] = older_Data[m.guild.id]
                }
                else {
                    // This is same as above i used two of them because in case of a server restart i'll lose the temp data so this will maintain my structure hehe

                    steve_memory[m.guild.id] = {
                        "name": m.guild.name,
                        "id": m.guild.id,
                        "category": { ...steve.category },// Here i used spread oprator since js stored non premitive data as refrence 

                    }

                }













            }






            if (m.content.split(' ')[1] in steve.cammands) {

                console.log(steve_memory[m.guild.id])
                //   console.log(steve_memory)

                switch (m.content.split(' ')[1]) {
                    case "add":
                        if (m.content.split(' ')[2] in steve.category) {
                            if (JSON.parse(m.content.split(' ')[3]) === true || JSON.parse(m.content.split(' ')[3]) === false) {

                                steve_memory[m.guild.id].category[m.content.split(' ')[2]] = JSON.parse(m.content.split(' ')[3])
                                console.log('fir', steve_memory)
                                m.channel.send(`Chaning steve setting category ${m.content.split(' ')[2]} to ${m.content.split(' ')[3]}  `)


                            }
                            else {
                                m.channel.send(`${m.content.split(' ')[3]} isn't a boolean value a boolean value can be either true(on) or false(off)`)
                            }
                        }
                        else {
                            m.channel.send(`${m.content.split(' ')[2]} isn't a valid category please check the spelling or check the case(uppercase/lowercase) by cammand sudo status`)
                        }

                        break;
                    case "status":
                        //       console.log('second', steve_memory[m.guild.id].category)
                        m.channel.send(JSON.stringify(steve_memory[m.guild.id].category))


                        break;
                    case "save":


                        save(m.guild.id)
                        break;
                    case "help":
                        m.channel.send('1) sudo status: to view all the available category \n 2) sudo add <category> <true/false> to change the  joke according to your liking \n 3) sudo start to save all the previous cammand and to start the bot ')
                        break;
                    case "joke":
                        joke(steve_memory[m.guild.id].url)
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
        older_message[m.guild.id].url_a = []
        Object.entries(older_message[id].category).forEach(e => {
            // console.log(e[1])
            if (e[1]) {

                older_message[m.guild.id].url_a.push(e[0])
                console.log(e[0])
            }

        })
        older_message[m.guild.id].url = older_message[m.guild.id].url_a.join(',')
        if (url.split(',').length < 4) {
            m.channel.send('please select atleast 4 category else you may face API error ')

        }
        //   joke(older_message[m.guild.id].url)

        m.channel.send('setting saved ')

        older_message = JSON.stringify(older_message)
        fs.writeFileSync('./data.json', older_message)
        console.log('already')
    }
    function joke(url) {

        let play = false
        console.log(url.split(',').length)


        if (url.split(',').length === 1) {
            play = true
            url = 'any'
            console.log('a', url)
        }
        if (play) {



            fetch(`https://v2.jokeapi.dev/joke/${url}`)
                .then(res => res.json())
                .then(data => {
                    m.channel.send(data.setup.trim())
                    if (data.delivery.trim() != "") {
                        m.channel.send(data.delivery.trim())
                    }

                    console.log(data)

                })
                .catch(() => {
                    m.channel.send('API error')
                })
        }
    }

    setTimeout(() => { })  // why don't i create a timer according to users  ? i'm lazy af don't wana think so hard BRAIN 404 just chill with every hour hehe 

})
c.login('token')
