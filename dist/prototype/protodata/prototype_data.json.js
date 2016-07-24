

var ProtoData = function () {}

ProtoData.createModel = function( data ) {

    data.get = function ( obj_info ) {
        var obj,lookup_obj,guid;

        // could be false (used in arrays for empty entry...)
        if ( !obj_info ) {
            return false;
        }

        if ( typeof obj_info == "string" ) {
            guid = obj_info;
        }else if (
            Object.prototype.toString.call( obj_info ) === '[object Array]'
        ) {
            return this.getArray( obj_info );
        }else if ( obj_info && obj_info['guid'] ) {
            guid = obj_info['guid'];
        }

        lookup_obj = this.lookup[ guid ];

        if ( !lookup_obj ) {
            // console.log( "COULDN'T FIND:" + guid );

            //lets create an empty one!!!
            var guid_arr = guid.split("_");
            var guid_index = guid_arr[ guid_arr.length-1 ];
            guid_arr.pop();
            var guid_type = guid_arr.join("_");

            // just take the first one...
            var ref_obj = this.lookup[ guid_type + "_0" ];
            if (!ref_obj) {
                // console.log( "COULDN'T FIND it again:" + guid );
                return obj_info;// just reflect it back...;
            }

            var new_obj = {};
            
            this.lookup[ guid ] = new_obj;

            for ( var name in ref_obj ) {
                if ( Object.prototype.toString.call( ref_obj[name] ) === '[object Array]' ) {
                    new_obj[ name ] = [];
                }else if ( Object.prototype.toString.call( ref_obj[name] ) === '[object Object]' ) {
                    if ( ref_obj[name].guid ) {
                        var obj_guid = ref_obj[name].guid;
                        var obj_guid_arr = obj_guid.split("_");
                        obj_guid_arr.pop();
                        obj_guid = obj_guid_arr.join("_");
                        new_obj[ name ] = this.get( obj_guid + "_" + guid_index );
                    }else{
                        var sub_obj = ref_obj[name];
                        var new_sub_obj = {};
                        for ( var sub_name in sub_obj ) {
                            new_sub_obj[sub_name] = "";
                        }
                        new_obj[ name ] = new_sub_obj;
                    }
                }else{
                    new_obj[ name ] = "";
                }
            }
            new_obj.guid = guid;

            obj = new_obj;


        }else{
            obj = lookup_obj;//new lookup_obj();
        }

        if ( obj ) {
            return obj;
        }else{
            return false;
        }
    }

    data.getArray = function ( obj_array ) {
        var arr = [];
        for ( var i=0; i<obj_array.length; i++ ) {
            arr.push( this.get( obj_array[i] ) );
        }
        return arr;
    }

    // process root into actual references
    var _root = {},id_str,type_str;
    for ( var i=0; i<data._root.length; i++ ) {
        id_str = data._root[i];
        type_str = id_str.split("_")[0];
        _root[ type_str ] = data.get( id_str );
    }
    data._root = _root;

    // you should be able to walk around with just the _root,
    // so get lookup is added to it...
    _root.get = function ( obj_info ) {
        return data.get( obj_info );
    }

    return data;
}



var __271830 = function () {
	this._root = [
		'user_0',
	];

	this.lookup = {};
	this.lookup['user_0'] = {
		guid : 'user_0',
		name : 'Scott Rouse',
		_timelines:['timeline_0','timeline_1','timeline_2','timeline_3','timeline_4','timeline_5','timeline_6','timeline_7','timeline_8','timeline_9','timeline_10','timeline_11'],
		set timelines( val ) {   delete this.timelines; this.timelines = val;  },
		get timelines() {   delete this.timelines; this.timelines = __271830.get( this._timelines ); return this.timelines;  },
	};

	this.lookup['user_0'] = {
		guid : 'user_0',
		name : 'Scott Rouse',
		_timelines:['timeline_0','timeline_1','timeline_2','timeline_3','timeline_4','timeline_5','timeline_6','timeline_7','timeline_8','timeline_9','timeline_10','timeline_11'],
		set timelines( val ) {   delete this.timelines; this.timelines = val;  },
		get timelines() {   delete this.timelines; this.timelines = __271830.get( this._timelines ); return this.timelines;  },
	};

	this.lookup['timeline_0'] = {
		guid : 'timeline_0',
		title : 'James Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_1'] = {
		guid : 'timeline_1',
		title : 'John Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_2'] = {
		guid : 'timeline_2',
		title : 'Robert Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_3'] = {
		guid : 'timeline_3',
		title : 'Michael Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_4'] = {
		guid : 'timeline_4',
		title : 'William Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_5'] = {
		guid : 'timeline_5',
		title : 'David Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_6'] = {
		guid : 'timeline_6',
		title : 'Richard Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_7'] = {
		guid : 'timeline_7',
		title : 'Joseph Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_8'] = {
		guid : 'timeline_8',
		title : 'Charles Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_9'] = {
		guid : 'timeline_9',
		title : 'Thomas Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_10'] = {
		guid : 'timeline_10',
		title : 'Christopher Timeline',
		events:[1,2,3,4],
	};

	this.lookup['timeline_11'] = {
		guid : 'timeline_11',
		title : 'Daniel Timeline',
		events:[1,2,3,4],
	};


};var __271830 = new __271830();
var protoData = ProtoData.createModel( __271830 )._root;// everything can be pulled from root