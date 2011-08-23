function init(h,w) {

    document.getElementById('title').innerText = title;

    var radar = new pv.Panel()
    .width(w)
    .height(h)
    .canvas('radar')
    .add(pv.Dot)
    .def('active', false)
    .data(radar_data)
    .left(function(d) { return polar_to_raster(d.pc.r, d.pc.t)[0]; })
    .bottom(function(d) { return polar_to_raster(d.pc.r, d.pc.t)[1]; })
    .title(function(d) { return d.name; })
    .angle(45)
    .fillStyle(function(d) { return d.color; })
    .shape(function(d) { return (d.movement === 't' ? 'triangle' : 'circle'); })
    .anchor('top').add(pv.Label)
    .text(function(d) { return this.index + 1 + '.'; })
    .textBaseline('left');

    function addLabel(text, position) {
        radar.anchor('left')
        .add(pv.Label)
        .left(position.left)
        .top(position.top)
        .text(text)
        .font('18px sans-serif');
    }

    function addLegendItems(quadrant, position) {
        var items = radar_data.slice(quadrant.start, quadrant.end);

        radar.add(pv.Dot)
        .data(items)
        .left(position.left)
        .top(function() { return (position.top + (this.index * 18));})
        .size(8)
        .strokeStyle(null)
        .fillStyle(function(d) { return d.color; })
        .anchor('right')
        .add(pv.Label)
        .text(function(d) { return (quadrant.start + 1 + this.index) + '. ' + d.name; });
    }

    function drawLegend(quad, left, top) {
        addLabel(quad.name, { left: left, top: top - 18 });
        addLegendItems(quad, { left: left, top: top });
    }

    for (var i = 0; i < radar_quadrants.length; i++) {
        var qleft = 5 + (1020 * (i % 2));
        var qtop = 36 + (500 * (i > 1 ? 1 : 0));
        var quad = radar_quadrants[i];
        drawLegend(quad, qleft, qtop);
    } 

    //arcs
    radar.add(pv.Dot)
    .data(radar_arcs)
    .left(w/2)
    .bottom(h/2)
    .radius(function(d) { return d.r; })
    .strokeStyle('#ccc')
    .anchor('top')
    .add(pv.Label).text(function(d) { return d.name; });

    //quadrant lines
    radar.add(pv.Line)
    .data([(h/2-radar_arcs[3].r), h-(h/2-radar_arcs[3].r)])
    .lineWidth(1)
    .left(w/2)
    .bottom(function(d) { return d; })
    .strokeStyle('#bbb');

    radar.add(pv.Line)
    .data([200,w-200])
    .lineWidth(1)
    .bottom(h/2)
    .left(function(d) { return d; })
    .strokeStyle('#bbb');

    radar.anchor('radar');
    radar.render();
};
