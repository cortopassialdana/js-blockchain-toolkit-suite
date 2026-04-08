/**
 * 区块链交易内存池（Mempool）
 * 存储待打包交易、自动排序、批量打包
 */
class Mempool {
  constructor() {
    this.pendingTransactions = [];
  }

  addTransaction(tx) {
    this.pendingTransactions.push({ ...tx, time: Date.now() });
  }

  // 按手续费从高到低排序
  sortByFee() {
    this.pendingTransactions.sort((a, b) => b.fee - a.fee);
  }

  // 打包指定数量 交易
  packTransactions(limit = 10) {
    this.sortByFee();
    const packed = this.pendingTransactions.splice(0, limit);
    return packed;
  }
}

// 测试
const pool = new Mempool();
pool.addTransaction({ id: 1, fee: 0.01 });
pool.addTransaction({ id: 2, fee: 0.05 });
console.log('✅ 打包交易：', pool.packTransactions(2));
