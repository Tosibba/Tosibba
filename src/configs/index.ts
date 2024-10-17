import {
  createConfig,
  http,
  cookieStorage,
  createStorage
} from 'wagmi'


import { Address, type Chain } from 'viem'

export const ramestta = {
  id: 1370,
  name: 'Ramestta',
  nativeCurrency: { name: 'RAMA', symbol: 'RAMA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://blockchain.ramestta.com'] },
  },
  blockExplorers: {
    default: { name: 'Ramascan', url: 'https://ramascan.com' },
  },
  contracts: {
    // ensRegistry: {
    //   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    // },
    // ensUniversalResolver: {
    //   address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
    //   blockCreated: 16773775,
    // },
    multicall3: {
      address: '0xE4fA850Bd3abBC63e07E688c27eF9a334992283d',
      blockCreated: 7334177,
    },
  },
} as const satisfies Chain

export const pingaksha = {
  id: 1377,
  name: 'Pingaksha Testnet',
  nativeCurrency: { name: 'RAMA', symbol: 'RAMA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.ramestta.com'] },
  },
  blockExplorers: {
    default: { name: 'Ramascan', url: 'https://pingaksha.ramascan.com' },
  },
  contracts: {
    // ensRegistry: {
    //   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    // },
    // ensUniversalResolver: {
    //   address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
    //   blockCreated: 16773775,
    // },
    multicall3: {
      address: '0xE4fA850Bd3abBC63e07E688c27eF9a334992283d',
      blockCreated: 2451020,
    },
  },
} as const satisfies Chain

export const config = createConfig({
  chains: [ramestta,pingaksha],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [ramestta.id]: http('https://blockchain.ramestta.com'),
    [pingaksha.id]: http('https://testnet.ramestta.com')
  },
})

type TsibContractAddressesType= {
  ramestta: { 
    rusd_Token: Address,
    tsib_token: Address,
    tsib_ico: Address,
    tsib_ico_referral: Address,
    tsib_ico_staking: Address,
    tsib_staking: Address
    tsib_referral: Address
  },
  pingaksha: {
    rusd_Token: Address,
    tsib_token: Address,
    tsib_ico: Address,
    tsib_ico_referral: Address,
    tsib_ico_staking: Address,
    tsib_staking: Address
    tsib_referral: Address
  }
}

export const tsibContractAddresses: TsibContractAddressesType = {
  ramestta: { 
    rusd_Token: "0x2A32e2102467135E22Ca015277E397E9f3B85AF2",
    tsib_token: "0x2E215626084a416457Bc4dE6d472431D333883F6",
    tsib_ico: "0xF14CFCA3D7f35815024197a117eA82d2816Fbc23",
    tsib_ico_referral: "0xe7A53699DE32B1e33492cbf5398744498B3D2ddc",
    tsib_ico_staking: "0xE91A1C7B5689d918D40aAA848CDA96dbAa2aba67",
    tsib_staking: "0x9743f9Bee015d9ccc63bBA9001d86586D83289ED",
    tsib_referral: "0x4cb06C8b567071ADDa4B9B938eF6c8C557669Bbb"

  },
  pingaksha: {
    rusd_Token: "0x36b594607A788d096ff1091bDAEEE4514dE9BbE6",
    tsib_token: "0x4cb06C8b567071ADDa4B9B938eF6c8C557669Bbb",
    tsib_ico: "0xdf9E166Ca9d0a4857EEB535D359013469E56e53F",
    tsib_ico_referral: "0x15Cc8A56770D4B3a5dfCFA42cd036fb8897989b6",
    tsib_ico_staking: "0xb3339c3252b11F4Aa7534f00F8675f150c81e09c",
    tsib_staking: "0x4a4caDD6e411e49A8dB478d71b0Bb87D46971770",
    tsib_referral: "0x8fb0489C1e0F5f87b8Fa1E44Db5b746e14b73f12"
  }
}


export const formatTier = (tier: number): string => {
  if (tier === 5) {
    return 'Elite';
  } else if (tier === 4) {
    return 'Diamond';
  } else if (tier === 3) {
    return 'Platinum';
  } else if (tier === 2) {
    return 'Gold';
  } else if (tier === 1) {
    return 'Silver';
  } else  {
    return 'Starter';
  }
}
