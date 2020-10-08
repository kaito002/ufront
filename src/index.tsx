import React, { useEffect, useState } from 'react'

interface UFrontProps {
  name: string
  host: string
}

const removeContainerHost = (url: string) =>
  url.replace(window.location.origin, '')

const nodesToArray = (nodes?: HTMLCollection) =>
  Array.prototype.slice.call(nodes || new HTMLCollection())

const UFront = ({ name, host }: UFrontProps) => {
  const containerId = `${name}-container`

  const [loadingError, setLoadingError] = useState(false)

  const loadComponent = () => {
    renderMicroSection()

    const container = document.getElementById(containerId)

    const mediaElements = [
      ...nodesToArray(container?.getElementsByTagName('img')),
      ...nodesToArray(container?.getElementsByTagName('video')),
      ...nodesToArray(container?.getElementsByTagName('audio'))
    ]

    mediaElements.forEach((element) => {
      if (!element.src.startsWith(host)) {
        element.src = `${host}${removeContainerHost(element.src)}`
      }
    })
  }

  const loadBundle = () => {
    const script = document.createElement('script')

    script.id = `${name}-bundle`
    script.src = `${host}`
    script.crossOrigin = ''
    script.async = true
    script.onerror = onError
    script.onload = loadComponent
    document.getElementById(containerId)?.appendChild(script)
  }

  const onError = () => {
    setLoadingError(true)
    console.error(`Error Getting ${name} frontend: `)
  }

  const renderMicroSection = () => {
    window[`render${name}`](containerId)
  }

  const unmountMicroSection = () => {
    if (window.hasOwnProperty(`unmount${name}`)) {
      window[`unmount${name}`](containerId)
    }
  }

  useEffect(() => {
    if (window.hasOwnProperty(`render${name}`)) {
      loadComponent()
    } else {
      loadBundle()
    }
  }, [])

  useEffect(() => {
    return () => {
      unmountMicroSection()
    }
  })

  if (loadingError) {
    return (
      <div style={uFrontStyles.container}>
        <span style={uFrontStyles.text}>
          An Error produced loading &lt;&lt;{name}&gt;&gt; micro-frontend
        </span>
      </div>
    )
  }

  return <section id={containerId} />
}

export default { UFront }

// Styles
const uFrontStyles = {
  container: {
    backgroundColor: '#ff5722',
    border: 'solid',
    borderWidth: 2,
    borderColor: '#dd2c00',
    padding: 10
  },

  text: {
    fontSize: 25,
    color: '#FFF'
  }
}
