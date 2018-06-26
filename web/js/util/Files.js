const util = require('util');
const fs = require('fs');

class Files {

    constructor() {
        this.readFileAsync = util.promisify(fs.readFile);
        this.writeFileAsync = util.promisify(fs.writeFile);
        this.mkdirAsync = util.promisify(fs.mkdir);
        this.accessAsync = util.promisify(fs.access);
        this.statAsync = util.promisify(fs.stat);
        this.unlinkAsync = util.promisify(fs.unlink);
        this.rmdirAsync = util.promisify(fs.rmdir);
    }

    // https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
    async readFileAsync(path) {

    }

    // https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
    async writeFileAsync(path, data) {

    }

    async createDirAsync(dir) {

        let result = {
            dir
        };

        if(await this.existsAsync(dir)) {
            result.exists = true;
        } else {
            result.created = true;
            await this.mkdirAsync(dir);
        }

        return result;

    }

    async existsAsync(path) {

        return new Promise(function(resolve,reject) {

            this.statAsync(path)
                .then(function() {
                    resolve(true);
                })
                .catch(function(err) {
                    if(err.code === 'ENOENT') {
                        resolve(false);
                    } else {
                        // some other error
                        reject(err);
                    }
                });

        }.bind(this));

    }

    // static readFileAsync = util.promisify(fs.readFile);
    // static writeFileAsync = util.promisify(fs.writeFile);

    //
    // this.writeFileAsync = util.promisify(fs.writeFile);
    // this.mkdirAsync = util.promisify(fs.mkdir);
    // this.accessAsync = util.promisify(fs.access);
    // this.statAsync = util.promisify(fs.stat);
    // this.unlinkAsync = util.promisify(fs.unlink);
    // this.rmdirAsync = util.promisify(fs.rmdir);

}

module.exports.Files = new Files();
