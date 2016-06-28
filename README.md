# Base Atomic Design

[![Build Status](http://img.shields.io/travis/pixelfusion/base-atomic-design/master.svg?style=flat-square)](https://travis-ci.org/pixelfusion/base-atomic-design)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

Used by the Front End team at [Pixel Fusion](https://pixelfusion.co.nz), a Product Design studio based in Auckland, New Zealand.

### Installing

Run `npm install` to install the project.

### Running

Run `webpack --watch` to watch and compile the Javascript and SCSS files. The project uses:

- Babel, to provide ES6 support.
- PostCSS, to allow us to use:
    - Autoprefixer, to take care of those pesky prefixes...which are [being phased out](https://webkit.org/blog/6131/updating-our-prefixing-policy/)!
- Jest, to handle Unit testing of the Javascript.

### Browser Support

Supported and tested in the following browsers:

- Internet Explorer (10-11)
- Chrome
- Firefox
- Safari 9
- Edge 14

### Polyfills

- [SVG4Everybody](https://github.com/jonathantneal/svg4everybody) - Adds the ability to implement `<use></use>` SVG element in older browsers (IE10), for use with external SVG loading.
- [Picturefill](http://scottjehl.github.io/picturefill) - Adds support for the <picture> element to older browsers (Internet Explorer and older versions of Safari).


### Gotchas

- Always set width and height on <svg> elements which implement external `<use>` elements, otherwise Internet Explorer does not display them.

### Inspiration

Our base HTML is inspired by:

- [HTML5Boilerplate](https://github.com/h5bp/html5-boilerplate)
- [HEAD](https://github.com/joshbuchea/HEAD)
