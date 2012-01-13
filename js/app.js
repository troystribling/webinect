var Webinect = Em.Application.create();

Webinect.Host = Em.Object.extend({
  host: null,
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
  addHost: function() {
    var host = $('#add-hostname input').val();
    var port = $('#add-host-port input').val();
    var host = Webinect.Host.create({host:host, port:port});
    this.pushObject(host)
     alert('Add Host: '+host.host+':'+host.port)
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

Webinect.DisplayView = Em.View.extend({});
