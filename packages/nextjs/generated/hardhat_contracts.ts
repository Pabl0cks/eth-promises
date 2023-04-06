export default {
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        GoalContract: {
          address: "0x2f8fD5932A6402089C3bAc817e7CA16e2C827014",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
              ],
              name: "GoalCompleted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "delegate",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "GoalCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
              ],
              name: "GoalExpired",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
              ],
              name: "GoalFailed",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
              ],
              name: "claimExpired",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
              ],
              name: "confirmCompletion",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "goalId",
                  type: "uint256",
                },
              ],
              name: "confirmFailure",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "delegate",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "failFee",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "goalText",
                  type: "string",
                },
              ],
              name: "createGoal",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "delegatedGoals",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllGoals",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "address payable",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "address payable",
                      name: "delegate",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "failFee",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "completed",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "failed",
                      type: "bool",
                    },
                    {
                      internalType: "string",
                      name: "goalText",
                      type: "string",
                    },
                  ],
                  internalType: "struct GoalContract.Goal[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "delegate",
                  type: "address",
                },
              ],
              name: "getDelegatedGoals",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "address payable",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "address payable",
                      name: "delegate",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "failFee",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "completed",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "failed",
                      type: "bool",
                    },
                    {
                      internalType: "string",
                      name: "goalText",
                      type: "string",
                    },
                  ],
                  internalType: "struct GoalContract.Goal[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getGoalCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "goals",
              outputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "address payable",
                  name: "creator",
                  type: "address",
                },
                {
                  internalType: "address payable",
                  name: "delegate",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "failFee",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "completed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "failed",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "goalText",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;
