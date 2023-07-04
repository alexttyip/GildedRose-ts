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
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateQualityGeneral(this.items[i]);
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.updateQualityPasses(this.items[i]);
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            this.updateQualityGeneral(this.items[i]);
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }

  updateQualityGeneral(item:Item) {
    if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {
      item.quality = item.quality - 1;
    }
  }

  updateQualityPasses(item:Item) {
    if (item.sellIn < 11) {
      if (item.quality < 50) {
        item.quality = item.quality + 1
      }
    }
    if (item.sellIn < 6) {
      if (item.quality < 50) {
        item.quality = item.quality + 1
      }
    }
  }

  getItemQualityChange(item:Item){
    if(item.name === "Aged Brie") return this.getAgedBrieQualityChange(item);
    if(item.name.includes("Backstage passes",0)) return this.getPassesQualityChange(item);

    if(item.quality <= 0) return 0;
    if(item.sellIn < 0 && item.quality > 1) return -2;
    return -1;
  }

  getAgedBrieQualityChange(item:Item){
    if(item.quality >= 50) return 0;
    if(item.sellIn < 0 && item.quality < 49) return 2;
    return 1;
  }

  getPassesQualityChange(item:Item){
    if(item.sellIn < 0) return item.quality;
    if(item.quality >= 50) return 0;
    if(item.sellIn <= 10) {
      if(item.sellIn <= 5 && item.quality < 48) return 3;
      if(item.quality < 49) return 2;
    }
    return 1;
  }
}
