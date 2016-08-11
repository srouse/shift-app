

var Timelines = React.createClass({

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
            "Landing"
    	);*/


    },

    componentDidMount: function(){
        Ps.initialize( $(".c-timelines__list")[0] , {
            suppressScrollX: true
        });
    },

    componentDidUpdate: function () {
        Ps.update( $(".c-timelines__list")[0] );
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "Landing" );
        Ps.destroy( $(".c-timelines__list")[0] );
    },



    render: function() {
        return  <div className="
                    c-timelines">
                    <div className="
                        c-timelines__title">
                        Timelines
                    </div>
                    <div className="c-timelines__list">
                        <div className="
                            a-width-100
                            a-flex-v-stretch">
                        { Model.user.timelines.map(function(timeline){

                            var start = new Date( timeline.start_date );
                            var end = new Date();
                            if ( !timeline.is_open_ended ) {
                                end = new Date( timeline.end_date );
                            }
                            var time_span = end.getTime() - start.getTime();
                            var hours = time_span / 60 / 60 / 1000;
                            var days = hours / 24;
                            var weeks = days / 7;
                            var months = weeks / 4;
                            var years = days / 365;

                            var time_span_str = "";
                            if ( years < 2 ) {
                                if ( months < 2 ) {
                                    if ( weeks < 2 ) {
                                        time_span_str = days.toFixed(0) + " days";
                                    }else{
                                        time_span_str = weeks.toFixed(0) + " weeks";
                                    }
                                }else{
                                    time_span_str = months.toFixed(0) + " months";
                                }
                            }else{
                                time_span_str = years.toFixed(0) + " years";
                            }

                            return  <div className="c-timelines__list__item"
                                        key={ "timelines_" + timeline.guid }
                                        onClick={function(){
                                            RS.merge({
                                                page:"timeline",
                                                "page:timeline":timeline.guid
                                            })
                                        }}>
                                        <div className="c-timelines__list__item__title">
                                            { timeline.title }
                                        </div>
                                        <div className="c-timelines__list__item__subtitle">
                                            { timeline.events.length } events | { time_span_str } | last updated
                                        </div>
                                    </div>;
                        })}
                        </div>
                    </div>
                    <div className="
                        a-flex-v-stretch

                        a-margin-bottom-row
                        a-margin-width-col-half">
                        <div className="
                            c-timeline__title">
                            { Mod.user.name }
                        </div>
                        <div className="
                            c-timeline__subtitle">
                            { Mod.user.timelines.length } timelines | last updated
                        </div>
                        <div className="
                            a-flex-h-stretch
                            a-height-row-2">
                            <div className="
                                c-timelines__button
                                a-fill"
                                onClick={function(){
                                    RS.merge({
                                        "page.landing_page":false
                                    });
                                }}>
                                New Timeline
                            </div>
                            <div className="
                                a-width-col-eighth">
                            </div>
                            <div className="
                                a-fill
                                c-timelines__button"
                                onClick={function(){
                                    RS.merge({
                                        "page.landing_page":false
                                    });
                                }}>
                                Logout
                            </div>
                        </div>
                    </div>


                </div>;
    }

});
