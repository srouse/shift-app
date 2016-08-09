




var ValuePicker = React.createClass({

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

        return  <div className={classNames([
                        "o-valuePicker",
                        {"o-valuePicker--valueSet":this.state.value !== false},
                        this.state.classes
                    ])}>
                    <div className="o-valuePickerFeedback">
                    {this.props.labels.map(function(label,index) {
                        if ( label === false )
                            return "";

                        return <ValueTile index={ index }
                                    value={ me.state.value }
                                    ceiling={ me.state.ceiling }
                                    floor={ me.state.floor }
                                    hover_value={ me.state.hover_value }
                                    onChange={ me.changeValue }
                                    onHover={ me.changeHover }
                                    label={ me.props.labels[index] }
                                    type={ me.props.type }
                                    key={   "value_picker_" +
                                            me.props.reactKey
                                            + "_" + index } />
                    })}
                    </div>
                </div>;
    }

});
