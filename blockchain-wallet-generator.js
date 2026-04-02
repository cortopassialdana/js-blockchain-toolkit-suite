/**
 * 区块链轻量级钱包地址生成器
 * 生成兼容ETH格式的随机钱包地址 + 私钥
 */
const crypto = require('crypto');

class ChainWalletGenerator {
  constructor() {
    this.chainPrefix = '0x';
  }

  // 生成随机私钥（64位十六进制）
  generatePrivateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  // 通过私钥生成公钥
  privateToPublic(privateKey) {
    const publicKey = crypto
      .createHash('sha256')
      .update(privateKey)
      .digest('hex')
      .slice(-40);
    return this.chainPrefix + publicKey;
  }

  // 一键生成完整钱包
  createWallet() {
    const privateKey = this.generatePrivateKey();
    const address = this.privateToPublic(privateKey);
    return { privateKey, address, createTime: new Date().toISOString() };
  }
}

// 测试运行
const wallet = new ChainWalletGenerator();
console.log('✅ 生成区块链钱包：', wallet.createWallet());
