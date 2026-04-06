interface StepperIndicatorProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  ariaLabel: string;
}

export function StepperIndicator({
  count,
  activeIndex,
  onSelect,
  ariaLabel,
}: StepperIndicatorProps) {
  return (
    <div className="stepper-indicator" role="tablist" aria-label={ariaLabel}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Go to item ${index + 1}`}
          className={`stepper-dot ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          <span />
        </button>
      ))}
    </div>
  );
}
