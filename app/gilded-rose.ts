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
  maxQuality = 50;
  minQuality = 0;

  qualityDecayRate = -1;
  passIncreaseRates = [{day:10,rate:2},{day:5,rate:3}];
  conjuredDecayMultiplier = 2;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.passIncreaseRates.sort((a, b) => {
      return a.day - b.day;
    })
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
    let change;
    if(item.name.includes("Backstage passes")) {
      change =  this.getPassesQualityChange(item);
    }else{
      change = this.getDefaultQualityChange(item);
    }

    if(item.name.includes("Conjured")) {
      change = this.conjuredDecayMultiplier*change;
    }
    if(item.name === "Aged Brie" || item.name == "Conjured Aged Brie") {
      change = -change;
    }
    return change;
  }

  getDefaultQualityChange(item:Item){
    if(item.sellIn < 0) {
      return 2*this.qualityDecayRate;
    }
    return this.qualityDecayRate;
  }

  getPassesQualityChange(item:Item){
    if(item.sellIn < 0) {
      return -item.quality;
    }

    // This may be slightly unreadable, I'd appreciate some input
    for(const rateObj of this.passIncreaseRates) {
      if(item.sellIn <= rateObj.day) {
        return rateObj.rate;
      }
    }
    return 1;
  }

  applyQualityChange(item:Item, change:number) {
    if(change === 0) return;
    if  (change === 0 ||
        (change < 0 && item.quality <= this.minQuality) ||
        (change > 0 && item.quality >= this.maxQuality)){
      return;
    }

    let newQuality = item.quality + change;
    newQuality = Math.max(this.minQuality, newQuality);
    newQuality = Math.min(this.maxQuality, newQuality);
    item.quality = newQuality;
  }
}
