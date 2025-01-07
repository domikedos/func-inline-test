import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LoadDataWithoutInlineConfig = {};

export function loadDataWithoutInlineConfigToCell(config: LoadDataWithoutInlineConfig): Cell {
    return beginCell().endCell();
}

export class LoadDataWithoutInline implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LoadDataWithoutInline(address);
    }

    static createFromConfig(config: LoadDataWithoutInlineConfig, code: Cell, workchain = 0) {
        const data = loadDataWithoutInlineConfigToCell(config);
        const init = { code, data };
        return new LoadDataWithoutInline(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(1, 64).endCell(),
        });
    }
}
