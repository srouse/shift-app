

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
                                            { timeline.events.length } events | last updated
                                        </div>
                                    </div>;
                        })}
                        </div>
                    </div>
                    <div className="
                        c-timelines__new"
                        onClick={function(){
                            RS.merge({
                                "page.landing_page":false
                            });
                        }}>
                        New Timeline
                    </div>
                </div>;
    }

});
