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

      if(this.items[i].name === 'Aged Brie') {
        this.updateBrie(this.items[i]);
      } else if(this.items[i].name === 'Conjured Mana Cake') {
        this.updateConjured(this.items[i]);
      } else if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        //do nothing
      } else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert'){
        this.updateBackStagePass(this.items[i]);
      } else {
        this.updateItem(this.items[i]);
      }
    }
    return this.items;
  }

  updateBrie( item) {
    if(item.sellIn <= 0) {
      this.increaseByMax(item, 2)
    } else {
      this.increaseByMax(item, 1)
    }

    item.sellIn--;
  }

  updateBackStagePass(item) {
    if(item.sellIn <= 5 && item.sellIn > 0) {
      this.increaseByMax(item, 3);
    } else if (item.sellIn <= 10 && item.sellIn > 0) {
      this.increaseByMax(item, 2);
    } else if (item.sellIn > 10) {
      this.increaseByMax(item, 1);
    } else {
      item.quality = 0;
    }

    item.sellIn--;
  }

  updateItem(item) {
    if(item.sellIn <= 0) {
      this.decreaseByMax(item, 2);
    } else {
      this.decreaseByMax(item, 1);
    }
    item.sellIn--;
  }

  updateConjured(item) {
    if(item.sellIn <= 0) {
      this.decreaseByMax(item, 4);
    } else {
      this.decreaseByMax(item, 2);
    }
    item.sellIn--;
  }

  decreaseByMax(item, max) {
    while(max > 0 && item.quality > 0) {
      item.quality--;
      max--;
    }
  }

  increaseByMax(item, max) {
    while(max > 0 && item.quality < 50) {
      item.quality++;
      max--;
    }
  }


}
