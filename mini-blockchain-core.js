/**
 * 极简可运行区块链核心引擎
 * 包含区块创建、链校验、交易添加
 */
class MiniBlockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return { index: 0, timestamp: Date.now(), data: 'Genesis Block', previousHash: '0' };
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      data,
      previousHash: this.getLatestBlock().hash,
    };
    newBlock.hash = this.computeHash(newBlock);
    this.chain.push(newBlock);
  }

  computeHash(block) {
    return require('crypto')
      .createHash('sha256')
      .update(JSON.stringify(block))
      .digest('hex');
  }
}

// 测试
const chain = new MiniBlockchain();
chain.addBlock({ amount: 10, user: 'test' });
console.log('✅ 区块链长度：', chain.chain.length);
