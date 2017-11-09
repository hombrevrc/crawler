import { IAdapter } from './adapter';
import { FileAdapter } from './file.adapter';

export class AdapterFactory {
    create(type: string): IAdapter {
        switch (type) {
            case 'from-file':
                return new FileAdapter();
            default:
                const err = `Adapter ${type} not implemented`;
                throw new Error(err);
        }
    }
}
