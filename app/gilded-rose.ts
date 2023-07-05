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
      if(!this.items[i].name.includes("Sulfuras",0)){
        this.items[i].sellIn -= 1;
        this.applyQualityChange(this.items[i], this.getQualityChange(this.items[i]));
      }
    }
    return this.items;
  }

  getQualityChange(item:Item){
    let change = this.getDefaultQualityChange(item);
    if(item.name.includes("Backstage passes")) {
      change = this.getPassesQualityChange(item);
    }
    else if(item.name === "Aged Brie"){
      change = -change;
    }

    if(item.name.includes("Conjured")) {
      change = 2*change;
      if(item.name === "Conjured Aged Brie") {
        change = -change;
      }
    }
    return change;
  }

  getDefaultQualityChange(item:Item){
    if(item.sellIn < 0) {
      return -2;
    }
    return -1;
  }

  getPassesQualityChange(item:Item){
    if(item.sellIn < 0) return -item.quality;
    if(item.sellIn <= 5) {
      return 3;
    }
    if(item.sellIn <= 10) {
      return 2;
    }
    return 1;
  }

  applyQualityChange(item:Item, change:number) {
    if(change === 0) return;
    if  (change === 0 ||
        (change < 0 && item.quality <= 0) ||
        (change > 0 && item.quality >= 50)){
      return;
    }

    let newQuality = item.quality + change;
    newQuality = Math.max(0, newQuality);
    newQuality = Math.min(50, newQuality);
    item.quality = newQuality;
  }
}
