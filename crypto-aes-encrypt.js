/**
 * 区块链数据AES加密解密工具
 * 用于链上敏感数据加密存储
 */
const crypto = require('crypto');

class AESEncryptor {
  static algorithm = 'aes-256-cbc';

  static encrypt(data, secretKey) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, secretKey.slice(0, 32), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
  }

  static decrypt(encrypted, secretKey) {
    const iv = Buffer.from(encrypted.iv, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, secretKey.slice(0, 32), iv);
    let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

// 测试
const encrypted = AESEncryptor.encrypt('chain-data-123', 'my-secret-key-32byteslong!!!');
console.log('✅ 解密结果：', AESEncryptor.decrypt(encrypted, 'my-secret-key-32byteslong!!!'));
