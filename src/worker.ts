const ctx: Worker = self as any;

// Post data to parent thread
setInterval(() => {
  ctx.postMessage({ time: Date.now() });
}, 1000);
