const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')

const { DisTube } = require("distube");


//const { connect } = require('mongoose')
//const Models = require('../database/models/Models')

const DistubeMusic = require('./Music.js');

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.owner = ["205042310851854336"]
        this.loadCommands()
        this.loadEvents()
        this.distube = DistubeMusic(this)
    }

    registryCommands() {
        // temporária
        //this.guilds.cache.get('884413878119829577').commands.set(this.commands)
        this.application.commands.set(this.commands)
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }

    /*async connectToDatabase() {
        const connection = await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log('Database conectada com sucesso!')

        this.db = { connection, ...Models }
    }*/
}