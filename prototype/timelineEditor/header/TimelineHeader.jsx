


var TimelineHeader = React.createClass({

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

        return  <div className={classNames([
                        "c-timelineEditor__header"
                    ])}>
                    <div className="
                        c-timelineEditor__header__back"
                        onClick={function(){
                            RS.merge({
                                page:"home",
                                landing_page:"timelines"
                            });
                        }}>
                    </div>
                    <div className="
                        c-timelineEditor__header__titleBox">
                        <div className="
                            c-timelineEditor__header__title">
                            { this.state.timeline.title }
                        </div>
                        <div className="
                            c-timelineEditor__header__subtitle">
                            {
                                moment( this.state.timeline.start_date ).format('MMMM, YYYY')
                                + " to " +
                                moment( this.state.timeline.end_date ).format('MMMM, YYYY')
                            }
                        </div>
                    </div>
                    <div className={classNames([
                            "c-timelineEditor__header__editForm"
                        ])}>
                        <div className="
                            o-form__v-layout
                            a-width-col-2
                            a-height-row-3">
                            <div className="
                                o-form__label">
                                title
                            </div>
                            <input className={classNames([
                                    "o-form__input",
                                    {"o-form--invalid":this.state.title.length == 0}
                                ])}
                                value={ this.state.title }
                                onChange={function(evt){
                                    me.state.title = evt.target.value;
                                    me.forceUpdate();
                                }}
                                onKeyUp={function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateTitleFromInput();
                                    }
                                }}
                                onBlur={this.updateTitleFromInput} />
                        </div>
                        <div className="
                            o-form__v-layout
                            a-margin-left-col-eighth
                            a-width-col-1-half
                            a-height-row-3">
                            <div className="
                                o-form__label">
                                <div className="
                                    a-fill">
                                    start
                                </div>
                                <div className="
                                    o-form__hint">
                                    (mm/dd/yyyy)
                                </div>
                            </div>
                            <input className={classNames([
                                    "o-form__input",
                                    {"o-form--invalid":!this.state.start_date_valid}
                                ])}
                                value={ me.state.start_date }
                                onChange={function(evt){
                                    me.state.start_date = evt.target.value;
                                    me.state.start_date_valid
                                        = moment( evt.target.value ,'MM/DD/YYYY', true ).isValid();
                                    me.forceUpdate();
                                }}
                                onKeyUp={function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateStartDateInput();
                                    }
                                }}
                                onBlur={this.updateStartDateInput} />
                        </div>
                        <div className="
                            o-form__v-layout
                            a-margin-width-col-eighth
                            a-width-col-1-half
                            a-height-row-3">
                            <div className="
                                o-form__label">
                                <div className="
                                    a-fill">
                                    end
                                </div>
                                <div className="
                                    o-form__hint">
                                    (date or blank)
                                </div>
                            </div>
                            <input className={classNames([
                                    "o-form__input",
                                    {"o-form--invalid":!this.state.end_date_valid}
                                ])}
                                value={ me.state.end_date }
                                onChange={function(evt){
                                    me.state.end_date = evt.target.value;
                                    if ( me.state.end_date == "" ) {
                                        me.state.end_date_valid = true;
                                    }else{
                                        me.state.end_date_valid
                                            = moment( evt.target.value ,'MM/DD/YYYY', true ).isValid();
                                    }
                                    me.forceUpdate();
                                }}
                                onKeyUp={function(evt){
                                    if (evt.key === 'Enter') {
                                        me.updateEndDateInput();
                                    }
                                }}
                                onBlur={this.updateEndDateInput} />
                        </div>
                    </div>
                    <div className="
                        c-timelineEditor__header__edit"
                        onClick={function(){
                            RS.toggle(
                                {"page:editing":"edit"},
                                {"page:editing":false}
                            );
                        }}>
                        edit
                    </div>
                </div>;
    }

});
