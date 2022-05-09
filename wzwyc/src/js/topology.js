const topology = (callback) => {
  const existingScript = document.getElementById('topology');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/topojson@3';
    script.id = 'topology';
    document.body.appendChild(script);
    script.onload = () => { 
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default topology;