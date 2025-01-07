import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';
import { LoadDataWithInline } from '../wrappers/LoadDataWithInlineConfig';

describe('LoadDataWithInline', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LoadDataWithInline');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let loadDataWithInline: SandboxContract<LoadDataWithInline>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        loadDataWithInline = blockchain.openContract(LoadDataWithInline.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await loadDataWithInline.sendDeploy(deployer.getSender(), toNano('0.05'));
    });

    it('should correctly run', async () => {
        const sumResult = await loadDataWithInline.sendDeploy(deployer.getSender(), toNano('0.05'));
        printTransactionFees(sumResult.transactions);

        // Contract should throw but it did not
        expect(sumResult.transactions[1]).toHaveTransaction({
            from: deployer.address,
            to: loadDataWithInline.address,
            success: true,
        });
    });
});
