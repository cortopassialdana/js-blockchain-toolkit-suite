/**
 * PoS（权益证明）共识算法模拟器
 * 模拟区块链节点出块权选举逻辑
 */
class PoSConsensus {
  constructor() {
    this.validators = [];
  }

  // 加入验证节点（抵押金额越高，出块概率越高）
  addValidator(address, stake) {
    this.validators.push({ address, stake });
  }

  // 随机选举出块节点
  electBlockProducer() {
    const totalStake = this.validators.reduce((sum, v) => sum + v.stake, 0);
    let random = Math.random() * totalStake;
    
    for (const node of this.validators) {
      random -= node.stake;
      if (random <= 0) return node;
    }
  }
}

// 测试
const pos = new PoSConsensus();
pos.addValidator('NodeA', 100);
pos.addValidator('NodeB', 300);
pos.addValidator('NodeC', 50);
console.log('✅ 本轮出块节点：', pos.electBlockProducer());
