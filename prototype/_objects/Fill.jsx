


var Fill = React.createClass({

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

        return  <div className={classNames([
                        "a-fill",
                        this.props.className
                    ])}>
                </div>;
    }

});
