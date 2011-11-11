/**
 * ElasticTextbox that expands vertically or horizonally
 *  config:
 *      node: `HTMLDOMElement` : DOM Element to attach to :: Required
 *      vert: `Boolean` : Expand vertically :: Optional (default: true)
 *      horz: `Boolean` : Expand horizonally :: Optional (default: false)
 *      height: `Integer` : Beginning static height :: Optional
 *      maxHeight: `Integer` : Maximum height of node :: Optional
 *      minHeight: `Integer` : Minimum height of node :: Optional
 *      maxWidth: `Integer` : Maximum width of node :: Optional
 *      minWidth: `Integer` : Minimum width of node :: Optional
 *      width: `Integer` : Beginning static width :: Optional
 *      resize: 'Boolean' : CSS Resize :: Optional (default: false)
 *      overflow: 'String' : CSS Overflow :: Optional (default: hidden)
 *      NOTE: most of these values should be set with CSS
 **/
function ElasticText(config){
    this._init(config);
}

//////////////////////
//static vars
//////////////////////
ElasticText.prototype.PX = 'px';
ElasticText.prototype.AUTO = 'auto';
ElasticText.prototype.HIDDEN = 'hidden';
ElasticText.prototype.WIDTH = 'width';
ElasticText.prototype.HEIGHT = 'height';
ElasticText.prototype.TEXTAREA = 'textarea';
ElasticText.prototype.CLASSNAME = 'elastic-text';
ElasticText.prototype.OWNER_DOCUMENT = 'ownerDocument';
ElasticText.prototype.DOCUMENT_ELEMENT = 'documentElement';
ElasticText.prototype.DEFAULT_VIEW = 'defaultView';
ElasticText.prototype.PARENT_WINDOW = 'parentWindow';
ElasticText.prototype.PARENT = 'parentNode';
ElasticText.prototype.STYLE = 'style';
ElasticText.prototype.GET_COMPUTED_STYLE = 'getComputedStyle';
ElasticText.prototype._node = null;
ElasticText.prototype._copyNode = null;
ElasticText.prototype.PRE = 'pre';
ElasticText.prototype.PRE_STYLE = ['top: -10000px; left: -10000px; white-space:pre-wrap;white-space:-pre-wrap;',
                                   'white-space:-o-pre-wrap;word-wrap:break-word;_white-space:pre;position:absolute;visibility:hidden;',
                                  ].join('');
ElasticText.prototype.STYLE_MIMICS = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'fontStyle',
    'fontVariant',
    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'textIndent',
    'textTransform',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'borderTopWidth',
    'borderBottomWidth',
    'width'
  ];
//////////////////////
//functions
//////////////////////
ElasticText.prototype.getComputedStyle = null;

ElasticText.prototype._init = function(config){
    if(!config.node || this.TEXTAREA.indexOf(config.node.nodeName.toLowerCase()) < 0){
        //sorry peeps, we're only supporting TEXTAREA here.
        throw new Error("node is required");
    }
    //we're gonna need this
    this.getComputedStyle = this._setGetComputedStyle();
    //setup config
    this._node = config.node;
    //setup styles
    if(config['minHeight']){
        this.minHeight = parseInt(config.minHeight, 10) || this._getNodeHeight();
        this._node.style.minHeight = this.minHeight + this.PX;
    }
    
    if(config['maxHeight']){
        this.maxHeight = parseInt(config.maxHeight, 10) || this._getNodeHeight();
        this._node.style.maxHeight = this.maxHeight + this.PX;
    }

    if(config['height']){
        this._node.style.height = parseInt(config.height, 10) || this._getNodeHeight();
    }

    if(config['minWidth']){
        this._node.style.minWidth = parseInt(config.minWidth, 10) || this._getNodeWidth();
    }
    
    if(config['maxWidth']){
        this._node.style.maxWidth =  parseInt(config.maxWidth, 10) || this._getNodeWidth();
    }

    if(config['width']){
        this._node.style.width = parseInt(config.width, 10) || this._getNodeWidth();
    }

    this._node.style.resize = config['resize'] || 'none';
    this._node.style.overflow = config['overflow'] || 'hidden';
    this._createCopyNode();
    this._createListeners();
    this.update();
};


ElasticText.prototype._setGetComputedStyle = function(){
    return function(node, att) {
        var val = '',
            doc = node[this.OWNER_DOCUMENT];

        if (node[this.STYLE] && doc[this.DEFAULT_VIEW] && doc[this.DEFAULT_VIEW][this.GET_COMPUTED_STYLE]) {
            val = doc[this.DEFAULT_VIEW][this.GET_COMPUTED_STYLE](node, null)[att];
        }
        return val;
    };
};

ElasticText.prototype._destructor = function(){
    this._destoryCopyNode();
    this._destroyListeners();
};

ElasticText.prototype._createListeners = function(){
    this._keyupListener = this._addEvent(this._node, 'keyup', this.update);
    this._keyupListener = this._addEvent(this._node, 'keypress', this.update);
    this._keyupListener = this._addEvent(this._node, 'keydown', this.update);
    /* these are kind of meh in browsers */
    this._pasteListener = this._addEvent(this._node, 'paste', this.update);
    this._pasteListener = this._addEvent(this._node, 'cut', this.update);
};

ElasticText.prototype.bind = function(f, c) {
    var xargs = arguments.length > 2 ?
            arguments.slice(2) : null;
    return function() {
        var fn = (typeof(x) === 'string') ? c[f] : f,
            args = (xargs) ?
                xargs.concat(arguments.slice(0)) : arguments;
        return fn.apply(c || fn, args);
    };
};

ElasticText.prototype._addEvent = function(node, event, callback){
    if (node.addEventListener){
        node.addEventListener(event, this.bind(callback, this), false);
    } else if (node.attachEvent){
        node.attachEvent('on'+event, this.bind(callback, this));
    }
};

ElasticText.prototype._detach = function(event){
    if (node.addEventListener){
        node.removeEventListener(event, this.bind(callback, this), false);
    } else if (node.attachEvent){
        node.detachEvent(event, this.bind(callback, this));
    }
};

ElasticText.prototype._destroyListeners = function(){
    if(this._keyupListener){
        this._detach(this._keyupListener);
        this._keyupListener = null;
    }
    if(this._pasteListener){
        this._detach(this._pasteListener);
        this._pasteListener = null;
    }
};

ElasticText.prototype._createCopyNode = function(){
    var i = 0, len = this.STYLE_MIMICS.length,
        cn = document.createElement(this.PRE);
    cn.setAttribute('style', this.PRE_STYLE);
    document.body.appendChild(cn);
    for(;i < len; i++){
        var mim = this.STYLE_MIMICS[i];
        cn.style[mim] = this.getComputedStyle(this._node, mim);
    }
    this._copyNode = cn;
};

ElasticText.prototype._updateCopyNode = function(){
    var txt = this._node.value + "\n ";
    //TODO: check for ie and replace with \r's
    if(this._copyTextNode){
        //remove from dom.
        this._remove(this._copyTextNode);
    }
    this._copyTextNode = document.createTextNode(txt);
    this._copyNode.appendChild(this._copyTextNode);
};

ElasticText.prototype._getNodeHeight = function(){
    return parseInt(this.getComputedStyle(this._node, this.HEIGHT), 10);
};

ElasticText.prototype._getNodeWidth = function(){
    return parseInt(this.getComputedStyle(this._node, this.WIDTH), 10);
};

ElasticText.prototype._getCopyNodeHeight = function(){
    return parseInt(this.getComputedStyle(this._copyNode, this.HEIGHT), 10);
};

ElasticText.prototype._getCopyNodeWidth = function(){
    return parseInt(this.getComputedStyle(this._copyNode, this.WIDTH), 10);
};

ElasticText.prototype._remove = function(node){
    if(node && node[this.PARENT]){
        var parent = node[this.PARENT];
        parent.removeChild(node);
    }
};

ElasticText.prototype.update = function(){
    this._updateCopyNode();
    var nh = this._getNodeHeight(),
        ch = this._getCopyNodeHeight();
    if(nh !== ch){
        var maxh = this.maxHeight,
            minh = this.minHeight,
            h = ((minh && ch < minh) ? minh : ch) + this.PX,
            overflow = ((minh && ch < minh) ? this.AT : this.HIDDEN);
            //set styles
            this._node.style.height = h;
            this._node.style.overflow = overflow;
    }
};
