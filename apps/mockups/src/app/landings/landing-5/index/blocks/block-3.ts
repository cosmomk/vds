import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';

@Component({
  selector: 'section[landing-5-block-3]',
  templateUrl: './block-3.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective],
})
export class Landing5Block3 {
  private readonly testimonials = [
    {
      name: 'Priya Malhotra',
      role: 'Senior Interior Designer · Delhi',
      initials: 'PM',
      text: "SanCurtains transformed my client's penthouse into a palace. The Velvet Royale drapes are exquisite — the craftsmanship is unlike anything I have encountered in 15 years of design work.",
    },
    {
      name: 'Rahul Singhania',
      role: 'Luxury Hotelier · Mumbai',
      initials: 'RS',
      text: 'We ordered bespoke drapes for all 48 suites of our property. Delivery was precise, installation was immaculate, and our guests constantly remark on the ambiance. Worth every rupee.',
    },
    {
      name: 'Ananya Kapoor',
      role: 'Principal Architect · Bangalore',
      initials: 'AK',
      text: 'The Silk Cascade collection is breathtaking. I specified them for a heritage bungalow restoration — they elevated the entire space to museum-quality grandeur.',
    },
  ];
  public readonly activeIndex = signal(0);
  public readonly activeTestimonial = computed(() => this.testimonials[this.activeIndex()]);

  public selectTestimonial(index: number): void {
    this.activeIndex.set(index);
  }
}
