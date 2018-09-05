import 'mocha';
import 'chai';
import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should never have quality less than zero', function() {
        const gildedRose = new GildedRose([
            new Item('Aged Brie', 5, 0),
            new Item('Sulfuras, Hand of Ragnaros', null, 30),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
            new Item('foo', 10, 10)
        ]);
        const updatedItems = gildedRose.updateQuality();
        updatedItems.forEach(item => {
            expect(item.quality).to.be.least(0);
        });
    });

    it('should never have quality more than fifty', function() {
        const gildedRose = new GildedRose([
            new Item('Aged Brie', 5, 0),
            new Item('Sulfuras, Hand of Ragnaros', null, 30),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
            new Item('foo', 10, 10)
        ]);
        const updatedItems = gildedRose.updateQuality();
        updatedItems.forEach((item: Item) => {
            expect(item.quality).to.be.below(51);
        });
    });

    it('should not change the quality of Sulfuras', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 10, 30) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(30);
    });

    it('should not change the sellIn of Sulfuras', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 10, 30) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].sellIn).to.equal(10);
    });

    it('should increase in quality by 1 if it is Aged Brie before sell-by-date', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(11);
    });

    it('should increase in quality by 2 if it is Aged Brie after sell-by-date', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', -1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(12);
    });

    it('should have zero quality if it is a backstage pass after the concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', -1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(0);
    });

    it('should increase in quality by 1 if it is a backstage pass more than 10 days before the concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(11);
    });

    it('should increase in quality by 2 if it is a backstage pass 6 - 10 days before the concert', function() {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)
         ]);
        const updatedItems = gildedRose.updateQuality();
        for (let i = 0; i < updatedItems.length; i++) {
            expect(updatedItems[i].quality).to.equal(12);
        }
    });

    it('should increase in quality by 3 if it is a backstage pass 5 or fewer days before the concert', function() {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)
         ]);
        const updatedItems = gildedRose.updateQuality();
        for (let i = 0; i < updatedItems.length; i++) {
            expect(updatedItems[i].quality).to.equal(13);
        }
    });

    it('should decrease in quality by 1 if it is a non-special item before sell-by-date', function() {
        const gildedRose = new GildedRose([ new Item('foo', 1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(9);
    });

    it('should decrease in quality by 2 if it is a non-special item after sell-by-date', function() {
        const gildedRose = new GildedRose([ new Item('foo', -1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(8);
    });

    it('should decrease in quality by 2 if it is a Conjured item before sell-by-date', function() {
        const gildedRose = new GildedRose([ new Item('Conjured foo', 1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(8);
    });

    it('should decrease in quality by 4 if it is a Conjured item after sell-by-date', function() {
        const gildedRose = new GildedRose([ new Item('Conjured foo', -1, 10) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).to.equal(6);
    });


});
