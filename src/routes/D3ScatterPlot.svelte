<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	
	export let width = 600;
	export let height = 400;
	export let data = [];
	
	let svgElement;
	let tooltip;
	
	// Default data if none provided
	const defaultData = [
		{x: 10, y: 20, label: "Point A", category: "Type 1"},
		{x: 25, y: 30, label: "Point B", category: "Type 2"},
		{x: 40, y: 15, label: "Point C", category: "Type 1"},
		{x: 55, y: 45, label: "Point D", category: "Type 3"},
		{x: 30, y: 35, label: "Point E", category: "Type 2"},
		{x: 70, y: 25, label: "Point F", category: "Type 1"},
		{x: 45, y: 50, label: "Point G", category: "Type 3"},
		{x: 60, y: 10, label: "Point H", category: "Type 2"},
		{x: 80, y: 40, label: "Point I", category: "Type 1"},
		{x: 20, y: 45, label: "Point J", category: "Type 3"}
	];
	
	const plotData = data.length > 0 ? data : defaultData;
	
	onMount(() => {
		createScatterplot();
	});
	
	function createScatterplot() {
		// Clear any existing content
		d3.select(svgElement).selectAll("*").remove();
		
		// Set up margins and dimensions
		const margin = {top: 20, right: 30, bottom: 40, left: 50};
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;
		
		// Create scales
		const xScale = d3.scaleLinear()
			.domain(d3.extent(plotData, d => d.x))
			.range([0, innerWidth])
			.nice();
			
		const yScale = d3.scaleLinear()
			.domain(d3.extent(plotData, d => d.y))
			.range([innerHeight, 0])
			.nice();
			
		// Color scale for categories
		const colorScale = d3.scaleOrdinal()
			.domain([...new Set(plotData.map(d => d.category))])
			.range(d3.schemeCategory10);
		
		// Create SVG
		const svg = d3.select(svgElement)
			.attr("width", width)
			.attr("height", height);
			
		const g = svg.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);
		
		// Add axes
		g.append("g")
			.attr("transform", `translate(0,${innerHeight})`)
			.call(d3.axisBottom(xScale))
			.append("text")
			.attr("x", innerWidth / 2)
			.attr("y", 35)
			.attr("fill", "black")
			.style("text-anchor", "middle")
			.text("X Value");
			
		g.append("g")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -35)
			.attr("x", -innerHeight / 2)
			.attr("fill", "black")
			.style("text-anchor", "middle")
			.text("Y Value");
		
		// Create tooltip
		const tooltipDiv = d3.select("body").append("div")
			.attr("class", "d3-tooltip")
			.style("opacity", 0);
		
		// Add circles
		g.selectAll(".dot")
			.data(plotData)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", 6)
			.attr("cx", d => xScale(d.x))
			.attr("cy", d => yScale(d.y))
			.style("fill", d => colorScale(d.category))
			.style("stroke", "#fff")
			.style("stroke-width", 2)
			.style("cursor", "pointer")
			.on("mouseover", function(event, d) {
				// Highlight the point
				d3.select(this)
					.transition()
					.duration(200)
					.attr("r", 8)
					.style("stroke-width", 3);
				
				// Show tooltip
				tooltipDiv.transition()
					.duration(200)
					.style("opacity", 0.9);
				
				tooltipDiv.html(`
					<strong>${d.label}</strong><br/>
					Category: ${d.category}<br/>
					X: ${d.x}<br/>
					Y: ${d.y}
				`)
					.style("left", (event.pageX + 10) + "px")
					.style("top", (event.pageY - 28) + "px");
			})
			.on("mouseout", function(d) {
				// Reset the point
				d3.select(this)
					.transition()
					.duration(200)
					.attr("r", 6)
					.style("stroke-width", 2);
				
				// Hide tooltip
				tooltipDiv.transition()
					.duration(500)
					.style("opacity", 0);
			});
		
		// Add legend
		const legend = g.selectAll(".legend")
			.data(colorScale.domain())
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", (d, i) => `translate(${innerWidth - 100},${i * 20})`);
		
		legend.append("rect")
			.attr("x", 0)
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", colorScale);
		
		legend.append("text")
			.attr("x", 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "start")
			.style("font-size", "12px")
			.text(d => d);
	}
</script>

<svelte:head>
	<style>
		.d3-tooltip {
			position: absolute;
			text-align: left;
			padding: 8px;
			font-size: 12px;
			background: rgba(0, 0, 0, 0.8);
			color: white;
			border: 0px;
			border-radius: 4px;
			pointer-events: none;
			box-shadow: 0 2px 4px rgba(0,0,0,0.3);
		}
		
		.scatterplot-container {
			display: flex;
			justify-content: center;
			margin: 20px 0;
		}
		
		.dot {
			transition: all 0.2s ease;
		}
		
		.dot:hover {
			filter: brightness(1.2);
		}
	</style>
</svelte:head>

<div class="scatterplot-container">
	<svg bind:this={svgElement}></svg>
</div>