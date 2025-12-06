export default ({ app }) => {
    if (process.client) {
        // Add CSS to prevent SVG popout on double-click
        const style = document.createElement('style')
        style.textContent = `
            .mermaid-diagram svg {
                max-width: 100%;
                height: auto;
            }
            .mermaid-diagram #mermaid-popout,
            .mermaid-diagram .mermaid-popup {
                display: none !important;
            }
        `
        document.head.appendChild(style)

        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
        script.async = true
        script.onload = () => {
            initMermaid()
            setTimeout(renderMermaidDiagrams, 500)
        }
        document.head.appendChild(script)

        // Re-render on route changes
        app.router.afterEach(() => {
            setTimeout(() => {
                if (window.mermaid) {
                    renderMermaidDiagrams()
                }
            }, 500)
        })

        // Watch for theme changes and re-render diagrams
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && window.mermaid) {
                    initMermaid()
                    reRenderDiagrams()
                }
            })
        })
        observer.observe(document.documentElement, { attributes: true })
    }
}

function getTheme() {
    if (document.documentElement.classList.contains('dark-mode')) return 'dark'
    if (document.documentElement.classList.contains('sepia-mode')) return 'forest'
    return 'default'
}

function initMermaid() {
    window.mermaid.initialize({
        startOnLoad: false,
        theme: getTheme(),
        securityLevel: 'loose',
    })
}

async function renderMermaidDiagrams() {
    const mermaidBlocks = document.querySelectorAll('pre.language-mermaid')

    for (let i = 0; i < mermaidBlocks.length; i++) {
        const pre = mermaidBlocks[i]
        if (pre.classList.contains('mermaid-processed')) continue
        pre.classList.add('mermaid-processed')

        const codeEl = pre.querySelector('code')
        if (!codeEl) continue

        const code = codeEl.textContent
        await renderDiagram(pre, code, i)
    }
}

async function reRenderDiagrams() {
    const diagrams = document.querySelectorAll('.mermaid-diagram')

    for (let i = 0; i < diagrams.length; i++) {
        const container = diagrams[i]
        const code = container.dataset.mermaidCode
        if (!code) continue

        const id = `mermaid-re-${i}-${Date.now()}`
        try {
            const { svg } = await window.mermaid.render(id, code)
            container.innerHTML = svg
        } catch (error) {
            console.error('Mermaid re-render error:', error)
        }
    }
}

async function renderDiagram(pre, code, index) {
    const id = `mermaid-${index}-${Date.now()}`

    try {
        const { svg } = await window.mermaid.render(id, code)

        const container = document.createElement('div')
        container.className = 'mermaid-diagram'
        container.dataset.mermaidCode = code // Store code for re-rendering
        container.style.cssText = 'padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; overflow-x: auto;'
        container.innerHTML = svg

        // Remove click handlers that cause the popout
        const svgEl = container.querySelector('svg')
        if (svgEl) {
            svgEl.style.cursor = 'default'
            // Clone to remove all event listeners
            const newSvg = svgEl.cloneNode(true)
            svgEl.parentNode.replaceChild(newSvg, svgEl)
        }

        pre.parentNode.replaceChild(container, pre)
    } catch (error) {
        console.error('Mermaid rendering error:', error)
    }
}
