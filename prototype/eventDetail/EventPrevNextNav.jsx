




var EventPrevNextNav = React.createClass({

    getDefaultProps: function() {
        return {
            event:false
        };
    },

    componentWillMount: function() {
        /*var me = this;
        RouteState.addDiffListeners(
    		[
                "event"
            ],
    		function ( route , prev_route ) {
                me.setState({
                    event:Model.get( RS.route.event )
                });
                console.log(Model.get( RS.route.event ));
                //me.forceUpdate();
    		},
            "EventPrevNextNav"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "EventPrevNextNav" );
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    render: function() {

        var event = this.props.event;
        if ( !event ) {
            return <div></div>;
        }
        var me = this;
        var prev_and_next = TimelineMetrics.nextAndPreviousEvent( event );

        return  <div className="
                    c-eventDetail_pagination">
                    <div className={classNames([
                            "c-eventDetail__paginationButton",
                            {"a-display-none":prev_and_next.prev === false}
                        ])}
                        onClick={function(){
                            RS.merge({
                                event:prev_and_next.prev.guid
                            })
                        }}>
                        <div className="
                            a-width-col-quarter
                            o-icon-arrow-left-24">
                        </div>
                        <div className="
                            c-eventDetail__paginationButton__label
                            a-flex-h">
                            { prev_and_next.prev.title }
                        </div>
                    </div>
                    <div className="
                        a-fill">
                    </div>
                    <div className={classNames([
                            "c-eventDetail__paginationButton",
                            {"a-display-none":prev_and_next.next === false}
                        ])}
                        onClick={function(){
                            RS.merge({
                                event:prev_and_next.next.guid
                            })
                        }}>
                        <div className="
                            c-eventDetail__paginationButton__label
                            a-flex-right">
                            { prev_and_next.next.title }
                        </div>
                        <div className="
                            a-width-col-quarter
                            o-icon-arrow-right-24">
                        </div>
                    </div>
                </div>;
    }

});
