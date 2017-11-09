import * as fs from 'fs';
import { IAdapter } from './adapter';
import { Crawler } from '../crawler';

export class FileAdapter implements IAdapter {
    transform(...args: string[]): Promise<Crawler> {
        return new Promise((resolve, reject) => {
            if (!args || !args[0]) {
                reject(new Error('File path is null'));
            }

            const filePath = args[0];
            const json = this.internalRequire(filePath);

            if (!json) {
                reject(new Error('File doesnt exists'));
            }

            resolve(<Crawler>json);
        });
    }

    private internalRequire(filePath: string): any {
        try {
            return require(filePath);
        } catch (err) {
            return undefined;
        }
    }
}
