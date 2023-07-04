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

  updateQuality() {
    // Quality out of bounds
    let increment = 1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
        continue;
      }
      else {
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn < 0) {
            this.items[i].quality = 0;
            continue;
          } else {
            increment = 3 - Math.floor(this.items[i].sellIn / 5);
          }
        }
        else if (this.items[i].name == 'Aged Brie') {
          increment = 1;
        }
        else {
          increment = -1;
        }
        if (this.items[i].sellIn < 0) {
          increment *= 2;
        }
        if (this.items[i].name.indexOf('Conjured') > -1) {
          increment *= 2;
        }
        if (increment > 0) {
          this.items[i].quality = Math.min(this.items[i].quality + increment, 50);
        }
        else {
          this.items[i].quality = Math.max(this.items[i].quality + increment, 0);
        }
        this.items[i].sellIn--;
      }
    }
    return this.items;
  }
}
