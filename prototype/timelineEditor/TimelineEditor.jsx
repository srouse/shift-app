


var TimelineEditor = React.createClass({

    getInitialState: function () {
        return {
            timeline:Model.get( RS.route.timeline )
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

    render: function() {

        var timeline = this.state.timeline;//Model.get( RS.route.timeline );

        console.log( timeline );
        var is_editing = typeof RS.route.editing !== 'undefined';

        return  <div className={classNames([
                        "c-timelineEditor",
                        {"c-timelineEditor--editing"
                            :typeof RS.route.editing !== 'undefined'}
                    ])}>
                    <TimelineHeader
                        timeline={ timeline }
                        is_editing={ is_editing }/>

                    <div className="c-timelineEditor__shift">
                        <Circles
                            timeline={ timeline }
                            is_editing={ is_editing } />

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
                                c-timelineEditor__editSubmit__footer__button">
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
