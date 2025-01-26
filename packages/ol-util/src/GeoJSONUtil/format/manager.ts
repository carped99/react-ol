import { FeatureLike } from 'ol/Feature.js';
import GeoJSON, { Options } from 'ol/format/GeoJSON.js';

export class GeoJSONManager {
  private formatCache: Map<string, GeoJSON<FeatureLike>> = new Map();
  private defaultFormat = new GeoJSON();

  private static createCacheKey<T extends FeatureLike>(options: Options<T>): string {
    return `${options.dataProjection || ''}-${options.featureProjection || ''}-${options.geometryName || ''}`;
  }

  public getFormat<T extends FeatureLike>(options?: Options<T>): GeoJSON<T> {
    // 설정이 없는 경우 기본 포맷 반환
    if (!options) return this.defaultFormat as GeoJSON<T>;

    const cacheKey = GeoJSONManager.createCacheKey(options);
    if (!this.formatCache.has(cacheKey)) {
      try {
        const format = new GeoJSON(options);
        this.formatCache.set(cacheKey, format);
      } catch (error) {
        console.error('Error creating GeoJSON format:', error);
        return this.defaultFormat as GeoJSON<T>;
      }
    }
    return this.formatCache.get(cacheKey) as GeoJSON<T>;
  }

  public clearCache(): void {
    this.formatCache.clear();
  }

  public getCacheSize(): number {
    return this.formatCache.size;
  }
}
