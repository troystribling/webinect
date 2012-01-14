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
  addHost: function() {
    var name= $('#add-hostname input').val();
    var port = $('#add-host-port input').val();
    var host = Webinect.Host.create({name:name, port:port});
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
Webinect.DisplayView = Em.View.extend({});
