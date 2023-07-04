import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('Quality degrades twice as fast after sell by', () => {
  it('should decrease 2x', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 4), new Item('bar', 1, 4)]);
    const items = gildedRose.updateQuality();
    const fooDecrease = 4 - items[0].quality;
    const barDecrease = 4 - items[1].quality;
    expect(fooDecrease).toBe(2*barDecrease);
  });
});

describe('Quality should not be negative', () => {
  it('should not decrease below 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });
});

describe('Aged Brie not past sell by', () => {
  it('should increase', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(4);
  });
});

describe('Aged Brie past sell by', () => {
  it('rate of increase should double', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 4), new Item("Aged Brie", 5, 4)]);
    const items = gildedRose.updateQuality();
    const expiredIncrease = items[0].quality - 4;
    const inDateIncrease = items[1].quality - 4;
    expect(expiredIncrease).toBe(2 * inDateIncrease);
  });
});

describe('Quality cap', () => {
  it('should not increase beyond 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 50, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });
});


describe('Quality for sulfuras', () => {
  it('should not change', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
});

describe('Sell by for sulfuras', () => {
  it('should not change', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 15, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(15);
  });
});

describe('Quality for backstage passes -- 10 days or less', () => {
  it('should increase by 2', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });
});

describe('Quality for backstage passes -- 5 days or less', () => {
  it('should increase by 3', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });
});

describe('Quality for backstage passes -- 0 days', () => {
  it('should decrease to 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe('Quality for backstage passes -- > 10 days', () => {
  it('should decrease to 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });
});


describe('Conjured item', () => {
  it('should decrease twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 2, 4), new Item('bar', 1, 4)]);
    const items = gildedRose.updateQuality();
    const conjuredDecrease = 4 - items[0].quality;
    const barDecrease = 4 - items[1].quality;
    expect(conjuredDecrease).toBe(2*barDecrease);
  });
});





