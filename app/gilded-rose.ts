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

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    increaseQuality(item, increment = 1) {
        item.quality = Math.min(item.quality + increment, 50)
    }

    decreaseQuality(item, decrement = 1) {
        item.quality = Math.max(0, item.quality - decrement)
    }

    dealWithAgedBrie(agedBrie) {
        if (agedBrie.sellIn > 0) {
            this.increaseQuality(agedBrie)
        } else {
            this.increaseQuality(agedBrie, 2)
        }
    }

    dealWithBackstagePasses(backstagePasses) {
        if (backstagePasses.sellIn > 10) {
            this.increaseQuality(backstagePasses);
        } else if (backstagePasses.sellIn > 5 && backstagePasses.sellIn <= 10) {
            this.increaseQuality(backstagePasses, 2);
        } else if (backstagePasses.sellIn > 0 && backstagePasses.sellIn <= 5) {
            this.increaseQuality(backstagePasses, 3);
        } else {
            backstagePasses.quality = 0;
        }
    }

    dealWithConjuredItem(conjuredItem) {
        if (conjuredItem.sellIn >= 0) {
            this.decreaseQuality(conjuredItem, 2)
        } else if (conjuredItem.sellIn < 0) {
            this.decreaseQuality(conjuredItem, 4)
        }
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
                continue;
            }

            this.items[i].sellIn -= 1;

            if (this.items[i].name == 'Aged Brie') {
                this.dealWithAgedBrie(this.items[i])
                continue;
            }

            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                this.dealWithBackstagePasses(this.items[i])
                continue;
            }

            if (this.items[i].name == 'Conjured Mana Cake') {
                this.dealWithConjuredItem(this.items[i])
                continue;
            }

            if (this.items[i].sellIn >= 0) {
                this.decreaseQuality(this.items[i])
            } else {
                this.decreaseQuality(this.items[i], 2)
            }

        }

        return this.items;
    }
}
