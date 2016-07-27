


var Circles = React.createClass({

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

        return  <div className="c-timelineEditor__shift__circles"></div>;
    }

});
