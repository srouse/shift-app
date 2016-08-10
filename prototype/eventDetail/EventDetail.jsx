


var EventDetail = React.createClass({

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
                    event:Model.get( RS.route.event ),
                    date:moment( Model.get( RS.route.event ).date ).format('MM/DD/YYYY'),
                    date_valid:true
                });
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
console.log( event );
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

        if ( !RS.route.editing ) {
            return <EventDetailReadOnly event={event} />;
        }

        var type_str = "Experience";
        if ( event.type == "mood" )
            type_str = "Mood";

        return  <div className="
                    c-eventDetail">
                    <div className="
                        c-eventDetail__intro">
                        {/*<div className="
                            c-eventDetail__title">
                            { ( event.type == "mood" )
                                ? "Mood" : "Experience" }
                        </div>
                        <div className="
                            c-eventDetail__subtitle">
                            { ( event.type == "mood" )
                                ? "Overall Background Feeling"
                                : "Significant Event" }
                        </div>
                        <div className="
                            c-eventDetail__desc">
                            This is the edit mode of visualization of the.
                            The goal is to completely fill the colors in
                            the timeline below with what you remember
                            about how you felt during that time in your
                            life.
                        </div>*/}
                    </div>
                    <div className="
                        c-eventDetail__content
                        a-brand-font-light">
                        <Fill />
                        {/*<div className="a-height-row-vh-1-half"></div>*/}
                        <div className="
                            a-flex-h-stretch
                            a-height-row-1">
                            <label className="
                                o-form__label
                                a-fill">
                                title
                            </label>
                            <div className="
                                a-fill a-flex-h">
                                <label className="
                                    o-form__label
                                    a-fill">
                                    date
                                </label>
                                <label className="
                                    o-form__hint">
                                    MM/DD/YYY
                                </label>
                            </div>

                        </div>
                        <div className="
                            a-flex-h-stretch
                            a-height-row-2
                            a-margin-bottom-row-1">
                            <input className="
                                o-form__input
                                a-height-row-2
                                a-fill
                                a-margin-bottom-row-1"
                                value={ event.title }
                                onChange={function(evt){
                                    me.state.event.title = evt.target.value;
                                    me.forceUpdate();
                                }} />
                            <input className={classNames([
                                    "o-form__input",
                                    "a-fill a-border-left-none",
                                    {"o-form--invalid":!this.state.date_valid}
                                ])}
                                value={ this.state.date }
                                onChange={function(evt){
                                    me.state.date = evt.target.value;
                                    me.state.date_valid
                                        = moment( evt.target.value ,'MM/DD/YYYY', true ).isValid();
                                    me.forceUpdate();
                                }}
                                onKeyUp={function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateDateInput();
                                    }
                                }}
                                onBlur={this.updateDateInput} />
                        </div>
                        {/*<div className="
                            a-flex-h-stretch
                            a-height-row-2
                            a-margin-bottom-row-1">
                            <select className="
                                o-form__select
                                a-fill"
                                value={ event.type }
                                onChange={function( evt ) {
                                    me.updateEventType( event , evt.target.value );
                                }}>
                                <option value="mood">Mood - Overall feeling that persists over time</option>
                                <option value="event">Experience - An important experience with a shorter time span</option>
                            </select>
                        </div>*/}
                        <div className="
                            a-flex-h-stretch
                            a-height-row-1">

                            <label className="
                                o-form__label
                                a-fill">
                                type
                            </label>
                            <label className="
                                o-form__label
                                a-fill">
                                value
                            </label>
                            <label className="
                                o-form__label
                                a-fill">
                                intensity
                            </label>
                        </div>
                        <div className="
                            a-flex-h-stretch
                            a-height-row-2
                            a-margin-bottom-row-1">
                            <select className="
                                o-form__select
                                a-fill"
                                value={ event.type }
                                onChange={function( evt ) {
                                    me.updateEventType( event , evt.target.value );
                                }}>
                                <option value="mood">Mood</option>
                                <option value="event">Experience</option>
                            </select>
                            <select className="
                                o-form__select
                                a-border-left-none
                                a-fill"
                                value={ event.value }
                                onChange={function( evt ) {
                                    event.value = parseInt( evt.target.value );
                                    Event.fire("timeline_updated");
                                    me.forceUpdate();
                                }}>
                                <option value="4">Great</option>
                                <option value="3">Good</option>
                                <option value="2">Meh</option>
                                <option value="1">Bad</option>
                                <option value="0">Awful</option>
                            </select>
                            <select className="
                                o-form__select
                                a-border-left-none
                                a-fill"
                                value={ event.intensity }
                                onChange={function( evt ) {
                                    event.intensity = parseInt( evt.target.value );
                                    Event.fire("timeline_updated");
                                    me.forceUpdate();
                                }}>
                                <option value="2">High Intensity</option>
                                <option value="1">Medium Intensity</option>
                                <option value="0">Low Intensity</option>
                            </select>
                        </div>
                        <div className="
                            a-flex-h-stretch
                            a-height-row-1">
                            <label className="
                                o-form__label
                                a-fill">
                                note
                            </label>
                        </div>
                        <textarea className="
                            o-form__textarea
                            a-height-row-vh-2-half
                            a-margin-bottom-row-1"
                            value={ event.note }
                            onChange={function(evt){
                                event.note = evt.target.value;
                                me.forceUpdate();
                            }} />
                        <div className="
                            a-flex-h-stretch
                            a-height-row-2
                            a-margin-bottom-row-1">
                            <Button className=""
                                title="delete" />
                            <Fill />
                            <Button className="
                                a-width-col-1"
                                title="cancel" />
                            <div className="
                                c-eventDetail__saveButtons">
                                <Button className="
                                    c-eventDetail__saveButtons__button
                                    a-width-col-1"
                                    title="Save" />
                                <div className="
                                    c-eventDetail__saveButtons__seperator"></div>
                                <Button className="
                                    c-eventDetail__saveButtons__button
                                    a-width-col-1-half"
                                    onClick={function(){
                                        RS.merge({event:false});
                                    }}
                                    title="Save & Close" />
                            </div>

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
