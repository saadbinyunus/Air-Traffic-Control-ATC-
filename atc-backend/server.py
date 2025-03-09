import grpc
import flight_pb2
import flight_pb2_grpc
from concurrent import futures
import requests
import time

class FlightService(flight_pb2_grpc.FlightServiceServicer):
    def GetFlights(self, request, context):
        url = "https://opensky-network.org/api/states/all"
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            data = response.json()
            
            flights = []
            for state in data.get("states", [])[:50]:  # Limit results
                if state[5] and state[6]:  # Ensure valid lat/lon
                    flights.append(flight_pb2.Flight(
                        callsign=state[1].strip() if state[1] else "UNKNOWN",
                        latitude=state[6],
                        longitude=state[5],
                        altitude=state[7] or 0,
                        velocity=state[9] or 0
                    ))

            return flight_pb2.FlightResponse(flights=flights)

        except requests.exceptions.RequestException as e:
            print(f"❌ API Error: {e}")
            return flight_pb2.FlightResponse(flights=[])

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    flight_pb2_grpc.add_FlightServiceServicer_to_server(FlightService(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("✅ gRPC Server started on port 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
