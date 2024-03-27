const cryptoJS = require('crypto-js');

const {
  awsSecretKey: encryptionKey
} = require('../../../config');

class Cryptography {
  encryption(data) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(cryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString());
      } catch (error) {
        console.log(`\nEncryption catch error ->> ${error}`);
        return reject(error);
      }
    });
  }

  decryption(data) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(JSON.parse(cryptoJS.AES.decrypt(data, encryptionKey).toString(cryptoJS.enc.Utf8)));
      } catch (error) {
        console.log(`\nDecryption catch error ->> ${error}`);
        return reject(error);
      }
    });
  }

  passwordHashing(password) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(cryptoJS.SHA256(password).toString());
      } catch (error) {
        console.log(`\nPasswordHashing catch error ->> ${error}`);
        return reject(error);
      }
    });
  }
}

module.exports = new Cryptography();