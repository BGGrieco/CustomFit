var app = {
    // Application Constructor
    initialize: function(){
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function(){
        this.receivedEvent('deviceready');
        StatusBar.backgroundColorByHexString("#CF4D4D");
      }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id){
    }
};

app.initialize();
