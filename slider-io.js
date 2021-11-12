/**
 *  slider-io.js
 *  by Raphaël Pion
 *  https://raphpion.io
 */

let $ = jQuery

$(document).ready(function () {
  $('.slider-io').each(function () {
    let slider = $(this)

    // add click event to controls
    slider.find('.slider-io-control.left').click(function () {
      getPreviousPos(slider)
    })
    slider.find('.slider-io-control.right').click(function () {
      getNextPos(slider)
    })
    // add auto slide if necessary
    if ($(this).data('delay') > 0) {
      setInterval(function () {
        getNextPos(slider)
      }, $(this).data('delay') * 1000)
    }
    // add auto reposition
    setInterval(function () {
      adjustPosition(slider)
    }, 500)
  })
})

function getPreviousPos(slider) {
  let pos = slider.data('position') - 1
  if (pos < 1) pos = getMaxPos(slider)
  setPosition(slider, pos)
}

function getSliderLength(slider) {
  return slider.find('.slider-io-object').length
}

function getNextPos(slider) {
  let pos = slider.data('position') + 1
  if (pos > getMaxPos(slider)) pos = 1
  setPosition(slider, pos)
}

function getMaxPos(slider) {
  let breakpoints = slider.data('breakpoints').split(',')
  if ($(window).width() > Number(breakpoints[0])) return getSliderLength(slider) - 2
  else if ($(window).width() > Number(breakpoints[1])) return getSliderLength(slider) - 1
  else return getSliderLength(slider)
}

function setPosition(slider, pos) {
  slider.data('position', pos)
  adjustPosition(slider)
}

function adjustPosition(slider) {
  let objPos
  let objectList = slider.find('.slider-io-content')
  let objects = objectList.find('.slider-io-object')
  for (let i = 1; i < objects.length + 1; i++) {
    if (i == slider.data('position')) objPos = objects[i - 1].offsetLeft
  }
  objectList.css('left', -objPos)
}
