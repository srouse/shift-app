


var EventDetail = React.createClass({

    getDefaultProps: function() {
        return {
        };
    },

    getInitialState: function () {
        return {
            event:Model.get( RS.route.event )
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

    render: function() {

        var event = this.state.event;
        var me = this;

        return  <div className="c-eventDetail"
                    >
                    <div className="
                        c-eventDetail__intro">
                        <div className="
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
                        </div>
                    </div>
                    <div className="
                        c-eventDetail__content
                        a-brand-font-light">
                        <div className="a-fill"></div>
                        <input className="
                            o-form__input
                            a-height-row-2
                            a-margin-bottom-row-1"
                            value={ event.title }
                            onChange={function(evt){
                                me.state.event.title = evt.target.value;
                                me.forceUpdate();
                            }} />
                        <div className="
                            a-flex-h-stretch
                            a-height-row-2
                            a-margin-bottom-row-1">
                            <input className="
                                o-form__input
                                a-fill" />
                            <input className="
                                o-form__input
                                a-border-left-none
                                a-fill" />
                        </div>
                        <div className="
                            a-flex-h-stretch
                            a-height-row-2
                            a-margin-bottom-row-1">
                        </div>
                        <textarea className="
                            o-form__textarea
                            a-height-row-vh-4
                            a-margin-bottom-row-1" />
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
                            "c-timeline--value_" + (event.value+1)
                        ])}></div>
                </div>;
    }

});
