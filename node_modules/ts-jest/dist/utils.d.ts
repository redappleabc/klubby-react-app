import { JestConfig, TsJestConfig } from './jest-types';
export declare function getTSJestConfig(globals: any): TsJestConfig;
export declare function mockGlobalTSConfigSchema(globals: any): {
    'ts-jest': {
        tsConfigFile: string;
    };
};
export declare function getTSConfig(globals: any, collectCoverage?: boolean): any;
export declare function cacheFile(jestConfig: JestConfig, filePath: string, src: string): void;
export declare function injectSourcemapHook(filePath: string, typeScriptCode: string, src: string): string;
