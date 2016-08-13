


var TimelineEditor = React.createClass({

    getInitialState: function () {
        return {
            timeline:Model.get( RS.route.timeline ),
            event:Model.get( RS.route.event )
        };
    },

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "editing"
            ],
    		function ( route , prev_route ) {
                me.forceUpdate();
    		},
            "TimelineEditor"
    	);
        RouteState.addDiffListeners(
    		[
                "event"
            ],
    		function ( route , prev_route ) {
                me.setState({
                    event:Model.get( RS.route.event )
                })
    		},
            "TimelineEditor"
    	);

        Event.on( "timeline_updated", function(){
            me.forceUpdate();
        },"TimelineEditor");
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
        Event.remove("TimelineEditor");
    },

    componentDidMount: function(){
        var me = this;
        $( ".c-timelineEditor__editOutlook__sliderPeg" )
            .draggable({
                containment:".c-timelineEditor__editOutlook__sliderBg",
                stop: function( event, ui ) {
                    var percent = ui.position.left /
                        ( $( ".c-timelineEditor__editOutlook__sliderBg" ).width()-30 );

                        console.log( me.state.timeline.outlook );
                    me.state.timeline.outlook =  Math.round( percent * 100 );
                    me.forceUpdate();
                }
            });
        $( ".c-timelineEditor__editIntensity__sliderPeg" )
            .draggable({
                containment:".c-timelineEditor__editIntensity__sliderBg",
                stop: function( event, ui ) {
                    var percent = ui.position.top /
                        ( $( ".c-timelineEditor__editIntensity__sliderBg" ).height()-30 );
                    me.state.timeline.intensity = 100 - Math.round( percent * 100 );
                    me.forceUpdate();
                }
            });
    },

    componentDidUpdate: function(){
    },

    moveBaseLine: function (evt) {
        var window_height = $(window).height();
        var y = ( (evt.clientY) / window_height ) * 100;
        var baseline = $(".c-timelineEditor__baseline");

        //if ( y > 30 && y < 70 ) {//y > 30 && y < 69 ) {
            var window_width = $(window).width();
            var x = ( (evt.clientX-30) / $(window).width() ) * 100;
            var circle_offset = ( (window_height*.19 - 30) / window_width ) * 100;
            var circle_offset_right = ( (window_height*.19 + 20) / window_width ) * 100;

            x = Math.max( 17+circle_offset ,
                    Math.min( 66+17-circle_offset_right , x )
                );

            baseline.css({
                "left": x + "vw",
                "transition":"none"
            });
            $(".c-timelineEditor__circleLabels, .c-timelineEditor__baselineLabel")
                .css("opacity",1);
                //.removeClass("a-display-none")
                //.addClass("a-display-flex");
        //}else{
        //    me.revertBaseLine();
        //}
    },

    revertBaseLine: function () {
        var baseline = $(".c-timelineEditor__baseline");
        baseline.css({
            "left":"calc( 100vw - 10px )",
            "transition":"left .2s"
        });
        $(".c-timelineEditor__circleLabels, .c-timelineEditor__baselineLabel")
            .css("opacity",0);
            //.removeClass("a-display-flex")
            //.addClass("a-display-none");
    },

    render: function() {

        var me = this;
        var timeline = this.state.timeline;
        var is_editing = typeof RS.route.editing !== 'undefined';

        var eventsInfo = TimelineMetrics.eventsInfo( timeline );

        return  <div className={classNames([
                        "c-timelineEditor",
                        {"c-timelineEditor--editing"
                            :typeof RS.route.editing !== 'undefined'}
                    ])}>

                    <TimelineHeader
                        timeline={ timeline }
                        is_editing={ is_editing }/>

                    <div className="c-timelineEditor__shift"
                        onMouseUp={function(evt){
                            me.mouse_is_down = false;
                            me.revertBaseLine();
                        }}
                        onMouseMove={function(evt){
                            if ( !me.mouse_is_down )
                                return;

                            me.moveBaseLine( evt );
                        }}
                        onMouseOut={function(evt){
                            //me.mouse_is_down = false;
                            var baseline = $(".c-timelineEditor__baseline");
                            baseline.css({
                                "left":"calc( 100vw - 10px )",
                                "transition":"left .2s"
                            });
                        }}>

                        <div className="
                            c-timelineEditor__circleLabels">
                            <div className="
                                c-timelineEditor__circleLabel">
                                worst
                            </div>
                            <div className="
                                a-fill">
                            </div>
                            <div className="
                                a-text-size-small
                                a-text-color-grey-5">
                                perspectives
                            </div>
                            <div className="
                                a-fill">
                            </div>
                            <div className="
                                c-timelineEditor__circleLabel">
                                best
                            </div>
                        </div>

                        <Circles
                            timeline={ timeline }
                            is_editing={ is_editing }
                            onMouseDown={function(evt){
                                me.mouse_is_down = true;
                                me.moveBaseLine( evt );
                            }}
                            onMouseUp={function(evt){
                                me.mouse_is_down = false;
                                me.revertBaseLine();
                            }} />

                        <div className="
                            c-timelineEditor__baseline"
                            onMouseUp={function(evt){
                                me.mouse_is_down = false;
                                me.revertBaseLine();
                            }}>
                            <div className="
                                c-timelineEditor__baselineLabel"
                                style={{"bottom":"-30px"}}>
                                baseline
                            </div>
                            {eventsInfo.values.map(function( value, index ){
                                return  <div className={classNames([
                                                "c-timeline--value_" + (index+1)
                                            ])}
                                            key={"timelineeditor_value_"+index}
                                            style={{
                                                height:(value*100) + "%"
                                            }}>
                                        </div>;
                            })}

                        </div>

                        <div className="c-timelineEditor__editIntensity">
                            <div className="
                                c-timelineEditor__editIntensity__label">
                                high intensity
                            </div>
                            <div className="
                                c-timelineEditor__editIntensity__sliderBg">
                                <div className="
                                    c-timelineEditor__editIntensity__sliderLine">
                                </div>
                                <div className="
                                    c-timelineEditor__editIntensity__sliderTrack">
                                    <div className="
                                        c-timelineEditor__editIntensity__sliderPeg"
                                        style={{top: 100 - timeline.intensity + "%"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="
                                c-timelineEditor__editIntensity__label">
                                low intensity
                            </div>
                        </div>

                        <div className="c-timelineEditor__editOutlook">
                            <div className="
                                c-timelineEditor__editOutlook__label">
                                pessimistic
                            </div>
                            <div className="
                                c-timelineEditor__editOutlook__sliderBg">
                                <div className="
                                    c-timelineEditor__editOutlook__sliderLine">
                                </div>
                                <div className="
                                    c-timelineEditor__editOutlook__sliderTrack">
                                    <div className="
                                        c-timelineEditor__editOutlook__sliderPeg"
                                        style={{left:timeline.outlook + "%"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="
                                c-timelineEditor__editIntensity__label">
                                optimistic
                            </div>
                        </div>
                    </div>

                    <div className="c-timelineEditor__timeline">
                        <Timeline
                            timeline={ timeline }
                            event={ this.state.event }
                            is_editing={ is_editing } />
                    </div>

                    <div className="c-timelineEditor__editSubmit">
                        <div className="
                            c-timelineEditor__editSubmit__header"
                            onClick={function(){
                                RS.merge(
                                    {"editing":false}
                                );
                            }}>
                            <div className="a-fill"></div>
                            <div className="
                                c-timelineEditor__editSubmit__header__icon"></div>
                            <div className="
                                c-timelineEditor__editSubmit__header__close">
                                cancel
                            </div>
                            <div className="
                                c-timelineEditor__editSubmit__header__border">
                            </div>
                        </div>
                        <div className="
                            c-timelineEditor__editSubmit__middler">
                            This is the edit mode of visualization
                            of the. The goal is to completely fill
                            the colors in the timeline below with
                            what you remember about how you felt
                            during that time in your life.
                        </div>
                        <div className="
                            c-timelineEditor__editSubmit__footer">
                            <div className="
                                c-timelineEditor__editSubmit__footer__button"
                                onClick={function(){
                                    console.log( timeline );
                                }}>
                                Save
                            </div>
                            <div className="
                                c-timelineEditor__editSubmit__footer__seperator">
                            </div>
                            <div className="
                                c-timelineEditor__editSubmit__footer__button"
                                onClick={function(){
                                    RS.merge(
                                        {"editing":false}
                                    );
                                }}>
                                Save & Done
                            </div>
                        </div>
                    </div>

                    <div className="c-timelineEditor__eventDetail">
                        <EventDetail />
                    </div>

                </div>;
    }

});
