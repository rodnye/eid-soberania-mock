import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FrontendService {
  private readonly isProduction: boolean;
  private readonly frontendDevUrl: string;
  private readonly _cacheFrontendDevActive: boolean | null = null;

  constructor(private readonly configService: ConfigService) {
    this.isProduction = this.configService.get('NODE_ENV') === 'production';
    this.frontendDevUrl = this.configService.get(
      'FRONTEND_DEV_URL',
      'http://localhost:4200',
    );
  }

  getIsProduction() {
    return this.isProduction;
  }

  getFrontendUrl(): string {
    return this.isProduction ? '' : this.frontendDevUrl;
  }

  /**
   * this method checks if the frontend dev server is active by sending a HEAD request to it.
   * it caches the result to avoid multiple requests
   */
  async isFrontendDevActive(): Promise<boolean> {
    if (this.isProduction) return true;
    if (this._cacheFrontendDevActive === true) return true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      const response = await fetch(this.frontendDevUrl, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return response.ok;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request timed out');
      } else {
        console.warn(error);
        console.warn(
          '[x] - Request failed: Is the frontend dev server running?',
        );
      }

      return false;
    }
  }
}
