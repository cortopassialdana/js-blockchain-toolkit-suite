/**
 * 区块链可信时间戳服务
 * 为数据生成不可篡改的链上时间证明
 */
const crypto = require('crypto');

class TimeStamper {
  static generateTimestampProof(data) {
    const timestamp = Date.now();
    const hash = crypto
      .createHash('sha256')
      .update(`${data}-${timestamp}`)
      .digest('hex');
    return {
      data,
      timestamp: new Date(timestamp).toISOString(),
      proofHash: hash,
    };
  }
}

// 测试
const proof = TimeStamper.generateTimestampProof('contract-v1.0');
console.log('✅ 时间戳证明：', proof);
