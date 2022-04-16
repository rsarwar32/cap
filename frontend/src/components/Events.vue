<script>
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export default ({

    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        
        return {
        calendarOptions: {
            plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ],
            initialView: 'dayGridMonth',
            headerToolbar: {
                left:'prev,next today',
                center:'title',
                right:'dayGridMonth, dayGridWeek, listDay'
            },
            events: [],
            editable:true,
            selectable:true,
            weekends: true,
            eventClick: (arg) =>{
                console.log(arg.event.title)
            },

            dateClick: this.handleDateClick,
        },
        rows: []
        }
    },
    methods: {
        
        //Adding New Event when clicking on a date
        handleDateClick: function(arg) {
            let APIURL = "http://localhost:3000/api/event"
            axios.get(APIURL, {params: {
                event_date: arg.dateStr,
            }})
            .then(res => {
                this.rows = res.data;
                console.log(this.rows)
            }).catch(error => {
                console.log(error)
            });
            
        }
        
    },
    created() {
        this.getEvents
    } 
})
</script>
<template>
<div>
    <div class='container'>
        <div class="row">
            <div class="col w-50">
                <FullCalendar :options="calendarOptions" />
            </div>
            <div class=" col w-50">
                <h2 align="center">Events</h2><br>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="x in rows" :key="x">
                                <td>{{x.event_name}}</td>
                                <td>{{x.event_date}}</td>
                                <td>{{x.location_name}}</td>
                                <td>{{x.location_address}}</td>
                                <td>{{x.location_city}}</td>
                                <td>{{x.location_state}}</td>
                                <td>{{x.location_zip}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>

