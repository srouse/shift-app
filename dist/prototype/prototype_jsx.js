


var ShiftApp = React.createClass({displayName: "ShiftApp",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "page"
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

        var content = React.createElement(Landing, null);

        if ( RS.route.page == "timeline" ) {
            content = React.createElement(TimelineEditor, null);
        }

        return  React.createElement("div", {className: classNames([
                        "c-shiftApp"
                    ])}, 
                     content 
                );
    }

});




var Fill = React.createClass({displayName: "Fill",

    getDefaultProps: function() {
        return {
            className:""
        };
    },

    componentWillMount: function() {
    },

    componentWillUnmount: function(){
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    render: function() {

        return  React.createElement("div", {className: classNames([
                        "a-fill",
                        this.props.className
                    ])}
                );
    }

});




var Button = React.createClass({displayName: "Button",

    getDefaultProps: function() {
        return {
            title:"",
            onClick:function(){},
            className:""
        };
    },

    componentWillMount: function() {
    },

    componentWillUnmount: function(){
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    render: function() {

        return  React.createElement("div", {className: classNames([
                        "o-button",
                        this.props.className
                    ]), 
                    onClick: this.props.onClick}, 
                     this.props.title
                );
    }

});




var RoundedButton = React.createClass({displayName: "RoundedButton",

    getDefaultProps: function() {
        return {
            title:"",
            onClick:function(){},
            className:""
        };
    },

    componentWillMount: function() {
    },

    componentWillUnmount: function(){
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    render: function() {

        return  React.createElement("div", {className: classNames([
                        "o-roundedButton",
                        this.props.className
                    ]), 
                    onClick: this.props.onClick}, 
                     this.props.title
                );
    }

});






var ValuePicker = React.createClass({displayName: "ValuePicker",

    getDefaultProps: function() {
        return {
            classes:[],
            value:false,
            floor:false,
            ceiling:false,
            hover_value:false,
            multiplier:1,
            allow_false_extents:true,
            reactKey:"ValuePicker",
            labels:["Awful","Bad","Eh","OK","Good","Great"],
            type:"quality",//or quantity
            onChange:function(){}
        };
    },

    getInitialState: function() {
        return {
            value:this._processIncomingValue( this.props.value ),// will be moment() obj
            floor:this._processIncomingValue( this.props.floor ),
            ceiling:this._processIncomingValue( this.props.ceiling ),
            classes:this.props.classes,
            hover_value:this.props.hover_value,
            onChange:this.props.onChange
        };
    },

    componentWillReceiveProps: function ( nextProps ) {
        this.setState({
            value:this._processIncomingValue( nextProps.value ),// will be moment() obj
            floor:this._processIncomingValue( nextProps.floor ),
            ceiling:this._processIncomingValue( nextProps.ceiling ),
        });
    },

    _processIncomingValue: function ( value ) {
        if ( !value && value !== 0 ) {
            return false;
        }else{
            return Math.round( parseInt( value ) / this.props.multiplier );
        }
    },

    componentWillMount: function() {
    },

    componentWillUnmount: function(){
    },

    componentDidMount: function () {
    },

    componentWillUpdate: function () {
    },

    changeHover : function ( new_hover_value ) {
        this.setState({
            hover_value:new_hover_value
        });
    },

    callOnChange: function ( new_value, new_ceiling, new_floor ) {

        if ( new_value !== false ) {
            new_value = new_value * this.props.multiplier;
        }

        if ( new_ceiling !== false ) {
            new_ceiling = new_ceiling * this.props.multiplier;
        }

        if ( new_floor !== false ) {
            new_floor = new_floor * this.props.multiplier;
        }

        if ( this.props.allow_false_extents === false ) {
            if ( new_ceiling === false ) {
                new_ceiling = new_value;
            }
            if ( new_floor === false ) {
                new_floor = new_value;
            }
        }

        this.state.onChange(
            new_value,
            new_ceiling,
            new_floor
        );
    },

    changeValue : function ( new_value ) {

        if ( this.props.type == "quality" ) {
            if ( this.state.value !== false && this.state.value !== new_value ) {
                if ( new_value < this.state.value ) {
                    if ( new_value === this.state.floor ) {
                        new_value = false;
                    }

                    this.callOnChange(
                        this.state.value ,
                        this.state.ceiling,
                        new_value
                    );
                }else{
                    if ( new_value === this.state.ceiling ) {
                        new_value = false;
                    }

                    this.callOnChange(
                        this.state.value,
                        new_value,
                        this.state.floor
                    );
                }
            }else{
                if ( this.state.value === new_value ) {
                    new_value = false;
                }

                this.callOnChange(
                    new_value,
                    false,
                    false
                );
            }
        }else{
            if ( this.state.value === new_value ) {
                new_value = false;
            }

            this.callOnChange(
                new_value,
                false,
                false
            );
        }

    },

    render: function() {
        var me = this;

        return  React.createElement("div", {className: classNames([
                        "o-valuePicker",
                        {"o-valuePicker--valueSet":this.state.value !== false},
                        this.state.classes
                    ])}, 
                    React.createElement("div", {className: "o-valuePickerFeedback"}, 
                    this.props.labels.map(function(label,index) {
                        if ( label === false )
                            return "";

                        return React.createElement(ValueTile, {index:  index, 
                                    value:  me.state.value, 
                                    ceiling:  me.state.ceiling, 
                                    floor:  me.state.floor, 
                                    hover_value:  me.state.hover_value, 
                                    onChange:  me.changeValue, 
                                    onHover:  me.changeHover, 
                                    label:  me.props.labels[index], 
                                    type:  me.props.type, 
                                    key:    "value_picker_" +
                                            me.props.reactKey
                                            + "_" + index})
                    })
                    )
                );
    }

});






var ValueTile = React.createClass({displayName: "ValueTile",

    getDefaultProps: function() {
        return {
            classes:[],
            value:false,
            floor:false,
            ceiling:false,
            hover_value:false,
            index:false,
            labels:["Awful","Bad","Eh","OK","Good","Great"],
            onChange:function(){},
            onHover:function(){}
        };
    },

    componentWillMount: function() {
    },

    componentWillUnmount: function(){
    },

    componentDidMount: function () {
    },

    componentWillUpdate: function () {
    },

    componentWillReceiveProps: function ( nextProps ) {

    },

    changeHover : function () {
        /*this.setState({
            hover_value:new_hover_value
        });*/
        this.props.onHover( this.props.index );
    },

    changeHoverOut : function () {
        /*this.setState({
            hover_value:new_hover_value
        });*/
        this.props.onHover( false );
    },

    changeValue : function () {
        this.props.onChange( this.props.index );
    },


    renderClassNames: function () {
        if ( this.props.type == "quality" ) {
            return classNames([
                        "o-valuePickerFeedback__item",
                        {"o-valuePickerFeedback__item--selected":
                            this.props.value === this.props.index
                        },
                        {"o-valuePickerFeedback__item--notselected":
                            this.props.value !== this.props.index
                        },

                        {"o-valuePickerFeedback__item--above":
                            this.props.value !== false && this.props.value < this.props.index
                        },
                        {"o-valuePickerFeedback__item--below":
                            this.props.value !== false && this.props.value > this.props.index
                        },

                        {"o-valuePickerFeedback__item--fullBar":
                            (      this.props.ceiling !== false
                                && this.props.ceiling > this.props.index
                                && this.props.value < this.props.index )
                            ||
                            (      this.props.floor !== false
                                && this.props.floor < this.props.index
                                && this.props.value > this.props.index )
                        },

                        {"o-valuePickerFeedback__item--prevBar":
                            ( this.props.floor !== false &&
                                this.props.floor < this.props.index &&
                                this.props.value == this.props.index )
                        },
                        {"o-valuePickerFeedback__item--afterBar":
                            ( this.props.ceiling !== false &&
                                this.props.ceiling > this.props.index &&
                                this.props.value == this.props.index )
                        },

                        {"o-valuePickerFeedback__item--hoverExtent":
                            this.props.hover_value !== false &&
                            ( this.props.hover_value == this.props.index &&
                                this.props.value != this.props.index )
                        },


                        {"o-valuePickerFeedback__item--floor":
                            this.props.floor === this.props.index &&
                            this.props.value !== this.props.index
                        },
                        {"o-valuePickerFeedback__item--ceiling":
                            this.props.ceiling === this.props.index &&
                            this.props.value !== this.props.index
                        }

                    ]);
        }else{
            return classNames([
                        "o-valuePickerFeedback__itemQuantity",
                        {"o-valuePickerFeedback__itemQuantity--selected":
                            this.props.value === this.props.index
                        },
                        {"o-valuePickerFeedback__itemQuantity--notselected":
                            this.props.value !== this.props.index
                        }

                    ]);
        }
    },

    render: function() {
        var me = this;

        return  React.createElement("div", {className: this.renderClassNames(), 
                    onClick: this.changeValue, 
                    onMouseOver:  this.changeHover, 
                    onMouseOut:  this.changeHoverOut}, 
                    React.createElement("div", {className: "o-valuePickerFeedback__label", 
                        onClick: this.changeValue}, 
                         this.props.label
                    ), 
                    React.createElement("div", {className: "o-valuePickerFeedback__line", 
                        onClick: this.changeValue}), 
                    React.createElement("div", {className: "o-valuePickerFeedback__dot", 
                        onClick: this.changeValue}), 
                    React.createElement("div", {className: "o-valuePickerFeedback__bar", 
                        onClick: this.changeValue}, 
                        React.createElement("div", {className: "o-valuePickerFeedback__barCenter"})
                    ), 
                    React.createElement("div", {className: "o-valuePickerFeedback__extentHover", 
                        onClick: this.changeValue})
                );
    }

});




var EventDetail = React.createClass({displayName: "EventDetail",

    getDefaultProps: function() {
        return {
        };
    },

    getInitialState: function () {
        return {
            event:Model.get( RS.route.event ),
            date:moment( Model.get( RS.route.event ).date ).format('MM/DD/YYYY'),
            date_valid:true
        };
    },

    componentWillMount: function() {
        var me = this;
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
            "EventDetail"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "EventDetail" );
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    updateDateInput: function() {
        if ( this.state.date_valid ) {
            this.state.event.date
                = moment( this.state.date ,'MM/DD/YYYY', true ).format();
            Event.fire("timeline_updated");
            this.forceUpdate();
        }
    },

    updateEventType: function( event, type ) {
        event.type = type;

        if ( type == "event" ) {
            if ( event.timeline.moods.indexOf( event ) != -1 ) {
                event.timeline.moods.splice(
                    event.timeline.moods.indexOf( event ), 1
                );
            }
            if ( event.timeline.events.indexOf( event ) == -1 ) {
                event.timeline.events.push( event );
            }
        }else{
            if ( event.timeline.events.indexOf( event ) != -1 ) {
                event.timeline.events.splice(
                    event.timeline.events.indexOf( event ), 1
                );
            }
            if ( event.timeline.moods.indexOf( event ) == -1 ) {
                event.timeline.moods.push( event );
            }
        }
        Event.fire("timeline_updated");
        this.forceUpdate();
    },

    render: function() {

        var event = this.state.event;
        var me = this;

        return  React.createElement("div", {className: "c-eventDetail"
                    }, 
                    React.createElement("div", {className: 
                        "c-eventDetail__intro"}, 
                        React.createElement("div", {className: 
                            "c-eventDetail__title"}, 
                             ( event.type == "mood" )
                                ? "Mood" : "Experience"
                        ), 
                        React.createElement("div", {className: 
                            "c-eventDetail__subtitle"}, 
                             ( event.type == "mood" )
                                ? "Overall Background Feeling"
                                : "Significant Event"
                        ), 
                        React.createElement("div", {className: 
                            "c-eventDetail__desc"}, 
                            "This is the edit mode of visualization of the." + ' ' +
                            "The goal is to completely fill the colors in" + ' ' +
                            "the timeline below with what you remember" + ' ' +
                            "about how you felt during that time in your" + ' ' +
                            "life."
                        )
                    ), 
                    React.createElement("div", {className: 
                        "c-eventDetail__content" + ' ' +
                        "a-brand-font-light"}, 
                        React.createElement("div", {className: "a-height-row-vh-1-half"}), 
                        React.createElement("input", {className: 
                            "o-form__input" + ' ' +
                            "a-height-row-2" + ' ' +
                            "a-margin-bottom-row-1", 
                            value:  event.title, 
                            onChange: function(evt){
                                me.state.event.title = evt.target.value;
                                me.forceUpdate();
                            }}), 
                        React.createElement("div", {className: 
                            "a-flex-h-stretch" + ' ' +
                            "a-height-row-2" + ' ' +
                            "a-margin-bottom-row-1"}, 
                            React.createElement("select", {className: 
                                "o-form__select" + ' ' +
                                "a-fill", 
                                value:  event.type, 
                                onChange: function( evt ) {
                                    me.updateEventType( event , evt.target.value );
                                }}, 
                                React.createElement("option", {value: "mood"}, "Mood"), 
                                React.createElement("option", {value: "event"}, "Experience")
                            ), 
                            React.createElement("input", {className: classNames([
                                    "o-form__input",
                                    "a-fill a-border-left-none",
                                    {"o-form--invalid":!this.state.date_valid}
                                ]), 
                                value:  this.state.date, 
                                onChange: function(evt){
                                    me.state.date = evt.target.value;
                                    me.state.date_valid
                                        = moment( evt.target.value ,'MM/DD/YYYY', true ).isValid();
                                    me.forceUpdate();
                                }, 
                                onKeyUp: function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateDateInput();
                                    }
                                }, 
                                onBlur: this.updateDateInput})
                        ), 
                        React.createElement("div", {className: 
                            "a-flex-h-stretch" + ' ' +
                            "a-height-row-2" + ' ' +
                            "a-margin-bottom-row-1"}, 
                            React.createElement("select", {className: 
                                "o-form__select" + ' ' +
                                "a-fill", 
                                value:  event.value, 
                                onChange: function( evt ) {
                                    event.value = parseInt( evt.target.value );
                                    Event.fire("timeline_updated");
                                    me.forceUpdate();
                                }}, 
                                React.createElement("option", {value: "4"}, "Great"), 
                                React.createElement("option", {value: "3"}, "Good"), 
                                React.createElement("option", {value: "2"}, "Meh"), 
                                React.createElement("option", {value: "1"}, "Bad"), 
                                React.createElement("option", {value: "0"}, "Awful")
                            ), 
                            React.createElement("select", {className: 
                                "o-form__select" + ' ' +
                                "a-border-left-none" + ' ' +
                                "a-fill", 
                                value:  event.intensity, 
                                onChange: function( evt ) {
                                    event.intensity = parseInt( evt.target.value );
                                    Event.fire("timeline_updated");
                                    me.forceUpdate();
                                }}, 
                                React.createElement("option", {value: "2"}, "High Intensity"), 
                                React.createElement("option", {value: "1"}, "Medium Intensity"), 
                                React.createElement("option", {value: "0"}, "Low Intensity")
                            )
                        ), 
                        React.createElement("textarea", {className: 
                            "o-form__textarea" + ' ' +
                            "a-fill" + ' ' +
                            "a-margin-bottom-row-1"}), 
                        React.createElement("div", {className: 
                            "a-flex-h-stretch" + ' ' +
                            "a-height-row-2" + ' ' +
                            "a-margin-bottom-row-1"}, 
                            React.createElement(Button, {className: "", 
                                title: "delete"}), 
                            React.createElement(Fill, null), 
                            React.createElement(Button, {className: 
                                "a-width-col-1", 
                                title: "cancel"}), 
                            React.createElement("div", {className: 
                                "c-eventDetail__saveButtons"}, 
                                React.createElement(Button, {className: 
                                    "c-eventDetail__saveButtons__button" + ' ' +
                                    "a-width-col-1", 
                                    title: "Save"}), 
                                React.createElement("div", {className: 
                                    "c-eventDetail__saveButtons__seperator"}), 
                                React.createElement(Button, {className: 
                                    "c-eventDetail__saveButtons__button" + ' ' +
                                    "a-width-col-1-half", 
                                    onClick: function(){
                                        RS.merge({event:false});
                                    }, 
                                    title: "Save & Close"})
                            )

                        )
                    ), 
                    React.createElement("div", {className: 
                        "c-eventDetail__close"}, 
                        React.createElement("div", {className: 
                            "c-eventDetail__closeButton", 
                            onClick: function(){
                                RS.merge({event:false});
                            }}
                        )
                    ), 

                    React.createElement("div", {className: classNames([
                            "c-eventDetail__bottomBorder",
                            "c-timeline--value_" + (event.value+1)
                        ])})
                );
    }

});



var Landing = React.createClass({displayName: "Landing",

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

        var landing_content = React.createElement(Login, null);

        if ( RS.route.landing_page == "timelines" ) {
            landing_content = React.createElement(Timelines, null);
        }

        return  React.createElement("div", {className: classNames([
                        "c-landing",
                        {"c-landing--timelines":RS.route.landing_page == "timelines"}
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
                                "Shift is an artwork app that captures and" + ' ' +
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
                             landing_content 
                        )
                    )
                );
    }

});



var Login = React.createClass({displayName: "Login",

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
        return  React.createElement("div", {className: 
                    "a-width-col-3" + ' ' +
                    "a-flex-v-left" + ' ' +
                    "a-padding-width-col-half"}, 
                    React.createElement("div", {className: 
                        "c-landing__content__title"}, 
                        "LOGIN"
                    ), 

                    React.createElement("div", {className: 
                        "o-form__v-layout" + ' ' +
                        "a-width-col-2" + ' ' +
                        "a-height-row-3"}, 
                        React.createElement("div", {className: 
                            "o-form__label"}, 
                            "username"
                        ), 
                        React.createElement("input", {className: 
                            "o-form__input"})
                    ), 

                    React.createElement("div", {className: 
                        "o-form__v-layout" + ' ' +
                        "a-margin-top-row-half" + ' ' +
                        "a-width-col-2" + ' ' +
                        "a-height-row-3"}, 
                        React.createElement("div", {className: 
                            "o-form__label"}, 
                            "password"
                        ), 
                        React.createElement("input", {className: 
                            "o-form__input"})
                    ), 
                    React.createElement("div", {className: 
                        "c-landing__content__submit", 
                        onClick: function(){
                            RS.merge({
                                "page:landing_page":"timelines"
                            });
                        }}, 
                        "Login"
                    )
                );
    }

});



var Timelines = React.createClass({displayName: "Timelines",

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
        return  React.createElement("div", {className: 
                    "c-timelines"}, 
                    React.createElement("div", {className: 
                        "c-timelines__title"}, 
                        "Timelines"
                    ), 
                    React.createElement("div", {className: "c-timelines__list"}, 
                        React.createElement("div", {className: 
                            "a-width-100" + ' ' +
                            "a-flex-v-stretch"}, 
                         Model.user.timelines.map(function(timeline){
                            return  React.createElement("div", {className: "c-timelines__list__item", 
                                        key:  "timelines_" + timeline.guid, 
                                        onClick: function(){
                                            RS.merge({
                                                page:"timeline",
                                                "page:timeline":timeline.guid
                                            })
                                        }}, 
                                        React.createElement("div", {className: "c-timelines__list__item__title"}, 
                                             timeline.title
                                        ), 
                                        React.createElement("div", {className: "c-timelines__list__item__subtitle"}, 
                                             timeline.events.length, " events | last updated"
                                        )
                                    );
                        })
                        )
                    ), 
                    React.createElement("div", {className: 
                        "c-timelines__new", 
                        onClick: function(){
                            RS.merge({
                                "page.landing_page":false
                            });
                        }}, 
                        "New Timeline"
                    )
                );
    }

});




var Circles = React.createClass({displayName: "Circles",

    getDefaultProps: function() {
        return {
            timeline:false,
            is_editing:false
        };
    },

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

        var me = this;
        $( window ).resize(function() {
            clearTimeout( me.resizeTimeout );
            me.resizeTimeout = setTimeout( function () {
                me.renderCircles();
            },300);
        });
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
    },

    componentDidMount: function(){
        this.renderCircles();
    },

    componentDidUpdate: function(){
        this.renderCircles();
    },

    findLayerValues : function () {
        var timeline = this.props.timeline;

        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }
        var time_span = end.getTime() - start.getTime();

        var values = [0,0,0,0,0];
        var mood,mood_date,next_mood_date,prev_mood_date;
        var prev_mood_time_span,next_mood_time_span;
        var totes_moods = timeline.moods.length;
        var totes_values = 0;
        for ( var i=0; i<totes_moods; i++ ) {
            mood = timeline.moods[i];
            mood_date = new Date( mood.date );

            if ( i < totes_moods-1 ) {
                next_mood_date = new Date( timeline.moods[i+1].date );
            }else{
                next_mood_date = end;
            }

            if ( i == 0 ) {
                prev_mood_date = start;
            }else{
                prev_mood_date = new Date( timeline.moods[i-1].date );
            }

            prev_mood_time_span = (( mood_date.getTime() - prev_mood_date.getTime() ) / time_span  ) / 2;
            next_mood_time_span = (( next_mood_date.getTime() - mood_date.getTime() ) / time_span  ) / 2;

            values[mood.value] += ( prev_mood_time_span + next_mood_time_span );
            totes_values += ( prev_mood_time_span + next_mood_time_span );
        }
        
        // it may not add up to 100% b/c of end values being blank
        var extra_percents = 1 - totes_values;
        var negative_distortion,totes_negative=0;
        var positive_distortion,totes_positive=0;
        var pessimism_values = [];
        var optimism_values = [];

        // 4 - 5  ( -. * intensity );
        // 4 - 5  ( -.1 * intensity );
        //var optimism_intensity = timeline.intensity/100;//.8;
        //var pessimism_intensity = timeline.intensity/100;


        var optimism_intensity = timeline.intensity/100 * ( timeline.outlook / 100 );
        var pessimism_intensity = timeline.intensity/100 * ( ( 100 - timeline.outlook ) / 100 );

        for ( var v=0; v<values.length; v++ ) {
            values[v] += extra_percents / 5;

            //negative_distortion = -pessimism_intensity + ( (v/4) * (pessimism_intensity*1.5) );
            //positive_distortion = optimism_intensity - ( (v/4) * (optimism_intensity*1.5) );

            negative_distortion = -pessimism_intensity + ( (v/4) * (pessimism_intensity*4) );
            positive_distortion = optimism_intensity - ( (v/4) * (optimism_intensity*4) );

            pessimism_values[v] = Math.max( 0 , values[v] - (values[v]*negative_distortion) );
            optimism_values[v] = Math.max( 0 , values[v] - (values[v]*positive_distortion) );

            totes_negative += pessimism_values[v];
            totes_positive += optimism_values[v];
        }

        //var post_totes_negative = 0,post_totes_positive = 0;
        for ( var v=0; v<values.length; v++ ) {
            pessimism_values[v] = pessimism_values[v] / totes_negative;
            optimism_values[v] = optimism_values[v] / totes_positive;

            //post_totes_negative += pessimism_values[v];
            //post_totes_positive += optimism_values[v];
        }

        return {
            pessimism:pessimism_values,//[.20,.10,.30,.35,.05],
            optimism:optimism_values//[.10,.50,.05,.2,.15]
        }
    },

    renderCircles : function() {
        var layer_values = this.findLayerValues();
        var left_layers = layer_values.pessimism;
        var right_layers = layer_values.optimism;

        var canvas_padding = 4;
        var strokeWidth = 0;
        var strokeColor = "#ccc";
        //var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        //var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];
        var fills = ["#FE4040","#FF9425","#FAFF69","#52DFFF","#EF45FF"];
        var fills_faded = ["#FD8A8A","#FFBE7A","#F8FBA0","#92E6FA","#F58EFF"];

        if ( this.props.is_editing ) {
            strokeWidth = 1;
            strokeColor = "#aaa";
            //fills = fills_faded = ["#fff","#fff","#fff","#fff","#fff"];
            fills = fills_faded;
            //fills_faded = ["#fff","#fff","#fff","#fff","#fff"];
            //fills = fills_faded = ["rgba(255,255,255,.3)","rgba(255,255,255,.3)","rgba(255,255,255,.3)","rgba(255,255,255,.3)","rgba(255,255,255,.3)"];
        }

        var target = $(".c-timelineEditor__shift__circles");
        var height = target.height();
        var width = target.width();
        var circle_width = height;
        var circle_radius = circle_width/2;
        var right_circle_offset = width - circle_width;// - (canvas_padding/2);

        this.paper = this.paper
                ||  Raphael( target[0] ,
                        width+canvas_padding,
                        height+canvas_padding
                    );
        this.paper.clear();
        this.paper.setSize( width+canvas_padding, height+canvas_padding );

        /*var me = this;
        function sector(cx, cy, r, startAngle, endAngle, params) {
            var rad = Math.PI / 180;
            var x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
            return me.paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
            //return me.paper.path(["M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]).attr(params);
        }*/

        var me = this;
        function horzSector(
            cx, cy, r,
            leftStartAngle, leftEndAngle,
            rightStartAngle, rightEndAngle,
            params
        ) {
            cx += canvas_padding/2;
            cy += canvas_padding/2;
            var rad = Math.PI / 180;
            var left_x1 = ( cx + r * Math.cos(-leftStartAngle * rad) ).toFixed(0),
                left_x2 = ( cx + r * Math.cos(-leftEndAngle * rad) ).toFixed(0),
                left_y1 = ( cy + r * Math.sin(-leftStartAngle * rad) ).toFixed(0),
                left_y2 = ( cy + r * Math.sin(-leftEndAngle * rad) ).toFixed(0);
            var right_x1 = ( cx + r * Math.cos(-rightStartAngle * rad) ).toFixed(0),
                right_x2 = ( cx + r * Math.cos(-rightEndAngle * rad) ).toFixed(0),
                right_y1 = ( cy + r * Math.sin(-rightStartAngle * rad) ).toFixed(0),
                right_y2 = ( cy + r * Math.sin(-rightEndAngle * rad) ).toFixed(0);

            return me.paper.path([
                "M", left_x1, left_y1,
                "A", r, r, 0, 0, 0, left_x2, left_y2,
                "L", right_x1, right_y1,
                "A", r, r, 0, 0, 0, right_x2, right_y2,
                "z"
            ]).attr(params);
        }

        function renderConnection(
            circle_radius,
            prev_left_layer_y, prev_left_layer_width,
            right_circle_offset,
            prev_right_layer_y, prev_right_layer_width,
            right_layer_y, right_layer_width,
            left_layer_y, left_layer_width,
            params
        ) {

            var p_half = canvas_padding/2;

            var left_layer_x = circle_radius + p_half;
            var right_layer_x = right_circle_offset + circle_radius + p_half;

            left_layer_y += p_half;
            prev_left_layer_y += p_half;
            right_layer_y += p_half;
            prev_right_layer_y += p_half;

            var connector_str = [
                "M" , left_layer_x, prev_left_layer_y,
                "L" , (left_layer_x + prev_left_layer_width/2), prev_left_layer_y,
                "L",( right_circle_offset + (circle_radius-(prev_right_layer_width/2))), prev_right_layer_y,
                "L", right_layer_x, prev_right_layer_y,
                "L", right_layer_x, right_layer_y,
                "L",( right_circle_offset + (circle_radius-(right_layer_width/2))), right_layer_y,
                "L" , (left_layer_x + left_layer_width/2), left_layer_y,
                "L" , left_layer_x, left_layer_y,
                "z"
            ];

            me.paper.path( connector_str )
                .attr(params);
        }

        var line_1_y = height * left_layers[0];
        var left_layer,prev_left_layer_y,prev_left_layer_width;
        var left_layer_y=0;
        var left_layer_path,left_layer_width=0;
        var left_layer_from_center;

        var right_layer,prev_right_layer_y,prev_right_layer_width;
        var right_layer_y=0;
        var right_layer_path,right_layer_width=0,right_layer_from_center;

        var left_prev_deg = 0;
        var left_deg = 0;

        var right_prev_deg = 0;
        var right_deg = 0;

        // things are coming in reverse
        for ( var i=4; i>=0; i-- ) {
            left_layer = left_layers[i];
            right_layer = right_layers[i];

            left_layer_height = circle_width * left_layer;
            prev_left_layer_y = left_layer_y;
            left_layer_y += left_layer_height;
            left_layer_from_center = Math.abs( left_layer_y - circle_radius );
            // b2 = c2 - a2;
            prev_left_layer_width = left_layer_width;
            left_layer_width = Math.sqrt( Math.pow( circle_radius ,2) - Math.pow( left_layer_from_center ,2 ) ) * 2;

            right_layer_height = circle_width * right_layer;
            prev_right_layer_y = right_layer_y;
            right_layer_y += right_layer_height;
            right_layer_from_center = Math.abs( right_layer_y - circle_radius );
            // b2 = c2 - a2;
            prev_right_layer_width = right_layer_width;
            right_layer_width = Math.sqrt( Math.pow( circle_radius ,2) - Math.pow( right_layer_from_center ,2 ) ) * 2;

            // connect layers from each circle to each other...
            renderConnection(
                circle_radius,
                prev_left_layer_y, prev_left_layer_width,
                right_circle_offset,
                prev_right_layer_y, prev_right_layer_width,
                right_layer_y, right_layer_width,
                left_layer_y, left_layer_width,
                {
                    stroke: strokeColor,
                    "stroke-width": strokeWidth,
                    fill: fills_faded[i],
                    'fill-opacity': .61
                }
            );

            left_prev_deg = left_deg;
            if ( left_layer_y < circle_radius ) {
                left_deg = Math.asin( (left_layer_width/2) / circle_radius ) * (180/Math.PI);
            }else{
                left_deg = Math.acos( (left_layer_width/2) / circle_radius ) * (180/Math.PI);
                left_deg += 90;
            }

            right_prev_deg = right_deg;
            if ( right_layer_y < circle_radius ) {
                right_deg = Math.asin( (right_layer_width/2) / circle_radius ) * (180/Math.PI);
            }else{
                right_deg = Math.acos( (right_layer_width/2) / circle_radius ) * (180/Math.PI);
                right_deg += 90;
            }

            horzSector(
                circle_radius, circle_radius, circle_radius,
                90 + left_prev_deg, 90 + left_deg,
                90 - left_deg, 90 - left_prev_deg,
                { stroke: strokeColor, "stroke-width": strokeWidth , fill: fills[i] }
            );
            horzSector(
                right_circle_offset + circle_radius, circle_radius, circle_radius,
                90 + right_prev_deg, 90 + right_deg,
                90 - right_deg, 90 - right_prev_deg,
                { stroke: strokeColor, "stroke-width": strokeWidth , fill: fills[i] }
            );
        }
    },

    render: function() {

        var timeline = Model.get( RS.route.timeline );

        return  React.createElement("div", {className: "c-timelineEditor__shift__circles"});
    }

});




var Timeline = React.createClass({displayName: "Timeline",

    getDefaultProps: function() {
        return {
            timeline:false,
            event:false,
            is_editing:false
        };
    },

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
        this.renderTimeline();
    },

    componentDidUpdate: function(){
    },

    renderTimeline : function() {

        var graph_dom = $(".c-timeline__graph");
        var labels_dom = $(".c-timeline__xaxis");
        var mood_edit_dom = $(".c-timeline__moodEdit");

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }

        var time_span = end.getTime() - start.getTime();



        //=====NOW LABELS======
        var years = time_span / 1000 / 60 / 60 / 24 / 365;
        var year_css,year,year_percent;
        if ( years < 10 ) {
            for ( var i=0; i<20; i++ ) {
                year = new Date( start.getFullYear() + i, 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }else if ( years < 30 ){
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 5 ) * 5;
                year = new Date( start_rounded + ( i*5 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }else{
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 10 ) * 10;
                year = new Date( start_rounded + ( i*10 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }
    },

    renderLabel: function ( year, start, end, time_span, labels_dom ) {
        year_percent = ( year.getTime() - start.getTime() ) / time_span;
        year_css = "left: " + Math.round( year_percent * 100 ) + "%";
        if (
            year.getTime() > start.getTime() &&
            year.getTime() < end.getTime()
        ) {
            labels_dom.append(
                $(
                    "<div class='c-timeline__label' style='"+year_css+"'>" +
                    year.getFullYear() +
                    "</div>"
                )
            );
        }
    },

    render: function() {

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );
        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }
        var time_span = end.getTime() - start.getTime();

        function getEventOnClick (event){
            return function(){
                RS.merge({
                    "event":event.guid
                });
            };
        }

        var mood,mood_time,mood_percent;
        var grads=["#e9e9e9"];
        var mood_items = [];

        //sort by date
        timeline.moods.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });

        for ( var i=0; i<timeline.moods.length; i++ ) {
            mood = timeline.moods[i];
            mood_time = new Date( mood.date ).getTime() - start.getTime();
            mood_percent = mood_time/time_span;

            if (
                mood_percent <= 1 && mood_percent >=0
            ) {
                grads.push(
                    fills_faded[ 4 - mood.value] + " " +
                    Math.round( mood_percent * 100 ) + "%"
                );

                mood_items.push(
                    React.createElement("div", {key: "timeline_"+mood.guid, 
                        className: classNames([
                            "c-timeline__mood",
                            "c-timeline--value_" + (mood.value+1),
                            {"c-timeline__mood--selected":this.props.event === mood}
                        ]), style: {left:Math.round( mood_percent * 100 ) + "%"}, 
                        onClick: getEventOnClick(mood)}
                    )
                );
            }
        }
        grads.push("#e9e9e9");


        var event,event_time,event_percent;
        var event_items = [];
        //sort by date
        timeline.events.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
        for ( var i=0; i<timeline.events.length; i++ ) {
            event = timeline.events[i];
            event_time = new Date( event.date ).getTime() - start.getTime();
            event_percent = event_time/time_span;

            if (
                event_percent <= 1 && event_percent >=0
            ) {
                var event_guid = event.guid;

                event_items.push(
                    React.createElement("div", {key: "timeline_"+event.guid, 
                        className: classNames([
                            "c-timeline__circle",
                            "c-timeline__circle--intensity_" + event.intensity,
                            "c-timeline--value_" + (event.value+1),
                            {"c-timeline__circle--selected":this.props.event === event}
                        ]), 
                        style: {left:Math.round( event_percent * 100 ) + "%"}, 
                        onClick: getEventOnClick(event)}
                    )
                );
            }
        }

        var selected_event_time = new Date( this.props.event.date ).getTime() - start.getTime();
        var selected_event_percent = selected_event_time/time_span;
        var selected_item = "";
        if ( this.props.event ) {
            selected_item =  React.createElement("div", {className: classNames([
                                    "c-timeline__selected",
                                    "c-timeline--value_" + (this.props.event.value+1)
                                ]), 
                                style: {
                                    left:Math.round( selected_event_percent * 100 ) + "%"}
                                }
                            );
        }

        return  React.createElement("div", {className: classNames([
                        "c-timeline",
                        {"c-timeline--editing":this.props.is_editing}
                    ])}, 

                    React.createElement("div", {className: "c-timeline__xaxis"}), 
                    React.createElement("div", {className: "c-timeline__graph", 
                        style: {
                            background:"linear-gradient( 90deg, " + grads.join(",") + " )"
                        }}, 
                        React.createElement("div", {className: "c-timeline__moodEdit"}, 
                             mood_items 
                        ), 
                        React.createElement("div", {className: "c-timeline__eventEdit"}), 
                         event_items 
                    ), 
                     selected_item 
                );
    }

});




var TimelineEditor = React.createClass({displayName: "TimelineEditor",

    getInitialState: function () {
        return {
            timeline:Model.get( RS.route.timeline ),
            event:Model.get( RS.route.event )
        };
    },

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "editing"
            ],
    		function ( route , prev_route ) {
                me.forceUpdate();
    		},
            "TimelineEditor"
    	);
        RouteState.addDiffListeners(
    		[
                "event"
            ],
    		function ( route , prev_route ) {
                me.setState({
                    event:Model.get( RS.route.event )
                })
    		},
            "TimelineEditor"
    	);

        Event.on( "timeline_updated", function(){
            me.forceUpdate();
        },"TimelineEditor");
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
        Event.remove("TimelineEditor");
    },

    componentDidMount: function(){
        var me = this;
        $( ".c-timelineEditor__editOutlook__sliderPeg" )
            .draggable({
                containment:".c-timelineEditor__editOutlook__sliderBg",
                stop: function( event, ui ) {
                    var percent = ui.position.left /
                        ( $( ".c-timelineEditor__editOutlook__sliderBg" ).width()-30 );

                        console.log( me.state.timeline.outlook );
                    me.state.timeline.outlook =  Math.round( percent * 100 );
                    me.forceUpdate();
                }
            });
        $( ".c-timelineEditor__editIntensity__sliderPeg" )
            .draggable({
                containment:".c-timelineEditor__editIntensity__sliderBg",
                stop: function( event, ui ) {
                    var percent = ui.position.top /
                        ( $( ".c-timelineEditor__editIntensity__sliderBg" ).height()-30 );
                    me.state.timeline.intensity = 100 - Math.round( percent * 100 );
                    me.forceUpdate();
                }
            });
    },

    componentDidUpdate: function(){
    },

    render: function() {

        var timeline = this.state.timeline;//Model.get( RS.route.timeline );

        //console.log( timeline );
        var is_editing = typeof RS.route.editing !== 'undefined';

        return  React.createElement("div", {className: classNames([
                        "c-timelineEditor",
                        {"c-timelineEditor--editing"
                            :typeof RS.route.editing !== 'undefined'}
                    ])}, 
                    React.createElement(TimelineHeader, {
                        timeline:  timeline, 
                        is_editing:  is_editing }), 

                    React.createElement("div", {className: "c-timelineEditor__shift"}, 
                        React.createElement(Circles, {
                            timeline:  timeline, 
                            is_editing:  is_editing }), 

                        React.createElement("div", {className: "c-timelineEditor__editIntensity"}, 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editIntensity__label"}, 
                                "high intensity"
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editIntensity__sliderBg"}, 
                                React.createElement("div", {className: 
                                    "c-timelineEditor__editIntensity__sliderLine"}
                                ), 
                                React.createElement("div", {className: 
                                    "c-timelineEditor__editIntensity__sliderTrack"}, 
                                    React.createElement("div", {className: 
                                        "c-timelineEditor__editIntensity__sliderPeg", 
                                        style: {top: 100 - timeline.intensity + "%"}}
                                    )
                                )
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editIntensity__label"}, 
                                "low intensity"
                            )
                        ), 
                        React.createElement("div", {className: "c-timelineEditor__editOutlook"}, 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editOutlook__label"}, 
                                "pessimistic"
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editOutlook__sliderBg"}, 
                                React.createElement("div", {className: 
                                    "c-timelineEditor__editOutlook__sliderLine"}
                                ), 
                                React.createElement("div", {className: 
                                    "c-timelineEditor__editOutlook__sliderTrack"}, 
                                    React.createElement("div", {className: 
                                        "c-timelineEditor__editOutlook__sliderPeg", 
                                        style: {left:timeline.outlook + "%"}}
                                    )
                                )
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editIntensity__label"}, 
                                "optimistic"
                            )
                        )
                    ), 

                    React.createElement("div", {className: "c-timelineEditor__timeline"}, 
                        React.createElement(Timeline, {
                            timeline:  timeline, 
                            event:  this.state.event, 
                            is_editing:  is_editing })
                    ), 

                    React.createElement("div", {className: "c-timelineEditor__editSubmit"}, 
                        React.createElement("div", {className: 
                            "c-timelineEditor__editSubmit__header", 
                            onClick: function(){
                                RS.merge(
                                    {"editing":false}
                                );
                            }}, 
                            React.createElement("div", {className: "a-fill"}), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editSubmit__header__icon"}), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editSubmit__header__close"}, 
                                "cancel"
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editSubmit__header__border"}
                            )
                        ), 
                        React.createElement("div", {className: 
                            "c-timelineEditor__editSubmit__middler"}, 
                            "This is the edit mode of visualization" + ' ' +
                            "of the. The goal is to completely fill" + ' ' +
                            "the colors in the timeline below with" + ' ' +
                            "what you remember about how you felt" + ' ' +
                            "during that time in your life."
                        ), 
                        React.createElement("div", {className: 
                            "c-timelineEditor__editSubmit__footer"}, 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editSubmit__footer__button"}, 
                                "Save"
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editSubmit__footer__seperator"}
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__editSubmit__footer__button", 
                                onClick: function(){
                                    RS.merge(
                                        {"editing":false}
                                    );
                                }}, 
                                "Save & Done"
                            )
                        )
                    ), 

                    React.createElement("div", {className: "c-timelineEditor__eventDetail"}, 
                        React.createElement(EventDetail, null)
                    )
                );
    }

});




var TimelineHeader = React.createClass({displayName: "TimelineHeader",

    getDefaultProps: function() {
        return {
            timeline:false,
            is_editing:false
        };
    },

    getInitialState: function () {
        return {
            title:this.props.timeline.title,
            start_date:moment( this.props.timeline.start_date ).format('MM/DD/YYYY'),
            start_date_valid:true,
            end_date:moment( this.props.timeline.end_date ).format('MM/DD/YYYY'),
            end_date_valid:true,
            timeline:this.props.timeline
        };
    },

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "editing"
            ],
    		function ( route , prev_route ) {
                me.forceUpdate();
    		},
            "TimelineHeader"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "TimelineHeader" );
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    updateTitleFromInput: function () {
        if ( this.state.title.length > 0 ) {
            this.state.timeline.title = this.state.title;
            Event.fire("timeline_updated");
            this.forceUpdate();
        }
    },

    updateStartDateInput: function() {
        if ( this.state.start_date_valid ) {
            this.state.timeline.start_date
                = moment( this.state.start_date ,'MM/DD/YYYY', true ).format();
            Event.fire("timeline_updated");
            this.forceUpdate();
        }
    },

    updateEndDateInput: function () {
        if ( this.state.end_date_valid ) {
            if ( this.state.end_date == "" ) {
                this.state.is_open_ended = true;
                this.state.timeline.end_date
                    = moment().format();
            }else{
                this.state.timeline.end_date
                    = moment( this.state.end_date ,'MM/DD/YYYY', true ).format();
            }
            Event.fire("timeline_updated");
            this.forceUpdate();
        }
    },

    render: function() {

        var timeline = this.state.timeline;
        var me = this;

        return  React.createElement("div", {className: classNames([
                        "c-timelineEditor__header"
                    ])}, 
                    React.createElement("div", {className: 
                        "c-timelineEditor__header__back", 
                        onClick: function(){
                            RS.merge({
                                page:"home",
                                landing_page:"timelines"
                            });
                        }}
                    ), 
                    React.createElement("div", {className: 
                        "c-timelineEditor__header__titleBox"}, 
                        React.createElement("div", {className: 
                            "c-timelineEditor__header__title"}, 
                             this.state.timeline.title
                        ), 
                        React.createElement("div", {className: 
                            "c-timelineEditor__header__subtitle"}, 
                            
                                moment( this.state.timeline.start_date ).format('MMMM, YYYY')
                                + " to " +
                                moment( this.state.timeline.end_date ).format('MMMM, YYYY')
                            
                        )
                    ), 
                    React.createElement("div", {className: classNames([
                            "c-timelineEditor__header__editForm"
                        ])}, 
                        React.createElement("div", {className: 
                            "o-form__v-layout" + ' ' +
                            "a-width-col-2" + ' ' +
                            "a-height-row-3"}, 
                            React.createElement("div", {className: 
                                "o-form__label"}, 
                                "title"
                            ), 
                            React.createElement("input", {className: classNames([
                                    "o-form__input",
                                    {"o-form--invalid":this.state.title.length == 0}
                                ]), 
                                value:  this.state.title, 
                                onChange: function(evt){
                                    me.state.title = evt.target.value;
                                    me.forceUpdate();
                                }, 
                                onKeyUp: function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateTitleFromInput();
                                    }
                                }, 
                                onBlur: this.updateTitleFromInput})
                        ), 
                        React.createElement("div", {className: 
                            "o-form__v-layout" + ' ' +
                            "a-margin-left-col-eighth" + ' ' +
                            "a-width-col-1-half" + ' ' +
                            "a-height-row-3"}, 
                            React.createElement("div", {className: 
                                "o-form__label"}, 
                                React.createElement("div", {className: 
                                    "a-fill"}, 
                                    "start"
                                ), 
                                React.createElement("div", {className: 
                                    "o-form__hint"}, 
                                    "(mm/dd/yyyy)"
                                )
                            ), 
                            React.createElement("input", {className: classNames([
                                    "o-form__input",
                                    {"o-form--invalid":!this.state.start_date_valid}
                                ]), 
                                value:  me.state.start_date, 
                                onChange: function(evt){
                                    me.state.start_date = evt.target.value;
                                    me.state.start_date_valid
                                        = moment( evt.target.value ,'MM/DD/YYYY', true ).isValid();
                                    me.forceUpdate();
                                }, 
                                onKeyUp: function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateStartDateInput();
                                    }
                                }, 
                                onBlur: this.updateStartDateInput})
                        ), 
                        React.createElement("div", {className: 
                            "o-form__v-layout" + ' ' +
                            "a-margin-width-col-eighth" + ' ' +
                            "a-width-col-1-half" + ' ' +
                            "a-height-row-3"}, 
                            React.createElement("div", {className: 
                                "o-form__label"}, 
                                React.createElement("div", {className: 
                                    "a-fill"}, 
                                    "end"
                                ), 
                                React.createElement("div", {className: 
                                    "o-form__hint"}, 
                                    "(date or blank)"
                                )
                            ), 
                            React.createElement("input", {className: classNames([
                                    "o-form__input",
                                    {"o-form--invalid":!this.state.end_date_valid}
                                ]), 
                                value:  me.state.end_date, 
                                onChange: function(evt){
                                    me.state.end_date = evt.target.value;
                                    if ( me.state.end_date == "" ) {
                                        me.state.end_date_valid = true;
                                    }else{
                                        me.state.end_date_valid
                                            = moment( evt.target.value ,'MM/DD/YYYY', true ).isValid();
                                    }
                                    me.forceUpdate();
                                }, 
                                onKeyUp: function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateEndDateInput();
                                    }
                                }, 
                                onBlur: this.updateEndDateInput})
                        )
                    ), 
                    React.createElement("div", {className: 
                        "c-timelineEditor__header__edit", 
                        onClick: function(){
                            RS.toggle(
                                {"page:editing":"edit"},
                                {"page:editing":false}
                            );
                        }}, 
                        "edit"
                    )
                );
    }

});
