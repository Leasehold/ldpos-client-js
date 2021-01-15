const RPC_REQUEST_PROCEDURE = 'rpc-request';
const socketClusterClient = require('socketcluster-client');

class SCAdapter {
  constructor(options) {
    this.socket = socketClusterClient.create({
      protocolVersion: 1,
      path: '/socketcluster/',
      ...options,
      autoConnect: false
    });
    this.chainModuleName = options.chainModuleName || 'ldpos_chain';
  }

  async connect() {
    this.socket.connect();
    let event = await Promise.race([
      this.socket.listener('connect').once(),
      this.socket.listener('connectAbort').once()
    ]);
    if (event.code) {
      throw new Error(
        `Failed to connect because of error ${event.code}: ${event.reason}`
      );
    }
  }

  disconnect() {
    this.socket.disconnect();
  }

  async invokeProcedure(action, data) {
    let result = await this.socket.invoke(RPC_REQUEST_PROCEDURE, {
      type: '/RPCRequest',
      procedure: `${this.chainModuleName}:${action}`,
      data
    });
    if (!result) {
      throw new Error(
        'Peer sent back RPC result in an invalid format - Expected an object with a data property'
      );
    }
    return result.data;
  }

  async getNetworkSymbol() {
    return this.invokeProcedure('getNetworkSymbol');
  }

  async getAccount(walletAddress) {
    return this.invokeProcedure('getAccount', { walletAddress });
  }

  async getAccountsByBalance(offset, limit, order) {
    return this.invokeProcedure('getAccountsByBalance', { offset, limit, order });
  }

  async getMultisigWalletMembers(walletAddress) {
    return this.invokeProcedure('getMultisigWalletMembers', { walletAddress });
  }

  async postTransaction(transaction) {
    return this.invokeProcedure('postTransaction', { transaction });
  }

  async getTransaction(transactionId) {
    return this.invokeProcedure('getTransaction', { transactionId });
  }

  async getTransactionsByTimestamp(offset, limit, order) {
    return this.invokeProcedure('getTransactionsByTimestamp', { offset, limit, order });
  }

  async getOutboundTransactions(walletAddress, fromTimestamp, limit) {
    return this.invokeProcedure('getOutboundTransactions', { walletAddress, fromTimestamp, limit });
  }

  async getTransactionsFromBlock(blockId, offset, limit) {
    return this.invokeProcedure('getTransactionsFromBlock', { blockId, offset, limit });
  }

  async getInboundTransactionsFromBlock(walletAddress, blockId) {
    return this.invokeProcedure('getInboundTransactionsFromBlock', { walletAddress, blockId });
  }

  async getOutboundTransactionsFromBlock(walletAddress, blockId) {
    return this.invokeProcedure('getOutboundTransactionsFromBlock', { walletAddress, blockId });
  }

  async getLastBlockAtTimestamp(timestamp) {
    return this.invokeProcedure('getLastBlockAtTimestamp', { timestamp });
  }

  async getMaxBlockHeight() {
    return this.invokeProcedure('getMaxBlockHeight');
  }

  async getBlocksFromHeight(height, limit) {
    return this.invokeProcedure('getBlocksFromHeight', { height, limit });
  }

  async getSignedBlocksFromHeight(height, limit) {
    return this.invokeProcedure('getSignedBlocksFromHeight', { height, limit });
  }

  async getBlocksBetweenHeights(fromHeight, toHeight, limit) {
    return this.invokeProcedure('getBlocksBetweenHeights', { fromHeight, toHeight, limit });
  }

  async getBlockAtHeight(height) {
    return this.invokeProcedure('getBlockAtHeight', { height });
  }

  async getBlock(blockId) {
    return this.invokeProcedure('getBlock', { blockId });
  }

  async getBlocksByTimestamp(offset, limit, order) {
    return this.invokeProcedure('getBlocksByTimestamp', { offset, limit, order });
  }

  async getDelegatesByVoteWeight(offset, limit, order) {
    return this.invokeProcedure('getDelegatesByVoteWeight', { offset, limit, order });
  }

  async getForgingDelegates() {
    return this.invokeProcedure('getForgingDelegates');
  }
}

module.exports = SCAdapter;