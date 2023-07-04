
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

  calculateQualityChange() {

  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // All items reduce by one sell by date apart from Sulfuras
      if (this.items[i].name.toLowerCase().indexOf('sulfuras') === -1) {
        this.items[i].sellIn -= 1
      }

      let qualityChange = 0;
      if (this.items[i].name == 'Aged Brie' || this.items[i].name.toLowerCase().includes('backstage passes'))  {
        // Quality Increases
        qualityChange = 1

        if (this.items[i].name.toLowerCase().includes('backstage passes')) {
          // Backstage Pass Quality depends on age
          if (this.items[i].sellIn <= 10) {
            qualityChange += 1;
          }

          if (this.items[i].sellIn <= 5) {
            qualityChange += 1;
          }

          if (this.items[i].sellIn < 0) {
            qualityChange = -1 * this.items[i].quality;
          }
        }

        // Caps at 50
        if (this.items[i].quality + qualityChange > 50) {
          qualityChange = 50 - this.items[i].quality;
        }

      } else if (this.items[i].name.toLowerCase().indexOf('sulfuras') === -1) {
        // Quality Decreases
        qualityChange = -1;

      } else {
        // Sulfuras quality remains constant
        qualityChange = 0;
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
      if (this.items[i].quality < 0) {
        // Caps Quality at 0
        this.items[i].quality = 0;
      }
    }
    return this.items;
  }
}
