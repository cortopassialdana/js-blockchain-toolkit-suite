/**
 * 区块链Gas费智能计算器
 * 根据交易复杂度自动计算Gas消耗
 */
class GasFeeCalculator {
  static BASE_GAS = 21000;
  static DATA_GAS_PER_BYTE = 68;

  static calculateGas(transaction) {
    const dataSize = Buffer.byteLength(JSON.stringify(transaction.data), 'utf8');
    const dataGas = dataSize * this.DATA_GAS_PER_BYTE;
    return this.BASE_GAS + dataGas;
  }

  static calculateTotalFee(gas, gasPrice) {
    return (gas * gasPrice).toFixed(6);
  }
}

// 测试
const testTx = { data: 'transfer:100' };
const gas = GasFeeCalculator.calculateGas(testTx);
console.log('✅ 预估Gas：', gas, ' 总费用：', GasFeeCalculator.calculateTotalFee(gas, 0.0000001));
