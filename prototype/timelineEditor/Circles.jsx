


var Circles = React.createClass({

    getDefaultProps: function() {
        return {
            timeline:false,
            is_editing:false
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

            values[mood.value] += ( prev_mood_time_span + next_mood_time_span );
            totes_values += ( prev_mood_time_span + next_mood_time_span );
        }
        
        // it may not add up to 100% b/c of end values being blank
        var extra_percents = 1 - totes_values;
        var negative_distortion,totes_negative=0;
        var positive_distortion,totes_positive=0;
        var pessimism_values = [];
        var optimism_values = [];

        // 4 - 5  ( -. * intensity );
        // 4 - 5  ( -.1 * intensity );
        //var optimism_intensity = timeline.intensity/100;//.8;
        //var pessimism_intensity = timeline.intensity/100;


        var optimism_intensity = timeline.intensity/100 * ( timeline.outlook / 100 );
        var pessimism_intensity = timeline.intensity/100 * ( ( 100 - timeline.outlook ) / 100 );

        for ( var v=0; v<values.length; v++ ) {
            values[v] += extra_percents / 5;

            //negative_distortion = -pessimism_intensity + ( (v/4) * (pessimism_intensity*1.5) );
            //positive_distortion = optimism_intensity - ( (v/4) * (optimism_intensity*1.5) );

            negative_distortion = -pessimism_intensity + ( (v/4) * (pessimism_intensity*4) );
            positive_distortion = optimism_intensity - ( (v/4) * (optimism_intensity*4) );

            pessimism_values[v] = Math.max( 0 , values[v] - (values[v]*negative_distortion) );
            optimism_values[v] = Math.max( 0 , values[v] - (values[v]*positive_distortion) );

            totes_negative += pessimism_values[v];
            totes_positive += optimism_values[v];
        }

        //var post_totes_negative = 0,post_totes_positive = 0;
        for ( var v=0; v<values.length; v++ ) {
            pessimism_values[v] = pessimism_values[v] / totes_negative;
            optimism_values[v] = optimism_values[v] / totes_positive;

            //post_totes_negative += pessimism_values[v];
            //post_totes_positive += optimism_values[v];
        }

        return {
            pessimism:pessimism_values,//[.20,.10,.30,.35,.05],
            optimism:optimism_values//[.10,.50,.05,.2,.15]
        }
    },

    renderCircles : function() {
        var layer_values = this.findLayerValues();
        var left_layers = layer_values.pessimism;
        var right_layers = layer_values.optimism;

        var canvas_padding = 4;
        var strokeWidth = 0;
        var strokeColor = "#ccc";
        //var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];
        //var fills_faded = ["#F58EFF","#92E6FA","#F8FBA0","#FFBE7A","#FD8A8A"];
        var fills = ["#FE4040","#FF9425","#FAFF69","#52DFFF","#EF45FF"];
        var fills_faded = ["#FD8A8A","#FFBE7A","#F8FBA0","#92E6FA","#F58EFF"];

        if ( this.props.is_editing ) {
            strokeWidth = 1;
            strokeColor = "#aaa";
            //fills = fills_faded = ["#fff","#fff","#fff","#fff","#fff"];
            fills = fills_faded;
            //fills_faded = ["#fff","#fff","#fff","#fff","#fff"];
            //fills = fills_faded = ["rgba(255,255,255,.3)","rgba(255,255,255,.3)","rgba(255,255,255,.3)","rgba(255,255,255,.3)","rgba(255,255,255,.3)"];
        }

        var target = $(".c-timelineEditor__shift__circles");
        var height = target.height();
        var width = target.width();
        var circle_width = height;
        var circle_radius = circle_width/2;
        var right_circle_offset = width - circle_width;// - (canvas_padding/2);

        this.paper = this.paper
                ||  Raphael( target[0] ,
                        width+canvas_padding,
                        height+canvas_padding
                    );
        this.paper.clear();
        this.paper.setSize( width+canvas_padding, height+canvas_padding );

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
            cx += canvas_padding/2;
            cy += canvas_padding/2;
            var rad = Math.PI / 180;
            var left_x1 = ( cx + r * Math.cos(-leftStartAngle * rad) ).toFixed(0),
                left_x2 = ( cx + r * Math.cos(-leftEndAngle * rad) ).toFixed(0),
                left_y1 = ( cy + r * Math.sin(-leftStartAngle * rad) ).toFixed(0),
                left_y2 = ( cy + r * Math.sin(-leftEndAngle * rad) ).toFixed(0);
            var right_x1 = ( cx + r * Math.cos(-rightStartAngle * rad) ).toFixed(0),
                right_x2 = ( cx + r * Math.cos(-rightEndAngle * rad) ).toFixed(0),
                right_y1 = ( cy + r * Math.sin(-rightStartAngle * rad) ).toFixed(0),
                right_y2 = ( cy + r * Math.sin(-rightEndAngle * rad) ).toFixed(0);

            return me.paper.path([
                "M", left_x1, left_y1,
                "A", r, r, 0, 0, 0, left_x2, left_y2,
                "L", right_x1, right_y1,
                "A", r, r, 0, 0, 0, right_x2, right_y2,
                "z"
            ]).attr(params);
        }

        function renderConnection(
            circle_radius,
            prev_left_layer_y, prev_left_layer_width,
            right_circle_offset,
            prev_right_layer_y, prev_right_layer_width,
            right_layer_y, right_layer_width,
            left_layer_y, left_layer_width,
            params
        ) {

            var p_half = canvas_padding/2;

            var left_layer_x = circle_radius + p_half;
            var right_layer_x = right_circle_offset + circle_radius + p_half;

            left_layer_y += p_half;
            prev_left_layer_y += p_half;
            right_layer_y += p_half;
            prev_right_layer_y += p_half;

            var connector_str = [
                "M" , left_layer_x, prev_left_layer_y,
                "L" , (left_layer_x + prev_left_layer_width/2), prev_left_layer_y,
                "L",( right_circle_offset + (circle_radius-(prev_right_layer_width/2))), prev_right_layer_y,
                "L", right_layer_x, prev_right_layer_y,
                "L", right_layer_x, right_layer_y,
                "L",( right_circle_offset + (circle_radius-(right_layer_width/2))), right_layer_y,
                "L" , (left_layer_x + left_layer_width/2), left_layer_y,
                "L" , left_layer_x, left_layer_y,
                "z"
            ];

            me.paper.path( connector_str )
                .attr(params);
        }

        var line_1_y = height * left_layers[0];
        var left_layer,prev_left_layer_y,prev_left_layer_width;
        var left_layer_y=0;
        var left_layer_path,left_layer_width=0;
        var left_layer_from_center;

        var right_layer,prev_right_layer_y,prev_right_layer_width;
        var right_layer_y=0;
        var right_layer_path,right_layer_width=0,right_layer_from_center;

        var left_prev_deg = 0;
        var left_deg = 0;

        var right_prev_deg = 0;
        var right_deg = 0;

        // things are coming in reverse
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
            renderConnection(
                circle_radius,
                prev_left_layer_y, prev_left_layer_width,
                right_circle_offset,
                prev_right_layer_y, prev_right_layer_width,
                right_layer_y, right_layer_width,
                left_layer_y, left_layer_width,
                {
                    stroke: strokeColor,
                    "stroke-width": strokeWidth,
                    fill: fills_faded[i],
                    'fill-opacity': .61
                }
            );

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
                { stroke: strokeColor, "stroke-width": strokeWidth , fill: fills[i] }
            );
            horzSector(
                right_circle_offset + circle_radius, circle_radius, circle_radius,
                90 + right_prev_deg, 90 + right_deg,
                90 - right_deg, 90 - right_prev_deg,
                { stroke: strokeColor, "stroke-width": strokeWidth , fill: fills[i] }
            );
        }
    },

    render: function() {

        var timeline = Model.get( RS.route.timeline );

        return  <div className="c-timelineEditor__shift__circles"></div>;
    }

});
