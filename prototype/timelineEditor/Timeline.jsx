


var Timeline = React.createClass({

    getDefaultProps: function() {
        return {
            timeline:false
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

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }

        var time_span = end.getTime() - start.getTime();

        var event,grads=["#e9e9e9"],event_time,event_percent,event_css;
        for ( var i=0; i<timeline.events.length; i++ ) {
            event = timeline.events[i];
            event_time = new Date( event.date ).getTime() - start.getTime();
            event_percent = event_time/time_span;

            if (
                event_percent <= 1 && event_percent >=0
            ) {
                event_css = "left: " + Math.round( event_percent * 100 ) + "%";
                graph_dom.append(
                    $( "<div class='c-timeline__circle c-timeline__circle--intensity_" +
                    event.intensity + " c-timeline--value_" +
                    (event.value+1) +"' style='"+event_css+"'></div>" )
                );
            }
        }

        var mood,grads=["#e9e9e9"],mood_time,mood_percent,mood_css;
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
            }
        }

        grads.push("#e9e9e9");
        graph_dom.css(
            "background",
            "linear-gradient( 90deg, " + grads.join(",") + " )"
        );

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
        return  <div className="c-timeline">
                    <div className="c-timeline__xaxis"></div>
                    <div className="c-timeline__graph"></div>
                </div>;
    }

});
