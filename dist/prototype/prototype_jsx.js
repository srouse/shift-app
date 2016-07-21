


var ShiftApp = React.createClass({displayName: "ShiftApp",

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
        //RouteState.removeDiffListenersViaClusterId( "ShiftApp" );
    },

    componentDidMount: function(){

    },


    render: function() {

        var content = React.createElement(Landing, null);

        return  React.createElement("div", {className: classNames([
                        "c-shiftApp"
                    ])}, 
                     content 
                );
    }

});



var Landing = React.createClass({displayName: "Landing",

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

        return  React.createElement("div", {className: classNames([
                        "c-landing"
                    ])}, 
                    React.createElement("div", {className: "c-landing__titleContainer"}, 
                        React.createElement("div", {className: "c-landing__colorsLeft"}), 
                        React.createElement("div", {className: "c-landing__colorsLeftTransition"}), 
                        React.createElement("div", {className: "c-landing__colorsCenter"}, 
                            React.createElement("div", {className: "c-landing__title"}, 
                                React.createElement("div", {className: "c-landing__title__leftSpill"}), 
                                React.createElement("div", {className: "c-landing__title__main"})
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "AWE"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "amazing, inspiring, meaningful experiences"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "GOOD"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "A solidly postive experience"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "MEH"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "Not overly positive or negative"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "BAD"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "A negative but tolerable experience"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "MISERY"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "Distinctly and intensely negative experience"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__summary"}, 
                                "Shift is an app and artwork that captures and" + ' ' +
                                "visualizes long term experiences."
                            )
                        ), 
                        React.createElement("div", {className: "c-landing__colorsRightTransition"}
                        )
                    ), 
                    React.createElement("div", {className: "c-landing__splashContainer"}, 
                        React.createElement("div", {className: "c-landing__splashRight"}), 
                        React.createElement("div", {className: "c-landing__splash"}), 
                        React.createElement("div", {className: "c-landing__content"}, 
                            React.createElement("div", {className: ""}, 
                                React.createElement("input", {className: "o-form__input"})
                            )
                        )
                    )
                );
    }

});
