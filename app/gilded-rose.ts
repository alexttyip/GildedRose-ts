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

  static decrease(v : number, val : number = 1) : number {
    // cannot decrease to lower than 0
    return Math.max(v - val, 0)
  }

  static increase(v : number, val : number = 1) : number {
    // cannot decrease to higher than 50
    return Math.min(v + val, 50)
  }

  static ageBackstagePass(item : Item) : Item {
    // Ages a backstage pass
    if (item.sellIn > 10) {
      item.quality = GildedRose.increase(item.quality)
    }
    else if (item.sellIn <= 10 && item.sellIn > 5) {
      item.quality = GildedRose.increase(item.quality, 2)
    }
    else if (item.sellIn <= 5) {
      item.quality = GildedRose.increase(item.quality, 3)
    }

    return item
  }

  static itemAging(item : Item) : Item {
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      // Handles increase in value for concert tickets
      item = GildedRose.ageBackstagePass(item)
    }
    else if (item.name === 'Aged Brie') {
      // Handles increase in value for aged brie
      item.quality = GildedRose.increase(item.quality)
    }
    else {
      // Decrease quality for other items
      item.quality = GildedRose.decrease(item.quality)

      if(item.name == 'Conjured Mana Cake') {
        // Decrease again for Mana cake
        item.quality = GildedRose.decrease(item.quality)
      }
    }

    return item
  }

  static overdueHandling(item : Item) : Item {
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
      if(item.name === 'Conjured Mana Cake') {
        // Decrease again for Mana cake
        item.quality = GildedRose.decrease(item.quality)
      }
    }

    return item
  }

  static updateOneQuality(item : Item) : Item {
    // Updates one item

    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      // Special handling for Sulfuras
      return item
    }

    // Item ages, needs handling
    item = GildedRose.itemAging(item)

    // Decrease sell by date
    item.sellIn--

    if (item.sellIn < 0) {
      // Item is overdue, more handling needed
      item = GildedRose.overdueHandling(item)
    }
    return item
  }

  updateQuality() {
    // Update quality for each item individually
    this.items.map(GildedRose.updateOneQuality)
    return this.items;
  }
}