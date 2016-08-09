




var ValueTile = React.createClass({

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

        return  <div className={this.renderClassNames()}
                    onClick={this.changeValue}
                    onMouseOver={ this.changeHover }
                    onMouseOut={ this.changeHoverOut }>
                    <div className="o-valuePickerFeedback__label"
                        onClick={this.changeValue}>
                        { this.props.label }
                    </div>
                    <div className="o-valuePickerFeedback__line"
                        onClick={this.changeValue}></div>
                    <div className="o-valuePickerFeedback__dot"
                        onClick={this.changeValue}></div>
                    <div className="o-valuePickerFeedback__bar"
                        onClick={this.changeValue}>
                        <div className="o-valuePickerFeedback__barCenter"></div>
                    </div>
                    <div className="o-valuePickerFeedback__extentHover"
                        onClick={this.changeValue}></div>
                </div>;
    }

});
