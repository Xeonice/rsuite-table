import emptyFunction from './utils/emptyFunction';
import normalizeWheel from './normalizeWheel';
import requestAnimationFramePolyfill from './animation/requestAnimationFramePolyfill';

class WheelHandler {
  constructor(onWheel, handleScrollX, handleScrollY, updateBoundaryIndex, updateVisibleData, stopPropagation) {
    this.animationFrameID = null;
    this.deltaX = 0;
    this.deltaY = 0;
    this.previousScrollTop = 0;
    this.didWheel = this.didWheel.bind(this);
    this.doc = null;

    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX
        ? emptyFunction.thatReturnsTrue
        : emptyFunction.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY
        ? emptyFunction.thatReturnsTrue
        : emptyFunction.thatReturnsFalse;
    }

    if (typeof stopPropagation !== 'function') {
      stopPropagation = stopPropagation
        ? emptyFunction.thatReturnsTrue
        : emptyFunction.thatReturnsFalse;
    }

    this.handleScrollX = handleScrollX;
    this.handleScrollY = handleScrollY;
    this.stopPropagation = stopPropagation;
    this.onWheelCallback = onWheel;
    this.updateBoundaryIndex = updateBoundaryIndex;
    this.updateVisibleData = updateVisibleData;
    this.onWheel = this.onWheel.bind(this);
  }

  onWheel(event, anchorItem) {
    // debugger;
    let normalizedEvent = normalizeWheel(event);
    let deltaX = this.deltaX + normalizedEvent.pixelX;
    let deltaY = this.deltaY + normalizedEvent.pixelY;
    let handleScrollX = this.handleScrollX(deltaX, deltaY);
    let handleScrollY = this.handleScrollY(deltaY, deltaX);
    if (!handleScrollX && !handleScrollY) {
      return;
    }

    this.deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
    this.deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
    event.preventDefault();

    let changed;
    if (this.deltaX !== 0 || this.deltaY !== 0) {
      if (this.stopPropagation()) {
        event.stopPropagation();
      }
      changed = true;
    }

    // debugger;
    console.log(this.deltaY);
    if (changed === true && this.animationFrameID === null) {
      this.animationFrameID = requestAnimationFramePolyfill(this.didWheel);
    }

    if (!this.doc) {
      // 兼容 iOS Safari/Webview
      this.doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement;
    }
    debugger;
    const scrollTop = this.previousScrollTop + this.deltaY;
    console.log(anchorItem);
    if (scrollTop > this.previousScrollTop) {
      debugger;
      if (scrollTop > anchorItem.bottom) {
        this.updateBoundaryIndex(this.previousScrollTop);
        this.updateVisibleData();
      }
    } else if (scrollTop < this.previousScrollTop) {
      debugger;
      if (scrollTop < anchorItem.top) {
        this.updateBoundaryIndex(this.previousScrollTop);
        this.updateVisibleData();
      }
    }
    this.previousScrollTop += this.deltaY;
    console.log(this.previousScrollTop);
  }

  didWheel() {
    this.animationFrameID = null;
    this.onWheelCallback(this.deltaX, this.deltaY);
    this.deltaX = 0;
    this.deltaY = 0;
  }
}

export default WheelHandler;
