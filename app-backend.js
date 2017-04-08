new Vue({
  el: '#events',

  data: {
    event: { name: '', description: '', date: '' },
    events: []
  },

  ready: function() {
    this.fetchEvents();
  },

  methods: {
    fetchEvents: function() {
      var events = [];
      // If we had a back end with an events endpoint set up that responds to GET requests
      this.$http.get('/api/events')
        .success(function(events) {
          this.$set('events', events);
          console.log(events);
        })
        .error(function(err) {
          console.log(err);
        });
    },

    // If we had an endpoint set up that responds to POST requests
    addEvent: function() {
      if(this.event.title.trim()) {
        this.$http.post('/api/events', this.event)
          .success(function(res) {
            this.events.push(this.event);
            console.log('Event added!');
          })
          .error(function(err) {
            console.log(err);
          });
      }
    },

    // We could also delete an event if we had the events endpoint set up to delete data
    deleteEvent: function(index) {
      if( confirm("Are you sure you want to delete this event?") ) {
        this.$http.delete('/api/events/' + event.id)
          .success(function(res) {
            console.log(res);
            this.events.splice(index, 1);
          })
          .error(function(err) {
            console.log(err);
          });
      }
    }
  }
});
