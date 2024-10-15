export const tsibStakingAbi= [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tsibToken_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "rusdToken_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ramaPriceInUSD_",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referralContract_",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InsufficientAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidPackageId",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}
		],
		"name": "InvalidRange",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MaxReturnAchieve",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "MinStakeAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoTokensStake",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TokensUnstakeByAdmin",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TokensUnstaked",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Unauthorized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "WithdrawalPeriodNotReached",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "qty",
				"type": "uint256"
			}
		],
		"name": "Buy",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "RewardsClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "UnstakedByAdmin",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "activate_",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "dailyReturnInPercent_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "returnInPercent_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "withdrawnPeriod_",
				"type": "uint256"
			}
		],
		"name": "AddPackage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_STAKE_AMOUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "packageId_",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "activate_",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "dailyReturnInPercent_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "returnInPercent_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "withdrawnPeriod_",
				"type": "uint256"
			}
		],
		"name": "UpdatePackage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_packages",
		"outputs": [
			{
				"internalType": "bool",
				"name": "activate",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "dailyReturnInPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "returnInPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "withdrawnPeriod",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index_",
				"type": "uint256"
			}
		],
		"name": "calculateRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index_",
				"type": "uint256"
			}
		],
		"name": "checkMaxReturn",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "packageId_",
				"type": "uint256"
			}
		],
		"name": "getPackage",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "activate",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "dailyReturnInPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "returnInPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "withdrawnPeriod",
						"type": "uint256"
					}
				],
				"internalType": "struct ITosibbaStaking.Package",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex_",
				"type": "uint256"
			}
		],
		"name": "getPackages",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "activate",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "dailyReturnInPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "returnInPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "withdrawnPeriod",
						"type": "uint256"
					}
				],
				"internalType": "struct ITosibbaStaking.Package[]",
				"name": "result",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex_",
				"type": "uint256"
			}
		],
		"name": "getStakers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "result",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ramaPriceInUSD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "referralContract",
		"outputs": [
			{
				"internalType": "contract ITosibbaReferral",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rusdToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "packageId_",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referrer_",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isJoinRightSide_",
				"type": "bool"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalPackageLenth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user_",
				"type": "address"
			}
		],
		"name": "totalStakedLengthForUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStakersLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "to_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "transferRAMA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "token_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "transferTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tsibToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index_",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "currentRamaPrice_",
				"type": "uint256"
			}
		],
		"name": "updateRamaPriceInUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user_",
				"type": "address"
			}
		],
		"name": "user2Staker",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "claimedRewards",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastClaimTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "packageId",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isUnstaked",
						"type": "bool"
					}
				],
				"internalType": "struct ITosibbaStaking.Stake",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "startIndex_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex_",
				"type": "uint256"
			}
		],
		"name": "user2StakerList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "claimedRewards",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastClaimTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "packageId",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isUnstaked",
						"type": "bool"
					}
				],
				"internalType": "struct ITosibbaStaking.Stake[]",
				"name": "result",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index_",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] as const