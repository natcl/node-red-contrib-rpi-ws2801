# node-red-contrib-rpi-ws2801

A Node-RED node to control ws2801 based led strips on the Raspberry pi.

You can choose between different functions using `msg.topic` with the arguments sent as `msg.payload`.

| msg.topic | msg.payload        |
|-----------|--------------------|
| fill      | [r, g, b]          |
| setcolor  | [ledID, r, g, b]   |
| setrgb    | [ledID, "#FF00FF"] |
| clear     | None               |
