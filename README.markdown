ELASTIC TEXTAREA
=================
Expanding textarea that can expand horizontally or vertically depending on your needs.

No need for any other javascript library.

[Preview](http://chrisgeo.github.com/elastic-textarea/)

#LICENSE
Unless otherwise indicated, Source Code is licensed under MIT license.
See further explanation attached in License Statement (distributed in the file
LICENSE).

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

NOTE:
Pretty much do whatever you want with it, just link to the original source in your README and give credit to the original author.
#SETUP
```html
<script src="{{mydomain}}/elastic-text.js"></script>
```

```javascript
    new ElasticText({node: document.getElementById('txt-expand')});
```

##CONFIG
    * node: {HTMLDOMElement} : DOM Element to attach to :: Required
    * vert: {Boolean} : Expand vertically :: Optional (default: true)
    * horz: {Boolean} : Expand horizonally :: Optional (default: false)
    * height: {Integer} : Beginning static height :: Optional
    * maxHeight: {Integer} : Maximum height of node :: Optional
    * minHeight: {Integer} : Minimum height of node :: Optional
    * maxWidth: {Integer} : Maximum width of node :: Optional
    * minWidth: {Integer} : Minimum width of node :: Optional
    * width: {Integer} : Beginning static width :: Optional
    * resize: {Boolean} : CSS Resize :: Optional (default: false)
    * overflow: {String} : CSS Overflow :: Optional (default: hidden)
<div style="background-color: #114878; color: #fff; border: 1px solid #0D385E;">
    <strong>NOTE:</strong> most of these values should be set with CSS
</div>

#EVENTS
The current DOM Events are attached are:
    * Paste
    * Cut
    * KeyUp
    * Keydown
    * Keypress

#OTHER GOODIES
If you want to play with the character width and the width/character position in which
the area expands I highly suggest using CSS to acheieve this effect.

##EXAMPLE
```css
textarea {
    width: 300px;
    padding: 4px; /* illusion of about 2 characters from 'end' for default font sets */
}
```
#CREDIT
A large amount of credit goes to [YUI](http://yuilibrary.com)

And this cool YUI Gallery Plugin: [Elastic Textarea](https://github.com/jingoro/yui3-elastic-textarea)



