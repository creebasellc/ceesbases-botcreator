module.exports = {
    projectspace: class {
        constructor (projectpath,projecttype, service){
            const fs = require('fs');
            const path = require('path');
            
            this.projecttype = projecttype;
            this.servicedata = service;

            if(!fs.existsSync(projectpath)){
                fs.mkdirSync(projectpath);
            }
            if(!fs.existsSync(`${projectpath}/package.json`)){
                const content = `
                "dependencies": {
                    "cookie-parser": "~1.4.4",
                    "debug": "~2.6.9",
                    "discord.js": "^14.11.0",
                    "ejs": "~2.6.1",
                    "express": "^4.18.2",
                    "express-session": "^1.17.3",
                    "http-errors": "~1.6.3",
                    "morgan": "~1.9.1",
                    "mysql": "^2.18.1",
                    "nodemailer": "^6.9.3",
                    "nodemon": "^2.0.22",
                    "request": "^2.88.2"
                  }`
                fs.writeFileSync(`${projectpath}/package.json`, content);
            }
            if(!fs.existsSync(`${projectpath}/configuration/`)){
                fs.mkdirSync(`${projectpath}/configuration/`);
            }
            if(!fs.existsSync(`${projectpath}/src/`)){
                fs.mkdirSync(`${projectpath}/src/`);
            }
            if(!fs.existsSync(`${projectpath}/src/commands`)){
                fs.mkdirSync(`${projectpath}/src/commands`);
            }
            if(!fs.existsSync(`${projectpath}/src/commands/fun`)){
                fs.mkdirSync(`${projectpath}/src/commands/fun`);
            }
            if(!fs.existsSync(`${projectpath}/server/`)){
                fs.mkdirSync(`${projectpath}/server/`);
            }
            if(!fs.existsSync(`${projectpath}/server/routes`)){
                fs.mkdirSync(`${projectpath}/server/routes`);
            }
            console.log('[nodejs:ZaysScriptor:projectspace] project space has been filled with folders.. creating files');
            setTimeout(() => {
                if(!fs.existsSync(`${projectpath}/configuration/`)){
                    fs.writeFileSync(`${projectpath}/configuration/bot.json`, JSON.stringify({
                        name: service.name,
                        description: service.description,
                        author: service.author,
                        token: service.token,
                        prefix: service.prefix
                    })
                    )
                }
                if(fs.existsSync(`${projectpath}/configuration/`)){
                    fs.writeFileSync(`${projectpath}/configuration/commands.json`, JSON.stringify({
                        commands: []
                    }))
                }
                if(fs.existsSync(`${projectpath}/configuration/`)){
                    fs.writeFileSync(`${projectpath}/configuration/events.json`, JSON.stringify({
                        events: []
                    }))
                }
                if(fs.existsSync(`${projectpath}/src/`)){
                    const content = `
                    const botdetails = require('./configuration/bot.json');
                    const commands = require('./configuration/commands.json');
                    const events = require('./configuration/events.json');
                    const { Client, Events, Collection,ActivityType, GatewayIntentBits, Routes, REST } = require('discord.js');
                    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
                    const fs = require('node:fs');
                    const path = require('node:path');
                    client.commands = new Collection();
                    const foldersPath = path.join(__dirname, 'commands');
                    const commandFolders = fs.readdirSync(foldersPath);
                    for (const file of commandFiles) {
                        const filePath = path.join(commandsPath, file);
                        const command = require(filePath);
                        // Set a new item in the Collection with the key as the command name and the value as the exported module
                        if ('data' in command && 'execute' in command) {
                            client.commands.set(command.data.name, command);
                        } else {
                            console.log('[WARNING] The command at ./COMMANDS is missing a required "data" or "execute" property.');
                        }
                    }
                
                client.on(Events.InteractionCreate, async interaction => {
                    if (!interaction.isChatInputCommand()) return;
                
                    const command = interaction.client.commands.get(interaction.commandName);
                
                    if (!command) {
                        console.error('No command matching that name was found.');
                        return;
                    }
                
                    try {
                        await command.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        if (interaction.replied || interaction.deferred) {
                            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                        } else {
                            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                        }
                    }
                });
                const commands = [];    
            for (const folder of commandFolders) {
                const commandsPath = path.join(foldersPath, folder);
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const filePath = path.join(commandsPath, file);
                    const command = require(filePath);
                    if ('data' in command && 'execute' in command) {
                        commands.push(command.data.toJSON());
                    } else {
                        console.log('[WARNING] The command at ./commands is missing a required "data" or "execute" property.');
                    }
                }
            }
            const rest = new REST().setToken('${service.token}');
            (async () => {
                try {
                    const data = await rest.put(
                        Routes.applicationCommands('${service.id}'),
                        { body: commands },
                    );
                } catch (error) {
                    console.error(error);
                }
            })()
            const app = reuqire('../server/server.js')
            app.listen(3000, () => {
                if(err) throw err;
                console.log('[nodejs:ZaysScriptor:projectspace] project space is beening hosted on port 3000');
            })
            module.exports = { client }
                    `
            fs.writeFileSync(`${projectpath}/src/main.file.js`, content)
                }
                if(fs.existsSync(`${projectpath}/src/command/`)){
                    const content = `
                    const { SlashCommandBuilder } = require('discord.js');
    
                    module.exports = {
                        data: new SlashCommandBuilder()
                            .setName('ping')
                            .setDescription('Replies with Pong!'),
                        async execute(interaction) {
                            await interaction.reply('Pong!');
                        },
                    };
                    `
                    fs.writeFileSync(`${projectpath}/src/command/fun/ping.js`, content);
                }
        
                if(fs.existsSync(`${projectpath}/server/views/`)){
                    const content = `
                    <!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
                        <title> <%= title %></title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                    </head>
                    <body>
                        <header class="bg-primary text-center p-5">
                        <h1> <%= title %></h1>
                        <p> A Discord Bot Dashboard</p>
                        </header>
                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                            <h2>Start Bot</h2>
                            <form method="post" action="/start">
                                <input type="submit" class="btn btn-primary" value="Start Bot">
                            </form>
                            </div>
                        </div>
                        <div class="footer">
                        <div class="container">
                            <div class="row">
                            <div class="col-sm-6">
                                <p class="text-muted">Copyright &copy; 2023</p>
                                <p class="text-muted">Made By: ZayTheDev ♥</p>
    
                            </div>
                        </div>
                        </div>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
                    </body>
                    </html>
                    `
                    fs.writeFileSync(`${projectpath}/server/views/index.ejs`, content);
                }
    
                if(!fs.existsSync(`${projectpath}/server/routes`)){
                    fs.mkdirSync(`${projectpath}/server/routes`);
                }
                if(fs.existsSync(`${projectpath}/server/routes/`)){
                    const content = `
                    var router = express.Router();
                    /* GET home page. */
                    router.get('/', function(req, res, next) {
                    res.render('index', { title: '${service.name}' });
                    });
                    router.post('/start', function(req, res, next) {
                        const client = require('../server/main.file')
                        client.login('${service.token}')
                    });
                    module.exports = router;
                    `
                    fs.writeFileSync(`${projectpath}/server/routes/index.js`, content);
                }
                if(fs.existsSync(`${projectpath}/server/`)){
                    const content = `
                    var createError = require('http-errors');
                    var express = require('express');
                    var path = require('path');
                    var cookieParser = require('cookie-parser');
                    var logger = require('morgan');
                    var session = require('express-session');
                    var indexRouter = require('./routes/index');
    
                    var app = express();
    
                    // view engine setup
                    app.set('views', path.join(__dirname, 'views'));
                    app.set('view engine', 'ejs');
    
                    app.use(logger('dev'));
                    app.use(express.json());
                    app.use(express.urlencoded({ extended: false }));
                    app.use(cookieParser());
                    app.use(express.static(path.join(__dirname, 'public')));
                    app.use(session({secret: "bots"}));
                    app.use('/', indexRouter);
    
                    // catch 404 and forward to error handler
                    app.use(function(req, res, next) {
                    next(createError(404));
                    });
    
                    // error handler
                    app.use(function(err, req, res, next) {
                    // set locals, only providing error in development
                    res.locals.message = err.message;
                    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
                    // render the error page
                    res.status(err.status || 500);
                    res.render('error');
                    });
    
                    module.exports = app;
                    `
                    fs.writeFileSync(`${projectpath}/server/server.js`, content);
                }
                if(fs.existsSync(`${projectpath}/server/views/`)){
                    const content = `
                    <!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
                        <title> <%= title %></title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                    </head>
                    <body>
                        <header class="bg-primary text-center p-5">
                        <h1> <%= title %></h1>
                        <p> A Discord Bot Dashboard</p>
                        </header>
                        <h1><%= message %></h1>
                        <h2><%= error.status %></h2>
                        <pre><%= error.stack %></pre>
                        <div class="footer">
                        <div class="container">
                            <div class="row">
                            <div class="col-sm-6">
                                <p class="text-muted">Copyright &copy; 2023</p>
                                <p class="text-muted">Made By: ZayTheDev ♥</p>
    
                            </div>
                        </div>
                        </div>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
                    </body>
                    </html>
    
    
                    `  
                    fs.writeFileSync(`${projectpath}/server/views/error.ejs`, content);         
                }
            },1000)      
         }
    }
}