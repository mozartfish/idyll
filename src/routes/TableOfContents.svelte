<script>
	import { onMount, onDestroy } from 'svelte';
	
	let activeSection = '';
	let scrollProgress = 0;
	let tocElement;
	let sections = [];
	
	// Define the table of contents structure
	const tocItems = [
		{ id: 'introduction', title: 'Introduction', level: 1 },
		{ id: 'interactive-visualization', title: 'Interactive Visualization', level: 1 },
		{ id: 'interactive-components', title: 'Interactive Components', level: 1 },
		{ id: 'mathematical-notation', title: 'Mathematical Notation', level: 1 },
		{ id: 'equations', title: 'Display Equations', level: 2 },
		{ id: 'code-blocks', title: 'Code Blocks', level: 1 },
		{ id: 'syntax-highlighting', title: 'Syntax Highlighting', level: 2 },
		{ id: 'side-notes', title: 'Side Notes', level: 1 },
		{ id: 'footnotes', title: 'Footnotes & Margin Content', level: 2 },
		{ id: 'conclusion', title: 'Conclusion', level: 1 }
	];
	
	let scrollHandler;
	let resizeHandler;
	
	onMount(() => {
		// Find all section elements and assign IDs if they don't have them
		assignSectionIds();
		
		// Set up scroll listener
		scrollHandler = () => {
			updateActiveSection();
			updateScrollProgress();
		};
		
		resizeHandler = () => {
			updateScrollProgress();
		};
		
		window.addEventListener('scroll', scrollHandler, { passive: true });
		window.addEventListener('resize', resizeHandler, { passive: true });
		
		// Initial update
		updateActiveSection();
		updateScrollProgress();
	});
	
	onDestroy(() => {
		if (scrollHandler) {
			window.removeEventListener('scroll', scrollHandler);
		}
		if (resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
	
	function assignSectionIds() {
		const article = document.querySelector('d-article');
		if (!article) return;
		
		// Find all headings and assign IDs based on their text content
		const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
		sections = [];
		
		headings.forEach((heading, index) => {
			let id = heading.id;
			if (!id) {
				// Generate ID from text content
				id = heading.textContent
					.toLowerCase()
					.replace(/[^\w\s-]/g, '')
					.replace(/\s+/g, '-')
					.trim();
				heading.id = id;
			}
			
			const rect = heading.getBoundingClientRect();
			sections.push({
				id: id,
				element: heading,
				offsetTop: window.pageYOffset + rect.top,
				title: heading.textContent,
				level: parseInt(heading.tagName.charAt(1))
			});
		});
		
		// Sort sections by their position on the page
		sections.sort((a, b) => a.offsetTop - b.offsetTop);
	}
	
	function updateActiveSection() {
		if (sections.length === 0) return;
		
		const scrollTop = window.pageYOffset + 100; // Offset for better UX
		
		// Find the current section
		let currentSection = sections[0];
		for (let i = sections.length - 1; i >= 0; i--) {
			if (scrollTop >= sections[i].offsetTop) {
				currentSection = sections[i];
				break;
			}
		}
		
		activeSection = currentSection.id;
	}
	
	function updateScrollProgress() {
		const article = document.querySelector('d-article');
		if (!article) return;
		
		const articleRect = article.getBoundingClientRect();
		const articleTop = window.pageYOffset + articleRect.top;
		const articleHeight = article.offsetHeight;
		const windowHeight = window.innerHeight;
		const scrollTop = window.pageYOffset;
		
		// Calculate progress through the article
		const articleStart = articleTop;
		const articleEnd = articleTop + articleHeight - windowHeight;
		
		if (scrollTop <= articleStart) {
			scrollProgress = 0;
		} else if (scrollTop >= articleEnd) {
			scrollProgress = 100;
		} else {
			scrollProgress = ((scrollTop - articleStart) / (articleEnd - articleStart)) * 100;
		}
	}
	
	function scrollToSection(sectionId) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
</script>

<svelte:head>
	<style>
		.toc-container {
			position: fixed;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 280px;
			max-height: 70vh;
			overflow-y: auto;
			background: rgba(255, 255, 255, 0.95);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-left: none;
			border-radius: 0 8px 8px 0;
			padding: 20px 20px 20px 0;
			z-index: 100;
			box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
		}
		
		.toc-progress-container {
			position: relative;
			padding-left: 20px;
		}
		
		.toc-progress-bar {
			position: absolute;
			left: 8px;
			top: 0;
			bottom: 0;
			width: 2px;
			background: rgba(0, 0, 0, 0.1);
		}
		
		.toc-progress-fill {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			background: linear-gradient(180deg, #ff6b35, #e55a2b);
			transition: height 0.3s ease;
			border-radius: 1px;
		}
		
		.toc-progress-indicator {
			position: absolute;
			left: -4px;
			width: 10px;
			height: 10px;
			background: #ff6b35;
			border: 2px solid white;
			border-radius: 50%;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			transition: top 0.3s ease;
			z-index: 2;
		}
		
		.toc-list {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		
		.toc-item {
			margin-bottom: 8px;
		}
		
		.toc-link {
			display: block;
			padding: 6px 12px;
			text-decoration: none;
			color: #666;
			font-size: 14px;
			line-height: 1.4;
			border-radius: 4px;
			transition: all 0.2s ease;
			cursor: pointer;
		}
		
		.toc-link:hover {
			background: rgba(255, 107, 53, 0.1);
			color: #333;
		}
		
		.toc-link.active {
			background: rgba(255, 107, 53, 0.15);
			color: #ff6b35;
			font-weight: 600;
		}
		
		.toc-link.level-1 {
			font-weight: 500;
			margin-left: 0;
		}
		
		.toc-link.level-2 {
			font-size: 13px;
			margin-left: 16px;
			color: #888;
		}
		
		.toc-link.level-2.active {
			color: #ff6b35;
		}
		
		.toc-title {
			font-size: 16px;
			font-weight: 600;
			color: #333;
			margin-bottom: 16px;
			padding: 0 12px;
		}
		
		/* Hide TOC on small screens */
		@media (max-width: 1200px) {
			.toc-container {
				display: none;
			}
		}
		
		/* Adjust main content margin when TOC is visible */
		@media (min-width: 1201px) {
			body {
				margin-left: 300px;
			}
		}
	</style>
</svelte:head>

<div class="toc-container" bind:this={tocElement}>
	<div class="toc-progress-container">
		<div class="toc-progress-bar">
			<div 
				class="toc-progress-fill" 
				style="height: {scrollProgress}%"
			></div>
			<div 
				class="toc-progress-indicator"
				style="top: {scrollProgress}%"
			></div>
		</div>
		
		<div class="toc-title">Contents</div>
		
		<ul class="toc-list">
			{#each tocItems as item}
				<li class="toc-item">
					<a 
						class="toc-link level-{item.level} {activeSection === item.id ? 'active' : ''}"
						on:click|preventDefault={() => scrollToSection(item.id)}
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>