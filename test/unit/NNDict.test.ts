/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------*/

import assert from 'assert';
import { NearestNeighborDict, Node } from '../../src/avlTree';

suite('NearestNeighborDict Tests', () => {
	test('basic insert/get: random', () => {
		const dict = new NearestNeighborDict(new Node(0, 0), NearestNeighborDict.NUMERIC_DISTANCE_FUNCTION);
		const entries = [5, 2, 9, 23, 3, 0, 1, -4, -2];
		entries.forEach((x) => dict.insert(x));
		assert(dict.height() < 4);

		entries.forEach((x) => {
			assert.equal(dict.getNearest(x + 0.1).key, x);
			assert.equal(dict.getNearest(x - 0.1).key, x);
		});

		assert.equal(dict.getNearest(23 + 10).key, 23);
		assert.equal(dict.getNearest(23 - 4).key, 23);
	});

	test('basic insert/get: increasing', () => {
		const dict = new NearestNeighborDict(new Node(0, 0), NearestNeighborDict.NUMERIC_DISTANCE_FUNCTION);
		const entries = [-10, -5, -4, -1, 0, 1, 5, 10, 23];
		entries.forEach((x) => dict.insert(x));
		assert(dict.height() < 4);

		entries.forEach((x) => {
			assert.equal(dict.getNearest(x + 0.1).key, x);
			assert.equal(dict.getNearest(x - 0.1).key, x);
		});

		assert.equal(dict.getNearest(23 + 10).key, 23);
		assert.equal(dict.getNearest(23 - 4).key, 23);
	});

	test('basic insert/get: decreasing', () => {
		const dict = new NearestNeighborDict(new Node(0, 0), NearestNeighborDict.NUMERIC_DISTANCE_FUNCTION);
		const entries = [-10, -5, -4, -1, 0, 1, 5, 10, 23].reverse();
		entries.forEach((x) => dict.insert(x));
		assert(dict.height() < 4);

		entries.forEach((x) => {
			assert.equal(dict.getNearest(x + 0.1).key, x);
			assert.equal(dict.getNearest(x - 0.1).key, x);
		});

		assert.equal(dict.getNearest(23 + 10).key, 23);
		assert.equal(dict.getNearest(23 - 4).key, 23);
	});
});
