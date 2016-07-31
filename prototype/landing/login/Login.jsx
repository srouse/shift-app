

var Login = React.createClass({

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
        return  <div className="
                    a-width-col-3
                    a-flex-v-left
                    a-padding-width-col-half">
                    <div className="
                        c-landing__content__title">
                        LOGIN
                    </div>

                    <div className="
                        o-form__v-layout
                        a-width-col-2
                        a-height-row-3">
                        <div className="
                            o-form__label">
                            username
                        </div>
                        <input className="
                            o-form__input" />
                    </div>

                    <div className="
                        o-form__v-layout
                        a-margin-top-row-half
                        a-width-col-2
                        a-height-row-3">
                        <div className="
                            o-form__label">
                            password
                        </div>
                        <input className="
                            o-form__input" />
                    </div>
                    <div className="
                        c-landing__content__submit"
                        onClick={function(){
                            RS.merge({
                                "page:landing_page":"timelines"
                            });
                        }}>
                        Login
                    </div>
                </div>;
    }

});
