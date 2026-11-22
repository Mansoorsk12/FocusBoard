import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";
import { focusNotes } from "../data/focusNotes.js";

export default function FocusNotesCarousel() {
  const { slide, setSlide } = useTasks();
  const note = focusNotes[slide];
  const total = focusNotes.length;
  const counter = `${String(slide + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  // Wraps around: previous on slide 1 goes to the last slide, and the reverse.
  function move(delta) {
    setSlide((slide + delta + total) % total);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      onKeyDown={handleKeyDown}
    >
      <div className="hero-body">
        <div className="hero-eyebrow">
          <span>FOCUS NOTES</span>
          <span>{counter}</span>
        </div>
        <div
          className="hero-slide"
          key={note.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${slide + 1} of ${total}`}
          aria-live="polite"
        >
          <h2>{note.title}</h2>
          <p>{note.text}</p>
        </div>
        <div className="hero-dots" role="group" aria-label="Choose a slide">
          {focusNotes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === slide ? "active" : ""}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === slide ? "true" : undefined}
              onClick={() => setSlide(index)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>

      <div className="hero-card-wrap" aria-hidden="true">
        <div className="hero-card-back" />
        <div className="hero-card" key={note.id}>
          <span className="hero-card-icon">
            <Check size={15} strokeWidth={3} />
          </span>
          <div className="hero-card-text">
            <small>{note.cardLabel}</small>
            <strong>{note.cardTitle}</strong>
            <div className="hero-card-progress">
              <span className="track">
                <span style={{ width: `${note.progress}%` }} />
              </span>
              <em>{note.progress}%</em>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-arrows">
        <button
          type="button"
          className="hero-arrow"
          aria-label="Previous slide"
          onClick={() => move(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="hero-arrow hero-arrow-next"
          aria-label="Next slide"
          onClick={() => move(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}