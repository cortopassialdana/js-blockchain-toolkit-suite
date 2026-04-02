/**
 * P2P区块链交易签名与验签工具
 * 确保交易未被篡改、身份可验证
 */
const crypto = require('crypto');

class TransactionSigner {
  // 生成签名
  static signTransaction(transaction, privateKey) {
    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(transaction)).end();
    return sign.sign(privateKey, 'hex');
  }

  // 验证签名
  static verifySignature(transaction, signature, publicKey) {
    const verify = crypto.createVerify('SHA256');
    verify.update(JSON.stringify(transaction));
    return verify.verify(publicKey, signature, 'hex');
  }
}

// 测试
const testTx = { id: 'TX123', amount: 5.5, sender: 'USER01' };
const keyPair = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
const signature = TransactionSigner.signTransaction(testTx, keyPair.privateKey);
const isValid = TransactionSigner.verifySignature(testTx, signature, keyPair.publicKey);

console.log('✅ 交易验签结果：', isValid);
