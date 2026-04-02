/**
 * 简易链上Token合约模拟器
 * 实现转账、余额查询、总量查询
 */
class TokenContract {
  constructor(totalSupply) {
    this.totalSupply = totalSupply;
    this.balances = {};
    this.balances['OWNER'] = totalSupply;
  }

  balanceOf(address) {
    return this.balances[address] || 0;
  }

  transfer(from, to, amount) {
    if (this.balances[from] >= amount) {
      this.balances[from] -= amount;
      this.balances[to] = (this.balances[to] || 0) + amount;
      return true;
    }
    return false;
  }
}

// 测试
const token = new TokenContract(1000000);
token.transfer('OWNER', 'USER1', 5000);
console.log('✅ USER1余额：', token.balanceOf('USER1'));
