// Hashgraph

const { Client, PrivateKey, AccountCreateTransaction, /*AccountBalanceQuery,*/ Hbar, /*TransferTransaction*/} = require("@hashgraph/sdk");

class HashgraphApi {

    constructor() {
        // Grab the Account ID and Private Key from the environment variables
        const hashgraphAccountId = process.env.REACT_APP_HASHGRAPH_ACCOUNT_ID;
        const hashgraphPrivateKey = process.env.REACT_APP_HASHGRAPH_PRIVATE_KEY;
    
        // Check to make sure the Account ID and Private Key aren't NULL
        if (hashgraphAccountId == null ||
            hashgraphPrivateKey == null ) {
                throw new Error("Environment variables hashgraphAccountId and hashgraphPrivateKey must be present.");
            }
        
        // Make the connection to the Hedera Hashgraph network
        this.client = Client.forTestnet();
        this.client.setOperator(hashgraphAccountId, hashgraphPrivateKey);
    }
}

export async function createNewAccount(client) {
    // Create new keys
    const newAccountPrivateKey = PrivateKey.generate();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    // Create the new account with starting balance of 1,000 tinybars
    const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(client);

    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    // Log the new account ID
    console.log("New account successfully created. The new account ID is: " + newAccountId);

    return {
        newAccountId,
        newAccountPublicKey,
        newAccountPrivateKey,
        getReceipt
    };
}


export { HashgraphApi };