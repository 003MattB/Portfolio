let itemClassName = "carousel-card";
let items = document.getElementsByClassName(itemClassName);
let totalItems = items.length;
let slide = 0;
let moving = true;
let xDown = null;
let yDown = null;


// Set classes
function setInitialClasses() {
  // Targets the previous, current, and next items
  // This assumes there are at least three items.
  items[totalItems - 1].classList.add("prev");
  items[0].classList.add("active");
  items[1].classList.add("next");
}
// Set event listeners
function setEventListeners() {
    let next = document.getElementsByClassName('carousel__button--next')[0];
    let prev = document.getElementsByClassName('carousel__button--prev')[0];
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
    // add event listeners for swiping
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
}

// Next navigation handler
function moveNext() {
    slide = (slide + 1) % totalItems
    // Move carousel to updated slide
    moveCarouselTo(slide);

}
// Previous navigation handler
function movePrev() {
    if (slide == 0) {
        slide = (totalItems - 1);
    } else {
        slide = slide - 1;
    }
    // Move carousel to updated slide
    moveCarouselTo(slide);

}

function disableInteraction() {
  // Set 'moving' to true for the same duration as our transition.
  // (0.5s = 500ms)

  moving = true;
  // setTimeout runs its function once after the given time
  setTimeout(function(){
    moving = false
  }, 500);
}

function moveCarouselTo(slide) {
  // Check if carousel is moving, if not, allow interaction
  if(!moving) {
    // temporarily disable interactivity
    disableInteraction();
    // Update the "old" adjacent slides with "new" ones
    let newPrevious = ((slide + totalItems) - 1) % totalItems;
    let newNext = (slide + 1) % totalItems;
    let oldPrevious = ((slide + totalItems) - 2 ) % totalItems;
    let oldNext = (slide + 2) % totalItems;


    // Now we've worked out where we are and where we're going,
    // by adding/removing classes we'll trigger the transitions.
    // Reset old next/prev elements to default classes
    items[oldPrevious].className = itemClassName;
    items[oldNext].className = itemClassName;
    // Add new classes
    items[newPrevious].className = itemClassName + " prev";
    items[newNext].className = itemClassName + " next";
    items[slide].className = itemClassName + " active";
  }
}

function initCarousel() {
  setInitialClasses();
  setEventListeners();
  // Set moving to false so that the carousel becomes interactive
  moving = false;
}

// make it rain
initCarousel();





function getTouches(evt) {
  return evt.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;


    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        let section = document.getElementById('projects');
        if ( xDiff > 0 ) {
            if (section.contains(evt.target)) {
                moveNext();
            }
        } else {
            if (section.contains(evt.target)) {
                movePrev();
            }
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}