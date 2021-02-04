const { createClient } = require('../index');
const blockchainNodeIp = process.argv[2];
const blockchainNodePort = process.argv[3] || 7001;

(async () => {

  // Address: ldposfacd5ebf967ebd87436bd5932a58168b9a1151e3
  let client = createClient({
    hostname: blockchainNodeIp,
    port: blockchainNodePort,
    inboundPort: 2
  });

  await client.connect({
    passphrase: 'clerk aware give dog reopen peasant duty cheese tobacco trouble gold angle'
  });

  // Recipient address: imitate forum impose muffin purity harvest area mixed renew orient wife eyebrow
  // for (let i = 0; i < 1; i++) {
  //   let preparedTxn = client.prepareTransaction({
  //     type: 'transfer',
  //     recipientAddress: 'ldpos75fbb06210575fd8f7f62e0b9267d4386273fc80',
  //     amount: `${Math.floor(Math.random() * 1)}000000000`,
  //     fee: `10000000`,
  //     timestamp: 100000,
  //     message: `Test ${i}`
  //   });
  //
  //   await client.postTransaction(preparedTxn);
  //   console.log(`Posted transaction #${i}`);
  // }

  // let voteTxn = client.prepareTransaction({
  //   type: 'vote',
  //   delegateAddress: 'ldpos75fbb06210575fd8f7f62e0b9267d4386273fc80',
  //   fee: `20000000`,
  //   timestamp: 200000,
  //   message: ''
  // });
  //
  // await client.postTransaction(voteTxn);
  //
  // console.log('Prepared transaction:', preparedTxn);

  // let preparedMultisigTxn = client.prepareMultisigTransaction({
  //   type: 'transfer',
  //   recipientAddress: 'ldpos75fbb06210575fd8f7f62e0b9267d4386273fc80',
  //   amount: `100000000`,
  //   fee: `10000000`,
  //   timestamp: 100000,
  //   message: 'Testing...'
  // });
  //
  // let multisigTxnSignature = client.signMultisigTransaction(preparedMultisigTxn);
  // console.log('Multisig transaction signature:', multisigTxnSignature);

  // let accountList = await client.getAccountsByBalance(0, 10, 'desc');
  // console.log('Account list:', accountList);

  // let transactions = await client.getTransactionsByTimestamp(0, 100);
  // console.log('TRANSACTIONS:', transactions);

  // let accountVotes = await client.getAccountVotes(client.walletAddress);
  // console.log('ACCOUNT VOTES:', accountVotes);

  // let block = await client.getBlockAtHeight(2);
  // console.log('BLOCK:', block);

  let accounts = await client.getAccountsByBalance(0, 100);
  console.log('ACCOUNTS:', accounts);

  // let pendingTxnCount = await client.getPendingTransactionCount();
  // console.log('PENDING TRANSACTION COUNT:', pendingTxnCount);

})();
