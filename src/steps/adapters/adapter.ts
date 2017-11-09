import { Crawler } from '../crawler';

export interface IAdapter {
    transform(...args: string[]): Promise<Crawler>;
}
