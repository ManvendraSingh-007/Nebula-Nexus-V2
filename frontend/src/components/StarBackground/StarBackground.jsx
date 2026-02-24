import './StarBackground.css'
import { useEffect, useRef } from 'react'

const CONFIG = {
    starCount: 150,
    spawnInterval: 4000,
    fadeDuration: 8000,
    maxDistance: 300,
    constellationSize: 14,
}

const StarBackground = () => {
    const starsRef = useRef(null)
    const canvasRef = useRef(null)
    const stateRef = useRef({ stars: [], activeConstellation: null, lastSpawnTime: 0, animId: null })

    useEffect(() => {
        const container = starsRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const ctx = canvas.getContext('2d')
        const s = stateRef.current

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            generateStars()
        }

        const generateStars = () => {
            container.innerHTML = ''
            s.stars = []
            for (let i = 0; i < CONFIG.starCount; i++) {
                const x = Math.random() * window.innerWidth
                const y = Math.random() * window.innerHeight
                const size = Math.random() * 1.5 + 0.5

                const div = document.createElement('div')
                div.className = 'cosmic-star'
                div.style.cssText = `left:${x}px; top:${y}px; width:${size}px; height:${size}px; opacity:${0.2 + Math.random() * 0.4};`
                const inner = document.createElement('div')
                inner.className = 'twinkle-layer'
                inner.style.animationDelay = `${Math.random() * 4}s`
                div.appendChild(inner)
                container.appendChild(div)

                s.stars.push({ x: x + size / 2, y: y + size / 2 })
            }
        }

        // Prim's MST + nearest-neighbour branches — identical to original
        const getConnections = (group) => {
            const lines = []
            const seen = new Set()
            const addLine = (a, b) => {
                const key = [group.indexOf(a), group.indexOf(b)].sort().join('-')
                if (!seen.has(key)) { lines.push({ from: a, to: b }); seen.add(key) }
            }

            let reached = [group[0]]
            let unreached = group.slice(1)
            while (unreached.length > 0) {
                let best = { dist: Infinity, rIdx: 0, uIdx: 0 }
                reached.forEach((r, ri) =>
                    unreached.forEach((u, ui) => {
                        const d = Math.hypot(r.x - u.x, r.y - u.y)
                        if (d < best.dist) best = { dist: d, rIdx: ri, uIdx: ui }
                    })
                )
                if (best.dist < CONFIG.maxDistance) addLine(reached[best.rIdx], unreached[best.uIdx])
                reached.push(unreached[best.uIdx])
                unreached.splice(best.uIdx, 1)
            }

            group.forEach(starA => {
                const potential = group
                    .map(starB => ({ star: starB, dist: Math.hypot(starA.x - starB.x, starA.y - starB.y) }))
                    .filter(n => n.star !== starA && n.dist < CONFIG.maxDistance)
                    .sort((a, b) => a.dist - b.dist)
                if (potential.length > 0 && Math.random() > 0.5) addLine(starA, potential[0].star)
            })

            return lines
        }

        const spawnConstellation = () => {
            if (s.activeConstellation || s.stars.length === 0) return
            const center = s.stars[Math.floor(Math.random() * s.stars.length)]
            const cluster = s.stars
                .map(star => ({ star, dist: Math.hypot(center.x - star.x, center.y - star.y) }))
                .sort((a, b) => a.dist - b.dist)
                .slice(0, CONFIG.constellationSize)
                .map(item => item.star)
            s.activeConstellation = { stars: cluster, lines: getConnections(cluster), startTime: performance.now() }
        }

        const renderLoop = (now) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (!s.activeConstellation && now - s.lastSpawnTime > CONFIG.spawnInterval) {
                spawnConstellation()
                s.lastSpawnTime = now
            }

            if (s.activeConstellation) {
                const elapsed = now - s.activeConstellation.startTime
                const progress = elapsed / CONFIG.fadeDuration
                if (progress >= 1) {
                    s.activeConstellation = null
                } else {
                    const alpha = Math.sin(progress * Math.PI)
                    ctx.beginPath()
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`
                    ctx.lineWidth = 0.8
                    s.activeConstellation.lines.forEach(({ from, to }) => {
                        ctx.moveTo(from.x, from.y)
                        ctx.lineTo(to.x, to.y)
                    })
                    ctx.stroke()
                }
            }

            s.animId = requestAnimationFrame(renderLoop)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        s.animId = requestAnimationFrame(renderLoop)

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(s.animId)
        }
    }, [])

    return (
        <>
            <div ref={starsRef} id="stars-container" aria-hidden="true" />
            <canvas ref={canvasRef} id="constellation-canvas" aria-hidden="true" />
        </>
    )
}

export default StarBackground