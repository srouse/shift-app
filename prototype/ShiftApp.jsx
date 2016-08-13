


var ShiftApp = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "page","modal"
            ],
    		function ( route , prev_route ) {
                me.forceUpdate();
    		},
            "ShiftApp"
    	);

        var me = this;
        $( window ).resize(function() {
            $("body").addClass("no-animations");
            clearTimeout( me.resizeTimeout );
            me.resizeTimeout = setTimeout( function () {
                $("body").removeClass("no-animations");
            },500);
        });
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "ShiftApp" );
    },

    componentDidMount: function(){

    },


    render: function() {

        var content = <Landing />;

        if ( RS.route.page == "timeline" ) {
            content = <TimelineEditor />;
        }

        var modal = "";
        if ( RS.route.modal == "newtimeline" ) {
            modal = <NewTimelineModal />;
        }

        return  <div className={classNames([
                        "c-shiftApp"
                    ])}>
                    { content }
                    { modal }
                </div>;
    }

});
