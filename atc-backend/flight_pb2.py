# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: flight.proto
# Protobuf Python Version: 5.29.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    29,
    0,
    '',
    'flight.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0c\x66light.proto\"\x1d\n\rFlightRequest\x12\x0c\n\x04\x61rea\x18\x01 \x01(\t\"c\n\x06\x46light\x12\x10\n\x08\x63\x61llsign\x18\x01 \x01(\t\x12\x10\n\x08latitude\x18\x02 \x01(\x01\x12\x11\n\tlongitude\x18\x03 \x01(\x01\x12\x10\n\x08\x61ltitude\x18\x04 \x01(\x01\x12\x10\n\x08velocity\x18\x05 \x01(\x01\"*\n\x0e\x46lightResponse\x12\x18\n\x07\x66lights\x18\x01 \x03(\x0b\x32\x07.Flight2B\n\rFlightService\x12\x31\n\x0eGetLiveFlights\x12\x0e.FlightRequest\x1a\x0f.FlightResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'flight_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_FLIGHTREQUEST']._serialized_start=16
  _globals['_FLIGHTREQUEST']._serialized_end=45
  _globals['_FLIGHT']._serialized_start=47
  _globals['_FLIGHT']._serialized_end=146
  _globals['_FLIGHTRESPONSE']._serialized_start=148
  _globals['_FLIGHTRESPONSE']._serialized_end=190
  _globals['_FLIGHTSERVICE']._serialized_start=192
  _globals['_FLIGHTSERVICE']._serialized_end=258
# @@protoc_insertion_point(module_scope)
