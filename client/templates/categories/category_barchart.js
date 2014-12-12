Template.categoryBarchart.rendered = function () {

  console.log(this._id);

  function dashboard(id, fData){

      var barColor = "#ff5722";
      function segColor(c){ return {low:"#807dba", mid:"#e08214",high:"#41ab5d"}[c]; }

      // compute total for each state.
      fData.forEach(function(d){d.total=d.votes.low+d.votes.mid+d.votes.high;});

      // function to handle histogram.
      function histoGram(fD){
          var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
          hGDim.w = 300 - hGDim.l - hGDim.r,
          hGDim.h = 300 - hGDim.t - hGDim.b;

          //create svg for histogram.
          var hGsvg = d3.select(id).append("svg")
              .attr("width", hGDim.w + hGDim.l + hGDim.r)
              .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
              .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

          // create function for x-axis mapping.
          var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                  .domain(fD.map(function(d) { return d[0]; }));

          // Add x-axis to the histogram svg.
          hGsvg.append("g").attr("class", "x axis")
              .attr("transform", "translate(0," + hGDim.h + ")")
              .call(d3.svg.axis().scale(x).orient("bottom"));

          // Create function for y-axis map.
          var y = d3.scale.linear().range([hGDim.h, 0])
                  .domain([0, d3.max(fD, function(d) { return d[1]; })]);

          // Create bars for histogram to contain rectangles and freq labels.
          var bars = hGsvg.selectAll(".bar").data(fD).enter()
                  .append("g").attr("class", "bar");

          //create the rectangles.
          bars.append("rect")
              .attr("x", function(d) { return x(d[0]); })
              .attr("y", function(d) { return y(d[1]); })
              .attr("width", x.rangeBand())
              .attr("height", function(d) { return hGDim.h - y(d[1]); })
              .attr('fill',barColor);

          //Create the frequency labels above the rectangles.
          bars.append("text").text(function(d){ return d3.format(",")(d[1])})
              .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
              .attr("y", function(d) { return y(d[1])-5; })
              .attr("text-anchor", "middle");


          return hG;
      }

      // calculate total frequency by segment for all state.
      var tF = ['low','mid','high'].map(function(d){
          return {type:d, votes: d3.sum(fData.map(function(t){ return t.votes[d];}))};
      });

      // calculate total frequency by state for all segment.
      var sF = fData.map(function(d){return [d.category,d.total];});

      var hG = histoGram(sF); // create the histogram.

  }

  user = Meteor.user();
  video = Videos.findOne({videoId: this._id});

  var categoryData = Object.keys(video.categoryVotes).map(function(key) { return {category: key, votes: {low: video.categoryVotes[key], mid: 0, high: 0}}; });

  dashboard('#barchart', categoryData);

};