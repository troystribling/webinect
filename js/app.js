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
  addHost: function(host, port) {},
  removeHost: function(host) {},
  showHosts: function() {
		$('#show-hosts').dialog({buttons: [
      {
        text: 'close',
        click: function(){$(this).dialog('close');}
      }
    ]});
  },
  showHost: function() {}
});

Webinect.DisplayView = Em.View.extend({});
