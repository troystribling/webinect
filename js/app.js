var Webinect = Em.Application.create();

// models
Webinect.Socket = Em.Object.extend({
  port: null,
  hostname: null,
  socket: null,
  status: 'inactive',
  host: null,
  uri: function() {
    return 'wd://'+this.get('hostname')+':'+this.get('port');
  }.property('hostname', 'port'),
  connect: function() {
    var addr = this.get('uri'),
        newSocket = new WebSocket(addr);
    this.set('socket', new_socket);
  },
  onError: function(cb) {
    this.get('socket').onerror = cb;
  },
  onMessage: function(cb) {
    this.get('socket').onmessage = cb;
  },
  onOpen: function(cb) {
    this.get('socket').onopen = cb;
  },
  onClose: function(cb) {
    this.get('socket').onclose = cb;
  }
 });

Webinect.Host = Em.Object.extend({
  port: null,
  name: null,
  status: null,
  displayed: false,
  commandSocket: null,
  depthSocket: null,
  videoSocket: null,
  fullName: function() {
    return this.get('name')+':'+this.get('port')
  }.property('name', 'port'),
  onError: function() {
  },
  onMessage: function() {
  },
  onOpen: function() {
  },
  onClose: function() {
  },
  open: function() {
  },
  close: function() {
  }
});

// controllers
Webinect.HostsController = Em.ArrayProxy.create({
  content: [],
  displayedHost: function() {},
  addHost: function(hostName, hostPort) {
    var host = Webinect.Host.create({name:hostName, port:hostPort});
    this.pushObject(host)
  },
  hostFullName: function(hostName, hostPort) {
    return  hostName+':'+hostPort;
  },
  hasHost: function(hostName, hostPort) {
    var fullName = this.hostFullName(hostName, hostPort);
    return this.findProperty('fullName', fullName);
  },
  deleteHost: function(hostName, hostPort) {
    var fullName = this.hostFullName(hostName, hostPort),
        hostToDelete = this.findProperty('fullName', fullName);
    if (hostToDelete) {
      this.removeObject(hostToDelete)
    }
  },
  showHosts: function() {
    $('#show-hosts').dialog({height: 500, width: 800, modal: true, resizable: false,
      open: function() {
      },
      buttons: [
        {text: 'ok',
        click: function(){$(this).dialog('close').focus();}}]
    });
  }
});

// views
Webinect.HostView = Em.View.extend({
  deleteHostButton: Em.Button.extend({
    hostName: '',
    hostPort: '',
    click: function() {
      var hostName = this.get('hostName'),
          hostPort = this.get('hostPort');
      if(confirm("delete host?")) {
        Webinect.HostsController.deleteHost(hostName, hostPort);
      }
    }
  })
});

Webinect.AddHostView = Em.View.extend({
  hostName: '',
  hostPort: '',
  addHostButton: Em.Button.extend({
    click: function() {
      var parent = this.get('parentView'),
          hostName = parent.get('hostName'),
          hostPort = parent.get('hostPort');
      if (hostName == '' || hostPort == '') {
        alert('hostname and port must be specified!');
      } else if (Webinect.HostsController.hasHost(hostName, hostPort)) {
        alert('host with given hostname and port exists!');
      } else {
        Webinect.HostsController.addHost(hostName, hostPort);
        parent.set('hostName', '');
        parent.set('hostPort', '');
      }
    }
  })
});

Webinect.DisplayView = Em.View.extend({});
