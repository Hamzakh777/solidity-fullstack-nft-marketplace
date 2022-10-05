/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers"
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi"
import type { Listener, Provider } from "@ethersproject/providers"
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../common"

export interface ERC677Interface extends utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment
    "totalSupply()": FunctionFragment
    "transferFrom(address,address,uint256)": FunctionFragment
    "transferAndCall(address,uint256,bytes)": FunctionFragment
    "balanceOf(address)": FunctionFragment
    "transfer(address,uint256)": FunctionFragment
    "allowance(address,address)": FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | "approve"
      | "totalSupply"
      | "transferFrom"
      | "transferAndCall"
      | "balanceOf"
      | "transfer"
      | "allowance"
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: "approve",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: "transferAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string
  encodeFunctionData(
    functionFragment: "transfer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: "allowance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result
  decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result
  decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result
  decodeFunctionResult(functionFragment: "transferAndCall", data: BytesLike): Result
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result

  events: {
    "Transfer(address,address,uint256,bytes)": EventFragment
    "Transfer(address,address,uint256)": EventFragment
    "Approval(address,address,uint256)": EventFragment
  }

  getEvent(nameOrSignatureOrTopic: "Transfer(address,address,uint256,bytes)"): EventFragment
  getEvent(nameOrSignatureOrTopic: "Transfer(address,address,uint256)"): EventFragment
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment
}

export interface Transfer_address_address_uint256_bytes_EventObject {
  from: string
  to: string
  value: BigNumber
  data: string
}
export type Transfer_address_address_uint256_bytes_Event = TypedEvent<
  [string, string, BigNumber, string],
  Transfer_address_address_uint256_bytes_EventObject
>

export type Transfer_address_address_uint256_bytes_EventFilter =
  TypedEventFilter<Transfer_address_address_uint256_bytes_Event>

export interface Transfer_address_address_uint256_EventObject {
  from: string
  to: string
  value: BigNumber
}
export type Transfer_address_address_uint256_Event = TypedEvent<
  [string, string, BigNumber],
  Transfer_address_address_uint256_EventObject
>

export type Transfer_address_address_uint256_EventFilter =
  TypedEventFilter<Transfer_address_address_uint256_Event>

export interface ApprovalEventObject {
  owner: string
  spender: string
  value: BigNumber
}
export type ApprovalEvent = TypedEvent<[string, string, BigNumber], ApprovalEventObject>

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>

export interface ERC677 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: ERC677Interface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    approve(
      spender: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    transferAndCall(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    balanceOf(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>

    transfer(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>
  }

  approve(
    spender: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>

  transferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  transferAndCall(
    to: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  balanceOf(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>

  transfer(
    to: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  allowance(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>

  callStatic: {
    approve(
      spender: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>

    transferAndCall(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>

    balanceOf(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>

    transfer(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  filters: {
    "Transfer(address,address,uint256,bytes)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null,
      data?: null
    ): Transfer_address_address_uint256_bytes_EventFilter
    "Transfer(address,address,uint256)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): Transfer_address_address_uint256_EventFilter

    "Approval(address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter
    Approval(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter
  }

  estimateGas: {
    approve(
      spender: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    transferAndCall(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    balanceOf(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>

    transfer(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    approve(
      spender: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    transferAndCall(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    balanceOf(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>

    transfer(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}
