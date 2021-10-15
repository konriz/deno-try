function determinePath(request) {
  const {url} = request;
  const urlArray = url.split("/");
  return urlArray.length > 3 ? urlArray.slice(3).join("/") : "";
}

function determineIp(request) {
  return request.headers.get("x-forwarderd-for");
}

function handleGet(path) {
  return new Response(getHtml(path), {
    status: 200,
    headers: {"content-type": "text/html"},
  });
}

function getHtml(path, ip) {
  return `
<div>
    <h1>Welcome to ${path}</h1>
    <p>Your IP is ${ip || "unknown"}</p>
 </div>
`
}

addEventListener("fetch", (event) => {
  const {request} = event;
  const path = determinePath(request);
  const ip = determineIp(request);
  if (request.method === "GET") {
    return event.respondWith(handleGet(path, ip));
  }
  event.respondWith(
    new Response("Get failed", {status: 500, headers: {"content-type": "text/plain"}})
  )
});
