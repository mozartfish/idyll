<script>
	import D3ScatterPlot from './D3ScatterPlot.svelte';
	import TableOfContents from './TableOfContents.svelte';
	
	// Sample data for the scatterplot
	const scatterData = [
		{x: 2.5, y: 3.2, label: "Neural Network A", category: "Deep Learning"},
		{x: 1.8, y: 2.9, label: "Random Forest", category: "Ensemble"},
		{x: 3.1, y: 4.1, label: "SVM", category: "Kernel Methods"},
		{x: 2.2, y: 3.8, label: "Neural Network B", category: "Deep Learning"},
		{x: 1.5, y: 2.1, label: "Decision Tree", category: "Tree-based"},
		{x: 3.8, y: 4.5, label: "Transformer", category: "Deep Learning"},
		{x: 2.8, y: 3.5, label: "Gradient Boosting", category: "Ensemble"},
		{x: 1.2, y: 1.8, label: "Linear Regression", category: "Linear"},
		{x: 3.5, y: 4.2, label: "CNN", category: "Deep Learning"},
		{x: 2.0, y: 2.7, label: "Logistic Regression", category: "Linear"}
	];
</script>

<svelte:head>
	<title>My Distill Blog</title>
	<meta name="description" content="A Distill-style blog built with Svelte" />
	<!-- Move styles to head to avoid Svelte scoping conflicts -->
	<style>
		/* Global styles for Distill content */
		.figure-content {
			padding: 2rem;
			border: 1px solid #ddd;
			border-radius: 4px;
			text-align: center;
			background: #f9f9f9;
		}
		
		.distill-button {
			background: #ff6b35;
			color: white;
			border: none;
			padding: 0.5rem 1rem;
			border-radius: 4px;
			cursor: pointer;
			font-size: 1rem;
		}
		
		.distill-button:hover {
			background: #e55a2b;
		}
		
		/* Add padding to content sections for better spacing */
		d-article h2 {
			margin-top: 3rem;
			margin-bottom: 1.5rem;
		}
		
		d-article h3 {
			margin-top: 2rem;
			margin-bottom: 1rem;
		}
		
		d-article p {
			margin-bottom: 1.5rem;
		}
	</style>
</svelte:head>

<TableOfContents />

<d-front-matter>
	<script type="text/json">
	{
		"title": "Interactive Machine Learning Visualization",
		"description": "An exploration of neural networks with interactive components",
		"authors": [
			{
				"author": "Your Name",
				"authorURL": "https://yourwebsite.com",
				"affiliation": "Your Organization",
				"affiliationURL": "https://yourorg.com"
			}
		],
		"katex": {
			"delimiters": [
				{"left": "$", "right": "$", "display": false}
			]
		}
	}
	</script>
</d-front-matter>

<d-title>
	<h1>Interactive Machine Learning Visualization</h1>
	<p>Understanding neural networks through interactive exploration</p>
</d-title>

<d-byline></d-byline>

<d-article>
	<h2 id="introduction">Introduction</h2>
	
	<p>
		This is an example of how to create a Distill-style article using Svelte. 
		You can include interactive visualizations, mathematical equations, and rich media.
		This article demonstrates the integration of modern web technologies with 
		academic publishing standards.
	</p>
	
	<p>
		The combination of Svelte's reactive framework with Distill's beautiful 
		typography creates an engaging reading experience. Notice how the table 
		of contents on the left tracks your progress through the article.
	</p>

	<h2 id="interactive-visualization">Interactive Visualization</h2>
	
	<p>
		Below is an interactive D3.js scatterplot showing different machine learning models 
		plotted by their performance metrics. Hover over each point to see details.
		This visualization demonstrates how complex data can be made accessible through
		interactive elements.
	</p>

	<d-figure id="ml-scatterplot">
		<D3ScatterPlot data={scatterData} width={700} height={450} />
		<figcaption>
			Interactive scatterplot of machine learning models. Each point represents a different 
			algorithm, colored by category. Hover to see model details and performance metrics.
		</figcaption>
	</d-figure>
	
	<p>
		The visualization above shows how different machine learning algorithms 
		perform across various metrics. Deep learning models tend to cluster 
		in the upper right, while simpler linear models appear in the lower left.
	</p>

	<h2 id="interactive-components">Interactive Components</h2>
	
	<p>
		Here's how you can add interactive elements. The Distill template provides 
		special components for figures, equations, and citations. These components
		are designed to enhance the reader's understanding through direct manipulation.
	</p>

	<d-figure id="example-figure">
		<figure>
			<div class="figure-content">
				<p>This is where you'd put your interactive visualization or chart.</p>
				<button class="distill-button" on:click={() => alert('Interactive element clicked!')}>
					Click me!
				</button>
			</div>
			<figcaption>
				An example of an interactive figure. You can replace this with any Svelte component.
			</figcaption>
		</figure>
	</d-figure>

	<h2 id="mathematical-notation">Mathematical Notation</h2>
	
	<p>
		You can include LaTeX math notation: ${'f(x) = \\sum_{i=1}^{n} w_i x_i + b'}$
		This inline math rendering makes it easy to discuss mathematical concepts
		within the flow of text.
	</p>

	<h3 id="equations">Display Equations</h3>
	
	<p>
		Or display equations for more complex mathematical expressions:
	</p>

	<d-math block>
		{'\\frac{\\partial L}{\\partial w_i} = \\frac{1}{m} \\sum_{j=1}^{m} (h_\\theta(x^{(j)}) - y^{(j)}) x_i^{(j)}'}
	</d-math>
	
	<p>
		This gradient descent equation shows how we update weights in neural networks.
		The beauty of mathematical typesetting enhances comprehension of complex formulas.
	</p>

	<h2 id="code-blocks">Code Blocks</h2>
	
	<p>
		Code blocks with syntax highlighting help readers understand implementation details.
		The following example shows a simple neural network implementation in Python.
	</p>

	<d-code block language="python">
import numpy as np
import matplotlib.pyplot as plt

def neural_network(x, weights, bias):
    return np.tanh(np.dot(x, weights) + bias)

# Example usage
x = np.random.randn(100, 10)
weights = np.random.randn(10, 5)
bias = np.random.randn(5)
output = neural_network(x, weights, bias)
	</d-code>

	<h3 id="syntax-highlighting">Syntax Highlighting</h3>
	
	<p>
		The syntax highlighting makes code more readable and helps identify 
		different language constructs. This is particularly useful when 
		explaining algorithms or providing implementation examples.
	</p>

	<h2 id="side-notes">Side Notes</h2>
	
	<p>
		You can add side notes and margin content 
		<d-footnote>This is a footnote that appears in the margin. It provides 
		additional context without interrupting the main narrative flow.</d-footnote>
		to provide additional context without interrupting the main flow.
		These margin notes are perfect for tangential information.
	</p>

	<h3 id="footnotes">Footnotes & Margin Content</h3>
	
	<p>
		Footnotes and margin content allow for a layered reading experience.
		Readers can choose to engage with supplementary information or focus
		on the main narrative thread.
	</p>

	<h2 id="conclusion">Conclusion</h2>
	
	<p>
		This template gives you a solid foundation for creating Distill-style articles 
		with Svelte. You can now add your own interactive components and visualizations.
		The combination provides both beautiful typography and modern interactivity.
	</p>
	
	<p>
		Notice how the table of contents has tracked your reading progress throughout
		this article. The progress bar shows how far you've come, and the active
		section highlighting helps you stay oriented within the document structure.
	</p>
	
	<p>
		With these tools, you can create engaging, interactive academic content
		that brings ideas to life through visualization and direct manipulation.
		The future of academic publishing is interactive, and this template
		provides a foundation for that future.
	</p>
</d-article>

<d-appendix>
	<h3>Acknowledgments</h3>
	<p>Thanks to the Distill team for creating the beautiful template.</p>

	<d-footnote-list></d-footnote-list>
	<d-citation-list></d-citation-list>
</d-appendix>