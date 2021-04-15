"use strict";

const fs = require('fs')

class AttachmentService {

  static async removeAttachmentsFromDisk(arrayAttachmentPath) {
    console.log("Entrou remove attachment")
    if (arrayAttachmentPath && arrayAttachmentPath.length == 0) {
      console.log("at least one path must be informed.");
      return;
    }
    arrayAttachmentPath.map((path) => {
      let pathArquive = `./public${path}`;      
      fs.access(pathArquive, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        
          if (err) {
            return console.error(err, 'no access')
          }
          
          try {
            console.log(pathArquive, 'Path Arquive')
            fs.unlinkSync(pathArquive);
          } catch (e) {
            console.log("Error: " + e);
          }
        
        });

    });
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
}

module.exports = AttachmentService;
