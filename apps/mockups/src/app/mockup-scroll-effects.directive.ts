import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[data-parallax], [data-remove-after], [data-scrolled]',
  standalone: true,
})
export class MockupScrollEffectsDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly removeScrollListeners: Array<() => void> = [];
  private animationFrame = 0;
  private timer?: ReturnType<typeof setTimeout>;
  private parallaxPoints: number[][] = [];

  public ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.element.hasAttribute('data-remove-after')) {
      this.timer = setTimeout(
        () => this.renderer.setAttribute(this.element, 'hidden', ''),
        Number(this.element.getAttribute('data-remove-after')) || 0,
      );
    }

    if (this.element.hasAttribute('data-scrolled')) {
      const update = (): void => {
        const attribute = window.scrollY > 60 ? 'data-scrolled' : 'data-top';
        const value = this.element.getAttribute(attribute);
        if (value !== null) this.renderer.setAttribute(this.element, 'class', value);
      };
      this.removeScrollListeners.push(
        this.renderer.listen('window', 'scroll', update, { passive: true }),
      );
      update();
    }

    const points = this.element.getAttribute('data-parallax');
    if (!points) return;
    try {
      this.parallaxPoints = JSON.parse(points) as number[][];
    } catch {
      return;
    }
    const update = (): void => {
      if (this.animationFrame) return;
      this.animationFrame = requestAnimationFrame(() => {
        this.animationFrame = 0;
        const [, x, y, scale] = this.positionAt(window.scrollY);
        this.renderer.setStyle(
          this.element,
          'transform',
          `translate(${x}px, ${y}px)${scale !== 1 ? ` scale(${scale})` : ''}`,
        );
      });
    };
    if (!this.parallaxPoints.length) return;
    this.removeScrollListeners.push(
      this.renderer.listen('window', 'scroll', update, { passive: true }),
    );
    update();
  }

  public ngOnDestroy(): void {
    this.removeScrollListeners.forEach((remove) => remove());
    if (this.timer) clearTimeout(this.timer);
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  private positionAt(scrollY: number): number[] {
    const points = this.parallaxPoints;
    if (scrollY <= points[0][0]) return points[0];
    for (let index = 1; index < points.length; index += 1) {
      if (scrollY > points[index][0]) continue;
      const [y0, ...from] = points[index - 1];
      const [y1, ...to] = points[index];
      const progress = (scrollY - y0) / (y1 - y0 || 1);
      return [scrollY, ...from.map((value, axis) => value + (to[axis] - value) * progress)];
    }
    return points[points.length - 1];
  }
}
