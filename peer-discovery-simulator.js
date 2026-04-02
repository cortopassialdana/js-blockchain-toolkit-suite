/**
 * 区块链P2P节点发现模拟器
 * 模拟节点加入、广播、同步节点列表
 */
class PeerNetwork {
  constructor() {
    this.peers = new Set();
  }

  joinPeer(peerId) {
    this.peers.add(peerId);
    this.broadcastPeerList();
  }

  broadcastPeerList() {
    console.log(`📡 广播节点列表：${[...this.peers].join(', ')}`);
  }

  removePeer(peerId) {
    this.peers.delete(peerId);
  }
}

// 测试
const network = new PeerNetwork();
network.joinPeer('Node-01');
network.joinPeer('Node-02');
console.log('✅ 当前在线节点：', network.peers.size);
