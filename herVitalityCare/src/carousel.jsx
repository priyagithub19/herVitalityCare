import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import { DotButton, useDotButton } from './CarouselDotButtons'
import Typography from '@mui/material/Typography';

const TWEEN_FACTOR_BASE = 0.84

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const Carousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenOpacity = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }
        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const opacity = numberWithinRange(tweenValue, 0, 1).toString()
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)
  }, [emblaApi, tweenOpacity])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
    {slides.map((slide, index) => (
        <div className="embla__slide" key={index}>
            <img
                className="embla__slide__img"
                src={slide.url}
                alt="Your alt text"
                style={{opacity: 0.3, backdropFilter: 'blur(20rem)'}}
            />
            <div 
                className='overlay' 
                style={{
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    bottom: 0, 
                    left: 0, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '1.8rem', 
                }}
            >
              <Typography
                  sx={{
                    fontFamily: 'Inria Serif, serif',
                    color: '#000000ff',
                    lineHeight: 1.6,
                    marginInline: '1rem',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    fontFamily: 'Open Sans , sans-serif'
                  }}
                  dangerouslySetInnerHTML={{ __html: slide.content }}
                />
            </div>
        </div>
    ))}
</div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <Typography
    variant="h6"
    className="embla__title"
    sx={{
      textAlign: 'center',
      color: 'rgba(234, 14, 172, 1)',
      fontWeight: 'bold',
      fontSize: '2rem',
      fontFamily: 'Inria Serif, serif',
    }}
  >
    {slides[selectedIndex]?.title || ''} {slides[selectedIndex]?.icon || ''}
  </Typography>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel