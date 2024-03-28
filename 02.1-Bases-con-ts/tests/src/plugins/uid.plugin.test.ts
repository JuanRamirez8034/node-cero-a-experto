import { describe, test, expect } from '@jest/globals';
import { generateId } from './../../../src/plugins/uid.plugin';

describe('plugins/uid.plugin', () => {
    test('generateId should return a string and 36 length chars', ()=> {
        const gId = generateId();
        expect(typeof gId).toBe('string');
        expect(gId.length).toBe(36);
    });
})