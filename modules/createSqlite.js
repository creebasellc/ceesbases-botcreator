module.exports = {
    SQLITEDB: function (dbpath){
        const sqlite3 = require('sqlite3')
        const db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
        }); 
        return db;
    }
}