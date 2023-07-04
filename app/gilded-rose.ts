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
      let qualityChange = 0;
      if(!this.items[i].name.includes("Sulfuras",0)){
        this.items[i].sellIn -= 1;
        this.items[i].quality += this.getItemQualityChange(this.items[i]);
      }
    }
    return this.items;
  }

  getItemQualityChange(item:Item){
    if(item.name === "Aged Brie") {
      return this.getAgedBrieQualityChange(item);
    }
    if(item.name.includes("Backstage passes",0)) {
      return this.getPassesQualityChange(item);
    }
    if(item.name.includes("Conjured",0)) {
      return this.getConjuredQualityChange(item);
    }
    return this.getGenericQualityChange(item);
  }

  getGenericQualityChange(item:Item){
    if(item.sellIn < 0 && item.quality > 1) {
      return -2;
    }
    if(item.quality > 0) {
      return -1;
    }
    return 0;
  }

  getConjuredQualityChange(item:Item){
    if(item.sellIn < 0) {
      if(item.quality > 3){
        return -4;
      }
      if(item.quality > 2){
        return -3;
      }
    }
    if(item.quality > 1){
      return -2;
    }
    if(item.quality > 0){
      return -1;
    }
    return 0;
  }

  getAgedBrieQualityChange(item:Item){
    if(item.sellIn < 0 && item.quality < 49) {
      return 2;
    }
    if(item.quality < 50) {
      return 1;
    }
    return 0;
  }

  getPassesQualityChange(item:Item){
    if(item.sellIn < 0) return -item.quality;
    if(item.sellIn <= 5 && item.quality < 48) {
      return 3;
    }
    if(item.sellIn <= 10 && item.quality < 49) {
      return 2;
    }
    if(item.quality < 50) {
      return 1;
    }
    return 0;
  }
}
