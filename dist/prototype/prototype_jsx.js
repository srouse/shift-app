


var ShiftApp = React.createClass({displayName: "ShiftApp",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "page"
            ],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ShiftApp"
    	);

        var me = this;
        $( window ).resize(function() {
            $("body").addClass("no-animations");
            clearTimeout( me.resizeTimeout );
            me.resizeTimeout = setTimeout( function () {
                $("body").removeClass("no-animations");
            },500);
        });
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "ShiftApp" );
    },

    componentDidMount: function(){

    },


    render: function() {

        var content = React.createElement(Landing, null);

        if ( RS.route.page == "timeline" ) {
            content = React.createElement(TimelineEditor, null);
        }

        return  React.createElement("div", {className: classNames([
                        "c-shiftApp"
                    ])}, 
                     content 
                );
    }

});



var Landing = React.createClass({displayName: "Landing",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		[
                "landing_page"
            ],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Landing"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Landing" );
    },

    componentDidMount: function(){

    },

    render: function() {

        var landing_content = React.createElement(Login, null);
        if ( RS.route.landing_page == "timelines" ) {
            landing_content = React.createElement(Timelines, null);
        }

        return  React.createElement("div", {className: classNames([
                        "c-landing",
                        {"c-landing--timelines":RS.route.landing_page == "timelines"}
                    ])}, 
                    React.createElement("div", {className: "c-landing__titleContainer"}, 
                        React.createElement("div", {className: "c-landing__colorsLeft"}), 
                        React.createElement("div", {className: "c-landing__colorsLeftTransition"}), 
                        React.createElement("div", {className: "c-landing__colorsCenter"}, 
                            React.createElement("div", {className: "c-landing__title"}, 
                                React.createElement("div", {className: "c-landing__title__leftSpill"}), 
                                React.createElement("div", {className: "c-landing__title__main"})
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "AWE"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "amazing, inspiring, meaningful experiences"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "GOOD"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "A solidly postive experience"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "MEH"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "Not overly positive or negative"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "BAD"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "A negative but tolerable experience"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__value"}, 
                                React.createElement("div", {className: "c-landing__value__title"}, 
                                    "MISERY"
                                ), 
                                React.createElement("div", {className: "c-landing__value__desc"}, 
                                    "Distinctly and intensely negative experience"
                                )
                            ), 
                            React.createElement("div", {className: "c-landing__summary"}, 
                                "Shift is an artwork app that captures and" + ' ' +
                                "visualizes long term experiences."
                            )
                        ), 
                        React.createElement("div", {className: "c-landing__colorsRightTransition"}
                        )
                    ), 
                    React.createElement("div", {className: "c-landing__splashContainer"}, 
                        React.createElement("div", {className: "c-landing__splashRight"}), 
                        React.createElement("div", {className: "c-landing__splash"}), 
                        React.createElement("div", {className: "c-landing__content"}, 
                             landing_content 
                        )
                    )
                );
    }

});



var Login = React.createClass({displayName: "Login",

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
        return  React.createElement("div", {className: 
                    "a-width-col-3" + ' ' +
                    "a-flex-v-left" + ' ' +
                    "a-padding-width-col-half"}, 
                    React.createElement("div", {className: 
                        "c-landing__content__title"}, 
                        "LOGIN"
                    ), 
                    React.createElement("div", {className: 
                        "c-landing__content__label"}, 
                        "username"
                    ), 
                    React.createElement("input", {className: 
                        "o-form__input" + ' ' +
                        "a-width-col-2"}), 
                    React.createElement("div", {className: 
                        "c-landing__content__label" + ' ' +
                        "a-margin-top-row-three-quarters"}, 
                        "password"
                    ), 
                    React.createElement("input", {className: 
                        "o-form__input" + ' ' +
                        "a-width-col-2"}), 
                    React.createElement("div", {className: 
                        "c-landing__content__submit", 
                        onClick: function(){
                            RS.merge({
                                "page:landing_page":"timelines"
                            });
                        }}, 
                        "Login"
                    )
                );
    }

});



var Timelines = React.createClass({displayName: "Timelines",

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

    componentDidMount: function(){
        Ps.initialize( $(".c-timelines__list")[0] , {
            suppressScrollX: true
        });
    },

    componentDidUpdate: function () {
        Ps.update( $(".c-timelines__list")[0] );
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "Landing" );
        Ps.destroy( $(".c-timelines__list")[0] );
    },



    render: function() {
        return  React.createElement("div", {className: 
                    "c-timelines"}, 
                    React.createElement("div", {className: 
                        "c-timelines__title"}, 
                        "Timelines"
                    ), 
                    React.createElement("div", {className: "c-timelines__list"}, 
                        React.createElement("div", {className: 
                            "a-width-100" + ' ' +
                            "a-flex-v-stretch"}, 
                         Model.user.timelines.map(function(timeline){
                            return  React.createElement("div", {className: "c-timelines__list__item", 
                                        key:  "timelines_" + timeline.guid, 
                                        onClick: function(){
                                            RS.merge({
                                                page:"timeline",
                                                "page:timeline":timeline.guid
                                            })
                                        }}, 
                                        React.createElement("div", {className: "c-timelines__list__item__title"}, 
                                             timeline.title
                                        ), 
                                        React.createElement("div", {className: "c-timelines__list__item__subtitle"}, 
                                             timeline.events.length, " events | last updated"
                                        )
                                    );
                        })
                        )
                    ), 
                    React.createElement("div", {className: 
                        "c-timelines__new", 
                        onClick: function(){
                            RS.merge({
                                "page.landing_page":false
                            });
                        }}, 
                        "New Timeline"
                    )
                );
    }

});




var Circles = React.createClass({displayName: "Circles",

    getDefaultProps: function() {
        return {
            timeline:false
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
            "TimelineEditor"
    	);*/

        var me = this;
        $( window ).resize(function() {
            clearTimeout( me.resizeTimeout );
            me.resizeTimeout = setTimeout( function () {
                me.renderCircles();
            },300);
        });
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
    },

    componentDidMount: function(){
        this.renderCircles();
    },

    componentDidUpdate: function(){
        this.renderCircles();
    },

    findLayerValues : function () {
        var timeline = this.props.timeline;

        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }
        var time_span = end.getTime() - start.getTime();

        var values = [0,0,0,0,0];
        var mood,mood_date,next_mood_date,prev_mood_date;
        var prev_mood_time_span,next_mood_time_span;
        var totes_moods = timeline.moods.length;
        var totes_values = 0;
        for ( var i=0; i<totes_moods; i++ ) {
            mood = timeline.moods[i];
            mood_date = new Date( mood.date );

            if ( i < totes_moods-1 ) {
                next_mood_date = new Date( timeline.moods[i+1].date );
            }else{
                next_mood_date = end;
            }

            if ( i == 0 ) {
                prev_mood_date = start;
            }else{
                prev_mood_date = new Date( timeline.moods[i-1].date );
            }

            prev_mood_time_span = (( mood_date.getTime() - prev_mood_date.getTime() ) / time_span  ) / 2;
            next_mood_time_span = (( next_mood_date.getTime() - mood_date.getTime() ) / time_span  ) / 2;
            //console.log( prev_mood_time_span );
            //console.log( next_mood_time_span  );
            //console.log( mood_date + " | " + mood.value + " | " + next_mood_date + " | " + prev_mood_date );

            values[mood.value] += ( prev_mood_time_span + next_mood_time_span );

            totes_values += ( prev_mood_time_span + next_mood_time_span );
        }

        // it may not add up to 100% b/c of end values being blank
        var extra_percents = 1 - totes_values;
        var negative_distortion,totes_negative=0;
        var positive_distortion,totes_positive=0;
        var pessimism_values = [];
        var optimism_values = [];
        var optimism_intensity = .8;
        var pessimism_intensity = .8;
        for ( var v=0; v<values.length; v++ ) {
            values[v] += extra_percents / 5;

            negative_distortion = -pessimism_intensity + ( (v/4) * (pessimism_intensity*1.5) );
            positive_distortion = optimism_intensity - ( (v/4) * (optimism_intensity*1.5) );
            pessimism_values[v] = values[v] - (values[v]*negative_distortion);
            optimism_values[v] = values[v] - (values[v]*positive_distortion);

            totes_negative += pessimism_values[v];
            totes_positive += optimism_values[v];
            //console.log( Math.round( positive_distortion * 100 ) );
            //console.log("");
        }

        for ( var v=0; v<values.length; v++ ) {
            pessimism_values[v] = pessimism_values[v] / totes_negative;
            optimism_values[v] = optimism_values[v] / totes_positive;
        }

        console.log( values , optimism_values, pessimism_values );

        return {
            pessimism:pessimism_values,//[.20,.10,.30,.35,.05],
            optimism:optimism_values//[.10,.50,.05,.2,.15]
        }
    },

    renderCircles : function() {
        var layer_values = this.findLayerValues();
        var left_layers = layer_values.pessimism;
        var right_layers = layer_values.optimism;

        var strokeWidth = 0;
        //var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        //var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var fills = ["#FE4040","#FF9425","#FAFF69","#52DFFF","#EF45FF"];
        var fills_faded = ["#FD8A8A","#FFBE7A","#F8FBA0","#92E6FA","#F58EFF"];

        //var strokeWidth = 1;
        //var fills = ["#fff","#fff","#fff","#fff","#fff"];

        var target = $(".c-timelineEditor__shift__circles");
        var height = target.height();
        var width = target.width();
        var circle_width = height;
        var circle_radius = circle_width/2;
        var right_circle_offset = width - circle_width;

        this.paper = this.paper || Raphael( target[0] , width, height );
        this.paper.clear();
        this.paper.setSize( width, height );

        /*var me = this;
        function sector(cx, cy, r, startAngle, endAngle, params) {
            var rad = Math.PI / 180;
            var x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
            return me.paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
            //return me.paper.path(["M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]).attr(params);
        }*/

        var me = this;
        function horzSector(
            cx, cy, r,
            leftStartAngle, leftEndAngle,
            rightStartAngle, rightEndAngle,
            params
        ) {
            var rad = Math.PI / 180;
            var left_x1 = cx + r * Math.cos(-leftStartAngle * rad),
                left_x2 = cx + r * Math.cos(-leftEndAngle * rad),
                left_y1 = cy + r * Math.sin(-leftStartAngle * rad),
                left_y2 = cy + r * Math.sin(-leftEndAngle * rad);
            var right_x1 = cx + r * Math.cos(-rightStartAngle * rad),
                right_x2 = cx + r * Math.cos(-rightEndAngle * rad),
                right_y1 = cy + r * Math.sin(-rightStartAngle * rad),
                right_y2 = cy + r * Math.sin(-rightEndAngle * rad);
            if ( leftStartAngle == 90 ) {
                return me.paper.path([
                    //"M", cx, cy,
                    "M", left_x1, left_y1,
                    "A", r, r, 0, +(leftEndAngle - leftStartAngle > 180), 0, left_x2, left_y2,
                    "L", right_x1, right_y1,
                    "A", r, r, 0, +(rightEndAngle - rightStartAngle > 180), 0, left_x2, left_y2,
                    //"z"
                ]).attr(params);
            }else{
                return me.paper.path([
                    //"M", cx, cy,
                    "M", left_x1, left_y1,
                    "A", r, r, 0, +(leftEndAngle - leftStartAngle > 180), 0, left_x2, left_y2,
                    "L", right_x1, right_y1,
                    "A", r, r, 0, +(rightEndAngle - rightStartAngle > 180), 0, right_x2, right_y2,
                    "z"
                ]).attr(params);
            }
        }

        var line_1_y = height * left_layers[0];
        var left_layer,prev_left_layer_y,prev_left_layer_width;
        var left_layer_y=0,left_layer_path,left_layer_width=0,left_layer_from_center;

        var right_layer,prev_right_layer_y,prev_right_layer_width;
        var right_layer_y=0,right_layer_path,right_layer_width=0,right_layer_from_center;

        var left_prev_deg = 0;
        var left_deg = 0;

        var right_prev_deg = 0;
        var right_deg = 0;

        //for ( var i=0; i<left_layers.length; i++ ) {
        for ( var i=4; i>=0; i-- ) {
            left_layer = left_layers[i];
            right_layer = right_layers[i];

            left_layer_height = circle_width * left_layer;
            prev_left_layer_y = left_layer_y;
            left_layer_y += left_layer_height;
            left_layer_from_center = Math.abs( left_layer_y - circle_radius );
            // b2 = c2 - a2;
            prev_left_layer_width = left_layer_width;
            left_layer_width = Math.sqrt( Math.pow( circle_radius ,2) - Math.pow( left_layer_from_center ,2 ) ) * 2;

            right_layer_height = circle_width * right_layer;
            prev_right_layer_y = right_layer_y;
            right_layer_y += right_layer_height;
            right_layer_from_center = Math.abs( right_layer_y - circle_radius );
            // b2 = c2 - a2;
            prev_right_layer_width = right_layer_width;
            right_layer_width = Math.sqrt( Math.pow( circle_radius ,2) - Math.pow( right_layer_from_center ,2 ) ) * 2;

            // connect layers from each circle to each other...
            var connector_str = [
                "M" , circle_radius, prev_left_layer_y,
                "L" , (circle_radius + prev_left_layer_width/2), prev_left_layer_y,
                "L",( right_circle_offset + (circle_radius-(prev_right_layer_width/2))), prev_right_layer_y,
                "L", right_circle_offset + circle_radius, prev_right_layer_y,
                "L", right_circle_offset + circle_radius, right_layer_y,
                "L",( right_circle_offset + (circle_radius-(right_layer_width/2))), right_layer_y,
                "L" , (circle_radius + left_layer_width/2), left_layer_y,
                "L" , circle_radius, left_layer_y,
                "z"
            ];
            this.paper.path( connector_str )
                .attr({
                    stroke: "#ccc",
                    "stroke-width": strokeWidth ,
                    fill: fills[i],
                    'fill-opacity': .61
                });

            left_prev_deg = left_deg;
            if ( left_layer_y < circle_radius ) {
                left_deg = Math.asin( (left_layer_width/2) / circle_radius ) * (180/Math.PI);
            }else{
                left_deg = Math.acos( (left_layer_width/2) / circle_radius ) * (180/Math.PI);
                left_deg += 90;
            }

            right_prev_deg = right_deg;
            if ( right_layer_y < circle_radius ) {
                right_deg = Math.asin( (right_layer_width/2) / circle_radius ) * (180/Math.PI);
            }else{
                right_deg = Math.acos( (right_layer_width/2) / circle_radius ) * (180/Math.PI);
                right_deg += 90;
            }

            horzSector(
                circle_radius, circle_radius, circle_radius,
                90 + left_prev_deg, 90 + left_deg,
                90 - left_deg, 90 - left_prev_deg,
                { stroke: "#ccc", "stroke-width": strokeWidth , fill: fills[i] }
            );
            horzSector(
                right_circle_offset + circle_radius, circle_radius, circle_radius,
                90 + right_prev_deg, 90 + right_deg,
                90 - right_deg, 90 - right_prev_deg,
                { stroke: "#ccc", "stroke-width": strokeWidth , fill: fills[i] }
            );
        }
    },

    render: function() {

        var timeline = Model.get( RS.route.timeline );

        return  React.createElement("div", {className: "c-timelineEditor__shift__circles"});
    }

});




var Timeline = React.createClass({displayName: "Timeline",

    getDefaultProps: function() {
        return {
            timeline:false
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
            "TimelineEditor"
    	);*/

    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
    },

    componentDidMount: function(){
        this.renderTimeline();
    },

    componentDidUpdate: function(){
    },

    renderTimeline : function() {

        var graph_dom = $(".c-timeline__graph");
        var labels_dom = $(".c-timeline__xaxis");

        var timeline = this.props.timeline;//Model.get( RS.route.timeline );

        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];

        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }

        var time_span = end.getTime() - start.getTime();

        var event,grads=["#e9e9e9"],event_time,event_percent,event_css;
        for ( var i=0; i<timeline.events.length; i++ ) {
            event = timeline.events[i];
            event_time = new Date( event.date ).getTime() - start.getTime();
            event_percent = event_time/time_span;

            if (
                event_percent <= 1 && event_percent >=0
            ) {
                event_css = "left: " + Math.round( event_percent * 100 ) + "%";
                graph_dom.append(
                    $( "<div class='c-timeline__circle c-timeline__circle--intensity_" +
                    event.intensity + " c-timeline--value_" +
                    (event.value+1) +"' style='"+event_css+"'></div>" )
                );
            }
        }

        var mood,grads=["#e9e9e9"],mood_time,mood_percent,mood_css;
        for ( var i=0; i<timeline.moods.length; i++ ) {
            mood = timeline.moods[i];
            mood_time = new Date( mood.date ).getTime() - start.getTime();
            mood_percent = mood_time/time_span;

            if (
                mood_percent <= 1 && mood_percent >=0
            ) {
                grads.push(
                    fills_faded[ 4 - mood.value] + " " +
                    Math.round( mood_percent * 100 ) + "%"
                );
            }
        }

        grads.push("#e9e9e9");
        graph_dom.css(
            "background",
            "linear-gradient( 90deg, " + grads.join(",") + " )"
        );

        //=====NOW LABELS======
        var years = time_span / 1000 / 60 / 60 / 24 / 365;
        var year_css,year,year_percent;
        if ( years < 10 ) {
            for ( var i=0; i<20; i++ ) {
                year = new Date( start.getFullYear() + i, 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }else if ( years < 30 ){
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 5 ) * 5;
                year = new Date( start_rounded + ( i*5 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }else{
            var start_rounded;
            for ( var i=0; i<20; i++ ) {
                start_rounded = Math.floor( start.getFullYear() / 10 ) * 10;
                year = new Date( start_rounded + ( i*10 ), 0 , 1 );
                if ( year.getTime() > end.getTime() ) {
                    break;
                }
                this.renderLabel( year, start, end, time_span, labels_dom );
            }
        }
    },

    renderLabel: function ( year, start, end, time_span, labels_dom ) {
        year_percent = ( year.getTime() - start.getTime() ) / time_span;
        year_css = "left: " + Math.round( year_percent * 100 ) + "%";
        if (
            year.getTime() > start.getTime() &&
            year.getTime() < end.getTime()
        ) {
            labels_dom.append(
                $(
                    "<div class='c-timeline__label' style='"+year_css+"'>" +
                    year.getFullYear() +
                    "</div>"
                )
            );
        }
    },

    render: function() {
        return  React.createElement("div", {className: "c-timeline"}, 
                    React.createElement("div", {className: "c-timeline__xaxis"}), 
                    React.createElement("div", {className: "c-timeline__graph"})
                );
    }

});




var TimelineEditor = React.createClass({displayName: "TimelineEditor",

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
            "TimelineEditor"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "TimelineEditor" );
    },

    componentDidMount: function(){
    },

    componentDidUpdate: function(){
    },

    render: function() {

        var timeline = Model.get( RS.route.timeline );

        console.log( timeline );

        return  React.createElement("div", {className: classNames([
                        "c-timelineEditor"
                    ])}, 
                    React.createElement("div", {className: "c-timelineEditor__header"}, 
                        React.createElement("div", {className: 
                            "c-timelineEditor__header__back", 
                            onClick: function(){
                                RS.merge({
                                    page:"home"
                                });
                            }}
                        ), 
                        React.createElement("div", {className: 
                            "c-timelineEditor__header__titleBox"}, 
                            React.createElement("div", {className: 
                                "c-timelineEditor__header__title"}, 
                                 timeline.title
                            ), 
                            React.createElement("div", {className: 
                                "c-timelineEditor__header__subtitle"}, 
                                 timeline.title
                            )
                        ), 
                        React.createElement("div", {className: 
                            "c-timelineEditor__header__edit"}, 
                            "edit"
                        )
                    ), 
                    React.createElement("div", {className: "c-timelineEditor__shift"}, 
                        React.createElement(Circles, {timeline:  timeline })
                    ), 
                    React.createElement("div", {className: "c-timelineEditor__timeline"}, 
                        React.createElement(Timeline, {timeline:  timeline })
                    )
                );
    }

});
