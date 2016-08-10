


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

            var year_span = pd.random(20,40);
            this.start_date = new Date(
                2016 -  year_span,
                pd.random( 0 , 11 ) ,
                pd.random( 1, 30 )
            );

            this.outlook = pd.random( 0 ,100 );
            this.intensity = pd.random( 0 , 100 );

            this.is_open_ended = ( Math.random() > .5 ) ? true : false;

            if ( !this.is_open_ended ) {
                this.end_date = new Date(
                    this.start_date.getFullYear() + pd.random(0,year_span),
                    pd.random( 0 , 11 ),
                    pd.random( 1, 30 )
                );
            }else{
                this.end_date = new Date();
            }

            this.events = pd.generateArray(
                            "event" , pd.random( 5 , 10 ),
                            this, "timeline", {timeline:this,type:"event"}
                        );

            this.moods = pd.generateArray(
                            "event" , pd.random( 10, 15 ),
                            this, "timeline", {timeline:this,type:"mood"}
                        );

            this.events.sort(function(a,b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            });

            this.moods.sort(function(a,b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            });
        }
    },
    event:{
        init:function( pd, index, config_obj, args ) {
            this.title = pd.db_incremental( "firstName" , "timeline" ) + " Event";
            var timeline = args.timeline;

            var year_range = timeline.end_date.getFullYear() - timeline.start_date.getFullYear()
            this.date = new Date(// alright if capable of before...good test.
                timeline.start_date.getFullYear() + pd.random( 0 , year_range ),
                pd.random( 0 , 11 ),
                pd.random( 1, 30 )
            );

            var note_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet tellus tristique, lobortis nisl sed, aliquet sem. Quisque in urna pharetra leo suscipit lobortis. Donec ut malesuada eros. Fusce egestas vitae velit a dapibus. Aliquam sit amet condimentum odio, id pretium enim. Quisque nec sollicitudin eros, eget tempus lorem. Mauris ullamcorper est ac ipsum ornare, et efficitur orci luctus. Nam sed ex bibendum, scelerisque lacus nec, finibus magna.";
            //note_content = note_content.split(" ");
            this.note = note_content.substring( 0, pd.random( 10 , note_content.length ) );

            this.type = args.type;
            this.value = pd.random( 0 , 4 );
            this.intensity = 1;
            if ( this.type == "event" ) {
                this.intensity = pd.random( 0 , 2 );
            }
        }
    }
};
