


var _TimelineMetrics = function () {

};

_TimelineMetrics.prototype = {

    dateInfo: function ( timeline )
    {
        var start = new Date( timeline.start_date );
        var end = new Date();
        if ( !timeline.is_open_ended ) {
            end = new Date( timeline.end_date );
        }
        var time_span = end.getTime() - start.getTime();
        return {
            start:start,
            end:end,
            time_span:time_span
        };
    },

    eventsInfo: function ( timeline )
    {
        var dateInfo = TimelineMetrics.dateInfo( timeline );

        var values = [0,0,0,0,0];
        var mood,mood_date,next_mood_date,prev_mood_date;
        var prev_mood_time_span,next_mood_time_span;
        var totes_moods = timeline.moods.length;
        var totes_values = 0;
        for ( var i=0; i<totes_moods; i++ ) {
            mood = timeline.moods[i];
            mood_date = new Date( mood.date );

            if ( mood_date < dateInfo.start || mood_date > dateInfo.end ) {
                console.log( "mood outside of timeline " , mood );
                continue;
            }

            if ( i < totes_moods-1 ) {
                next_mood_date = new Date( timeline.moods[i+1].date );
            }else{
                next_mood_date = dateInfo.end;
            }

            if ( i == 0 ) {
                prev_mood_date = dateInfo.start;
            }else{
                prev_mood_date = new Date( timeline.moods[i-1].date );
            }

            prev_mood_time_span = (( mood_date.getTime() - prev_mood_date.getTime() )
                                        / dateInfo.time_span  ) / 2;
            next_mood_time_span = (( next_mood_date.getTime() - mood_date.getTime() )
                                        / dateInfo.time_span  ) / 2;

            values[mood.value] += ( prev_mood_time_span + next_mood_time_span );
            totes_values += ( prev_mood_time_span + next_mood_time_span );
        }

        // usually smaller than 100%
        var new_totes = 0;
        for ( var v=0; v<values.length; v++ ) {
            values[v] = values[v] / totes_values;
            new_totes += values[v];
        }

        return {
            values:values,
            total_percent:new_totes
        };
    },

    nextAndPreviousEvent: function( event ) {
        var timeline = event.timeline;
        var all_events = timeline.events.concat( timeline.moods );
        all_events.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });

        var prev = false,next = false,all_event;
        for ( var i=0; i<all_events.length; i++ ) {
            all_event = all_events[i];
            console.log( all_event.guid );
            if ( all_event.guid == event.guid ) {
                if ( i < all_events.length-1 ) {
                    next = all_events[i+1];
                }
                break;
            }
            prev = all_event;
        }
        return {
            next:next,
            prev:prev
        }
    }

};

var TimelineMetrics = new _TimelineMetrics();
