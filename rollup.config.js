/* eslint-disable import/no-commonjs */
/* eslint-env es6 */


const babel = require('rollup-plugin-babel');
const cleanup = require('rollup-plugin-cleanup');
const terser = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} Chart.js Contributors
 * Released under the ${pkg.license} license
 */`;

const input = 'src/index.js';

module.exports = [
	{
		input,
		output: {
			file: `dist/${pkg.name}.js`,
			banner: banner,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				luxon: 'luxon'
			}
		},
		external: [
			'chart.js',
			'luxon'
		]
	},
	{
		input,
		plugins: [
			terser({
				output: {
					preamble: banner
				}
			})
		],
		output: {
			file: `dist/${pkg.name}.min.js`,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				luxon: 'luxon'
			}
		},
		external: [
			'chart.js',
			'luxon'
		]
	},

	// ES6 builds
	// dist/chartjs-adapter-luxon.esm.js
	// dist/chartjs-adapter-luxon.esm.min.js
	{
		input,
		plugins: [
			babel({ envName: 'es6' }),
			cleanup({
				sourcemap: true
			})
		],
		output: {
			file: `dist/${pkg.name}.esm.js`,
			banner,
			format: 'esm',
			indent: false,
		},
		external: [
			'chart.js',
			'luxon'
		]
	},
	{
		input,
		plugins: [
			babel({ envName: 'es6' }),
			terser({
				output: {
					preamble: banner
				}
			})
		],
		output: {
			file: `dist/${pkg.name}.esm.min.js`,
			format: 'esm',
			indent: false
		},
		external: [
			'chart.js',
			'luxon'
		]
	},
];
