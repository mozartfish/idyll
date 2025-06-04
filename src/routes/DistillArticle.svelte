<script>
	// Remove onMount - let the layout handle Distill initialization
	export let title = '';
	export let description = '';
	export let authors = [];
	export let katex = true;
</script>

<d-front-matter>
	<script type="text/json">
	{
		"title": "{title}",
		"description": "{description}",
		"authors": {JSON.stringify(authors)},
		"katex": katex ? {
			"delimiters": [
				{"left": "$", "right": "$", "display": false},
				{"left": "$$", "right": "$$", "display": true}
			]
		} : false
	}
	</script>
</d-front-matter>

<d-title>
	<h1>{title}</h1>
	<p>{description}</p>
</d-title>

<d-byline></d-byline>

<d-article>
	<slot />
</d-article>

<d-appendix>
	<slot name="appendix">
		<h3>References</h3>
		<d-footnote-list></d-footnote-list>
		<d-citation-list></d-citation-list>
	</slot>
</d-appendix>