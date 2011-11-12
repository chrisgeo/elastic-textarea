ELASTIC TEXTAREA
=================
Expanding textarea that can expand horizontally or vertically depending on your needs.

No need for any other javascript library.

#SETUP
```html
<script src="{{mydomain}}/elastic-text.js"></script>
```

```javascript
    new ElasticTextArea({node: document.getElementById('#txt-expand')});
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


