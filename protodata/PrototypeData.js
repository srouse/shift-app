

module.exports = {
    user:{
        init:function ( pd ) {

            this.name = "Scott Rouse";

            this.timelines = pd.generateArray(
                            "timeline" , pd.random( 10, 15 )
                        );
        },
        root:true
    },
    timeline:{
        init:function( pd ) {
            this.title = pd.db_incremental( "firstName" , "timeline" ) + " Timeline";

            this.events = [1,2,3,4];
        }
    }
};
