export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    decrementSellIn(item: Item, interval: number) {
        item.sellIn -= interval;
    }

    incrementQuality(item: Item, interval: number) {
        if (item.quality < 50) {
            item.quality += interval;
        } else {
            item.quality = 50;
        }
    }

    decrementQuality(item: Item, interval: number) {
        if (item.quality > 0) { // The Quality of an item is never negative
            item.quality -= interval;
        } else {
            item.quality = 0; 
        }
    }

    updateBrie(item: Item) {
        if (item.sellIn >= 0) {
            this.incrementQuality(item, 1); // "Aged Brie" actually increases in Quality the older it get
        } else if (item.sellIn < 0) {
            this.incrementQuality(item, 2);
        }
        this.decrementSellIn(item, 1);
    }

    updateBackstagePasses(item: Item) {
        if (item.sellIn < 0) {
            item.quality = 0;
        } else if (item.sellIn < 6) {
            this.incrementQuality(item, 3);
        } else if (item.sellIn < 11) {
            this.incrementQuality(item, 2);
        } else {
            this.incrementQuality(item, 1);
        }
    }

    updateNormalItem(item: Item) {
        if (item.sellIn >= 0) {
            this.decrementQuality(item, 1);
        } else {
            this.decrementQuality(item, 2);
        }
        this.decrementSellIn(item, 1);
    }

    updateQuality() {
        this.items.forEach((item: Item) => {

            if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                this.updateBackstagePasses(item);
            } else if (item.name == 'Aged Brie') {
                this.updateBrie(item);
            } else if (item.name == 'Sulfuras, Hand of Ragnaros') {
                // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
            } else {
                // Any other items
                this.updateNormalItem(item);
            }
        });
        return this.items;
    }
}

