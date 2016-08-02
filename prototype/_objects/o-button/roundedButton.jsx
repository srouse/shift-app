


var RoundedButton = React.createClass({

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

        return  <div className={classNames([
                        "o-roundedButton",
                        this.props.className
                    ])}
                    onClick={this.props.onClick}>
                    { this.props.title }
                </div>;
    }

});
