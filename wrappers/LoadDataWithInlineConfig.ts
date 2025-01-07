import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LoadDataWithInlineConfig = {};

export function loadDataWithInlineConfigToCell(config: LoadDataWithInlineConfig): Cell {
    return beginCell().endCell();
}

export class LoadDataWithInline implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LoadDataWithInline(address);
    }

    static createFromConfig(config: LoadDataWithInlineConfig, code: Cell, workchain = 0) {
        const data = loadDataWithInlineConfigToCell(config);
        const init = { code, data };
        return new LoadDataWithInline(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(1, 64).endCell(),
        });
    }
}
