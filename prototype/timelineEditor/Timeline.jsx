


var Timeline = React.createClass({

    getDefaultProps: function() {
        return {
            timeline:false,
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
        this.renderTimeline();
    },

    componentDidUpdate: function(){
    },

    renderTimeline : function() {

        var graph_dom = $(".c-timeline__graph");
        var labels_dom = $(".c-timeline__xaxis");
        var mood_edit_dom = $(".c-timeline__moodEdit");

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }

        var time_span = end.getTime() - start.getTime();



        //=====NOW LABELS======
        var years = time_span / 1000 / 60 / 60 / 24 / 365;
        var year_css,year,year_percent;
        if ( years < 10 ) {
            for ( var i=0; i<20; i++ ) {
                year = new Date( start.getFullYear() + i, 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }else if ( years < 30 ){
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 5 ) * 5;
                year = new Date( start_rounded + ( i*5 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }else{
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 10 ) * 10;
                year = new Date( start_rounded + ( i*10 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }
    },

    renderLabel: function ( year, start, end, time_span, labels_dom ) {
        year_percent = ( year.getTime() - start.getTime() ) / time_span;
        year_css = "left: " + Math.round( year_percent * 100 ) + "%";
        if (
            year.getTime() > start.getTime() &&
            year.getTime() < end.getTime()
        ) {
            labels_dom.append(
                $(
                    "<div class='c-timeline__label' style='"+year_css+"'>" +
                    year.getFullYear() +
                    "</div>"
                )
            );
        }
    },

    render: function() {

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );
        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }
        var time_span = end.getTime() - start.getTime();

        function getEventOnClick (event){
            return function(){
                RS.merge({
                    "event":event.guid
                });
            };
        }

        var mood,mood_time,mood_percent;
        var grads=["#e9e9e9"];
        var mood_items = [];
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
                            "c-timeline--value_" + (mood.value+1)
                        ])} style={{left:Math.round( mood_percent * 100 ) + "%"}}
                        onClick={getEventOnClick(mood)}>
                    </div>
                );
            }
        }
        grads.push("#e9e9e9");


        var event,event_time,event_percent;
        var event_items = [];
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
                            "c-timeline--value_" + (event.value+1)
                        ])} style={{left:Math.round( event_percent * 100 ) + "%"}}
                        onClick={getEventOnClick(event)}>
                    </div>
                );
            }
        }

        return  <div className={classNames([
                        "c-timeline",
                        {"c-timeline--editing":this.props.is_editing}
                    ])}>
                    <div className="c-timeline__xaxis"></div>
                    <div className="c-timeline__graph"
                        style={{
                            background:"linear-gradient( 90deg, " + grads.join(",") + " )"
                        }}>
                        <div className="c-timeline__moodEdit">
                            { mood_items }
                        </div>
                        <div className="c-timeline__eventEdit"></div>
                        { event_items }
                    </div>
                </div>;
    }

});
