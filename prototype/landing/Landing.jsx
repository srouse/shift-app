

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
                                Shift is an app and artwork that captures and
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
                            <div className="">
                                <input className="o-form__input" />
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
