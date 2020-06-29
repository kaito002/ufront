import React, { useState, useEffect } from 'react';
interface UFrontProps {
  name: string,
  host: string,
  renderMethodName: string
}

const isJsFile = (filepath: string) => filepath.endsWith(".js");

const isCssFile = (filepath: string) => filepath.endsWith(".css");

const removeContainerHost = (url: string) => url.replace(window.location.origin, "");

const nodesToArray = (nodes?: HTMLCollection) => Array.prototype.slice.call(nodes || new HTMLCollection());

export const UFront = ({ name, host, renderMethodName }: UFrontProps) => {
  const containerId = `${name}-container`;

  const containerLibsId = `${name}-libs-container`;

  const [loadingError, setLoadingError] = useState(false);

  const mediaFixer = () => {
    const container = document.getElementById(containerLibsId);
    const mediaElements = [
      ...nodesToArray(container?.getElementsByTagName("img")),
      ...nodesToArray(container?.getElementsByTagName("video")),
      ...nodesToArray(container?.getElementsByTagName("audio"))
    ]

    mediaElements.forEach(element => {
      console.log(element)
      if (!element.src.startsWith(host)) {
        element.src = `${host}${removeContainerHost(element.src)}`
      }
    });
  }

  const loadJsFile = (filepath: string, id: string) => {
    const script = document.createElement("script");

    script.id = id;
    script.src = `${host}/${filepath}`
    script.crossOrigin = "";
    script.async = true;
    script.onload = mediaFixer;
    document.getElementById(containerLibsId)?.insertBefore(script, document.getElementById(containerId));
  }

  const loadCssFile = (filepath: string, id: string) => {
    const link = document.createElement("link");

    link.id = id;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${host}/${filepath}`;
    link.crossOrigin = "";
    document.getElementById(containerLibsId)?.insertBefore(link, document.getElementById(containerId));
  }

  const onRequestManifest = (response: any) => response.json();

  const onManifestSuccess = (manifest: any) => {
    const files = manifest.entrypoints;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = `${name}-${file}`;

      if (isJsFile(file)) {
        loadJsFile(file, id);
      }

      if (isCssFile(file)) {
        loadCssFile(file, id);
      }
    }
  }

  const onError = (error: Error) => {
    setLoadingError(true);
    console.error(`Error Getting ${name} frontend: `, error);
  }

  useEffect(() => {
    fetch(`${host}/asset-manifest.json`)
      .then(onRequestManifest)
      .then(onManifestSuccess)
      .catch(onError);
  }, []);

  if (loadingError) {
    return (
      <div style={ufrontStyles.container}>
        <span style={ufrontStyles.text}>An Error produced loading &lt;&lt;{name}&gt;&gt; micro-frontend</span>
      </div>
    )
  }

  return (
    <main id={containerLibsId}>
      <section id={containerId}></section>
    </main>
  )
}



//Styles
const ufrontStyles = {
  container: {
    backgroundColor: "#ff5722",
    border: "solid",
    borderWidth: 2,
    borderColor: "#dd2c00",
    padding: 10
  },

  text: {
    fontSize: 25,
    color: "#FFF"
  }
}