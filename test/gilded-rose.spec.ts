import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Given an item with a SellIn value >0, when a day passes, the SellIn value should drop by 1', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 10, 0)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].sellIn).toBe(9);
  });

  it('Given an item with a SellIn value >0, when a day passes, the quality value should drop by 1', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 10, 10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(9);
  });

  it('Given an item with a SellIn time of 0, when a day passes, its quality should drop by double the amount', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 1, 20)]);
    //   For test consistency, access the quality update value by an initial update
    let items = gildedRose.updateQuality();
    const qualityDropRate = 20 - items[0].quality;

    // When
    items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(20 - qualityDropRate*3);
  });

  it('Given an item with a SellIn time of <0, when a day passes, its quality should drop by double the amount', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 1, 20)]);
    //   For test consistency, access the quality update value by an initial update
    let items = gildedRose.updateQuality();
    const qualityDropRate = 20 - items[0].quality;
    gildedRose.updateQuality();

    // When
    items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(20 - qualityDropRate*5);
  });

  it('Given an item with a quality value of 0, when a day passes, its quality should remain at 0', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 5, 0)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });

  it('Given an item with a quality value of 0 and sellIn value of 0, when a day passes, its quality should remain at 0', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 0, 0)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });

  it('Given an item with a quality value <0, when a day passes, its quality not change', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 5, -10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(-10);
  });

  describe('Aged Brie', () => {
    it('Given an Aged Brie item with a sellIn value >0, when a day passes, its quality should increase by 1', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 1, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(1);
    });

    it('Given an Aged Brie item with a sellIn value of 0, when a day passes, its quality should increase by 2', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(2);
    });

    it('Given an Aged Brie item with a sellIn value <0, when a day passes, its quality should increase by 2', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(2);
    });

    it('Given an Aged Brie item with a sellIn value <0 and quality value of 49, when a day passes, its quality should be 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 49)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given an Aged Brie item with a quality >50, when a day passes, its quality should not change', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 1, 80)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Sulfuras', () =>{
    it('Given a Sulfuras item, when a day passes, its quality and sellIn values should be the same', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(10);
      expect(items[0].sellIn).toBe(5);
    });

    it('Given a Sulfuras item with a quality more than 80, when a day passes, its quality should still be 80', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    const backstage_pass = "Backstage passes to a TAFKAL80ETC concert";

    it('Given a Backstage pass with a sellIn value >10, when a day passes, its quality should increase', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 50, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(1);
    });

    it('Given a Backstage pass with a sellIn value >10 and quality value of 50, when a day passes, its quality should not change', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 50, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Backstage pass with a sellIn value of 10, when a day passes, its quality should increase by 2', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 10, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(2);
    });

    it('Given a Backstage pass with a sellIn value of 10 and quality value of 49, when a day passes, its quality should be 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 10, 49)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Backstage pass with a sellIn value of 5, when a day passes, its quality should increase by 3', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 5, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(3);
    });

    it('Given a Backstage pass with a sellIn value of 5 and quality value of 48, when a day passes, its quality should be 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 5, 48)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Backstage pass with a sellIn value of 0, when a day passes, its quality should be 0', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(0);
    });

    it('Given a Backstage pass with a sellIn value of <0, when a day passes, its quality should be 0', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, -1, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(0);
    });
  });
});

describe('Conjured items', ()=>{
  it('Given a Conjured item with a SellIn value >0, when a day passes, the SellIn value should drop by 1', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', 10, 10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].sellIn).toBe(9);
  });

  it('Given a Conjured item, when a day passes, the quality value should drop by 2', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', 10, 10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(8);
  });

  it('Given a Conjured item with a SellIn time of 0, when a day passes, its quality should drop by 4', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', 0, 20)]);

    // When
    let items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(16);
  });

  it('Given a Conjured item with a SellIn time of <0, when a day passes, its quality should drop by double the amount', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', -1, 20)]);

    // When
    let items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(16);
  });

  it('Given a Conjured item with a quality value of 0, when a day passes, its quality should remain at 0', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', 5, 0)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });

  it('Given a Conjured item with a quality value of 0 and sellIn value of 0, when a day passes, its quality should remain at 0', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', 0, 0)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });

  it('Given a Conjured item with a quality value <0, when a day passes, its quality not change', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Conjured test', 5, -10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(-10);
  });

  describe('Aged Brie', () => {
    it('Given a Conjured Aged Brie item with a sellIn value >0, when a day passes, its quality should increase by 2', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Aged Brie', 1, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(2);
    });

    it('Given a Conjured Aged Brie item with a sellIn value of 0, when a day passes, its quality should increase by 4', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Aged Brie', 0, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(4);
    });

    it('Given a Conjured Aged Brie item with a sellIn value <0, when a day passes, its quality should increase by 4', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Aged Brie', -1, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(4);
    });

    it('Given a Conjured Aged Brie item with a sellIn value <0 and quality value of 47, when a day passes, its quality should be 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Aged Brie', -1, 47)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Conjured Aged Brie item with a quality >50, when a day passes, its quality should not change', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Aged Brie', 1, 80)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Sulfuras', () =>{
    it('Given a Conjured Sulfuras item, when a day passes, its quality and sellIn values should be the same', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Sulfuras, Hand of Ragnaros', 5, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(10);
      expect(items[0].sellIn).toBe(5);
    });

    it('Given a Conjured Sulfuras item with a quality of 80, when a day passes, its quality should still be 80', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured Sulfuras, Hand of Ragnaros', 5, 80)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    const backstage_pass = "Conjured Backstage passes to a TAFKAL80ETC concert";

    it('Given a Conjured Backstage pass with a sellIn value >10, when a day passes, its quality should increase by 2', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 50, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(2);
    });

    it('Given a Conjured Backstage pass with a sellIn value >10 and quality value of 50, when a day passes, its quality should not change', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 50, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Conjured Backstage pass with a sellIn value of 10, when a day passes, its quality should increase by 4', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 10, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(4);
    });

    it('Given a Conjured Backstage pass with a sellIn value of 10 and quality value of 47, when a day passes, its quality should be 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 10, 47)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Conjured Backstage pass with a sellIn value of 5, when a day passes, its quality should increase by 6', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 5, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(6);
    });

    it('Given a Conjured Backstage pass with a sellIn value of 5 and quality value of 45, when a day passes, its quality should be 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 5, 45)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it('Given a Conjured Backstage pass with a sellIn value of 0, when a day passes, its quality should be 0', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(0);
    });

    it('Given a Conjured Backstage pass with a sellIn value of <0, when a day passes, its quality should be 0', () => {
      // Given
      const gildedRose = new GildedRose([new Item(backstage_pass, -1, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(0);
    });
  });
});