
// Do not change this
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

  // Can Change this

  updateBrie(item) {
    return 1;
  }

  updateSulfuras() {
    return 0;
  }

  updateBackstagePass(item) {
    if (item.sellIn > 10) {
      return 1;
    } else if (item.sellIn <= 10 && item.sellIn > 5) {
      return 2;
    } else if (item.sellIn <= 5 && item.sellIn >= 0) {
      return 3;
    } else {
      return -1*item.quality;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // All items reduce by one sell by date apart from Sulfuras
      if (this.items[i].name.toLowerCase().indexOf('sulfuras') === -1) {
        this.items[i].sellIn -= 1
      }

      let qualityChange = 0;

      if (this.items[i].name == 'Aged Brie') {
        qualityChange = this.updateBrie(this.items[i]);
      } else if (this.items[i].name.toLowerCase().includes('backstage passes')) {
        qualityChange = this.updateBackstagePass(this.items[i])
      } else if (this.items[i].name.toLowerCase().includes('sulfuras')) {
        qualityChange = this.updateSulfuras();
      } else {
        qualityChange = -1;
      }

      if (this.items[i].sellIn < 0) {
        // Negative SellIn doubles QC
        qualityChange *= 2;
      }

      if (this.items[i].name.toLowerCase().includes('conjured')) {
        // Conjured doubles QC
        qualityChange *= 2;
      }

      this.items[i].quality += qualityChange;
      if (this.items[i].quality > 50 && this.items[i].name.toLowerCase().indexOf('sulfuras') === -1) {

        this.items[i].quality = 50;
      }
      if (this.items[i].quality < 0) {
        // Caps Quality at 0
        this.items[i].quality = 0;
      }
    }
    return this.items;
  }
}
