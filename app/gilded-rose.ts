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

    increaseQuality(item) {
        item.quality = Math.min(item.quality + 1, 50)
    }

    decreaseQuality(item) {
        item.quality = Math.max(0, item.quality - 1)
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name == 'Aged Brie' || this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                this.increaseQuality(this.items[i])
                if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[i].sellIn < 11) {
                        this.increaseQuality(this.items[i])
                    }
                    if (this.items[i].sellIn < 6) {
                        this.increaseQuality(this.items[i])
                    }
                }
            } else {
                if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
                } else {
                    this.decreaseQuality(this.items[i])
                    if (this.items[i].name == 'Conjured Mana Cake') {
                        this.decreaseQuality(this.items[i])
                    }
                }
            }
            if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
            } else {
                this.items[i].sellIn -= 1;
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name == 'Aged Brie') {
                    this.increaseQuality(this.items[i])
                } else {
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        this.items[i].quality = 0
                    } else {
                        if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
                            continue;
                        }
                        this.decreaseQuality(this.items[i])
                        if (this.items[i].name == 'Conjured Mana Cake') {
                            this.decreaseQuality(this.items[i])
                        }
                    }
                }
            }
        }

        return this.items;
    }
}
