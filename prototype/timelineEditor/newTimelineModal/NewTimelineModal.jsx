


var NewTimelineModal = React.createClass({



    getInitialState: function () {
        return {
            timeline:false,
            title:false,
            start_date:false,
            start_date_valid:false,
            is_open_ended:false,
            end_date:false,
            end_date_valid:false
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
            "NewTimelineModalEditor"
    	);*/

        var timeline = Mod.get( RS.route.timeline );
        this.setState({
            timeline:timeline,
            title:timeline.title,
            start_date:moment( timeline.start_date ).format('MM/DD/YYYY'),
            start_date_valid:true,
            end_date:moment( timeline.end_date ).format('MM/DD/YYYY'),
            end_date_valid:true,
            is_open_ended:timeline.is_open_ended
        });
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "NewTimelineModalEditor" );
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

        var me = this;

        return  <div className={classNames([
                        "c-newTimelineModal"
                    ])}>
                    <div className="
                        c-newTimelineModal__page">
                        <div className="
                            o-form__v-layout
                            a-height-row-3
                            a-margin-bottom-row">
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
                            a-height-row-3
                            a-margin-bottom-row">
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
                            a-height-row-3
                            a-margin-bottom-row">
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
                        <div className="
                            o-form__v-layout
                            a-flex-h-stretch
                            a-height-row-2">
                            <div className="
                                o-button">
                                cancel
                            </div>
                            <div className="
                                a-fill">
                            </div>
                            <div className="
                                o-roundedButton
                                o-roundedButton--brand-primary
                                a-width-col-2"
                                onClick={function(){

                                    me.state.timeline.title = me.state.title;
                                    me.state.timeline.is_open_ended = me.state.is_open_ended;
                                    //me.state.timeline.start_date
                                    //    = moment( me.state.start_date ,'MM/DD/YYYY' ).format();
                                    //me.state.timeline.end_date
                                    //    = moment( me.state.end_date ,'MM/DD/YYYY' ).format();

                                    RS.merge({
                                        page:"timeline",
                                        "page:editing":"editing",
                                        modal:false
                                    });
                                }}>
                                Create
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
