


var EventDetailReadOnly = React.createClass({

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
            "EventDetailReadOnly"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "EventDetailReadOnly" );
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    render: function() {

        var event = this.props.event;
        var me = this;

        return  <div className="
                    c-eventDetail">
                    <div className="
                        c-eventDetail__intro">
                        {/*<div className="
                            c-eventDetail__title">
                            { ( event.type == "mood" )
                                ? "Mood" : "Experience" }
                        </div>*/}
                    </div>
                    <div className="
                        c-eventDetail__content
                        a-brand-font-light">
                        <Fill />
                        <div className="
                            a-text-only-size-largest
                            a-line-height-row-1-eighth">
                            { event.title }
                        </div>
                        <div className="
                            a-text-size-large">
                            { moment( Model.get( RS.route.event ).date ).format('MMMM D, YYYY') }
                        </div>
                        {/*<div className="
                            c-eventDetail__title">
                            { ( event.type == "mood" )
                                ? "Mood" : "Experience" }
                        </div>*/}
                        <div className="
                            a-text-size
                            a-text-color-grey-4
                            a-margin-bottom-row-1">
                            { event.note }
                        </div>
                        <Fill />
                    </div>
                    <div className="
                        c-eventDetail__close">
                        <div className="
                            c-eventDetail__closeButton"
                            onClick={function(){
                                RS.merge({event:false});
                            }}>
                        </div>
                    </div>

                    <div className={classNames([
                            "c-eventDetail__bottomBorder",
                            /*"c-timeline--value_" + (event.value+1)*/
                        ])}></div>
                </div>;
    }

});
