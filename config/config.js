module.exports = {
  WALLET_ADDRESS: "0x62e9C5Bcbc1eC6c49af0d11bCaf0209D52A9F007",
  PRIVATE_KEY:
    "028779e970b5667c759fd611588022512fdcacaa713185cb9ac0f00a31365857",
  contract: "0x91d13454589014Dc130aF28f22354Fa2527fBdd3",
  contractABI: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    { stateMutability: "payable", type: "fallback" },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_contract", type: "address" },
        { internalType: "address", name: "_ownerAddress", type: "address" },
        { internalType: "uint256[]", name: "_tokenID", type: "uint256[]" },
        { internalType: "string", name: "_type", type: "string" },
      ],
      name: "transfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
  testrpcURL: "https://rinkeby.infura.io/v3/c9db32e3e6b340a7821de31b0ceca136",
  mainrpcURL: "https://mainnet.infura.io/v3/c9db32e3e6b340a7821de31b0ceca136",
};
