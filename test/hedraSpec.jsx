/* globals describe it */

import Bootstrap from './bootstrap';

import Hedra from '../hedra';
import TWEEN from 'tween';

var assert = require('chai').assert;

describe('Hedra Class', function() {
	let thing = new Hedra({  });
	
	describe('when Instantiated', function() {
		it('should have a position', function() {
			assert.isObject(thing.position);
		});
		
		it('should have a rotation', function() {
			assert.isObject(thing.rotation);
		});
		
		it('should have a scale', function() {
			assert.isObject(thing.scale);
		});
	});
	
	describe('thing.add()', () => {
		it('should have a .add() method', () => {
			assert.isFunction(thing.add);
		});
		
		let result = null;
		it('should add a child', () => {
			let thing2 = new Hedra({  });
			
			assert.equal(thing.children.length, 0);
			assert.equal(thing._.children.length, 0);
			
			result = thing.add(thing2);
			
			assert.equal(thing.children.length, 1);
			assert.equal(thing._.children.length, 1);
		});
		
		it('should be chainable', () => {
			assert.strictEqual(result, thing);
		});
	});
	
	describe('thing.bubble()', () => {
		it('should have a .bubble() method', () => {
			assert.isFunction(thing.bubble);
		});
		
		let result = null;
		it('should call bubble on its children', (done) => {
			thing.children[0].bubble = done;
			
			result = thing.bubble();
		});
		
		it('should be chainable', () => {
			assert.strictEqual(result, thing);
		});
	});
	
	describe('thing.tween()', () => {
		it('should have a .tween() method', () => {
			assert.isFunction(thing.tween);
		});
		
		let result = null;
		it('should create a tween', () => {
			result = thing.tween({
				
			});
			
			assert.instanceOf(result.tween, TWEEN.Tween);
		});
		
		it('should return a promise', () => {
			assert.instanceOf(result, Promise);
		});
	});
});
