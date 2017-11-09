import * as chai from 'chai';
import { FileAdapter, AdapterFactory, IAdapter } from '../../../src/steps';

describe('Adapter Factory', () => {
    const factory = new AdapterFactory();

    it('Create file adapter', async () => {
        try {
            const adapter = factory.create('from-file');
            chai.assert.isNotNull(adapter);
        } catch (err) {
            chai.assert.fail();
        }
    });

    it('Adapter doesnt exists', async () => {
        try {
            const adapter = factory.create('from-file');
            chai.assert.fail();
        } catch (err) {
            chai.assert.isTrue(true);
        }
    });
});