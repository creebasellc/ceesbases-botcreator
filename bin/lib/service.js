const  { projectspace } = require("../system/projectspaceAPI.js")

const service = {}
service.create = {}
service.create.bot_configuration_files = function (dir,file_details = {
    name: "",
    description: "",
    author: "",
    token: "",
    prefix: "",
    id: "",
    port
}) {
    if(!dir) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] dir is required'
    if(!file_details.name) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] file_details.name is required'
    if(!file_details.description) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] file_details.description is required'
    if(!file_details.author) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] file_details.author is required'
    if(!file_details.token) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] file_details.token is required'
    if(!file_details.prefix) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] file_details.prefix is required'
    if(!file_details.id) throw '[nodejs:ZayScriptor:service:create:BOT_CONFIGURATION_FILES] file_details.id is required'
    const projectSpace = new projectspace(dir,"bot",file_details)
    console.log(projectSpace.servicedata)
}

module.exports = {
    service: service
}
