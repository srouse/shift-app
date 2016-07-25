


var TimelineEditor = React.createClass({

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

            //me.renderCircles();
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

    renderCircles : function() {
        var left_layers = [.20,.10,.30,.35,.05];
        var right_layers = [.10,.50,.05,.2,.15];

        var strokeWidth = 0;
        var fills = ["#EF45FF","#52DFFF","#FAFF69","#FF9425","#FE4040"];

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

        var me = this;
        function sector(cx, cy, r, startAngle, endAngle, params) {
            var rad = Math.PI / 180;
            var x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
            return me.paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
            //return me.paper.path(["M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]).attr(params);
        }

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

        for ( var i=0; i<left_layers.length; i++ ) {
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

        console.log( timeline );
        console.log( new Date( timeline.events[0].date ) );

        return  <div className={classNames([
                        "c-timelineEditor"
                    ])}>
                    <div className="c-timelineEditor__header">
                        <div className="
                            c-timelineEditor__header__back"
                            onClick={function(){
                                RS.merge({
                                    page:"home"
                                });
                            }}>
                        </div>
                        <div className="
                            c-timelineEditor__header__titleBox">
                            <div className="
                                c-timelineEditor__header__title">
                                { timeline.title }
                            </div>
                            <div className="
                                c-timelineEditor__header__subtitle">
                                { timeline.title }
                            </div>
                        </div>
                        <div className="
                            c-timelineEditor__header__edit">
                            edit
                        </div>
                    </div>
                    <div className="c-timelineEditor__shift">
                        <div className="c-timelineEditor__shift__circles"
                            id="canvas_container"></div>
                    </div>
                    <div className="c-timelineEditor__timeline">

                    </div>
                </div>;
    }

});
