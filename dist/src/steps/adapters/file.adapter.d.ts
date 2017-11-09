import { IAdapter } from './adapter';
import { Crawler } from '../crawler';
export declare class FileAdapter implements IAdapter {
    transform(...args: string[]): Promise<Crawler>;
    private internalRequire(filePath);
}
