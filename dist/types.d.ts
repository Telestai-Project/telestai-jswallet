interface IAddressMetaData {
    address: string;
    WIF: string;
    path: string;
    privateKey: string;
}
interface IAddressMetaData {
    address: string;
    WIF: string;
    path: string;
    privateKey: string;
}
interface ISend {
    assetName?: string;
    toAddress: string;
    amount: number;
}
declare class Wallet {
    rpc: (method: string, params: any[]) => Promise<any>;
    _mnemonic: string;
    addressObjects: Array<IAddressMetaData>;
    addressPosition: number;
    getAddressObjects(): IAddressMetaData[];
    getAddresses(): Array<string>;
    init(options: IOptions): Promise<void>;
    hasHistory(addresses: Array<string>): Promise<boolean>;
    _getFirstUnusedAddress(external: boolean): Promise<string>;
    getReceiveAddress(): Promise<string>;
    getChangeAddress(): Promise<string>;
    getUTXOs(): Promise<any>;
    getPrivateKeyByAddress(address: string): string;
    send(options: ISend): Promise<any>;
    getAssets(): Promise<any>;
    getBalance(): Promise<number>;
}
declare const _default: {
    createInstance: typeof createInstance;
};
export default _default;
export function createInstance(options: IOptions): Promise<Wallet>;
export interface IOptions {
    rpc_username?: string;
    rpc_password?: string;
    rpc_url?: string;
    mnemonic: string;
    network?: "rvn" | "rvn-test";
}

//# sourceMappingURL=types.d.ts.map
