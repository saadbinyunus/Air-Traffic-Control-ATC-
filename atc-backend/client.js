const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require("express");

const PROTO_PATH = './flight.proto';

// Add loader options
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const flightProto = grpc.loadPackageDefinition(packageDefinition).flight;

// Verify service structure
console.log('Flight Service Definition:', flightProto.FlightService);

const client = new flightProto.FlightService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

// Rest of your code remains the same...