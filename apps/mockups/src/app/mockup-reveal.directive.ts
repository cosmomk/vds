import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[data-reveal], [data-inview], section.section-reveal:not([data-reveal]):not(.visible)',
  standalone: true,
})
export class MockupRevealDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private transitionTimer?: ReturnType<typeof setTimeout>;

  public ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const reveal = this.element.hasAttribute('data-inview');
    const lateReveal = this.element.matches(
      'section.section-reveal:not([data-reveal]):not(.visible)',
    );

    if (!('IntersectionObserver' in window)) {
      this.show(reveal, lateReveal);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.observer?.disconnect();
        this.show(reveal, lateReveal);
      },
      reveal ? { rootMargin: '-80px' } : lateReveal ? { threshold: 0.2 } : { threshold: 0.12 },
    );
    this.observer.observe(this.element);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.transitionTimer) clearTimeout(this.transitionTimer);
  }

  private show(reveal: boolean, lateReveal: boolean): void {
    if (lateReveal) {
      this.element.classList.add('visible');
      return;
    }
    if (!reveal) {
      this.element.classList.add('is-shown');
      return;
    }

    const classes: string[] = String(this.element.getAttribute('data-inview') ?? '').split(/\s+/);
    const visibleClasses: string[] = classes.filter((className: string) => className.length > 0);
    this.element.className = visibleClasses.join(' ');
    this.element.removeAttribute('data-inview');
    const transition = visibleClasses.find((className: string) =>
      className.startsWith('[transition:'),
    );
    const match = transition?.match(/_([\d.]+)s_cubic-bezier\([^)]*\)_([\d.]+)s,/);
    if (!transition || !match) return;

    this.transitionTimer = setTimeout(
      () => this.element.classList.remove(transition),
      (Number(match[1]) + Number(match[2])) * 1000 + 100,
    );
  }
}
