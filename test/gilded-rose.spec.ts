import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Generic Items', () => {
    it('should foo', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('foo');
    });
    it('Given an item, when updateQuality is called, then sellin and quality lowered.', () => {
      // Given
      const testEnv = new GildedRose([new Item('item1', 5, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBeLessThan(5);
      expect(items[0].sellIn).toBeLessThan(5);
    })

    it('Given 2 items, item1 passed sellIn and item2 not passed sellIn, when updateQuality is called, then quality drop for item1 must be twice quality drop for item2.', () => {
      // Given
      const testEnv = new GildedRose([new Item('item1', -1, 5), new Item('item2', 4, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(5 - items[0].quality).toBe(2 * (5 - items[1].quality));
    })
  })

  describe('Aged Brie', () => {
    it('Given an Aged Brie, when updateQuality is called, then quality increases.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Aged Brie', 5, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBeGreaterThan(5);
    })

    it('Given an Aged Brie, when passed sellIn date, then quality increases twice as fast.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Aged Brie', -5, 5), new Item('Aged Brie', 3, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality - 5).toBe(2 * (items[1].quality - 5));
    })

    it('Given an Aged Brie, when passed sellIn date with quality 49, then quality does not go past 50.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Aged Brie', -5, 49)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    })
  })
  describe('Quality Constraints', () => {
    it('Given an item with 0 quality, when updateQuality is called, then quality does not go below 0.', () => {
      // Given
      const testEnv = new GildedRose([new Item('item1', 5, 0)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    })

    it('Given an item with 50 quality, when updateQuality is called, then quality does not go above 50.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Aged Brie', 5, 50)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBeLessThanOrEqual(50);
    })
  })

  describe('Sulfuras', () => {
    it('Given a Sulfuras, when updateQuality is called, then quality does not decrease.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(5);
      expect(items[0].sellIn).toBe((0));
    })
  })

  describe('Backstage', () => {
    it('Given Backstage passes, when 10 < sellIn, then quality increases by 1', () => {
      // Given
      const testEnv = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(6);
    })

    it('Given Backstage passes, when 5 < sellIn <= 10, then quality increases by 2', () => {
      // Given
      const testEnv = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 8, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(7);
    })

    it('Given Backstage passes, when 0 < sellIn <= 5, then quality increases by 3', () => {
      // Given
      const testEnv = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(8);
    })

    it('Given Backstage passes, when concert has passed, then quality is 0', () => {
      // Given
      const testEnv = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 5)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(0);
    })

    it('Given Backstage passes, when 0 < sellIn <= 5 and quality is 48, then quality is 50 after update.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 48)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    })

    it('Given Backstage passes, when 5 < sellIn <= 10 and quality is 49, then quality is 50 after update.', () => {
      // Given
      const testEnv = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 48)]);

      // When
      const items = testEnv.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    })
  })


});


