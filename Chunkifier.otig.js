const fs = require("fs");
const path = require("path");
const { generateHash } = require("./utils/hash");
const { FileService } = require("./FileService");

class Chunkifier {
  constructor(fileService = new FileService()) {
    this.fileService = fileService;
  }

  async splitFile(filePath) {
    const fileBuffer = await this.fileService.readFile(filePath);
    const fileSize = fileBuffer.length;
    const chunkSize = Math.ceil(fileSize / 4);
    const fileHash = generateHash(filePath);
    const fileExtension = path.extname(filePath);

    const chunkPaths = [];

    for (let i = 0; i < 4; i++) {
      const chunkData = fileBuffer.slice(i * chunkSize, (i + 1) * chunkSize);
      const chunkPath = `${path.basename(
        filePath,
        fileExtension
      )}-${fileHash}-${i + 1}.chunkify`;
      await this.fileService.writeFile(chunkPath, chunkData);
      chunkPaths.push(chunkPath);
    }

    console.log("File split into chunks:", chunkPaths);
    return chunkPaths;
  }

  async mergeChunks(chunkFiles, outputFile) {
    const chunks = await Promise.all(
      chunkFiles.map((file) => this.fileService.readFile(file))
    );
    const mergedBuffer = Buffer.concat(chunks);
    await this.fileService.writeFile(outputFile, mergedBuffer);
    console.log("Chunks merged into:", outputFile);
    return outputFile;
  }
}

module.exports = { Chunkifier };
