


var Timeline = React.createClass({

    getDefaultProps: function() {
        return {
            timeline:false,
            event:false,
            is_editing:false
        };
    },

    componentWillMount: function() {
        /*var me = this;
        RouteState.addDiffListeners(
    		[
                "page"
            ],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "TimelineEditor"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
    },

    componentDidMount: function(){
        //this.renderTimeline();
    },

    componentDidUpdate: function(){
    },

    createMood: function ( evt ) {

        if ( !RS.route.editing ) {
            return false;
        }

        var loc = evt.clientX;
        var loc_percent = loc/$(evt.target).width();

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );
        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }
        var time_span = end.getTime() - start.getTime();

        var new_mood = Mod.get("event_new" + Math.round( Math.random() * 10000 ));
        new_mood.timeline = timeline;
        new_mood.title = "New Mood";
        new_mood.note = "Describe your experience...";
        new_mood.type = "mood";
        new_mood.value = 3;
        new_mood.intensity = 1;
        new_mood.date = moment(
                    new Date(
                        Math.round( start.getTime() + ( loc_percent * time_span ) )
                    )
                ).format();

        timeline.moods.push( new_mood );
        Event.fire("timeline_updated");
        RS.merge({
            event:new_mood.guid
        });
    },

    renderTimelineLabels : function() {

        var timeline_labels = [];
        var timeline = this.props.timeline;

        var dateInfo = TimelineMetrics.dateInfo( timeline );
        var start = dateInfo.start;
        var end = dateInfo.end;
        var time_span = dateInfo.time_span;

        //=====NOW LABELS======
        var years = time_span / 1000 / 60 / 60 / 24 / 365;
        var year_css,year,year_percent;
        if ( years < 10 ) {
            for ( var i=0; i<20; i++ ) {
                year = new Date( start.getFullYear() + i, 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                timeline_labels.push(
                    this.renderLabel( year, start, end, time_span )
                );
            }
        }else if ( years < 30 ){
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 5 ) * 5;
                year = new Date( start_rounded + ( i*5 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                timeline_labels.push(
                    this.renderLabel( year, start, end, time_span )
                );
            }
        }else{
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 10 ) * 10;
                year = new Date( start_rounded + ( i*10 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                timeline_labels.push(
                    this.renderLabel( year, start, end, time_span )
                );
            }
        }
        return timeline_labels;
    },

    renderLabel: function ( year, start, end, time_span ) {
        year_percent = ( year.getTime() - start.getTime() ) / time_span;
        year_left_css = Math.round( year_percent * 100 ) + "%";
        if (
            year.getTime() > start.getTime() &&
            year.getTime() < end.getTime()
        ) {
            return  <div className='c-timeline__label'
                        key={ "timeline_label_year_" + year.getFullYear() }
                        style={{left:year_left_css}}>
                        { year.getFullYear() }
                    </div>;
        }
    },

    render: function() {

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var timeline = this.props.timeline;
        var dateInfo = TimelineMetrics.dateInfo( timeline );
        var start = dateInfo.start;
        var end = dateInfo.end;
        var time_span = dateInfo.time_span;

        function getEventOnClick (event){
            return function( evt ){
                RS.merge({
                    "event":event.guid
                });
                evt.stopPropagation();
            };
        }

        var mood,mood_time,mood_percent;
        var grads=["#e9e9e9"];
        var mood_items = [];

        //sort by date
        timeline.moods.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });

        for ( var i=0; i<timeline.moods.length; i++ ) {
            mood = timeline.moods[i];
            mood_time = new Date( mood.date ).getTime() - start.getTime();
            mood_percent = mood_time/time_span;

            if (
                mood_percent <= 1 && mood_percent >=0
            ) {
                grads.push(
                    fills_faded[ 4 - mood.value] + " " +
                    Math.round( mood_percent * 100 ) + "%"
                );

                mood_items.push(
                    <div key={"timeline_"+mood.guid}
                        className={classNames([
                            "c-timeline__mood",
                            "c-timeline--value_" + (mood.value+1),
                            {"c-timeline__mood--selected":this.props.event === mood}
                        ])} style={{left:Math.round( mood_percent * 100 ) + "%"}}
                        onClick={getEventOnClick(mood)}>
                    </div>
                );
            }
        }
        grads.push("#e9e9e9");

        var event,event_time,event_percent;
        var event_items = [];
        //sort by date
        timeline.events.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
        for ( var i=0; i<timeline.events.length; i++ ) {
            event = timeline.events[i];
            event_time = new Date( event.date ).getTime() - start.getTime();
            event_percent = event_time/time_span;

            if (
                event_percent <= 1 && event_percent >=0
            ) {
                var event_guid = event.guid;

                event_items.push(
                    <div key={"timeline_"+event.guid}
                        className={classNames([
                            "c-timeline__circle",
                            "c-timeline__circle--intensity_" + event.intensity,
                            "c-timeline--value_" + (event.value+1),
                            {"c-timeline__circle--selected":this.props.event === event}
                        ])}
                        style={{left:Math.round( event_percent * 100 ) + "%"}}
                        onClick={getEventOnClick(event)}>
                    </div>
                );
            }
        }

        var selected_event_time = new Date( this.props.event.date ).getTime() - start.getTime();
        var selected_event_percent = selected_event_time/time_span;
        var selected_item = "";
        if ( this.props.event ) {
            selected_item =  <div className={classNames([
                                    "c-timeline__selected",
                                    /*"c-timeline--value_" + (this.props.event.value+1)*/
                                ])}
                                style={{
                                    left:Math.round( selected_event_percent * 100 ) + "%"}
                                }>
                            </div>;
        }

        return  <div className={classNames([
                        "c-timeline",
                        {"c-timeline--editing":this.props.is_editing}
                    ])}>

                    <div className="c-timeline__xaxis">
                        { this.renderTimelineLabels() }
                    </div>
                    { selected_item }
                    <div className="c-timeline__graph"
                        style={{
                            background:"linear-gradient( 90deg, " + grads.join(",") + " )"
                        }}>
                        <div className="c-timeline__moodEdit"
                            onClick={this.createMood}>
                            { mood_items }
                        </div>
                        <div className="c-timeline__eventEdit"></div>
                        { event_items }
                    </div>

                </div>;
    }

});
