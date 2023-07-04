import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Normal items degrade by 1 unit per day before expiring', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Normal Item', 1, 10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(9);
  });

  it('Normal items degrade by 2 unit per day after expiring', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Normal Item', 0, 10)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(8);
  });

  it('Normal items degrade by 1 unit before expiring, then expires and degrades by 2 units', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Normal Item', 1, 10)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(7);
    expect(items[0].sellIn).toBe(-1);
  });

  it('Aged Brie increases quality instead of decrease', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 10)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(13);
    expect(items[0].sellIn).toBe(-1);
  });

  it('Sulfuras stay at quality = 80 and sellIn doesnt change', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(1);
  });

  it('Backstage ticket increases in quality by 1 unit when more than 10 days left', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 30)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(32);
  });

  it('Backstage ticket increases in quality by 2 units when 6 to 10 days left', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 8, 30)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(34);
  });

  it('Backstage ticket increases in quality by 3 units when less than 6 days left', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 30)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(36);
  });

  it('Backstage ticket changes to quality = 0 after concert happens', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 1, 30)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });

  it('Sulfuras quality will be fixed to 80 if not already 80', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 30)]);

    // When
    const items = new GildedRose(gildedRose.updateQuality()).updateQuality();

    // Then
    expect(items[0].quality).toBe(80);
  });

  it('Quality field works with floats', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Normal Item', 1, 10.5)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(9.5);
  });

  it('If input is invalid, quality will be fixed to be within 0 and 50 first', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Normal Item', 1, -2), new Item('Normal Item', 1, 100)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(49);
  });

  it('When initial quality is 0.5, drops to 0 instead of -0.5', () => {
    // Given
    const gildedRose = new GildedRose([new Item('Normal Item', 1, 0.5)]);

    // When
    const items = gildedRose.updateQuality();

    // Then
    expect(items[0].quality).toBe(0);
  });
});
