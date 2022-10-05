/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers"
import type { Provider, TransactionRequest } from "@ethersproject/providers"
import type { PromiseOrValue } from "../../../../common"
import type {
  KeepersCounterEchidnaTest,
  KeepersCounterEchidnaTestInterface,
} from "../../../../contracts/test/fuzzing/KeepersCounterEchidnaTest"

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "counter",
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
    name: "echidna_test_perform_upkeep_gate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "interval",
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
    name: "lastTimeStamp",
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

const _bytecode =
  "0x60a060405234801561001057600080fd5b50620a8c0080608081815250504260018190555060008081905550506080516106ff61004e600039600081816101bc01526101ff01526106ff6000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80633f3b3b27146100675780634585e33b1461008557806361bc221a146100a15780636e04ff0d146100bf5780637d1b7ebd146100f0578063947a36fb1461010e575b600080fd5b61006f61012c565b60405161007c9190610462565b60405180910390f35b61009f600480360381019061009a91906102e7565b610132565b005b6100a96101b0565b6040516100b69190610462565b60405180910390f35b6100d960048036038101906100d49190610334565b6101b6565b6040516100e7929190610412565b60405180910390f35b6100f86101f1565b60405161010591906103f7565b60405180910390f35b6101166101fd565b6040516101239190610462565b60405180910390f35b60015481565b600061014c604051806020016040528060008152506101b6565b5090508061018f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161018690610442565b60405180910390fd5b4260018190555060016000546101a59190610500565b600081905550505050565b60005481565b600060607f0000000000000000000000000000000000000000000000000000000000000000600154426101e99190610556565b119150915091565b60008060005414905090565b7f000000000000000000000000000000000000000000000000000000000000000081565b600061023461022f846104a2565b61047d565b9050828152602081018484840111156102505761024f610680565b5b61025b8482856105a0565b509392505050565b60008083601f84011261027957610278610676565b5b8235905067ffffffffffffffff81111561029657610295610671565b5b6020830191508360018202830111156102b2576102b161067b565b5b9250929050565b600082601f8301126102ce576102cd610676565b5b81356102de848260208601610221565b91505092915050565b600080602083850312156102fe576102fd61068a565b5b600083013567ffffffffffffffff81111561031c5761031b610685565b5b61032885828601610263565b92509250509250929050565b60006020828403121561034a5761034961068a565b5b600082013567ffffffffffffffff81111561036857610367610685565b5b610374848285016102b9565b91505092915050565b6103868161058a565b82525050565b6000610397826104d3565b6103a181856104de565b93506103b18185602086016105af565b6103ba8161068f565b840191505092915050565b60006103d26015836104ef565b91506103dd826106a0565b602082019050919050565b6103f181610596565b82525050565b600060208201905061040c600083018461037d565b92915050565b6000604082019050610427600083018561037d565b8181036020830152610439818461038c565b90509392505050565b6000602082019050818103600083015261045b816103c5565b9050919050565b600060208201905061047760008301846103e8565b92915050565b6000610487610498565b905061049382826105e2565b919050565b6000604051905090565b600067ffffffffffffffff8211156104bd576104bc610642565b5b6104c68261068f565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600061050b82610596565b915061051683610596565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561054b5761054a610613565b5b828201905092915050565b600061056182610596565b915061056c83610596565b92508282101561057f5761057e610613565b5b828203905092915050565b60008115159050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156105cd5780820151818401526020810190506105b2565b838111156105dc576000848401525b50505050565b6105eb8261068f565b810181811067ffffffffffffffff8211171561060a57610609610642565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f54696d6520696e74657276616c206e6f74206d6574000000000000000000000060008201525056fea26469706673582212205cd4d733b183a9ae360c7a7722466b05767a90d5d59a0d6639c32449208b442664736f6c63430008070033"

type KeepersCounterEchidnaTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: KeepersCounterEchidnaTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class KeepersCounterEchidnaTest__factory extends ContractFactory {
  constructor(...args: KeepersCounterEchidnaTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<KeepersCounterEchidnaTest> {
    return super.deploy(overrides || {}) as Promise<KeepersCounterEchidnaTest>
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  override attach(address: string): KeepersCounterEchidnaTest {
    return super.attach(address) as KeepersCounterEchidnaTest
  }
  override connect(signer: Signer): KeepersCounterEchidnaTest__factory {
    return super.connect(signer) as KeepersCounterEchidnaTest__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): KeepersCounterEchidnaTestInterface {
    return new utils.Interface(_abi) as KeepersCounterEchidnaTestInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): KeepersCounterEchidnaTest {
    return new Contract(address, _abi, signerOrProvider) as KeepersCounterEchidnaTest
  }
}
