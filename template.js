const {service} = require("./bin/lib/service");
service.create.bot_configuration_files('./test', {
    name: 'bot_name',
    description: 'bot_description',
    author: 'bot_author',
    id: 'bot_id',
    token: 'bot_token',
    prefix: '/'
})
