/**
 * 区块链区块SHA256哈希计算工具
 * 为区块生成唯一哈希值，防篡改
 */
const crypto = require('crypto');

class BlockHasher {
  static computeHash(index, timestamp, data, previousHash, nonce = 0) {
    const blockString = `${index}-${timestamp}-${JSON.stringify(data)}-${previousHash}-${nonce}`;
    return crypto.createHash('sha256').update(blockString).digest('hex');
  }
}

// 测试
const testHash = BlockHasher.computeHash(
  1,
  Date.now(),
  { amount: 10, from: 'A', to: 'B' },
  '0'
);
console.log('✅ 区块哈希值：', testHash);
