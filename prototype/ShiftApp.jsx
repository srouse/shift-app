


var ShiftApp = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "page"
            ],
    		function ( route , prev_route ) {
                // update
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
        //RouteState.removeDiffListenersViaClusterId( "Advisor" );
    },

    componentDidMount: function(){

    },


    render: function() {

        return  <div className={classNames([
                        "c-shiftApp"
                    ])}>

                    hi

                </div>;
    }

});
