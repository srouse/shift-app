

var _Event = function () {
    this.listeners = {};
    this.listenerClusters = {};
};

_Event.prototype = {

    on: function (
    	prop,
    	callback,
    	cluster_id
    )
    {
    	if ( !this.listeners[ prop ] ) {
    		this.listeners[ prop ] = [];
    	}
    	this.listeners[ prop ].push( callback );

    	if ( cluster_id ) {
    		if ( !this.listenerClusters[ cluster_id ] ) {
    			this.listenerClusters[ cluster_id ] = [];
    		}
    		this.listenerClusters[ cluster_id ].push( callback );
    	}

    	return callback;
    },

    remove: function ( difflistener_id )
    {
        // try clusters first...
        var cluster_id = difflistener_id;
        if ( this.listenerClusters[cluster_id] ) {
    		var callbacks = this.listenerClusters[cluster_id];
    		for ( var c=0; c<callbacks.length; c++ ) {
    			callback = callbacks[c]; 
    			this.remove( callback );
    		}
    		this.listenerClusters[cluster_id] = false;
    		delete this.listenerClusters[cluster_id];
    	}else{
            for ( var prop in this.listeners ) {
        		callbacks = this.listeners[prop];
        		for ( var c=0; c<callbacks.length; c++ ) {
        			callback = callbacks[c];

        			if ( callback === difflistener_id ) {
        				callbacks.splice( c , 1 );
        				break;
        			}
        		}
        	}
        }
    },

    fire: function ( event )
    {
        console.log( event );
        var callbacks = this.listeners[ event ];
        if ( callbacks ) {
            var callback;
            for ( var c=0; c<callbacks.length; c++ ) {
				callback = callbacks[c];
				callback();
        	}
        }
    }

};

var Event = new _Event();
