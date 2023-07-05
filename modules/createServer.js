const express = require('express');
module.exports = {
    newHost: class {
        app = express();
        constructor(root){
            const fs = require('fs');
            const express = require('express');
            const app = express();
            if(!fs.existsSync(root)){
                fs.mkdirSync(root)
            }
            const service = {
                name: 'Crees_App_Hoster',
                version: '1.0.0',
                root: root
            }
            fs.writeFileSync(`${root}/host.json`,JSON.stringify(service))
        }
    }
}