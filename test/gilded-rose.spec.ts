import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('Given an item is being sold, when the item becomes of negative date, the quality should degrade twice as fast',()=>{
    const gildedRose = new GildedRose([new Item('Test Item', 0,10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(8);
  });

  it('Given an item is being sold, when the item reaches zero quality, it should not become negative quality',() =>{
    const gildedRose = new GildedRose([new Item('Test Item', 0,0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it('Given an item is being sold, when it is named "Aged Brie", the quality should increase, not decrease',()=>{
    const gildedRose = new GildedRose([new Item('Aged Brie',2,2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(3);
  });

  it('Given an item is being sold, when it reaches a quality of 50, it should not increase',()=>{
    const gildedRose = new GildedRose([new Item('Aged Brie',2,50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it('Given an item is being sold, when it is named "Sulfuras, Hand of Ragnaros", quality and sell by date should not decrease',() =>{
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros',2,50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(2);
  });

  it('Given backstage passes are being sold, when the sell by date is more than 10 days away, quality should increase by 1 per day',()=>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',30,10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(11);
  })

  it('Given backstage passes are being sold, when the sell by date is within 10 days, quality should increase by 2 per day',()=>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',8,10),new Item('Backstage passes to a TAFKAL80ETC concert',10,10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(12);
    expect(items[1].quality).toBe(12);
  });

  it('Given backstage passes are being sold, when the sell by date is within 5 days, quality should increase by 3 per day',()=>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',3,10),new Item('Backstage passes to a TAFKAL80ETC concert',5,10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(13);
    expect(items[1].quality).toBe(13);
  });

  it('Given backstage passes are being sold, when the concert has already happened, quality should drop to 0',()=>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',0,10),new Item('Backstage passes to a TAFKAL80ETC concert',-1,10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  })


});
