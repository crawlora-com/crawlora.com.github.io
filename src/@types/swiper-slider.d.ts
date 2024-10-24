declare module 'swiper' {
  export interface SwiperOptions {
    loop?: boolean;
    slidesPerView?: number | string;
    spaceBetween?: number;
    pagination?: {
      el?: string | HTMLElement;
      clickable?: boolean;
    };
    centeredSlides?: boolean;
    speed?: number;
    autoplay?: {
      delay?: number;
      disableOnInteraction?: boolean;
    };
    breakpoints?: {
      [key: number]: SwiperOptions;
    };
  }

  export default class Swiper {
    constructor(selector: string | HTMLElement, options?: SwiperOptions);
    // Add other methods or properties if necessary
  }
}
