const crypto = require("crypto");

function generateHash(filePath) {
  return crypto
    .createHash("md5")
    .update(filePath)
    .digest("hex")
    .substring(0, 8);
}

module.exports = { generateHash };
