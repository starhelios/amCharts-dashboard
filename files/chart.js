am4core.ready(function() 
{
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

    $.getJSON("SampleJson.json", function(result){
		drawingChart(result);
    });
}); 
	
function drawingChart(dataPoints) {
	
	//produce-chart start
	var type_chart = am4core.create("type-chart", am4charts.RadarChart);
	type_chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

	type_chart.data = [
	  {category: "Sunday",value1: 8,value2: 2,value3: 4,value4: 3 },
	  {category: "Monday",value1: 11,value2: 4,value3: 2,value4: 4 },
	  {category: "Tuesday",value1: 7,	value2: 6,value3: 6,value4: 2 },
	  {category: "Wednesday",value1: 13,value2: 8,value3: 3,value4: 2 },
	  {category: "Thursday",value1: 12,value2: 10,	value3: 5,value4: 1},
	  {category: "Friday",value1: 15,	value2: 12,	value3: 4,	value4: 4 },
	  {category: "Saturday",value1: 9,value2: 14,value3: 6,value4: 2 }
	];

	type_chart.padding(20, 20, 20, 20);

	var categoryAxis = type_chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.labels.template.location = 0.5;
	categoryAxis.renderer.tooltipLocation = 0.5;

	var valueAxis = type_chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.tooltip.disabled = true;
	valueAxis.renderer.labels.template.horizontalCenter = "left";
	valueAxis.min = 0;

	var series1 = type_chart.series.push(new am4charts.RadarColumnSeries());
	series1.columns.template.tooltipText = "{name}: {valueY.value}";
	series1.columns.template.width = am4core.percent(80);
	series1.name = "A";
	series1.dataFields.categoryX = "category";
	series1.dataFields.valueY = "value2";
	series1.stacked = true;
	series1.columns.template.fill = am4core.color("#fac732");
	series1.borderAlpha = 0;

	var series2 = type_chart.series.push(new am4charts.RadarColumnSeries());
	series2.columns.template.width = am4core.percent(80);
	series2.columns.template.tooltipText = "{name}: {valueY.value}";
	series2.name = "B";
	series2.dataFields.categoryX = "category";
	series2.dataFields.valueY = "value2";
	series2.stacked = true;
	series2.columns.template.fill = am4core.color("#f4a287");

	var series3 = type_chart.series.push(new am4charts.RadarColumnSeries());
	series3.columns.template.width = am4core.percent(80);
	series3.columns.template.tooltipText = "{name}: {valueY.value}";
	series3.name = "C";
	series3.dataFields.categoryX = "category";
	series3.dataFields.valueY = "value3";
	series3.stacked = true;
	series3.columns.template.fill = am4core.color("#525c6b");
	series3.propertyFields.stroke = "none";
	
	type_chart.seriesContainer.zIndex = -1;
	
	type_chart.cursor = new am4charts.RadarCursor();
	type_chart.cursor.xAxis = categoryAxis;
	type_chart.cursor.fullWidthXLine = true;
	type_chart.cursor.lineX.strokeOpacity = 0;
	type_chart.cursor.lineX.fillOpacity = 0.1;
	type_chart.cursor.lineX.fill = am4core.color("#000000");
	
	type_chart.legend = new am4charts.Legend();
	type_chart.legend.position = "top";
	//produce-chart end
	
	//produce-histrogram start	
	var histogram = am4core.create("procedures-histogram", am4charts.XYChart);

	var data = [];
	var price = 100;
	var quantity = 1000;
	for (var i = 0; i < 300; i++) {
		price += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
		quantity += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
		data.push({ time: new Date(2000, 1, i), price: price, quantity: quantity });
	}

	histogram.data = data;
	// the following line makes value axes to be arranged vertically.
	histogram.leftAxesContainer.layout = "vertical";

	// uncomment this line if you want to change order of axes
	//histogram.bottomAxesContainer.reverseOrder = true;

	var dateAxis = histogram.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.grid.template.location = 0;
	dateAxis.renderer.ticks.template.length = 8;
	dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
	dateAxis.renderer.grid.template.disabled = true;
	dateAxis.renderer.ticks.template.disabled = false;
	dateAxis.renderer.ticks.template.strokeOpacity = 0.2;

	// these two lines makes the axis to be initially zoomed-in
	dateAxis.start = 0.7;
	dateAxis.keepSelection = true;

	var valueAxis = histogram.yAxes.push(new am4charts.ValueAxis());
	valueAxis.tooltip.disabled = true;
	valueAxis.zIndex = 1;
	valueAxis.renderer.baseGrid.disabled = true;
	// height of axis
	valueAxis.height = am4core.percent(65);

	valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
	valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
	valueAxis.renderer.inside = true;
	valueAxis.renderer.labels.template.verticalCenter = "bottom";
	valueAxis.renderer.labels.template.padding(2,2,2,2);
	//valueAxis.renderer.maxLabelPosition = 0.95;
	valueAxis.renderer.fontSize = "0.8em"
	
////////////////////////////////////////////////////
	var series1 = histogram.series.push(new am4charts.LineSeries());
	series1.dataFields.dateX = "time";
	series1.dataFields.valueY = "price";
	series1.tooltipText = "{valueY.value}";
	series1.name = "Series 1";
//////////////////////////////////////////////////////////////////////////
/*	
	var categoryAxis = histogram.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "1";

	var valueAxis1 = histogram.yAxes.push(new am4charts.ValueAxis());

	var columnSeries = histogram.series.push(new am4charts.ColumnSeries());
	columnSeries.dataFields.categoryX = "1";
	columnSeries.dataFields.valueY = "price";
	columnSeries.dataFields.openValueY = "quantity";
	columnSeries.fillOpacity = 0.8;
	columnSeries.sequencedInterpolation = true;
	columnSeries.interpolationDuration = 1500;

	var columnTemplate = columnSeries.columns.template;
	columnTemplate.strokeOpacity = 0;
//	columnTemplate.propertyFields.fill = "color";
*/
//////////////////////////////////////////////////////////////////////////////
	var valueAxis2 = histogram.yAxes.push(new am4charts.ValueAxis());
	valueAxis2.tooltip.disabled = false;
	// height of axis
	valueAxis2.height = am4core.percent(35);
	valueAxis2.zIndex = 3
	// this makes gap between panels
	valueAxis2.marginTop = 30;
	valueAxis2.renderer.baseGrid.disabled = true;
	valueAxis2.renderer.inside = true;
	valueAxis2.renderer.labels.template.verticalCenter = "bottom";
	valueAxis2.renderer.labels.template.padding(2,2,2,2);
	//valueAxis.renderer.maxLabelPosition = 0.95;
	valueAxis2.renderer.fontSize = "0.8em"

	valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
	valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

	var series2 = histogram.series.push(new am4charts.ColumnSeries());
	series2.dataFields.dateX = "time";
	series2.dataFields.valueY = "quantity";
	series2.yAxis = valueAxis2;
	series2.tooltipText = "{valueY.value}";
	series2.name = "Series 2";

	histogram.cursor = new am4charts.XYCursor();
	histogram.cursor.xAxis = dateAxis;

	// a separate series for scrollbar
	var scrollbarSeries = histogram.series.push(new am4charts.LineSeries());
	scrollbarSeries.dataFields.dateX = "time";
	scrollbarSeries.dataFields.valueY = "quantity";
	// need to set on default state, as initially series is "show"
	scrollbarSeries.defaultState.properties.visible = false;

	// hide from legend too (in case there is one)
	scrollbarSeries.hiddenInLegend = true;
	scrollbarSeries.fillOpacity = 0.5;
	scrollbarSeries.strokeOpacity = 0.5;

	var scrollbarX = new am4charts.XYChartScrollbar();
	scrollbarX.series.push(scrollbarSeries);
	scrollbarX.marginTop = 20;
	histogram.scrollbarX = scrollbarX;
	histogram.scrollbarX.parent = histogram.bottomAxesContainer;
	//produce-histrogram end
}
