// const nfd = require("node-file-dialog");
// const { Chunkifier } = require("./src/Chunkifier");
// const path = require("path");

// async function main() {
//   const chunkifier = new Chunkifier();
//   const action = process.argv[2];

//   if (action === "split") {
//     const filePathArray = await nfd({ type: "open-file" });
//     const filePath = filePathArray[0]; // Select the first item
//     await chunkifier.splitFile(filePath);
//   } else if (action === "merge") {
//     const chunkFiles = await nfd({ type: "open-file-multiple" });
//     const outputFilePath =
//       path.basename(chunkFiles[0]).split("-")[0] + path.extname(chunkFiles[0]);
//     await chunkifier.mergeChunks(chunkFiles, outputFilePath);
//   } else {
//     console.log("Usage: node index.js <split|merge>");
//   }
// }

// main();
const nfd = require("node-file-dialog");
const path = require("path");
const { Chunkifier } = require("./src/Chunkifier");

async function main() {
  const chunkifier = new Chunkifier();
  const action = process.argv[2];

  if (action === "split") {
    const filePathArray = await nfd({ type: "open-file" });
    const filePath = filePathArray[0]; // Select the first item
    await chunkifier.splitFile(filePath);
  } else if (action === "merge") {
    const chunkFiles = await nfd({ type: "open-files" }); // Use open-files for multiple selection
    const sanitizedChunkFiles = chunkFiles.map((file) => file.trim()); // Remove any trailing whitespace

    const outputFilePath =
      path.basename(sanitizedChunkFiles[0]).split("-")[0] +
      path.extname(sanitizedChunkFiles[0]);
    await chunkifier.mergeChunks(sanitizedChunkFiles, outputFilePath);
  } else {
    console.log("Usage: node index.js <split|merge>");
  }
}

main();
