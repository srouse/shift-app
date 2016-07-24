

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
                        c-landing__content__label">
                        username
                    </div>
                    <input className="
                        o-form__input
                        a-width-col-2" />
                    <div className="
                        c-landing__content__label
                        a-margin-top-row-three-quarters">
                        password
                    </div>
                    <input className="
                        o-form__input
                        a-width-col-2" />
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
