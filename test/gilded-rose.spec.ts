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
    items = gildedRose.updateQuality();

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

  it('Given an item with a quality value <0, when a day passes, its quality should be set to 0', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 5, -10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });

  it('Given an item with a quality value >50, when a day passes, its quality should be set to 50', () => {
    // Given
    const gildedRose = new GildedRose([new Item('test', 5, 80)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(50);
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
    });
  });
});