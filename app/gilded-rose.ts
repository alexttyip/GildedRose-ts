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

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') continue;

            this.items[i].sellIn -= 1;

            if (this.items[i].name == 'Aged Brie' && this.items[i].sellIn > 0) {
                this.increaseQuality(this.items[i])
                continue;
            } else if (this.items[i].name == 'Aged Brie' && this.items[i].sellIn <= 0) {
                this.increaseQuality(this.items[i], 2)
                continue;
            }

            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].sellIn > 10) {
                this.increaseQuality(this.items[i])
                continue;
            } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].sellIn <= 10 && this.items[i].sellIn > 5) {
                this.increaseQuality(this.items[i], 2)
                continue;
            } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].sellIn <= 5 && this.items[i].sellIn > 0) {
                this.increaseQuality(this.items[i], 3)
                continue;
            } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].sellIn < 0) {
                this.items[i].quality = 0
                continue;
            }


            if (this.items[i].name == 'Conjured Mana Cake' && this.items[i].sellIn >= 0) {
                this.decreaseQuality(this.items[i], 2)
            } else if (this.items[i].name == 'Conjured Mana Cake' && this.items[i].sellIn < 0) {
                this.decreaseQuality(this.items[i], 4)
            } else if (this.items[i].sellIn >= 0) {
                this.decreaseQuality(this.items[i])
            } else {
                this.decreaseQuality(this.items[i], 2)
            }


        }

        return this.items;
    }
}
