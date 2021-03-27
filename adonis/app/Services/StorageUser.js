"use strict";
const Helpers = use("Helpers");
const base = Helpers.publicPath("user_storage");
const fs = require("fs");
const crypto = require("crypto");




class StorageUser {
  
  static async save(user, file) {
    try {
      const path = await this._getPath(user);
      const filePath = Helpers.publicPath(`tmp/${file}`);
      await fs.renameSync(filePath, `${path}/${file}`);
      return `${user.folder}/files/${file}`;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async delete(user, file) {
    try {
      const path = await this._getPath(user);
      await fs.unlinkSync(`${path}/${file}`);
      return true;
    } catch (e) {
      return false;
    }
  }
  static async removeFile(path) {
    fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        
      if (err) {
        return console.error(err, 'no access')
      }
      
      try {
        console.log(path, 'Path Arquive')
        fs.unlinkSync(path);
      } catch (e) {
        console.log("Error: " + e);
      }
    
    });
  }

  static async _getPath(user) {
    let path = `${base}/${user.folder}`;
    if (user.folder && (await fs.existsSync(path))){
      path = `${base}/${user.folder}/files`;
      if(await fs.existsSync(path)){
        return `${path}`;
      }else{
        await fs.mkdirSync(path);
        return `${path}`;
      }
    } 
    const folder = crypto.createHash("md5").update(`${user.id}`).digest("hex");
    user.folder = folder;
    console.log(folder)
    await user.save();
    path = `${base}/${user.folder}`;
    await fs.mkdirSync(path);
    let filesPath = `${base}/${user.folder}/files`
    await fs.mkdirSync(filesPath);

    return filesPath;
  }
}

module.exports = StorageUser;
