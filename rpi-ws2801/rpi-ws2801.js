'use strict';

module.exports = function(RED) {
    function Ws2801Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.leds = require("rpi-ws2801");
        node.numLeds = parseInt(config.numleds);
        node.bus = config.bus;
        if (node.bus === "") {
            node.bus = "0";
        }
        
        node.device = config.device;
        if (node.device === "") {
            node.device = "0";
        }
        
        node.gamma = parseFloat(config.gamma)

        try {
            node.leds.connect(node.numLeds, node.bus, node.device, node.gamma);
        } catch (e) {
            node.error("ERROR: Cannot open SPI port, is it activated and are you on a Raspberry pi ?");
        }

        node.on('input', function(msg) {
            if (msg.topic === "fill") {
                node.leds.fill(msg.payload[0], msg.payload[1], msg.payload[2]);
                node.leds.update();
            }
            if (msg.topic === "setcolor") {
                let index = msg.payload[0];
                let colors = msg.payload.slice(1);
                node.leds.setColor(index, colors);
                node.leds.update();
            }
            if (msg.topic === "setrgb") {
                let index = msg.payload[0];
                let color = msg.payload[1];
                node.leds.setRGB(index, color);
                node.leds.update();
            }
            if (msg.topic === "clear") {
                node.leds.clear();
                node.leds.update();
            }
        });

        node.on('close', function() {
            try {
                node.leds.disconnect();
            } catch (e) {
                node.error("Can't close SPI Port");
            }
        });
    }
    RED.nodes.registerType("rpi-ws2801", Ws2801Node);
};
