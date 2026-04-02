/**
 * 区块链合法性校验工具
 * 检测区块是否被篡改、哈希是否有效
 */
class BlockValidator {
  static isChainValid(chain) {
    for (let i = 1; i < chain.length; i++) {
      const current = chain[i];
      const previous = chain[i - 1];

      // 校验哈希
      const realHash = this.computeHash(current);
      if (current.hash !== realHash) return false;

      // 校验前区块哈希
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }

  static computeHash(block) {
    return require('crypto')
      .createHash('sha256')
      .update(JSON.stringify({ ...block, hash: '' }))
      .digest('hex');
  }
}

// 测试
const testChain = [{ index: 0, hash: 'a', previousHash: '0' }, { index: 1, hash: 'b', previousHash: 'a' }];
console.log('✅ 区块链是否合法：', BlockValidator.isChainValid(testChain));
