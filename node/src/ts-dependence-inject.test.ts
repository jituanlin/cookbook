import {DI, Injectable, Module} from './ts-dependence-inject';

describe('DI', () => {
    test('basic functionality test', async () => {
        class Logger {
            constructor() {
            }

            log(message: string) {
                console.log(message);
            }
        }

        const loggerModule = new Module([Logger], [], [], [Logger]);

        @Injectable()
        class CatService {
            // the DI will inject the Logger instance
            constructor(readonly logger: Logger) {
            }

            async findCat() {
                return this.logger.log('cat is missing');
            }
        }

        const appModule = new Module(
            [CatService],
            [CatService],
            [loggerModule],
            []
        );

        const di = new DI(appModule);
        const catService = await di.get(CatService);
        expect(catService.logger).toBeInstanceOf(Logger);
    });
});
