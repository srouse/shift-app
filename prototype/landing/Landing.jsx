

var Landing = React.createClass({

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

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "Landing" );
    },

    componentDidMount: function(){

    },

    render: function() {

        return  <div className={classNames([
                        "c-landing"
                    ])}>
                    <div className="c-landing__title">
                        <div className="c-landing__colorsLeft"></div>
                        <div className="c-landing__colorsLeftTransition"></div>
                        <div className="c-landing__colorsCenter"></div>
                        <div className="c-landing__colorsRightTransition"></div>
                    </div>
                    <div className="c-landing__splashContainer">
                        <div className="c-landing__splashRight"></div>
                        <div className="c-landing__splash"></div>
                        <div className="c-landing__content"></div>
                    </div>
                </div>;
    }

});
