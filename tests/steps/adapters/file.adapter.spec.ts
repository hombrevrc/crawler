import * as chai from 'chai';
import { FileAdapter } from '../../../src/steps';

describe('FileAdapter', () => {
    const adapter = new FileAdapter();

    it('File exists', async () => {
        try {
            const filePath = `${__dirname}/from-file.json`;
            const steps = await adapter.transform(filePath);
            chai.assert.isNotNull(steps);
        } catch (err) {
            chai.assert.fail();
        }
    });

    it('File doesnt exists', async () => {
        try {
            const steps = await adapter.transform();
            chai.assert.fail();
        } catch (err) {
            chai.assert.isTrue(true);
        }
    });
});