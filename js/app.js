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
  removeHost: function(host) {},
  showHosts: function() {
    $('#show-hosts').dialog({height: 500, width: 800, modal: true, resizable: false,
      open: function() {
      },
      buttons: [
        {text: 'ok',
        click: function(){$(this).dialog('close').focus();}}]
    });
  },
  showHost: function() {}
});

Webinect.HostView = Em.View.extend({});

Webinect.AddHostView = Em.View.extend({
  hostName: '',
  hostPort: '',
  addHostButton: Em.Button.extend({
    click: function() {
      var parent = this.get('parentView'),
          hostName = parent.get('hostName'),
          hostPort = parent.get('hostPort');
      if (hostName != '' || hostPort != '') {
        Webinect.HostsController.addHost(hostName, hostPort);
        parent.set('hostName', '');
        parent.set('hostPort', '');
      } else {
        alert('hostname and port must be specified!');
      }
    }
  })
});

Webinect.DisplayView = Em.View.extend({});
