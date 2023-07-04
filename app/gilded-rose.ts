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

  decrease(v) : number {
    // cannot decrease to lower than 0
    return Math.max(v - 1, 0)
  }

  increase(v) : number {
    // cannot decrease to higher than 50
    return Math.min(v + 1, 50)
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
        // Special handling for Sulfuras
        continue
      }

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // Decrease quality
        this.items[i].quality = this.decrease(this.items[i].quality)
      }
      else {
        // Increase quality
        this.items[i].quality = this.increase(this.items[i].quality)

        // Concert ticket, more increases
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn < 11) {
            this.items[i].quality = this.increase(this.items[i].quality)
          }
          if (this.items[i].sellIn < 6) {
            this.items[i].quality = this.increase(this.items[i].quality)
          }
        }
      }

      // Decrease sell by date
      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn < 0) {
        // Overdue handling
        if (this.items[i].name == 'Aged Brie') {
          // Aged Brie increases quality
          this.items[i].quality = this.increase(this.items[i].quality)
        }
        else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          // Concert ticket has quality decreased to 0
          this.items[i].quality = 0
        }
        else {
          // Decrease quality
          this.items[i].quality = this.decrease(this.items[i].quality)
        }
      }
    }

    return this.items;
  }
}