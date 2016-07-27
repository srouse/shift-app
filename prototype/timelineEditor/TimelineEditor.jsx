


var TimelineEditor = React.createClass({

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
    },

    componentDidUpdate: function(){
    },

    render: function() {

        var timeline = Model.get( RS.route.timeline );

        console.log( timeline );

        return  <div className={classNames([
                        "c-timelineEditor"
                    ])}>
                    <div className="c-timelineEditor__header">
                        <div className="
                            c-timelineEditor__header__back"
                            onClick={function(){
                                RS.merge({
                                    page:"home"
                                });
                            }}>
                        </div>
                        <div className="
                            c-timelineEditor__header__titleBox">
                            <div className="
                                c-timelineEditor__header__title">
                                { timeline.title }
                            </div>
                            <div className="
                                c-timelineEditor__header__subtitle">
                                { timeline.title }
                            </div>
                        </div>
                        <div className="
                            c-timelineEditor__header__edit">
                            edit
                        </div>
                    </div>
                    <div className="c-timelineEditor__shift">
                        <Circles timeline={ timeline } />
                    </div>
                    <div className="c-timelineEditor__timeline">
                        <Timeline timeline={ timeline } />
                    </div>
                </div>;
    }

});
