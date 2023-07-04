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
        this.applyQualityChange(this.items[i], this.getItemQualityChange(this.items[i]));
      }
    }
    return this.items;
  }

  getItemQualityChange(item:Item){
    let change = this.getQualityChange(item);
    if(item.name.includes("Backstage passes")) {
      change = this.getPassesQualityChange(item);
    }
    else if(item.name.includes("Aged Brie")){
      change = -change;
    }

    if(item.name.includes("Conjured")) {
      change = 2*change;
    }
    return change;
  }

  getQualityChange(item:Item){
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
    let newQuality = item.quality + change;
    if(change < 0){
      if(item.quality <= 0){
        return;
      }
      if(newQuality <= 0) {
        item.quality = 0;
        return;
      }
    }
    else if(change > 0){
      if(item.quality >= 50){
        return;
      }
      if(newQuality >= 50) {
        item.quality = 50;
        return;
      }
    }
    item.quality = newQuality;
  }
}
