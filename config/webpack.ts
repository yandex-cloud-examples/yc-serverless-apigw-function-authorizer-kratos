import path from 'path';

import { Configuration } from 'webpack';

const configuration: Configuration = {
    entry: {
        'index': path.resolve('src/index.ts'),
        'main': path.resolve('src/main.ts'),
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
        ],
    },
    output: {
        path: path.resolve('build'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    target: 'node',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
};

export default configuration;
