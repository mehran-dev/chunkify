const fs = require("fs").promises;

class FileService {
  async readFile(filePath) {
    return fs.readFile(filePath);
  }

  async writeFile(filePath, data) {
    return fs.writeFile(filePath, data);
  }
}

module.exports = { FileService };
