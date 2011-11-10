/**
 * ElasticTextbox that expands vertically or horizonally
 *  config:
 *      node: `HTMLDOMElement` : DOM Element to attach to :: Required
 *      vert: `Boolean` : Expand vertically :: Optional (default: true)
 *      horz: `Boolean` : Expand horizonally :: Optional (default: false)
 *      height: `Integer` : Beginning static height :: Optional
 *      max_height: `Integer` : Maximum height of node :: Optional
 *      min_height: `Integer` : Minimum height of node :: Optional
 *      max_width: `Integer` : Maximum width of node :: Optional
 *      min_width: `Integer` : Minimum width of node :: Optional
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

//////////////////////
//functions
//////////////////////
ElasticText.prototype.getComputedStyle = null;

ElasticText.prototype._init = function(config){
    if(!config.node || this.TEXTAREA.indexOf(config.node.nodeName.toLower()) < 0){
        //sorry peeps, we're only supporting TEXTAREA here.
        return;
    }
    //we're gonna need this
    this.getComputedStyle = this._setGetComputedStyle();
    //setup config
};


ElasticText.prototype._setGetComputedStyle = function(){
    if(window && 'getComputedStyle' in window){
        return window.getComputedStyle;
    }

    return function(node, att) {
        var val = '',
            doc = node[OWNER_DOCUMENT];

        if (node[STYLE] && doc[DEFAULT_VIEW] && doc[DEFAULT_VIEW][GET_COMPUTED_STYLE]) {
            val = doc[DEFAULT_VIEW][GET_COMPUTED_STYLE](node, null)[att];
        }
        return val;
    };
};

ElasticText.prototype._destructor = function(){
    this._destoryCopyNode();
    this._destroyListeners();
};

ElasticText.prototype._createListeners = function(){
    this._keyupListener = this._addEvent(this.node, 'keyup', this.update);
    this._pasteListener = this._addEvent(this.node, 'paste', this.update);
};

ElasticText.prototype._addEvent = function(node, event, callback){

};

ElasticText.prototype._detach = function(event){

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
    var cn = document.createElement(this.PRE);
    cn.setAttribute('style', this.PRE_STYLE);
    document.body.appendChild(cn);
    //mimick styles?
    this._copyNode = copyNode;
};

ElasticText.prototype._updateCopyNode = function(){
    var txt = this._node.value + "\n ";
    //check for ie and replace with \r's
    if(this._copyTextNode){
        //remove from dom.
        this._remove(this._copyTextNode);
    }
    this._copyTextNode = document.createTextNode(txt);
    this._copyNode.appendChild(this._copyTextNode);
};

ElasticText.prototype._getNodeHeight = function(){
    return parseInt(this._getComputedStyle(this._node, this.height), 10);
};

ElasticText.prototype._getNodeWidth = function(){
    return parseInt(this._getComputedStyle(this._node, this.width), 10);
};

ElasticText.prototype._getCopyNodeHeight = function(){
    return parseInt(this._getComputedStyle(this._copyNode, this.height), 10);
};

ElasticText.prototype._getCopyNodeWidth = function(){
    return parseInt(this._getComputedStyle(this._copyNode, this.WIDTH), 10);
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
            overflow = ((minh && ch < minh) ? this.AT : this.HIDDEN) + this.PX;
            //set styles
    }
};
