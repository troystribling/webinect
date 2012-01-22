var Webinect = Em.Application.create();

// models
Webinect.Socket = Em.Object.extend({
  port: null,
  hostname: null,
  socket: null,
  status: 'inactive',
  uri: function() {
    return 'ws://'+this.get('hostname')+':'+this.get('port');
  }.property('hostname', 'port'),
  connect: function() {
    var addr = this.get('uri'),
        sock = new WebSocket(addr);
    this.set('socket', sock);
  },
  close: function() {
    this.get('socket').close();
  },
  onOpen: function(cb) {
    this.get('socket').onopen = cb;
  },
  onClose: function(cb) {
    this.get('socket').onclose = cb;
  },
  onMessage: function(cb) {
    this.get('socket').onmessage = cb;
  },
  onError: function(cb) {
    this.get('socket').onerror = cb;
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
  connect: function() {
    var csock = Webinect.Socket.create({
      hostname:this.get('name'), 
      port:this.get('port')});
    csock.connect();
    csock.onOpen(function(){
    });
    csock.onClose(function(){
    });
    csock.onClose(function(){
    });
    csock.onMessage(function(){
    });
    csock.onError(function(){
    });
    this.set('commandSocket', csock);
    var dsock = Webinect.Socket.create({
      hostname:this.get('name'), 
      port:this.get('port')});
    dsock.connect();
    dsock.onOpen(function(){
    });
    dsock.onClose(function(){
    });
    dsock.onClose(function(){
    });
    dsock.onMessage(function(){
    });
    dsock.onError(function(){
    });
    this.set('depthSocket', dsock);
    var vsock = Webinect.Socket.create({
      hostname:this.get('name'), 
      port:this.get('port')});
    vsock.connect();
    vsock.onOpen(function(){
    });
    vsock.onClose(function(){
    });
    vsock.onClose(function(){
    });
    vsock.onMessage(function(){
    });
    vsock.onError(function(){
    });
    this.set('videoSocket', vsock);
  },
  close: function() {
    this.get('commandSocket').close();
    this.get('depthSocket').close();
    this.get('videoSocket').close();
  }
});

// controllers
Webinect.HostsController = Em.ArrayProxy.create({
  content: [],
  displayedHost: function() {},
  addHost: function(hostName, hostPort) {
    var host = Webinect.Host.create({name:hostName, port:hostPort});
    host.connect();
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
        host     = this.findProperty('fullName', fullName);
    if (host) {
      host.close();
      this.removeObject(host);
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

// jquery ui
$(function() {
  $('#tilt-control').slider();
});
