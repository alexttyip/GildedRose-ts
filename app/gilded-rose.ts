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

  static decrease(v) : number {
    // cannot decrease to lower than 0
    return Math.max(v - 1, 0)
  }

  static increase(v) : number {
    // cannot decrease to higher than 50
    return Math.min(v + 1, 50)
  }

  static updateOneQuality(item : Item) : Item {
    // Updates one item

    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      // Special handling for Sulfuras
      return item
    }

    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      // Decrease quality for normal items
      item.quality = GildedRose.decrease(item.quality)
    }
    else {
      // Increase quality for Brie and Concert ticket
      item.quality = GildedRose.increase(item.quality)

      // Concert ticket, more increases
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          item.quality = GildedRose.increase(item.quality)
        }
        if (item.sellIn < 6) {
          item.quality = GildedRose.increase(item.quality)
        }
      }
    }

    // Decrease sell by date
    item.sellIn--

    if (item.sellIn < 0) {
      // Overdue handling
      if (item.name == 'Aged Brie') {
        // Aged Brie increases quality
        item.quality = GildedRose.increase(item.quality)
      }
      else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        // Concert ticket has quality decreased to 0
        item.quality = 0
      }
      else {
        // Decrease quality for normal items
        item.quality = GildedRose.decrease(item.quality)
      }
    }

    return item
  }

  updateQuality() {
    // Update quality for each item individually
    this.items.map(GildedRose.updateOneQuality)
    return this.items;
  }
}