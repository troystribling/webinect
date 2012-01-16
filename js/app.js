var Webinect = Em.Application.create();

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
  open: function() {},
  close: function() {}
});

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
