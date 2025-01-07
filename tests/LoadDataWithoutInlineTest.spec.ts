import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';
import { LoadDataWithoutInline } from '../wrappers/LoadDataWithoutInlineConfig';

describe('LoadDataWithoutInline', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LoadDataWithoutInline');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let loadDataWithoutInline: SandboxContract<LoadDataWithoutInline>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        loadDataWithoutInline = blockchain.openContract(LoadDataWithoutInline.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await loadDataWithoutInline.sendDeploy(deployer.getSender(), toNano('0.05'));
    });

    it('should correctly run', async () => {
        const sumResult = await loadDataWithoutInline.sendDeploy(deployer.getSender(), toNano('0.05'));
        printTransactionFees(sumResult.transactions);

        // Contract should throw but it did not
        expect(sumResult.transactions[1]).toHaveTransaction({
            from: deployer.address,
            to: loadDataWithoutInline.address,
            success: true,
        });
    });
});
