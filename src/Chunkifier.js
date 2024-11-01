const fs = require("fs");
const path = require("path");

class Chunkifier {
  async splitFile(filePath) {
    const fileContent = await fs.promises.readFile(filePath);
    const chunkSize = Math.ceil(fileContent.length / 4);
    const fileName = path.basename(filePath, path.extname(filePath));
    const fileExtension = path.extname(filePath); // Capture original extension
    const outputDir = path.dirname(filePath);
    const hashContent = Math.random().toString(36).substr(2, 8);

    for (let i = 0; i < 4; i++) {
      const chunk = fileContent.slice(i * chunkSize, (i + 1) * chunkSize);
      const chunkFileName = `${fileName}-${hashContent}-${
        i + 1
      }${fileExtension}.chunkify`; // Include original extension
      const chunkFilePath = path.join(outputDir, chunkFileName);
      await fs.promises.writeFile(chunkFilePath, chunk);
    }

    console.log(`File split into 4 chunks successfully.`);
  }

  async mergeChunks(chunkFiles, outputFilePath) {
    // Get the original extension from the first chunk's filename
    const fileNameWithoutChunkify = path.basename(chunkFiles[0], ".chunkify");
    const originalExtension = path.extname(fileNameWithoutChunkify);
    const outputFileWithOriginalExtension = outputFilePath.replace(
      ".chunkify",
      originalExtension
    );

    const fileContent = await Promise.all(
      chunkFiles.map((chunkFile) => fs.promises.readFile(chunkFile))
    );

    const mergedContent = Buffer.concat(fileContent);
    await fs.promises.writeFile(outputFileWithOriginalExtension, mergedContent);

    console.log(`Chunks merged into: ${outputFileWithOriginalExtension}`);
  }
}

module.exports = { Chunkifier };
