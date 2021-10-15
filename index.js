function determinePath(request) {
  const {url} = request;
  const urlArray = url.split("/");
  return urlArray.length > 3 ? urlArray.slice(3).join("/") : "" ;
}

function handleGet(path) {
  return new Response("Hello world, you are on " + path, {
    status: 200,
    headers: {"content-type": "text/plain"},
  });
}

addEventListener("fetch", (event) => {
  const {request} = event;
  const path = determinePath(request);
  if (request.method === "GET") {
    return event.respondWith(handleGet(path));
  }
  event.respondWith(
    new Response("Get failed", {status: 500, headers: {"content-type": "text/plain"}})
  )
});
