

var Landing = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "landing_page"
            ],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Landing"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Landing" );
    },

    componentDidMount: function(){

    },

    render: function() {

        var landing_content = <Login />;

        if ( RS.route.landing_page == "timelines" ) {
            landing_content = <Timelines />;
        }

        return  <div className={classNames([
                        "c-landing",
                        {"c-landing--timelines":RS.route.landing_page == "timelines"}
                    ])}>
                    <div className="c-landing__titleContainer">
                        <div className="c-landing__colorsLeft"></div>
                        <div className="c-landing__colorsLeftTransition"></div>
                        <div className="c-landing__colorsCenter">
                            <div className="c-landing__title">
                                <div className="c-landing__title__leftSpill"></div>
                                <div className="c-landing__title__main"></div>
                            </div>
                            <div className="c-landing__value">
                                <div className="c-landing__value__title">
                                    AWE
                                </div>
                                <div className="c-landing__value__desc">
                                    amazing, inspiring, meaningful experiences
                                </div>
                            </div>
                            <div className="c-landing__value">
                                <div className="c-landing__value__title">
                                    GOOD
                                </div>
                                <div className="c-landing__value__desc">
                                    A solidly postive experience
                                </div>
                            </div>
                            <div className="c-landing__value">
                                <div className="c-landing__value__title">
                                    MEH
                                </div>
                                <div className="c-landing__value__desc">
                                    Not overly positive or negative
                                </div>
                            </div>
                            <div className="c-landing__value">
                                <div className="c-landing__value__title">
                                    BAD
                                </div>
                                <div className="c-landing__value__desc">
                                    A negative but tolerable experience
                                </div>
                            </div>
                            <div className="c-landing__value">
                                <div className="c-landing__value__title">
                                    MISERY
                                </div>
                                <div className="c-landing__value__desc">
                                    Distinctly and intensely negative experience
                                </div>
                            </div>
                            <div className="c-landing__summary">
                                Shift is an artwork app that captures and
                                visualizes long term experiences.
                            </div>
                        </div>
                        <div className="c-landing__colorsRightTransition">
                        </div>
                    </div>
                    <div className="c-landing__splashContainer">
                        <div className="c-landing__splashRight"></div>
                        <div className="c-landing__splash"></div>
                        <div className="c-landing__content">
                            { landing_content }
                        </div>
                    </div>
                </div>;
    }

});
