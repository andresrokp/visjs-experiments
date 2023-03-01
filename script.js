
function gup( name ) {
    name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
  }

  // get selected item count from url parameter
  var count = (Number(gup('count')) || 100);


  // create groups
  let aviones = [
    {id: 1, content: 'AV2304'},
    {id: 2, content: 'XQS-334'},
    {id: 3, content: 'NT345TF'},
    {id: 4, content: 'OTRO-VUELO'},
    {id: 5, content: 'MARIMONDÁ'},
    {id: 6, content: 'CAREVER'},
    {id: 7, content: '67B5F4'},
    {id: 8, content: 'R87344'},
    {id: 9, content: 'QWERTY'}
  ]
  var groups = new vis.DataSet(aviones);

  // create items
  var items = new vis.DataSet();

  var order = 1;
  var truck = 1;
  for (var j = 0; j < aviones.length; j++) {
    var date = new Date();
    for (var i = 0; i < count/aviones.length; i++) {
      date.setHours(date.getHours() + (i == 0 ? 0 : 24) +  2 * (Math.random() < 0.3)) + 2*i;
      var start = new Date(date);

      date.setHours(date.getHours() + 3 + Math.floor(Math.random()*3));
      var end = new Date(date);

      let diffMillis = end-start
      let diffHours = diffMillis/1000/60/60

      items.add({
        id: order,
        group: truck,
        start: start,
        end: end,
        content: String(diffHours) + " horas, pilas cachón!"
      });

      order++;
    }
    truck++;
  }

  // specify options
  var options = {
    stack: false,
    start: new Date(),
    end: new Date(1000*60*60*48 + (new Date()).valueOf()),
    editable: true,
    margin: {
      item: 10, // minimal margin between items
      axis: 5   // minimal margin between items and the axis
    },
    orientation: 'top'
  };

  // create a Timeline
  var container = document.getElementById('visualization');
  timeline = new vis.Timeline(container, null, options);
  timeline.setGroups(groups);
  timeline.setItems(items);

  document.getElementById('count').innerHTML = count;